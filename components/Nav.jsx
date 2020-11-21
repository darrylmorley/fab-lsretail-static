import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './cart/CartIcon'
import { useShoppingCart } from 'use-shopping-cart'
import CartDisplay from './CartDisplay'

const Nav = () => {
  const [cartDisplay, setCartDisplay] = useState(false)
  const { cartCount } = useShoppingCart()

  const updateCartDisplay = () => {
    setCartDisplay(!cartDisplay)
  }

  return (
    <div className="text-white">
      <div className="bg-fabgrey text-sm">
        <div className="p-2 mx-48 flex">
          <div className="w-1/2 flex justify-center">
            {/* <p>Shooting Supplies Ltd, All rights Reserved.</p> */}
          </div>
          <div className="w-1/2 flex justify-end">
            <p>Contact Us: 01527 831 261</p>
          </div>
        </div>
      </div>
      <div className="h-24 bg-black
     text-white">
        <div className="mx-48 h-24 flex justify-between items-center">
          <div className="w-1/3">
            <Link href="/">
              <a><img src="/logos/FAB-logo.png" alt="FAB Defense Logo" width="120" className="py-6 mr-8" /></a>
            </Link>
          </div>
          <div className="w-1/3 flex justify-center">
            <ul className="flex text-white text-xl font-black space-x-16">
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
          </div>
          <div className="w-1/3 flex justify-end">
            <div onMouseEnter={updateCartDisplay} onMouseLeave={updateCartDisplay} >
              <CartIcon />
              {cartCount > 0 && cartDisplay && <CartDisplay />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav