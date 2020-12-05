import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getItem } from './api/lightspeed'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Router from 'next/dist/next-server/lib/router/router'

const Product = (props) => {
  const router = useRouter()
  const { addItem, cartCount } = useShoppingCart()
  const { Item } = props.item

  console.log(Item)

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
      <div>
        <div className="mx-60 mt-4 font-bold underline">
          <button onClick={() => router.back()}>Back</button>
        </div>
        <div className="mt-10 mx-60">
          <div className="grid grid-cols-2 gap-1">

            <div className="flex justify-start">
              <img src={product.image} alt={`Image of the ${product.name}`} width="420" className="p-4 shadow-lg rounded max-w-full h-auto align-middle border-none" />
              {/* <Image
                src={product.image}
                alt={`Photo of ${product.name}`}
                width={500}
                height={500}
              /> */}
            </div>

            <div>
              <h1 className="font-black text-3xl uppercase">{product.name}</h1>
              <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}</p>
              <div className="my-4 font-medium" dangerouslySetInnerHTML={productDescriptionShort()}></div>
              <p><span className="font-medium">SKU:</span>{product.sku}</p>
              <p><span className="font-medium">STOCK QTY:</span> {Item.ItemShops.ItemShop[0].qoh}</p>
              <div className="mt-10">
                {Item.ItemShops.ItemShop[0].qoh > 0 &&
                  <button
                    onClick={() => addItem(product)}
                    aria-label={`Add ${product.name} to your cart`}
                    className="p-2 bg-fabred text-white font-bold rounded mr-2"
                  >
                    Add to Cart
              </button>
                }
                {Item.ItemShops.ItemShop[0].qoh == 0 &&
                  <button
                    onClick={() => addItem(product)}
                    aria-label={`Add ${product.name} to your cart`}
                    className="p-2 bg-fabgrey text-gray-400 font-bold rounded mr-2"
                    disabled
                  >
                    Add to Cart
              </button>
                }
                {cartCount > 0 ? (
                  <Link href="/cart">
                    <button className="lg:my-8 lg:p-2 lg:bg-fabred lg:text-white lg:font-bold lg:rounded">View Cart</button>
                  </Link>
                ) : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-60 mb-24 mt-12 p-4 shadow-lg rounded max-w-full h-auto border-none">
          <h3 className="mx-4 my-4 text-2xl font-black">{product.name} FULL DESCRIPTION</h3>
          <section>
            <div className="mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={productDescriptionLong()}></div>
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

