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
      <div className="lg:my-8 lg:mx-48">
        <div className="lg:flex">
          <div className="lg:w-1/2 lg:flex lg:justify-center">
            <Image
              src={product.image}
              alt={`Photo of ${product.name}`}
              width={350}
              height={350}
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="lg:mt-8 lg:font-bold lg:text-2xl lg:uppercase">{product.name}</h1>
            <p className="lg:font-bold lg:text-2xl">£{product.price}</p>

            <p className="lg:my-4">{Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[1].value}</p>

            <button
              onClick={() => addItem(product)}
              aria-label={`Add ${product.name} to your cart`}
              className="lg:mt-4 lg:bg-black lg:text-white lg:rounded lg:p-2"
            >
              Add to Cart
          </button>

          </div>
        </div>
        <h3 className="lg:p-2 lg:bg-black lg:text-white lg:text-center lg:rounded-t">Full Description</h3>
        <section className="lg:p-4 lg:border lg:border-black lg:rounded-b">
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
  console.log('Item ID:', id)

  const res = await fetch(`http://localhost:3000/api/item?itemID=${id}`)
  const product = await res.json()

  return {
    props: product
  }
}

export default Product