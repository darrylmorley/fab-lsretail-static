import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'
const setHeader = require('../../api/lightspeed')
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
            const slug = item.description.toString().toLowerCase().replace(/ /g, '-')
            
            return (
              <Link href='/products/[id]' as={`/products/${item.itemID}`}>
              <div key={item.itemID} className="m-4 p-4 border">
                  <img src={item.Images ? item.Images.Image.baseImageURL + 'w_250,h_250/' + item.Images.Image.publicID + '.png' : null} />
                  <p>{item.description}</p>
                  <p>£{item.Prices.ItemPrice[0].amount}</p>
                  <p>{item.CustomFieldValues.CustomFieldValue[1].value}</p>
              </div>
              </Link>
            )
          })}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const header = await setHeader()
  const accountID = process.env.ACCOUNT_ID
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