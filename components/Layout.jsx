import Nav from './Nav'
import Footer from './Footer'
import { AppProvider } from '../components/context/AppContext'

const Layout = (props) => {
  return (
    <AppProvider>
      <Nav />
      <div>
        {props.children}
      </div>
      <Footer />
    </AppProvider>
  )
}

export default Layout