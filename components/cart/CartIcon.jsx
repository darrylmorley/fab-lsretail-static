import { FiShoppingBag } from "react-icons/fi";
import Link from 'next/link'

const CartIcon = () => {
  return (
    <div className="text-white text-2xl hover:text-fabred">
      <Link href="/cart">
        <a>
          <FiShoppingBag />
        </a>
      </Link>
    </div>
  )
}

export default CartIcon