import '../styles/custom-bootstrap.scss'
import '../styles/globals.css'
import '../styles/style.css'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  

  return (
    <>      
         
        <Component {...pageProps} />      
        <ToastContainer />  
    </> 
    
  )
}

export default MyApp
