import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_SECRET)
const inventory = []

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const cartItems = req.body
      const line_items = validateCartItems(inventory, cartItems)
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['UK']
        },
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/use-shopping-cart`,
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