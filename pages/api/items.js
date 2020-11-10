import { getItems } from './lightspeed';

export default async (req, res) => {
  const response = await getItems()

  res.json(response.data)
}