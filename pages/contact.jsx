import Layout from '../components/Layout'

const Contact = () => {
  return (
    <Layout>
      <main className="my-12 mx-96 px-40">
        <h2 className="mb-4 font-bold text-2xl">Contact Us</h2>
        <p>Tel: 01527831261</p>
        <p>Email: info@shootingsuppliesltd.co.uk</p>
        <p>Address: 38, Sherwood Road, Bromsgrove, B60 3DR</p>
        <hr className="my-4" />
        <h3 className="mb-4 font-bold text-2xl">Opening Times</h3>
        <p>Mon: Closed</p>
        <p>Tue: 09:00 - 17:30</p>
        <p>Wed: 09:00 - 17:30</p>
        <p>Thu: 09:00 - 17:30</p>
        <p>Fri: 09:00 - 19:00</p>
        <p>Sat: 09:00 - 17:30</p>
        <p>Sun: Closed</p>
      </main>
    </Layout>
  )
}

export default Contact