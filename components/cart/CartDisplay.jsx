import { useShoppingCart } from 'use-shopping-cart'
import { TiDelete } from "react-icons/ti";
import Image from 'next/image'

const CartDisplay = (props) => {
  const {
    removeItem,
    clearCart,
    cartDetails,
    redirectToCheckout,
    formattedTotalPrice,
  } = useShoppingCart()

  return (
    <div className="absolute z-10 mt-4 right-20">
      <div className="w-64 border-4 border-fabred rounded-lg bg-white">
        <table className="w-full">
          <tbody className="flex flex-col">
            {Object.keys(cartDetails).map(item => {
              return (
                <tr key={cartDetails[item].sku} className="p-2 mt-2 flex space-x-8 items-center">
                  <td className="text-sm p-2">
                    <Image
                      src={cartDetails[item].image}
                      width={80}
                      height={80}
                      alt={`Image of ${cartDetails[item].name}`}
                    />
                  </td>
                  <td className="text-sm text-black font-medium">{cartDetails[item].quantity}</td>
                  <td className="text-sm text-black font-medium">{cartDetails[item].formattedValue}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default CartDisplay