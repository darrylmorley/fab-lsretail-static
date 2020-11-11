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
            <td className="flex">
              <button
                onClick={() => removeItem(cartDetails[item].sku)}
                aria-label={`Remove ${cartDetails[item].name} from your cart`}
              >
                <TiDelete />
              </button>
            </td>
            <td><Image
              src={cartDetails[item].image}
              width={80}
              height={80}
              alt={`Image of ${cartDetails[item].name}`}
            /></td>
            <td>{cartDetails[item].name}</td>
            <td>{cartDetails[item].quantity}</td>
            <td>£{cartDetails[item].price}</td>
          </tr>
        )
      })}
    </>
  )
}

export default CartForm