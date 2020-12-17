import { useState, useEffect } from 'react'

const CategoryFilter = (props) => {

  const { category, handleInputChange, checkedCategories } = props

  return (
    <div className="mt-4 bg-fabred text-white p-4 rounded-r-lg lg:bg-white lg:text-black lg:my-16">
      <h4 className="hidden lg:p-2 lg:border-b-2 lg:border-r-2 lg:font-bold">Filter By</h4>
      <div className="lg:p-2 lg:border-r-2">
        <h5 className="mb-2 font-bold text-lg">Category</h5>
        {category.map(cat => {
          return (
            <div key={cat.categoryID} className="p-2 lg:p-0" >
              <input type="checkbox" id={cat.categoryID} value={cat.categoryID} checked={checkedCategories[cat.name]} onChange={handleInputChange} />
              <label key={cat.categoryID} className="ml-2 lg:hover:fabred" htmlFor={cat.categoryID}>{cat.name}</label>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default CategoryFilter