import Link from 'next/link'
import CartIcon from './cart/CartIcon'
import { useShoppingCart } from 'use-shopping-cart'

const Nav = () => {
  const { cartCount } = useShoppingCart()

  console.log(cartCount)

  return (
    <nav className="w-full px-24 flex bg-fabgrey">
      <section className="w-1/3 flex items-center justify-start">
        <Link href="/">
          <a><img src="/logos/FAB-logo.png" alt="FAB Defense Logo" width="120" className="py-6 mr-8" /></a>
        </Link>
      </section>
      <section className="w-1/3 flex items-center justify-center">
        <ul className="flex text-white text-xl font-bold space-x-8">
          <Link href="/products">
            <a>
              <li className="hover:text-fabred">PRODUCTS</li>
            </a>
          </Link>
          <Link href="/blog">
            <a><li className="hover:text-fabred">BLOG</li></a>
          </Link>
          <Link href="/contact">
            <a><li className="hover:text-fabred">CONTACT</li></a>
          </Link>
        </ul>
      </section>
      <section className="w-1/3 flex items-center justify-center">
        <CartIcon />
        {cartCount > 0 &&
          <span className="bg-white w-4 h-4 rounded-full text-center align-baseline">{cartCount}</span>}
      </section>
    </nav>
  )
}

export default Nav