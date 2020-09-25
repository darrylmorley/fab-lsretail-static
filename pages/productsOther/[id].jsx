import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import CheckoutForm from '../../components/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const axios = require("axios");
const setHeader = require('../../api/lightspeed')
const lightspeedApi = "https://api.lightspeedapp.com/API";
const stripePromise = loadStripe("pk_test_51HEammBp7A8OVVo2dKNGYHphBZZFkuY7Y1vDa8HyhZZbIWfJIDUErroCFFKjXycxpevmsuo9btCg7bJKpWpm2MSF00LWtktDET")

const Product = ({item}) => {
  return (
    <div>
      <Nav />
      <main>
        <img src={item.Images ? item.Images.Image.baseImageURL + 'w_250,h_250/' + item.Images.Image.publicID + '.png' : null} alt={item.description} />
        {item.description}
        <h1>{item.description}</h1>
        {/* <p>{item.CustomFieldValues.CustomFieldValue[0].value}</p> */}
        <p>£{item.Prices.ItemPrice[0].amount}</p>

        <button className="mt-4 p-2 border rounded">Add to Cart</button>
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
      url: `${lightspeedApi}/Account/214742/Item.json?manufacturerID=168`,
      method: "get",
      headers: header,
    });
    
    const items = await res.data.Item

    const paths = items.map(item => ({ 
      params: { id: item.itemID },
    }))

    console.log(paths)
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
      url: `${lightspeedApi}/Account/214742/Item/${params.id}.json?load_relations=${JSON.stringify(
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