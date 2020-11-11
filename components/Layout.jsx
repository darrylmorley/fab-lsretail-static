import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <>
      <Nav />
      <div>
        {props.children}
      </div>
      <Footer />
    </>
  )
}

export default Layout