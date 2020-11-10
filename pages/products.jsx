import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import Cart from '../components/Cart'
import Image from 'next/image'

const Products = (items) => {
  console.log(items.items)
  return (
    <Layout>
      <Cart />
      {items.items.map(item => (
        <ProductCard item={item} />
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