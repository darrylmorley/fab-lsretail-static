import '../style/index.css'
import ReactDOM from 'react-dom'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'

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