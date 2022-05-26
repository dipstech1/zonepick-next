import Head from 'next/head';
import { useEffect } from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({
  children,
  title = 'This is the default title',
  showNav = true,
  showFooter = true,
}) => {
  

  useEffect(() => {
    
  }, []);


  return (
    <>
       <div>
          <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="description" content="e commerce" />
            <meta name="keywords" content="Sell, Lend, Photo Sell, Prouct sell, Buy , Rent" />
            <meta name="author" content="John Doe" />
          </Head>
          {showNav === true ? (
            <header>
              <Navbar></Navbar>
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
