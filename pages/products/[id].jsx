import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
const setHeader = require('../../lib/api/lightspeed')
const lightspeedApi = "https://api.lightspeedapp.com/API";
const axios = require("axios");

const Product = ({item}) => {
  return (
    <div>
      <Nav />
      <main>
        <img src={item.Images ? item.Images.Image.baseImageURL + 'w_250,h_250/' + item.Images.Image.publicID + '.png' : null} alt={item.description} />
        {item.description}
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticPaths() {
  const header = await setHeader()
  const accountID = process.env.ACCOUNT_ID
  
  try {
    const res = await axios({
      url: `${lightspeedApi}/Account/${accountID}/Item.json?manufacturerID=55`,
      method: "get",
      headers: header,
    });
    
    const items = await res.data.Item

    const paths = items.map(item => (
      { params: { id: item.itemID }}
    ))

    return {paths, fallback: false}
  } catch(err) {
    console.error(err)
  }
}

export async function getStaticProps({ params }) {
  const header = await setHeader()
  const accountID = process.env.ACCOUNT_ID
  const loadRelations = ["ItemShops", "Images", "CustomFieldValues"]
  
  try {
    const res = await axios({
      url: `${lightspeedApi}/Account/${accountID}/Item/${params.id}.json?load_relations=${JSON.stringify(
        loadRelations
      )}`,
      method: "get",
      headers: header,
    });
    
    const item = await res.data.Item

    return { props: {item} }
  } catch (error) {
    console.error("We have a problem here: ", error);
  }
};

export default Product