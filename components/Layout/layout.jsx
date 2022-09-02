import { getCookie } from "cookies-next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "./footer";
import Navbars from "./navbar";

const Layout = ({ children, title = "This is the default title", showNav = true, cartCount = 0, showFooter = true, metaDescription = [] }) => {
  const [cartPending, setCartPending] = useState(0);

  useEffect(() => {
    setCartPending(getCookie("Cart"));
  }, [cartCount]);

  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="ecommerce westite , You can buy & sell or Rent Product" />
          <meta name="keywords" content="Sell, Lend, Photo Sell, Prouct sell, Buy , Rent" />
          <meta name="author" content="Swarup Mukherjee" />
          {metaDescription.length > 0 &&
            metaDescription.map((itm, i) => {
              return <meta name={itm?.name} content={itm?.content} key={i} />;
            })}
        </Head>
        {showNav === true ? (
          <header>
            <Navbars cartPending={cartPending}></Navbars>
          </header>
        ) : null}
        <div>{children}</div>
        {showFooter === true ? (
          <footer>
            <Footer></Footer>
          </footer>
        ) : null}
      </div>
    </>
  );
};

export default Layout;
