import Link from 'next/link'
import slugify from 'slugify'
import Image from 'next/image'

const ProductCard = (props) => {
  const { item } = props
  const name = item.description
  const slug = slugify(item.description)

  return (
    <div className="flex flex-col border border-solid border-black">
      <Link href={`/products/[id]?id=${item.itemID}`}>
        <a>
          {item.Images &&
            <Image
              src={`${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg`}
              alt={`Photo of ${item.description.image}`}
              width={250}
              height={250}
            />}
        </a>
      </Link>
      <h2 className="font-bold uppercase">{item.description}</h2>
    </div >
  )
}

export default ProductCard