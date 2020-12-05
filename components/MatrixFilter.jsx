import { useState, useEffect } from 'react'

const MatrixFilter = (props) => {
  const { item, handleInputChange, checkedInputs } = props

  return (
    <div className="my-6">
      <h5 className="mb-2 font-bold">Options</h5>
      <label htmlFor=""></label>
      <select name="options" id="options" className="border-2 border-black rounded" onChange={handleInputChange}>
        {item.Items.Item.map(item => {
          return (
            <option value={item.itemID} className="text-sm" onSelect={checkedInputs[item.itemID]} >{item.description.split(' ').pop()}</option>
          )
        })}
      </select>
      {/* // <select type="select" id={item.itemID} name="options" value={item.itemID} checked={checkedInputs[item.itemID]} onChange={handleInputChange} />
            // <label key={item.itemID} className="ml-2 hover:fabred" htmlFor={item.itemID} className="mx-1 text-sm font-medium">{item.description.split(' ').pop()}</label> */}
    </div>
  )
}

export default MatrixFilter