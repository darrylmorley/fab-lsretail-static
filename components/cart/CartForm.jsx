import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import { TiDelete } from "react-icons/ti";

const CartForm = (props) => {
  const { cartDetails } = props
  const { removeItem } = useShoppingCart()

  console.log(cartDetails)

  return (
    <>
      {Object.keys(cartDetails).map(item => {
        return (
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                onClick={() => removeItem(cartDetails[item].sku)}
                aria-label={`Remove ${cartDetails[item].name} from your cart`}
              >
                <TiDelete size="1.5em" />
              </button>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><Image
              src={cartDetails[item].image}
              width={80}
              height={80}
              alt={`Image of ${cartDetails[item].name}`}
            /></td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{cartDetails[item].name}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{cartDetails[item].quantity}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">£{cartDetails[item].price}</td>
          </tr>
        )
      })}
    </>
  )
}

export default CartForm