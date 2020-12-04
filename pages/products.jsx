import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import { getCategories, getItems, getMatrixItems } from './api/lightspeed'
import { useState, useEffect } from 'react'
import { isStyledComponent } from 'styled-components'

const Products = (props) => {
  const { singleItems } = props
  const { ItemMatrix } = props.matrixItems
  const { Category } = props.categories
  const items = [...singleItems, ...ItemMatrix]

  console.log('All Items', items)

  const [checkedInputs, setCheckedInputs] = useState({})

  const handleInputChange = (event) => {
    setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
  }

  useEffect(() => {
    console.log('Checked Inputs', checkedInputs)
  }, [checkedInputs])

  return (
    <Layout>
      <div className="flex mx-60 mt-8">
        <div className="w-1/4">
          <ProductFilter category={Category} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-4 my-12 flex justify-center">
            {items.map(item => {
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