import Navbar from 'components/Navbar'
import { RouteGuard } from 'hoc/router.guard'
import { useRouter } from 'next/router'
import { getDataFromLocalstorage } from 'utils/storage.util'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>

      {
        router.pathname.split("/").includes('account') ? null : <Navbar />
      }

      <RouteGuard>
         <ToastContainer position='top-center'/>
          <Component {...pageProps} />
      </RouteGuard>

    </>
  )
}

export default MyApp
