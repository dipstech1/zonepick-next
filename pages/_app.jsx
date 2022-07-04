import { SSRProvider } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "../styles/custom-bootstrap.scss";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import GlobalContext from "../utils/global-context";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("@egjs/view360");
    import("bootstrap/dist/js/bootstrap");
  
  }, []);
  const [state, setState] = useState({
    data: [],
    update,
  });

  function update(data) {
    setState(Object.assign({}, state, data));
  }


  return (
    <SSRProvider>
      <GlobalContext.Provider value={state}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
      <ToastContainer />
    </SSRProvider>
  );
}

export default MyApp;
