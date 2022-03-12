import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'components/Navbar'
import { RouteGuard,a } from 'hoc/router.guard'
import { getDataFromLocalstorage } from 'utils/storage.util'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar/>
      <RouteGuard>
         <Component {...pageProps} />
      </RouteGuard>
    </>
  )
}

export default MyApp
