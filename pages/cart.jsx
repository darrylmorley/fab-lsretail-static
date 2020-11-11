import CartForm from '../components/cart/CartForm'
import Layout from '../components/Layout'
import { useShoppingCart } from 'use-shopping-cart'

const Cart = () => {
  const { clearCart, cartDetails, totalPrice } = useShoppingCart()
  // console.log(cartDetails)

  return (
    <Layout>
      <div className="lg:mx-24 lg:my-12">
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
                <CartForm cartDetails={cartDetails} />
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
              <p>£{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="lg:mt-4 lg:flex lg:justify-end">
          <button onClick={clearCart} className="lg:mt-4 lg:bg-black lg:text-white lg:rounded lg:p-2 ">Clear Cart</button>
          <button onClick={clearCart} className="lg:ml-4 lg:mt-4 lg:bg-black lg:text-white lg:rounded lg:p-2">Pay Now</button>
        </div>
      </div>
    </Layout>
  )
}

export default Cart