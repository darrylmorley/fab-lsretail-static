import { useState, useEffect } from 'react'

const ProductFilter = (props) => {

  const { category, handleInputChange, checkedInputs } = props

  return (
    <div className="text-black my-24">
      <h4 className="p-2 border-b-2 border-r-2 font-bold">Filter By</h4>
      <div className="p-2 border-r-2">
        <h5 className="mb-2">Category</h5>
        {category.map(cat => {
          return (
            <div>
              <input type="checkbox" id={cat.categoryID} value={cat.categoryID} checked={checkedInputs[cat.name]} onChange={handleInputChange} />
              <label key={cat.categoryID} className="ml-2" htmlFor={cat.categoryID}>{cat.name}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductFilter