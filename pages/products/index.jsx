import Layout from '../../components/Layout'
import ProductCard from '../../components/ProductCard'
import useSWR from 'swr'

const Products = () => {
  const { data, error } = useSWR('/api/items')

  console.log(data)

  if (error) return <div>Ther has been a problem! Try refreshing this page.</div>

  if (!data) return <div>Loading...</div>

  if (data) {
    const items = data.Item


    return (
      <Layout>
        <div className="lg:my-12 lg:flex lg:flex-wrap lg:justify-center">
          {items.map(item => (
            <ProductCard item={item} key={item.itemID} />
          ))}
        </div>
      </Layout>
    )
  }
}

export default Products;