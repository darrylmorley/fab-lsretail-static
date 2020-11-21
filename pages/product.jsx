import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
import { getItem } from './api/lightspeed'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const Product = (props) => {
  const { addItem, cartCount } = useShoppingCart()
  const { Item } = props.item

  const product = {
    name: Item.description,
    description: Item.ItemECommerce ? Item.ItemECommerce.longDescription : '',
    shortDescription: Item.ItemECommerce ? Item.ItemECommerce.shortDescription : '',
    sku: Item.customSku,
    price: Item.Prices.ItemPrice[0].amount.replace('.', ''),
    currency: 'GBP',
    image: `${Item.Images.Image.baseImageURL}/w_250/${Item.Images.Image.publicID}.jpg`,
    itemID: Item.itemID,
    unitPrice: Item.Prices.ItemPrice[0].amount,
  }

  const productDescriptionLong = () => {
    return { __html: product.description }
  }

  const productDescriptionShort = () => {
    return { __html: product.shortDescription }
  }

  return (
    <Layout>
      <div className="lg:my-12">
        <div className="lg:mx-96 lg:mb-24 grid grid-cols-2 gap-4">

          <div className="mr-2">
            <h1 className="lg:mb-16 lg:font-black lg:text-3xl uppercase">{product.name}</h1>
            <div className="lg:flex lg:justify-center">
              <img src={product.image} alt={`Image of the ${product.name}`} />
              {/* <Image
                src={product.image}
                alt={`Photo of ${product.name}`}
                width={500}
                height={500}
              /> */}
            </div>
          </div>

          <div>
            <div className="lg:ml-12">
              <p className="lg:mb-8 lg:font-black lg:text-3xl uppercase lg:mb-2">{formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}</p>
              <div className="font-medium" dangerouslySetInnerHTML={productDescriptionShort()}></div>
              <button
                onClick={() => addItem(product)}
                aria-label={`Add ${product.name} to your cart`}
                className="lg:my-8 lg:p-2 lg:bg-fabred lg:text-white lg:font-bold lg:rounded lg:mr-2"
              >
                Add to Cart
              </button>
              {cartCount > 0 ? (
                <Link href="/cart">
                  <button className="lg:my-8 lg:p-2 lg:bg-fabred lg:text-white lg:font-bold lg:rounded">View Cart</button>
                </Link>
              ) : ''}
            </div>
          </div>
        </div>
        <div className="lg:mx-96">
          <h3 className="lg:text-2xl lg:font-black lg:mb-4">About {product.name}</h3>
          <section>
            <div className="font-medium" dangerouslySetInnerHTML={productDescriptionLong()}></div>
          </section>
        </div>
      </div>
    </Layout >
  )
}

export async function getServerSideProps(ctx) {
  let { query: { slug } } = ctx
  const id = slug ? parseInt(slug.split('-').pop()) : ctx.query.id

  const data = await getItem(id)
  const item = await data.data

  return {
    props: {
      item,
      id
    }
  }
}

export default Product

// const { Item } = data

