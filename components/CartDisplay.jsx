import { useShoppingCart } from 'use-shopping-cart'

const CartDisplay = (props) => {
  const {
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    formattedTotalPrice,
  } = useShoppingCart()

  console.log(cartDetails)

  return (
    <div className="absolute z-10 mt-12 right-20">
      <div className="h-96 w-64 border-2 border-fabred rounded-lg bg-black">
        {Object.keys(cartDetails).map(item => {
          <div>
            <img src={item.image} alt={`Image of ${item.name}`} />
            <h3 className="text-white">{item.name}</h3>
          </div>
        })}
      </div>
    </div>
  )
}

export default CartDisplay