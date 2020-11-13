import Image from 'next/image'
import Layout from '../../components/Layout'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const Product = (props) => {
  const { Item } = props.props
  const { addItem } = useShoppingCart()

  const product = {
    name: Item.description,
    description: Item.CustomFieldValues ? Item.CustomFieldValues.CustomFieldValue[1].value : '',
    sku: Item.customSku,
    price: Item.Prices.ItemPrice[0].amount.replace('.', ''),
    currency: 'GBP',
    image: `${Item.Images.Image.baseImageURL}/w_250/${Item.Images.Image.publicID}.jpg`
  }

  return (
    <Layout>
      <div>
        <div>
          <div>
            <Image
              src={product.image}
              alt={`Photo of ${product.name}`}
              width={350}
              height={350}
            />
          </div>
          <div>
            <h1>{product.name}</h1>
            <p> {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}</p>

            <p>{Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[1].value}</p>

            <button
              onClick={() => addItem(product)}
              aria-label={`Add ${product.name} to your cart`}
            >
              Add to Cart
          </button>

          </div>
        </div>
        <h3>Full Description</h3>
        <section>
          <p>
            {Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[0].value}
          </p>
        </section>
      </div>
    </Layout>
  )
}

Product.getInitialProps = async ({ query }) => {
  const { id } = await query

  const res = await fetch(`http://localhost:3000/api/item?itemID=${id}`)
  const product = await res.json()

  return {
    props: product
  }
}

export default Product