import { createSale } from './lightspeed';

export default async (req, res) => {
  const response = await createSale(saleData)

  res.json(response.data)
}