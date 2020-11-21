// import Head from 'next/head'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import BannerBottom from '../components/BannerBottom'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Nav />
      {/* <Banner /> */}
      <div id="app-modal" />
      <main className="mx-96 my-24 flex justify-center" id="modal">
        <section className="grid grid-cols-3 gap-2">
          <div><img src="products/FX-AG43B-Black.jpg" alt="FAB Defense AG43B" width="300" /></div>
          <div><img src="products/FX-REGB-White.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-GLCOREB-DkGray.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-TPODG2B-Black.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-GLCORES-DkGray.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-USM-Red.jpg" alt="" width="300" /></div>
        </section>
      </main>
      <BannerBottom />
      <Footer />
    </div>
  )
}