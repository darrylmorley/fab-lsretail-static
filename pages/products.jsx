const setHeader = require('../api/lightspeed')
const lightspeedApi = "https://api.lightspeedapp.com/API";
const axios = require("axios");

import Product from '../components/Product'
import Cart from '../components/Cart'

const Products = (items) => {
  console.log(items.items)
    return (
      <div>
          <Cart />
          {items.items.map(item => (
              <Product title={item.description} price={item.Prices.ItemPrice[0].amount} key={item.itemID} />
          ))}
      </div>
    )
}

export async function getStaticProps() {
    const header = await setHeader()
    const accountID = process.env.ACCOUNT_ID
    const loadRelations = ["ItemShops", "Images", "CustomFieldValues"]
    
    try {
      const res = await axios({
        url: `${lightspeedApi}/Account/214742/Item.json?manufacturerID=168&load_relations=${JSON.stringify(
          loadRelations
        )}`,
        method: "get",
        headers: header,
      });
      
      const items = await res.data.Item
  
      return { props: {items} }
    } catch (error) {
      console.error("We have a problem here: ", error);
    }
  };

export default Products;