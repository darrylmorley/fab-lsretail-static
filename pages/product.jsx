import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getItem, getMatrixItem } from './api/lightspeed'
import { useState, useEffect } from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import MatrixFilter from '../components/MatrixFilter'

const Product = (props) => {
  const router = useRouter()
  const { addItem, cartCount } = useShoppingCart()
  const Item = props.item.Item ? props.item.Item : props.item.ItemMatrix

  console.log(Item)

  const [checkedInputs, setCheckedInputs] = useState({})

  const handleInputChange = (event) => {
    setCheckedInputs([event.target.value])
  }

  useEffect(() => {
    console.log('Checked Inputs', checkedInputs)
  }, [checkedInputs])

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

  function getSingleProductFromMatrix(id) {
    const result = Item.Items.Item.filter(obj => obj.itemID == id)
    return {
      name: result[0].description,
      description: result[0].ItemECommerce ? result[0].ItemECommerce.longDescription : '',
      shortDescription: result[0].ItemECommerce ? result[0].ItemECommerce.shortDescription : '',
      sku: result[0].customSku,
      price: result[0].Prices.ItemPrice[0].amount.replace('.', ''),
      currency: 'GBP',
      image: result[0].Images ? `${result[0].Images.Image.baseImageURL}/w_250/${result[0].Images.Image.publicID}.jpg` : product.image,
      itemID: result[0].itemID,
      unitPrice: result[0].Prices.ItemPrice[0].amount,
    }
  }

  // Return Matrix Item
  if (Item.itemMatrixID != 0) {
    return (
      <Layout>
        <div>
          <div className="mx-60">
            <button className="mt-2 p-2 bg-black text-white text-sm rounded" onClick={() => router.back()}>Back</button>
          </div>
          <div className="mt-4 mx-60">
            <div className="grid grid-cols-2 gap-1">

              <div className="flex justify-start">
                <img src={product.image} alt={`Image of the ${product.name}`} width="420" className="p-4 shadow-lg rounded max-w-full h-auto align-middle border-none" />
              </div>

              <div>
                <h1 className="font-black text-3xl uppercase">{product.name}</h1>
                <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <div className="my-4 font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                <MatrixFilter item={Item} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
                <div className="mt-8">
                  <button
                    onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                    aria-label={`Add ${product.name} to your cart`}
                    className="p-2 bg-fabred text-white font-bold rounded mr-2"
                  >
                    Add to Cart
                </button>
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="p-2 bg-fabred text-white font-bold rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-60 mb-24 mt-12 p-4 shadow-lg rounded max-w-full h-auto border-none">
            <h3 className="mx-4 my-4 text-2xl font-black">{product.name} FULL DESCRIPTION</h3>
            <section>
              <div className="mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </section>
          </div>
        </div>
      </Layout>
    )
  }

  // Return Single Item
  if (Item.itemMatrixID == 0) {
    return (
      <Layout>
        <div>
          <div className="mx-60">
            <button className="mt-2 p-2 bg-black text-white text-sm rounded" onClick={() => router.back()}>Back</button>
          </div>
          <div className="mt-4 mx-60">
            <div className="grid grid-cols-2 gap-1">

              <div className="flex justify-start">
                <img src={product.image} alt={`Image of the ${product.name}`} width="420" className="p-4 shadow-lg rounded max-w-full h-auto align-middle border-none" />
              </div>

              <div>
                <h1 className="font-black text-3xl uppercase">{product.name}</h1>
                <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <div className="my-4 font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                <p><span className="font-medium">SKU:</span>{product.sku}</p>
                <p><span className="font-medium">STOCK QTY:</span> {Item.ItemShops.ItemShop[0].qoh}</p>
                <div className="mt-8">
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
                      <button className="p-2 bg-fabred text-white font-bold rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-60 mb-24 mt-12 p-4 shadow-lg rounded max-w-full h-auto border-none">
            <h3 className="mx-4 my-4 text-2xl font-black">{product.name} FULL DESCRIPTION</h3>
            <section>
              <div className="mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </section>
          </div>
        </div>
      </Layout >
    )
  }
}

export async function getServerSideProps(ctx) {
  let { query: { slug } } = ctx
  const id = slug ? parseInt(slug.split('-').pop()) : ctx.query.id

  if (ctx.query.matrix === 'true') {
    const data = await getMatrixItem(id)
    const item = await data.data

    console.log(item)

    return {
      props: {
        item,
        id
      }
    }
  }

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

