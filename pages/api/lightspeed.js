import axios from 'axios'
import refreshToken from './refreshToken'


async function getHeader() {
  let token = await refreshToken()

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header
  }

  return axiosConfig
}

export async function getItems() {
  let axiosConfig = await getHeader()
  return axios.get(`Item.json?manufacturerID=168&load_relations=["Category", "Images", "ItemShops", "CustomFieldValues"]`, axiosConfig).catch(err => console.error(err.data))
}

export async function getItem(itemID) {
  let axiosConfig = await getHeader()
  return axios.get(`Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "CustomFieldValues", "ItemECommerce"]`, axiosConfig).catch(err => console.error(err.data))
}

export async function createSale(newSale) {
  let axiosConfig = await getHeader()
  return axios.post(`Sale.json`, newSale, axiosConfig).catch(error => console.error(error.data).then(res => { return res })).catch(err => console.error(err.data))
}

export async function getCategories(categoryID) {
  let axiosConfig = await getHeader()
  return axios.get(`Category.json?categoryID=IN,${categoryID}`, axiosConfig).catch(err => console.error(err.data))
}