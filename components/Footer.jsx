import Link from 'next/link'

const Footer = () => {
  return (
    <div className="bg-black">
      <footer className="mx-96 py-8 text-white">
        <div className="grid gap-4 grid-cols-4">
          <div>
            <Link href="/">
              <a><img src="/logos/FAB-logo.png" alt="FAB Defense Logo" width="100" className="mb-4" /></a>
            </Link>
            <h3 className="font-bold">EXPECT MORE</h3>
            <p className="mt-2 pr-4">Leading in development of cutting edge tactical equipment and weapon accessories.</p>
          </div>
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
            <h3 className="mb-2 font-bold text-lg">Social</h3>
            <ul>
              <li className="hover:text-fabred">Facebook</li>
              <li className="hover:text-fabred">Instagram</li>
              <li className="hover:text-fabred">Twitter</li>
            </ul>

            <h3 className="mt-4 mb-2 font-bold text-lg">Legal</h3>
            <ul>
              <Link href="/terms"><a><li className="hover:text-fabred">Terms</li></a></Link>
              <Link href="/privacy"><a><li className="hover:text-fabred">Privacy</li></a></Link>
            </ul>
          </div>
          <div>
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
          </div>
        </div>
      </footer>
      <div className="p-4 flex items-center justify-center bg-fabgrey text-white text-sm">
        <p>Shooting Supplies Ltd, All rights Reserved.</p>
      </div>
    </div>

  )
}

export default Footer

{/* <footer>
<div className="px-36 flex bg-fabgrey text-white">
  <section className="w-2/6 mt-8">
    
    <div className="mt-8">
     
    </div>
  </section>
  <section className="w-1/6 p-8">
    <div>
      
    </div>
    <div>
      
    </div>
  </section>
  <section className="w-1/6 p-8">
    <div>
      
    </div>
  </section>
  <section className="w-2/6 mt-8">
    
  </section>
</div>

</div>
</footer> */}