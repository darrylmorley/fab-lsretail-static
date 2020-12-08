import { getItems, getMatrixItems } from './lightspeed';

export default async (req, res) => {
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

  matrixItems.ItemMatrix.map(item => {
    singleItems.push(item)
  })

  res.json(singleItems)
}