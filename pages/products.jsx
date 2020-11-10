import Product from '../components/Product'
import Cart from '../components/Cart'

const Products = (items) => {
  console.log(items.items)
  return (
    <div>
      <Cart />
      {items.items.map(item => (
        <Product title={item.description} price={item.Prices.ItemPrice[0].amount} key={item.itemID} />
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/items')
  const data = await res.json()
  const items = data.Item

  console.log(items)


  return { props: { items } }

};

export default Products;