import { useShoppingCart } from 'use-shopping-cart'
import { FiShoppingBag } from "react-icons/fi";
import Link from 'next/link'

const CartIcon = () => {
  const { cartCount } = useShoppingCart()

  return (
    <div className="text-white text-2xl hover:text-fabred">
      <Link href="/cart">
        <a>
          <div className="flex">
            <FiShoppingBag />
            <span className="ml-1 text-sm">{cartCount != 0 && cartCount}</span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default CartIcon