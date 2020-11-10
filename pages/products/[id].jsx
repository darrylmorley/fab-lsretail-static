const Product = (props) => {
  const { Item } = props.props
  console.log(Item)
  return (
    <div>
      <div>
        <img src={`${Item.Images.Image.baseImageURL}/w_250/${Item.Images.Image.publicID}.jpg`} alt={`Photo of ${Item.description.image}`} />
      </div>
      <div>
        <h1>{Item.description}</h1>
        <p>{Item.CustomFieldValues.CustomFieldValue[1].value}</p>
        <span>£{Item.Prices.ItemPrice[0].amount}</span>
        <button>Add to Cart</button>
      </div>
      <div>{Item.CustomFieldValues.CustomFieldValue[0].value}</div>
    </div>
  )
}

Product.getInitialProps = async ({ query }) => {
  const { id } = await query

  const res = await fetch(`http://localhost:3000/api/item?itemID=${id}`)
  const product = await res.json()

  return {
    props: product
  }
}

export default Product