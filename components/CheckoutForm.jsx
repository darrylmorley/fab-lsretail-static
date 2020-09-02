import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {destroyCookie} from 'nookies'
import { useState } from 'react'

const CheckoutForm = ({paymentIntent}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState()
  const [checkoutSuccess, setCheckoutSuccess] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()

   try {
     const {error, paymentIntent: { status }} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
       payment_method: {
         card: elements.getElement(CardElement)
       }
     })

     if (error) throw new Error(error.message)

     if (status === 'succeeded') {
      destroyCookie(null, 'paymentIntentId') 
      setCheckoutSuccess(true)
     }
   } catch(err) {
     setCheckoutError(err.message)
   }
  }

  if (checkoutSuccess) return <p>Payment Completed</p>

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <button type="submit" disabled={!stripe}>
        Pay now
      </button>

      {checkoutError && <span className="text-red-700">{checkoutError}</span>}
    </form>
  )
}

export default CheckoutForm