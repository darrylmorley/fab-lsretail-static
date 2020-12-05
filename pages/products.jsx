import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import { getCategories, getItems, getMatrixItems } from './api/lightspeed'
import { useState, useEffect } from 'react'

const Products = (props) => {
  const { singleItems } = props
  const { ItemMatrix } = props.matrixItems
  const { Category } = props.categories
  const items = [...singleItems, ...ItemMatrix]

  const [checkedCategories, setCheckedCategories] = useState({})

  const handleInputChange = (event) => {
    setCheckedCategories({ ...checkedCategories, [event.target.value]: event.target.checked })
  }

  useEffect(() => {
    console.log('Checked Categories', checkedCategories)
  }, [checkedCategories])

  return (
    <Layout>
      <div className="flex mx-60 mt-8">
        <div className="w-1/4">
          <CategoryFilter category={Category} handleInputChange={handleInputChange} checkedCategories={checkedCategories} />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-4 my-12 flex justify-center">
            {items.map(item => {
              if (Object.keys(checkedCategories).length < 1 || Object.keys(checkedCategories).every(value => checkedCategories[value] === false)) {
                return <ProductCard item={item} key={item.itemID ? item.itemID : item.itemMatrixID} />
              }
              for (const [key, value] of Object.entries(checkedCategories)) {
                if (value === true) {
                  if (item.categoryID === key) {
                    return <ProductCard item={item} key={item.itemID ? item.itemID : item.itemMatrixID} />
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
  // Get Item Data
  const itemData = await getItems()
  const items = await itemData.data

  // Get Matrix Items
  const matrixItemData = await getMatrixItems()
  const matrixItems = await matrixItemData.data

  // Filter Single Items
  let singleItems = []

  items.Item.map(item => {
    if (item.itemMatrixID == 0) {
      singleItems.push(item)
    }
  })

  // Get & Sort Category Data
  const categoriesToFetch = []

  const findCategories = items.Item.map(item => {
    categoriesToFetch.push(item.categoryID)
  })

  const categoryData = await getCategories(categoriesToFetch)
  const categories = await categoryData.data

  return {
    props: {
      singleItems,
      matrixItems,
      categories
    }
  }
}

export default Products;