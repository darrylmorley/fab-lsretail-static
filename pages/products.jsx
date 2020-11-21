import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import { getCategories, getItems } from './api/lightspeed'
import { useState, useEffect } from 'react'

const Products = (props) => {
  const { Item } = props.items
  const { Category } = props.categories

  const [checkedInputs, setCheckedInputs] = useState({})

  const handleInputChange = (event) => {
    setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
  }

  useEffect(() => {
    console.log('Checked Inputs', checkedInputs)
  }, [checkedInputs])

  console.log(typeof Item)
  console.log(checkedInputs)

  return (
    <Layout>
      <div className="flex mx-96 mt-14">
        <div className="w-1/4">
          <ProductFilter category={Category} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
        </div>
        <div className="w-3/4">
          <div className="lg:grid grid-cols-3 gap-2 lg:my-12 lg:justify-center">
            {Item.map(item => {
              if (Object.keys(checkedInputs).length < 1 || Object.keys(checkedInputs).every(value => checkedInputs[value] === false)) {
                return <ProductCard item={item} key={item.itemID} />
              }
              for (const [key, value] of Object.entries(checkedInputs)) {
                if (value === true) {
                  if (item.categoryID === key) {
                    console.log(item)
                    return <ProductCard item={item} key={item.itemID} />
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const itemData = await getItems()
  const items = await itemData.data

  const categoriesToFetch = []

  const findCategories = items.Item.map(item => {
    categoriesToFetch.push(item.categoryID)
  })

  const categoryData = await getCategories(categoriesToFetch)
  const categories = await categoryData.data

  return {
    props: {
      items,
      categories
    }
  }
}

export default Products;