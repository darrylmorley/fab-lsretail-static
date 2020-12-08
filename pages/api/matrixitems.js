import { getMatrixItems } from './lightspeed';

export default async (req, res) => {
  const data = await getMatrixItems()
  const response = await data

  res.json(response.data)
}