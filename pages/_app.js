import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'components/Navbar'
import { RouteGuard } from 'hoc/router.guard'
import { useRouter } from 'next/router'
import { getDataFromLocalstorage } from 'utils/storage.util'
import '../styles/globals.css'
import '../styles/sellerinfo.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
    {
      router.pathname.split("/").includes('account') ? null:<Navbar/>
    }
      
      <RouteGuard>
         <Component {...pageProps} />
      </RouteGuard>
    </>
  )
}

export default MyApp
