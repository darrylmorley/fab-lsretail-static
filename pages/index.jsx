// import Head from 'next/head'

import Nav from '../components/Nav'
import Banner from '../components/Banner'
import BannerBottom from '../components/BannerBottom'
import Footer from '../components/Footer'

export default function Home({items}) {
  return (
    <div>
      <Nav />
      <Banner />
      <hr className="my-4" />
      <main className="px-24 mt-12">
        <section className="w-full flex">
          <div className="w-1/3 m-2 flex items-center justify-center bg-black"><img src="products/FX-AG43B-Black.jpg" alt="FAB Defense AG43B" width="250"/></div>
          <div className="w-1/3 m-2 flex items-center justify-center border-2 border-solid border-black"><img src="products/FX-REGB-White.jpg" alt="" width="250" /></div>
          <div className="w-1/3 m-2 flex items-center justify-center bg-fabgrey"><img src="products/FX-GLCOREB-DkGray.jpg" alt="" width="250" /></div>
        </section>
        <section className="w-full flex">
        <div className="w-1/3 m-2 flex items-center justify-center bg-black"><img src="products/FX-TPODG2B-Black.jpg" alt="" width="250"/></div>
          <div className="w-1/3 m-2 flex items-center justify-center bg-fabgrey"><img src="products/FX-GLCORES-DkGray.jpg" alt="" width="250" /></div>
          <div className="w-1/3 m-2 flex items-center justify-center bg-fabred"><img src="products/FX-USM-Red.jpg" alt="" width="250" /></div>
        </section>
      </main>
      <hr className="mt-12" />
      <BannerBottom />
      <Footer />
    </div>
  )
}