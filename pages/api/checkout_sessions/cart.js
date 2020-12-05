import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import { getInventory } from '../../api/api-helpers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_SECRET, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
})

export default async function handler(req, res) {
  const inventory = await getInventory()

  if (req.method === 'POST') {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body
      const line_items = validateCartItems(inventory, cartItems)
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['GB'],
        },
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      }
      const checkoutSession = await stripe.checkout.sessions.create(
        params
      )

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
