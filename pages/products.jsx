import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import useSWR from 'swr'

const Products = () => {
  const { data, error } = useSWR('/api/items')

  console.log(data)

  if (error) return (
    <Layout>
      <div>There has been a problem! Please try refreshing this page.</div>
    </Layout>
  )

  if (!data) return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  )

  if (data) {
    const items = data.Item

    return (
      <Layout>
        <div className="lg:grid grid-cols-3 gap-2 lg:my-12 lg:justify-center">
          {items.map(item => (
            <ProductCard item={item} key={item.itemID} />
          ))}
        </div>
      </Layout>
    )
  }
}

export default Products;