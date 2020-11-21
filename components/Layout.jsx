import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow">
        {props.children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout