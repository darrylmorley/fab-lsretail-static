import Image from 'next/image'
import Layout from '../../components/Layout'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const Product = () => {
  const router = useRouter()
  const { id } = router.query

  const { addItem } = useShoppingCart()

  const { data, error } = useSWR(`/api/item?itemID=${id}`)
  const { Item } = data

  if (error) return <div>Something went wrong. Try refreshing the page.</div>

  if (!data) return <div>Loading...</div>

  if (data) {
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
}

export default Product