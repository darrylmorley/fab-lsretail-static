import { useState, useEffect } from 'react'

const CategoryFilter = (props) => {

  const { category, handleInputChange, checkedCategories } = props

  return (
    <div className="text-black my-16">
      <h4 className="p-2 border-b-2 border-r-2 font-bold">Filter By</h4>
      <div className="p-2 border-r-2">
        <h5 className="mb-2">Category</h5>
        {category.map(cat => {
          return (
            <div key={cat.categoryID}>
              <input type="checkbox" id={cat.categoryID} value={cat.categoryID} checked={checkedCategories[cat.name]} onChange={handleInputChange} />
              <label key={cat.categoryID} className="ml-2 hover:fabred" htmlFor={cat.categoryID} className="text-sm hover:text-fabred ml-1">{cat.name}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter