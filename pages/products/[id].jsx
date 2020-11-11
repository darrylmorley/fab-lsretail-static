import Layout from '../../components/Layout'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'

const Product = (props) => {
  const { Item } = props.props
  const { addItem } = useShoppingCart()

  const product = {
    name: Item.description,
    description: Item.CustomFieldValues ? Item.CustomFieldValues.CustomFieldValue[1].value : '',
    sku: Item.customSku,
    price: Item.Prices.ItemPrice[0].amount,
    currency: 'GBP',
    image: `${Item.Images.Image.baseImageURL}/w_250/${Item.Images.Image.publicID}.jpg`
  }

  console.log(Item)

  return (
    <Layout>
      <article
        className="flex flex-col justify-center items-center"
      >
        <figure>
          <Image
            src={product.image}
            alt={`Photo of ${product.name}`}
            width={250}
            height={250}
          />
          <figcaption>{product.name}</figcaption>
        </figure>
        <div>
          {Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[1].value}
        </div>
        <p>£{product.price}</p>
        {/* Adds the item to the cart */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%'
          }}
        >
          <button
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to your cart`}
            style={{ height: 50, width: 100, marginBottom: 30 }}
          >
            Add to Cart
        </button>
        </section>
        <section>
          {Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[0].value}
        </section>
      </article>
    </Layout>
  )
}

Product.getInitialProps = async ({ query }) => {
  const { id } = await query
  console.log('Item ID:', id)

  const res = await fetch(`http://localhost:3000/api/item?itemID=${id}`)
  const product = await res.json()

  return {
    props: product
  }
}

export default Product