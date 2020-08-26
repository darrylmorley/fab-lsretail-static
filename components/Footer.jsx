import Link from 'next/link'

const Footer = () => {
  return (
  <footer>
    <div className="w-full px-24 flex bg-fabgrey text-white">
      <section className="w-2/6 mt-8">
        <div className="flex justify-start">
          <Link href="/"><a><img src="logos/FAB-logo.png" alt="FAB Defense Logo" width="120" /></a></Link>
        </div>
        <div className="mt-8">
          <h3 className="font-bold">EXPECT MORE</h3>
          <p className="mt-4">Leading in development of cutting edge tactical equipment and weapon accessories.</p>
        </div>
      </section>
      <section className="w-1/6 p-8">
        <div>
          <h3 className="mb-2 font-bold text-lg">Explore</h3>
          <ul>
            <Link href="/"><a><li className="hover:text-fabred">Home</li></a></Link>
            <Link href="/products"><a><li className="hover:text-fabred">Products</li></a></Link>
            <Link href="/contact"><a><li className="hover:text-fabred">Contact</li></a></Link>
            <Link href="/blog"><a><li className="hover:text-fabred">Blog</li></a></Link>
          </ul>
        </div>
        <div>
          <h3 className="mt-6 mb-2 font-bold text-lg">Social</h3>
          <ul>
            <li className="hover:text-fabred">Facebook</li>
            <li className="hover:text-fabred">Instagram</li>
            <li className="hover:text-fabred">Twitter</li>
          </ul>
        </div>
      </section>
      <section className="w-1/6 p-8">
        <div>
          <h3 className="mb-2 font-bold text-lg">Legal</h3>
          <ul>
            <Link href="/terms"><a><li className="hover:text-fabred">Terms</li></a></Link>
            <Link href="/privacy"><a><li className="hover:text-fabred">Privacy</li></a></Link>
          </ul>
        </div>
      </section>
      <section className="w-2/6 mt-8">
        <h3 className="mb-2 font-bold text-lg">Contact</h3>
        <address>
          <ul>
            <li>Shooting Supplies Ltd</li>
            <li>38, Sherwood Road</li>
            <li>Bromsgrove</li>
            <li>B60 3DR</li>
          </ul>
        </address>
        <ul className="mt-2">
          <li><a href="tel:+441527831261" className="hover:text-fabred">T: 01527831261</a></li>
          <li><a href="mailto:info@shootingsuppliesltd.co.uk" className="hover:text-fabred">E: info@shootingsuppliesltd.co.uk</a></li>
        </ul>
      </section>
    </div>
    <div className="w-full p-4 flex items-center justify-center bg-fabgrey">
      <div className="text-xs text-white">
        <p>Shooting Supplies Ltd, All rights Reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer