import '../style/index.css'
import ReactDOM from 'react-dom'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import Router from 'next/router';
import NProgress from 'nprogress';
import '../style/nprogress.css';
require("typeface-montserrat");

// Router events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const stripePromise = loadStripe(process.env.STRIPE_API_PUBLIC_KEY)

  return (
    <CartProvider
      stripe={stripePromise}
      mode="checkout-session"
      successUrl="stripe.com"
      cancelUrl="twitter.com/dayhaysoos"
      currency="GBP"
      allowedCountries={['GB']}
      billingAddressCollection={true}
    >
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp