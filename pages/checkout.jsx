import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'


const stripePromise = loadStripe("pk_test_51HEammBp7A8OVVo2dKNGYHphBZZFkuY7Y1vDa8HyhZZbIWfJIDUErroCFFKjXycxpevmsuo9btCg7bJKpWpm2MSF00LWtktDET")

export const getServerSideProps = async (context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let paymentIntent

  const {paymentIntentId} = await parseCookies(context)

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      props: {
        paymentIntent
      }
    }
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'gbp'
  })

  setCookie(context, 'paymentIntentId', paymentIntent.id)

  return {
    props: {
      paymentIntent
    }
  }
}

const Checkout = ({ paymentIntent }) => {
  return (
  <Elements stripe={stripePromise}>
    <CheckoutForm paymentIntent={paymentIntent} />
  </Elements>
  )}
  
export default Checkout