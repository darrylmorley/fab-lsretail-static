import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_SECRET)

const getInventory = async () => {
  const res = await fetch('http://localhost:3000/api/items')
  const data = await res.json()
  const items = data.Item
  const inventory = items.map(item => {
    return {
      name: item.description,
      sku: item.itemID,
      price: item.Prices.ItemPrice[0].amount,
      image: item.Images ? `${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg` : null,
      currency: 'GBP'
    }

  })
  console.log(inventory)
}

export default async function handler(req, res) {
  const inventory = await getInventory()
  if (req.method === 'POST') {
    try {
      const cartItems = req.body
      console.log('cartItems from cart.js:', cartItems)
      const line_items = validateCartItems(inventory, cartItems)
      console.log('LineItems', line_items)
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['UK']
        },
        line_items: line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/use-shopping-cart`,
      }
      const checkoutSession = await stripe.checkout.sessions.create(
        params
      )

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}