import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Product = (props) => {
    const [cart, setCart] = useContext(CartContext)

    const addToCart = () => {
        const product = {
            title: props.title,
            price: props.price
        }
        setCart(currentState => [...currentState, product])
    }

    return (
        <div className="mt-8">
            <h2>{props.title}</h2>
            <p>{props.price}</p>
            <button onClick={addToCart} className="my-2 p-2 border rounded">Add to Cart</button>
            <hr/>
        </div>
    )
}

export default Product