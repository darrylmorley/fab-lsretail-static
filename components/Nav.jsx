import Link from 'next/link'
import styled from 'styled-components'
import { ChevronDown } from '@styled-icons/boxicons-regular'
import { useState } from 'react'

export const WhiteChevronDown = styled(ChevronDown)`
  color: white;
  font-weight: bold;`

const Nav = () => {
  const [dropdown, setDropdown] = useState(false);
  
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
            <a><li className="hover:text-fabred"  
              onMouseEnter={() => setDropdown(true)} 
              onMouseLeave={() => setDropdown(false)}>
              PRODUCTS
            </li></a>
          </Link>
          {dropdown && (
            <div className="absolute z-10 mt-12 p-4 text-white bg-fabgrey border border-rounded border-solid border-fabred rounded">Hi, I'm your dropdown!</div>
          )}
          <Link href="/blog">
            <a><li className="hover:text-fabred">BLOG</li></a>
          </Link>
          <Link href="/contact">
            <a><li className="hover:text-fabred">CONTACT</li></a>
          </Link>
        </ul>
      </section>
      <section className="w-1/3 flex items-center justify-center">
        Cart & Social
      </section>
    </nav>
  )
}

export default Nav