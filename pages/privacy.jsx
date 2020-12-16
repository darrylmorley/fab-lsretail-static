import Layout from '../components/Layout'
import Link from 'next/link'
import Head from 'next/head'

const Privacy = () => {
  return (
    <Layout>
      <Head>
        <title>Privacy - FAB Defense (UK)</title>
        <meta name="description" content="At FAB Defense (UK) we take your privacy seriously. Please find our privacy policies below." />
      </Head>
      <div className="mx-8 my-8 lg:mx-56 lg:my-12">
        <h1 id="privacy" className="mb-4 font-black text-4xl">Privacy Policy</h1>

        <h2 className="mt-8 mb-4 font-black text-2xl">Links</h2>
        <ul>
          <Link href="#privacy"><li><a className="text-fabred">Privacy Policy</a></li></Link>
          <Link href="#cookies"><li><a className="text-fabred">Cookies</a></li></Link>
          <Link href="#payment"><li><a className="text-fabred">Payment Security</a></li></Link>
          <Link href="#phone-orders"><li><a className="text-fabred">Telephone Orders</a></li></Link>
          <Link href="#access-request"><li><a className="text-fabred">Right of access request</a></li></Link>
          <Link href="#erasure-request"><li><a className="text-fabred">Right of erasure request</a></li></Link>
        </ul>

        <hr className="my-4" />

        <div className="my-8">
          <h2 id="privacy" className="mt-4 mb-2 font-bold text-2xl">Privacy Policy</h2>
          <p className="my-1">We analyse traffic to this website to help us improve both what we do as a business and the site itself – we want your experience of the site to run as smoothly as possible. Rest assured, we only collect anonymous, aggregate statistics – nothing that could identify anyone personally.</p>
          <p className="my-1">We comply with the General Data Protection Regulation (GDPR), and we don’t sell or pass your details on to anyone else for marketing purposes. The only third parties who receive your contact information are our couriers and payment providers, for the sole purpose of fulfilling your order.</p>
          <p className="my-1">We do not use your details for marketing purposes without your express consent, and you can unsubscribe from our emails at any point using the link in the email. If you object to us using your data in any capacity, please contact us <Link href="mailto:data@shootingsuppliesltd.co.uk"><a className="text-fabred">data@shootingsuppliesltd.co.uk</a></Link>.</p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2 id="cookies" className="mt-4 mb-2 font-bold text-2xl">Cookies</h2>
          <p className="my-1">We use cookies to improve your ordering experience. Cookies are tiny text files downloaded on to your computer, tablet or smartphone when you visit a website. They help us remember you and enable you to use certain features of the site, like saving items in your cart and returning to them later (after payday, perhaps). Cookies only give us access to information you provide, and you can restrict or disable cookies through your internet browser, however this would severely hinder your use of this website.</p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2 id="payment" className="mt-4 mb-2 font-bold text-2xl">Payment Security</h2>
          <p className="my-1">All transactions are processed securely by our merchant service provider. Your credit card number will be encrypted when your order is placed using SSL encryption software. Our merchant provider then informs us, the outcome of that transaction via the encryption system.</p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2 id="phone-orders" className="mt-4 mb-2 font-bold text-2xl">Telephone Orders</h2>
          <p className="my-1">We do not store any credit or debit card details after your telephone order has been placed. Once used for the purpose of processing your order all financial details are destroyed.</p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2 id="access-request" className="mt-4 mb-2 font-bold text-2xl">Right of access request</h2>
          <p className="my-1">If you would like a copy of the personal data that we have for you, please email <Link href="mailto:data@shootingsuppliesltd.co.uk"><a className="text-fabred">data@shootingsuppliesltd.co.uk</a></Link></p>
          <p className="my-1">We will provide this information free of charge within one month of receiving your request.</p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2 id="erasure-request" className="mt-4 mb-2 font-bold text-2xl">Right of erasure request</h2>
          <p className="my-1">You have the right to have all the personal data that we have for you erased. Please bear in mind that this will remove you from our mailing lists and customer database completely – so if products you have bought from us are still within their warranty period, having your data erased may make it harder to address any future issues.</p>
          <p className="my-1">If you would like to have your data erased, please contact <Link href="mailto:data@shootingsuppliesltd.co.uk"><a className="text-fabred">data@shootingsuppliesltd.co.uk</a></Link></p>
        </div>
      </div>
    </Layout>
  )
}

export default Privacy