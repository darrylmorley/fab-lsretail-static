import { getDelivery } from './lightspeed';

export default async (req, res) => {
  const response = await getDelivery()

  res.json(response.data)
}