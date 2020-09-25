import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
    const [cart, setCart] = useContext(CartContext)
    const totalPrice = cart.reduce((acc, curr) => acc + parseFloat(curr.price), 0);

    return (
        <div>
            <span>Items in Cart: {cart.length}</span>
            <br/>
            <span>Total Price: {totalPrice.toFixed(2)}</span>
        </div>
    )
}

export default Cart