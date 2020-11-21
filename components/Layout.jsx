import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div>
      <Nav />
      <div>
        {props.children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout