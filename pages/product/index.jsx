import Link from 'next/link'
import { useRouter } from 'next/router'
import { getItem, getMatrixItem } from '../api/lightspeed'
import { useState, useEffect, useRef } from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Layout from '../../components/Layout'
import MatrixFilter from '../../components/product/MatrixFilter'
import ProductImage from '../../components/product/ProductImage'
import Head from 'next/head'

const Product = (props) => {
  const router = useRouter()
  const { addItem, cartCount } = useShoppingCart()
  // const Item = props.item.Item ? props.item.Item : props.item.ItemMatrix
  const { Item } = props.item
  const { ItemMatrix } = props.item

  const [checkedInputs, setCheckedInputs] = useState({})
  const [image, setImage] = useState(
    Item ? `${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg`
      : `${ItemMatrix.Images.Image.baseImageURL}/w_300/${ItemMatrix.Images.Image.publicID}.jpg`)
  const [item, setItem] = useState(Item ? Item : ItemMatrix)
  const [matrixItemDetail, setMatrixItemDetail] = useState()

  const handleInputChange = (event) => {
    setCheckedInputs([event.target.value])
  }

  const loaded = useRef(false);

  useEffect(() => {
    async function getFabItem() {
      const res = await fetch(`/api/item?itemID=${checkedInputs}`)
      const { Item } = await res.json()
      setImage(Item.Images ? `${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg` : 'No Image Yet')
      setMatrixItemDetail(Item)
    }
    if (loaded.current) {
      getFabItem()
    } else {
      loaded.current = true;
    }
  }, [checkedInputs])

  useEffect(() => {
    console.log(matrixItemDetail)
  }, [matrixItemDetail])

  const product = {
    name: item.description,
    description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
    shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
    sku: item.customSku,
    price: item.Prices.ItemPrice[0].amount.replace('.', ''),
    currency: 'GBP',
    image: image,
    itemID: item.itemID,
    unitPrice: item.Prices.ItemPrice[0].amount,
  }

  function getSingleProductFromMatrix(id) {
    const result = item.Items.Item.filter(obj => obj.itemID == id)
    return {
      name: result[0].description,
      description: result[0].ItemECommerce ? result[0].ItemECommerce.longDescription : '',
      shortDescription: result[0].ItemECommerce ? result[0].ItemECommerce.shortDescription : '',
      sku: result[0].customSku,
      price: result[0].Prices.ItemPrice[0].amount.replace('.', ''),
      currency: 'GBP',
      image: image,
      itemID: result[0].itemID,
      unitPrice: result[0].Prices.ItemPrice[0].amount,
    }
  }

  // Return Matrix Item
  if (item.itemMatrixID != 0) {
    return (
      <Layout>
        <Head>
          <title>{product.name} - FAB Defense (UK)</title>
          <meta name="description" content={product.description} />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description} />
          <meta property="og:image" content={product.image} />
        </Head>
        <div>
          <div className="lg:mx-60">
            <button className="lg:my-4 lg:p-2 lg:bg-black lg:text-white lg:text-sm lg:rounded" onClick={() => router.back()}>Back</button>
          </div>
          <div className="lg:mt-4 lg:mx-60">
            <div className="lg:grid lg:grid-cols-2 lg:gap-1">

              <div className="lg:flex lg:justify-center">
                <ProductImage imageURL={image} />
              </div>

              <div>
                <h1 className="lg:font-black lg:text-3xl lg:uppercase">{product.name}</h1>
                <p className="lg:my-4 lg:font-black lg:text-3xl lg:uppercase lg:mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <div className="lg:my-4 lg:font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                {matrixItemDetail &&
                  <p><span className="lg:font-medium">SKU: {matrixItemDetail.customSku}</span></p>
                }
                {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh > 0 &&
                  <p><span className="lg:font-medium">STOCK:</span> <span className="lg:text-green-500 lg:font-medium lg:uppercase">Available</span></p>
                }
                {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh == 0 &&
                  <p><span className="lg:font-medium">STOCK:</span> <span className="lg:text-red-500 lg:font-medium lg:uppercase">Out of Stock</span></p>
                }
                <MatrixFilter item={item} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
                <div className="lg:mt-8">
                  <button
                    onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                    aria-label={`Add ${product.name} to your cart`}
                    className="lg:p-2 lg:bg-fabred lg:focus:bg-red-400 lg:text-white lg:font-bold lg:rounded lg:mr-2"
                  >
                    Add to Cart
                </button>
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="lg:p-2 lg:bg-fabred lg:text-white lg:font-bold lg:rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:mx-60 lg:mb-24 lg:mt-12 lg:p-4 lg:shadow-lg lg:rounded lg:max-w-full lg:h-auto lg:border-none">
            <h3 className="lg:mx-4 lg:my-4 lg:text-2xl lg:font-black">{product.name} FULL DESCRIPTION</h3>
            <section>
              <div className="lg:mx-4 lg:my-4 lg:prose lg:font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </section>
          </div>
        </div>
      </Layout>
    )
  }

  // Return Single Item
  if (item.itemMatrixID == 0) {
    return (
      <Layout>
        <Head>
          <title>{product.name} - FAB Defense (UK)</title>
          <meta name="description" content={product.description} />
        </Head>
        <div>
          <div className="lg:mx-60">
            <button className="ml-2 mt-2 p-2 bg-black text-white text-sm rounded" onClick={() => router.back()}>Back</button>
          </div>
          <div className="mx-8 lg:mt-4 lg:mx-60">
            <div className="lg:grid lg:grid-cols-2 lg:gap-1">

              <div className="flex justify-center">
                <ProductImage imageURL={image} />
                {/* <img src={product.image} alt={`Image of the ${product.name}`} width="420" className="p-4 shadow-lg rounded max-w-full h-auto align-middle border-none" /> */}
              </div>

              <div>
                <h1 className="font-black text-3xl uppercase">{product.name}</h1>
                <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <div className="my-4 font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                <p><span className="font-medium">SKU:</span>{product.sku}</p>
                {item.ItemShops.ItemShop[0].qoh > 0 &&
                  (<p><span className="font-medium">STOCK:</span> <span className="text-green-500 font-medium uppercase">Available</span></p>)
                }
                {item.ItemShops.ItemShop[0].qoh == 0 &&
                  (<p><span className="font-medium">STOCK:</span> <span className="text-red-500 font-medium uppercase">Out of Stock</span></p>)
                }
                <div className="mt-8">
                  {item.ItemShops.ItemShop[0].qoh > 0 &&
                    <button
                      onClick={() => addItem(product)}
                      aria-label={`Add ${product.name} to your cart`}
                      className="p-2 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                    >
                      Add to Cart
                </button>
                  }
                  {item.ItemShops.ItemShop[0].qoh == 0 &&
                    <button
                      onClick={() => addItem(product)}
                      aria-label={`Add ${product.name} to your cart`}
                      className="lg:p-2 lg:bg-fabgrey lg:text-gray-400 lg:font-bold lg:rounded lg:mr-2"
                      disabled
                    >
                      Add to Cart
                </button>
                  }
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="lg:p-2 lg:bg-fabred lg:text-white lg:font-bold lg:rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-8 mt-8 lg:mx-60 lg:mb-24 lg:mt-12 lg:p-4 lg:shadow-lg lg:rounded lg:max-w-full lg:h-auto lg:border-none">
            <h3 className="lg:mx-4 lg:my-4 text-xl font-black">{product.name} FULL DESCRIPTION</h3>
            <section>
              <div className="lg:mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
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

