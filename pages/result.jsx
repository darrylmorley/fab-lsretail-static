import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import { createSale } from '../pages/api/lightspeed'
import { useShoppingCart } from 'use-shopping-cart'
import { parseCookies, destroyCookie } from 'nookies'

const ResultPage = (props) => {
  const router = useRouter()
  const { data } = props.props
  const { saleID } = props.props
  const { clearCart } = useShoppingCart()

  if (!props) return <div>failed to load</div>

  destroyCookie(null, 'cart')
  clearCart()

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Sale Reference: {saleID}</h2>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
      </div>
    </Layout>
  )
}

ResultPage.getInitialProps = async ({ query, req }) => {
  const { session_id } = query
  const { headers } = req
  const parsedCookies = parseCookies({ req })

  const cart = parsedCookies.cart

  const data = await fetch(`http://${headers.host}/api/checkout_sessions/${session_id}`)
  const stripeSessionData = await data.json()
  let saleID = null

  if (cart) {
    if (stripeSessionData.payment_status === 'paid') {
      const parseCartDetails = JSON.parse(cart)
      const cartDetails = parseCartDetails.cartDetails

      console.log("Cart Details =", cartDetails)

      const saleLines = Object.keys(cartDetails).map(item => {
        console.log("Item = ", item)
        return {
          "SaleLine": [
            {
              "shopID": 1,
              "employeeID": 5,
              "customSku": cartDetails[item].sku,
              "unitQuantity": cartDetails[item].quantity,
              "unitPrice": cartDetails[item].unitPrice,
              "itemID": parseInt(cartDetails[item].itemID)
            }
          ]
        }
      })

      const sale = {
        "employeeID": 5,
        "registerID": 1,
        "completed": true,
        "shopID": 1,
        "referenceNumber": stripeSessionData.payment_intent.id,
        "SaleLines": saleLines.map(item => {
          return item
        }),
        "SalePayments": {
          "SalePayment": {
            "amount": parseFloat(parseCartDetails.formattedTotalPrice.replace('£', '')),
            "paymentTypeID": 1
          }
        }
      }

      await createSale(sale).then(res => {
        saleID = res.data.Sale.saleID
      })
    }
  }


  return {
    props: {
      data: stripeSessionData,
      saleID: saleID
    }
  }
}

export default ResultPage
