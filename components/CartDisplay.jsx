import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'

const CartDisplay = (props) => {
  const {
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    formattedTotalPrice,
  } = useShoppingCart()

  return (
    <div className="absolute z-10 mt-12 right-20">
      <div className="w-64 border-2 border-fabred rounded-lg bg-white">
        <table>
          <tbody>
            {Object.keys(cartDetails).map(item => {
              return (
                <tr key={cartDetails[item].sku} className="border-b-2 border-grey-400">
                  <td className="text-sm">
                    <Image
                      src={cartDetails[item].image}
                      width={80}
                      height={80}
                      alt={`Image of ${cartDetails[item].name}`}
                      className="rounded-lg"
                    />
                  </td>
                  <td className="px-2 py-2 text-sm text-black font-medium">{cartDetails[item].quantity}</td>
                  <td className="px-2 py-2 text-sm text-black font-medium">{cartDetails[item].formattedValue}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
          )
      </div>
    </div >
  )
}

export default CartDisplay