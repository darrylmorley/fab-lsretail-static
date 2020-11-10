import Link from 'next/link'
import slugify from 'slugify'

const ProductCard = (props) => {
  const { item } = props
  const name = item.description
  const slug = slugify(item.description)
  console.log(slug)

  return (
    <div>
      <Link href={`/products/[id]?id=${item.itemID}`}>
        <a>
          <img src={`${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg`} alt={`Photo of ${item.description.image}`} />
        </a>
      </Link>
      <h2>{item.description}</h2>
    </div >
  )
}

export default ProductCard