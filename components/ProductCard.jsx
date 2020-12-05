import Link from 'next/link'
import slugify from 'slugify'
import Image from 'next/image'

const ProductCard = (props) => {
  const { item } = props
  const name = item.description
  const slug = slugify(item.description).toLocaleLowerCase()

  console.log('Item from ProductCard', item)

  return (
    <>
      <div className="mx-8 my-4 w-56 overflow-hidden flex flex-col rounded shadow-lg border-2">
        <Link as={`/product/${slug}`} href={`/product?slug=${slug}-${item.itemID}`}>
          <a>
            <div className="p-4 object-center object-scale-down">
              {item.Images &&
                <Image
                  src={`${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg`}
                  alt={`Photo of ${item.description.image}`}
                  width={200}
                  height={200}
                />}
            </div>
            <div className="h-full p-4 bg-black text-white font-bold uppercase">
              <h2>{item.description}</h2>
              <p className="mt-4 text-lg align-bottom">£{item.Prices.ItemPrice[0].amount}</p>
            </div>
          </a>
        </Link>
      </div >
    </>
  )
}

export default ProductCard