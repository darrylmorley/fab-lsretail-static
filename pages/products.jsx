import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

const Products = (items) => {
  console.log(items.items)
  return (
    <Layout>
      {items.items.map(item => (
        <ProductCard item={item} key={item.itemID} />
      ))}
    </Layout>
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