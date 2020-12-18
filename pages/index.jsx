import CookieConsent from "react-cookie-consent";
import Layout from '../components/Layout'
import BannerBottom from '../components/BannerBottom'
// import HomeModal from '../components/Modal'
import Head from 'next/head'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>FAB Defense (UK)</title>
        <meta name="description" content="Quality Gun Accessories from FAB Defense!" />
        <meta property="og:title" content="FAB Defense (UK)" />
        <meta property="og:description" content="Quality Gun Accessories from FAB Defense!" />
        <meta property="og:image" content="/logos/FAB-logo.png" />
      </Head>
      {/* <Banner /> */}
      {/* <HomeModal /> */}
      <CookieConsent
        location="bottom"
        buttonText="Okay"
        cookieName="fab-cart"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies for functionality and user experience.{" "}
      </CookieConsent>
      {/* <div id="app-modal" /> */}
      <main className="hidden lg:mx-60 lg:mt-32 lg:flex lg:justify-center" id="modal">
        <section className="lg:grid lg:grid-cols-3 lg:gap-2">
          <div><img src="products/FX-AG43B-Black.jpg" alt="FAB Defense AG43B" width="300" /></div>
          <div><img src="products/FX-REGB-White.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-GLCOREB-DkGray.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-TPODG2B-Black.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-GLCORES-DkGray.jpg" alt="" width="300" /></div>
          <div><img src="products/FX-USM-Red.jpg" alt="" width="300" /></div>
        </section>
      </main>
      <div className="lg:my-40">
        <BannerBottom />
      </div>
    </Layout>
  )
}