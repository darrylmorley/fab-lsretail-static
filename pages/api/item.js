import { getItem } from './lightspeed';

export default async (req, res) => {
  const { itemID } = req.query
  const response = await getItem(itemID)

  res.json(response.data)
}