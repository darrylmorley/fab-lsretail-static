import React, { useState, useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from './api/api-helpers'
import CartItems from '../components/cart/CartItems'
import { setCookie, destroyCookie } from 'nookies'
import Layout from '../components/Layout'
import Link from 'next/link'



const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(true)
  const {
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    formattedTotalPrice,
  } = useShoppingCart()

  console.log(cartDetails)

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

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
      <div className="lg:mx-96 lg:my-12">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded overflow-hidden">
            <table className="lg:min-w-full lg:leading-normal">
              <thead className="lg:bg-black lg:text-white">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider">Description</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider">Qty</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
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