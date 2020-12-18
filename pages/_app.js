import '../style/index.css'
import ReactDOM from 'react-dom'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import Router from 'next/router';
import NProgress from 'nprogress';
import '../style/nprogress.css';
require("typeface-montserrat");
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

//Add Sentry
Sentry.init({
  dsn: "https://5bcd30f23b9247e2b55fd226f4a1f110@o493648.ingest.sentry.io/5563432",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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