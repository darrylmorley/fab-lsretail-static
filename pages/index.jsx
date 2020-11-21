// import Head from 'next/head'
import Layout from '../components/Layout'
import BannerBottom from '../components/BannerBottom'
import HomeModal from '../components/Modal'

export default function Home() {
  return (
    <Layout>
      {/* <Banner /> */}
      <HomeModal />
      <div id="app-modal" />
      <main className="mx-96 mt-32 flex justify-center" id="modal">
        <section className="grid grid-cols-3 gap-2">
          <div><img src="products/FX-AG43B-Black.jpg" alt="FAB Defense AG43B" width="300" /></div>
          <div><img src="products/FX-REGB-White.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-GLCOREB-DkGray.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-TPODG2B-Black.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-GLCORES-DkGray.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-USM-Red.jpg" alt="" width="300" /></div>
        </section>
      </main>
      <div className="my-40">
        <BannerBottom />
      </div>
    </Layout>
  )
}