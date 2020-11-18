import Image from 'next/image'
import Layout from '../components/Layout'
import useSWR from 'swr'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const Product = withRouter(props => {
  console.log(props)
  const { router } = props
  let { query: { slug } } = router
  const id = slug ? parseInt(slug.split('-').pop()) : router.query.id

  const { addItem, cartCount } = useShoppingCart()

  const { data, error } = useSWR(`/api/item?itemID=${id}`)

  if (error) return (
    <Layout>
      <div>Something went wrong. Try refreshing the page.</div>
    </Layout>
  )

  if (!data) return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  )

  if (data) {
    const { Item } = data

    const product = {
      name: Item.description,
      description: Item.CustomFieldValues ? Item.CustomFieldValues.CustomFieldValue[1].value : '',
      sku: Item.customSku,
      price: Item.Prices.ItemPrice[0].amount.replace('.', ''),
      currency: 'GBP',
      image: `${Item.Images.Image.baseImageURL}/w_250/${Item.Images.Image.publicID}.jpg`,
      itemID: Item.itemID,
      unitPrice: Item.Prices.ItemPrice[0].amount,
    }

    return (
      <Layout>
        <div className="lg:my-12">
          <div className="w-full lg:mx-24 grid grid-cols-2 gap-4">
            <div className="lg:w=1/2">
              <div>
                <h1 className="lg:font-bold lg:text-3xl uppercase">{product.name}</h1>
                <Image
                  src={product.image}
                  alt={`Photo of ${product.name}`}
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <p className="lg:font-bold lg:text-3xl uppercase lg:mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <p>{Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[1].value}</p>
                <button
                  onClick={() => addItem(product)}
                  aria-label={`Add ${product.name} to your cart`}
                  className="lg:my-8 lg:p-2 lg:bg-green-600 lg:text-white lg:rounded lg:mr-2"
                >
                  Add to Cart
                </button>
                {cartCount > 0 ? (
                  <Link href="/cart">
                    <button className="lg:my-8 lg:p-2 lg:bg-green-600 lg:text-white lg:rounded">View Cart</button>
                  </Link>
                ) : ''}
              </div>
            </div>
          </div>
          <div className="lg:mx-24">
            <h3 className="lg:text-2xl lg:font-bold lg:mb-4">About {product.name}</h3>
            <section>
              <p>
                {Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[0].value}
              </p>
            </section>
          </div>
        </div>
      </Layout>
    )
  }
})

export default Product