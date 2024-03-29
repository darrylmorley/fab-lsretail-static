import { getDelivery, getItems } from './lightspeed'

export async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function fetchPostJSON(url, data) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

export async function getInventory() {
  const res = await getItems()
  const data = await res.data

  const items = data.Item

  const resDel = await getDelivery()
  const dataDel = await resDel.data
  items.push(dataDel.Item)

  const products = items.map(item => {
    return (
      {
        "name": item.description,
        "sku": item.customSku,
        "price": item.Prices.ItemPrice[0].amount.replace('.', ''),
        "image": item.Images ? `${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg` : null,
        "currency": 'GBP'
      }
    )
  })
  return products
}