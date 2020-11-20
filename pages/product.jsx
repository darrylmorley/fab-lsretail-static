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
                <p className="lg:font-medium">{Item.CustomFieldValues && Item.CustomFieldValues.CustomFieldValue[1].value}</p>
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
              <p className="font-medium">
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