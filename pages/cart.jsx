import React, { useState, useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from './api/api-helpers'
import CartItems from '../components/cart/CartItems'
import { setCookie, destroyCookie } from 'nookies'
import Layout from '../components/Layout'
import Head from 'next/head'
import { RewindDimensions } from '@styled-icons/boxicons-regular/Rewind'

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(true)
  const [delivery, setDelivery] = useState(undefined)

  const {
    addItem,
    removeItem,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    totalPrice,
    formattedTotalPrice,
  } = useShoppingCart()

  useEffect(() => {
    const getDeliveryItem = async () => {
      setLoading(true)
      if (totalPrice && totalPrice < 5000 && delivery === undefined) {
        const res = await fetch('/api/delivery')
        const data = await res.json()
        const item = data.Item

        const delivery = {
          name: item.description,
          description: 'Delivery',
          shortDescription: 'Delivery',
          sku: item.customSku,
          price: item.Prices.ItemPrice[0].amount.replace('.', ''),
          currency: 'GBP',
          image: `${item.Images.Image.baseImageURL}/w_200/${item.Images.Image.publicID}.jpg`,
          itemID: item.itemID,
          unitPrice: item.Prices.ItemPrice[0].amount,
        }
        setDelivery(delivery)
        setLoading(false)
      }
    }
    getDeliveryItem()
  })

  useEffect(() => setCartEmpty(!cartCount), [cartCount])
  useEffect(() => {
    if (delivery && cartCount > 0) {
      if (!cartDetails['DEL-FAB']) {
        addItem(delivery)
      }
    }
  }, [delivery])

  useEffect(() => {
    if (totalPrice >= 5000) {
      setDelivery(undefined)
      removeItem('DEL-FAB')
    }
  }, [totalPrice])

  useEffect(() => {
    if (Object.keys(cartDetails).length === 1 && cartDetails['DEL-FAB']) {
      setDelivery(undefined)
      removeItem('DEL-FAB')
    }
  }, [cartDetails])

  const clearCookie = () => {
    destroyCookie(null, 'cart')
    clearCart()
  }

  const handleCheckout = async (event) => {
    event.preventDefault()
    setLoading(true)
    setCookie(null, 'cart', JSON.stringify({ cartDetails, formattedTotalPrice }), { path: '/' })

    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    )

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    redirectToCheckout({ sessionId: response.id })
  }

  return (
    <Layout>
      <Head>
        <title>Cart - FAB Defense (UK)</title>
      </Head>
      <div className="lg:mx-60 lg:my-12">
        <div className="lg:-mx-4 sm:-mx-8 px-4 sm:px-8 lg:py-4 lg:overflow-x-auto">
          <div className="lg:inline-block lg:min-w-full lg:shadow lg:rounded lg:overflow-hidden">
            <table className="lg:min-w-full lg:leading-normal">
              <thead className="lg:bg-black lg:text-white">
                <tr>
                  <th className="lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider"></th>
                  <th className="lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider"></th>
                  <th className="lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider">Description</th>
                  <th className="lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider">Qty</th>
                  <th className="lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                <CartItems cartDetails={cartDetails} />
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:flex lg:justify-end">
          <div className="lg:w-48 lg:flex lg:flex-col lg:border-2 lg:border-gray-200 lg:text-center">
            <div className="lg:p-2 lg:bg-black lg:text-white lg:rounded-t">
              <h3>Cart Total</h3>
            </div>
            <div className="lg:p-2 lg:text-center">
              <p>{formattedTotalPrice}</p>
            </div>
          </div>
        </div>
        <div className="lg:mt-4 lg:flex lg:justify-end">
          <button onClick={clearCookie} className="lg:mt-4 lg:bg-black lg:text-white lg:rounded lg:p-2 ">Clear Cart</button>
          <button onClick={handleCheckout} className="lg:ml-4 lg:mt-4 lg:bg-black lg:text-white lg:rounded lg:p-2" disabled>Pay Now</button>

        </div>
      </div>
    </Layout>
  )
}

export default Cart