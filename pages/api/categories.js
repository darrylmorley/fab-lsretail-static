import { getCategories } from './lightspeed';

export default async (req, res) => {
  const response = await getCategories(catID)

  res.json(response.data)
}