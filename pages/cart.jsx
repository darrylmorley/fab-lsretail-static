import CartForm from '../components/cart/CartForm'
import Layout from '../components/Layout'
import { useShoppingCart } from 'use-shopping-cart'

const Cart = () => {
  const { clearCart, cartDetails, totalPrice } = useShoppingCart()
  // console.log(cartDetails)

  return (
    <Layout>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <CartForm cartDetails={cartDetails} />
          </tbody>
        </table>
        <div>
          <p>£{totalPrice.toFixed(2)}</p>
        </div>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </Layout>
  )
}

export default Cart