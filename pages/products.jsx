import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

const Products = (items) => {
  return (
    <Layout>
      <div className="lg:my-12 lg:flex lg:flex-wrap lg:justify-center">
        {items.items.map(item => (
          <ProductCard item={item} key={item.itemID} />
        ))}
      </div>
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