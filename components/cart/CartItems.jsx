import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import { TiDelete } from "react-icons/ti";

const CartForm = (props) => {
  const { cartDetails } = props
  const { removeItem, setItemQuantity } = useShoppingCart()

  return (
    <>
      {Object.keys(cartDetails).map(item => {
        return (
          <tr key={cartDetails[item].sku}>
            <td className="p-1 lg:p-5 border-b border-gray-200 bg-white text-sm">
              {cartDetails[item].itemID != 7051 &&
                <button
                  onClick={() => removeItem(cartDetails[item].sku)}
                  aria-label={`Remove ${cartDetails[item].name} from your cart`}
                >
                  <TiDelete size="1.5em" />
                </button>
              }
              {cartDetails && cartDetails[item].itemID === 7051 &&
                <div></div>
              }
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><Image
              src={cartDetails[item].image}
              width={80}
              height={80}
              alt={`Image of ${cartDetails[item].name}`}
            /></td>
            <td className="text-xs p-2 lg:p-5 lg:border-b lg:border-gray-200 lg:bg-white lg:text-sm">{cartDetails[item].name}</td>
            <td className="p-2 lg:p-5 border-b border-gray-200 bg-white text-sm">
              {cartDetails[item].itemID != 7051 &&
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  min="1"
                  max="2"
                  value={cartDetails[item].quantity}
                  onChange={(event) => { setItemQuantity(cartDetails[item].sku, event.target.value) }}
                  className="w-8 lg:w-12 border-2 border-black rounded"
                />
              }
              {cartDetails && cartDetails[item].itemID === 7051 &&
                <div>Delivery</div>
              }
            </td>
            <td className="w-24 px-5 py-5 border-b border-gray-200 bg-white text-sm">{cartDetails[item].formattedValue}</td>
          </tr>
        )
      })}
    </>
  )
}

export default CartForm