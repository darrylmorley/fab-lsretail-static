import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
const {
  refreshToken,
  getAccountID,
} = require("../../lib/api/lightspeed");
const lightspeedApi = "https://api.lightspeedapp.com/API";
const axios = require("axios");

const Products = ({items}) => {
  console.log(items)
  return (
    <div>
      <Nav />
      <main>
        <ul>
          {items.map((item) => { 
            return (
              <div key={item.itemID}>
                {/* <li>{item.Images[0].Image}</li> */}
                <li>{item.description}</li>
                <li>£{item.Prices.ItemPrice[0].amount}</li>
                <p>{item.CustomFieldValues.CustomFieldValue[1].value}</p>
              </div>
            )
          })}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const setHeader = async () => {
    const token = await refreshToken()
    const header = {
      Authorization: `Bearer ${token}`
    }
    return header
  }

  const header = await setHeader()
  const accountID = await getAccountID()
  const loadRelations = ["ItemShops", "Images", "CustomFieldValues"]
  
  try {
    const res = await axios({
      url: `${lightspeedApi}/Account/${accountID}/Item.json?manufacturerID=55&load_relations=${JSON.stringify(
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

export default Products