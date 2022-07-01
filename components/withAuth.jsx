import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie, removeCookies } from 'cookies-next';

const WithAuth = (Component, users = []) => {
  console.log(users);
  const WithAuthComponent = (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = getCookie('token');      
      if (!accessToken) {
        if(Router.pathname === '/product/[...productId]'){
          Router.replace('/account/login?returnUrl=/product');
        } else {
          Router.replace('/account/login?returnUrl=' + Router.pathname);
        }
        
      } else {        
        const data = verifyToken();        
        if (data.verified) {
          setVerified(data.verified);
        } else {          
          removeCookies('token');

          Router.replace('/account/login?returnUrl=' + Router.pathname);
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verifyToken = () => {
      const accessToken = getCookie('token');
      let isLoggedin = false;
      if (getCookie('Login') && accessToken) {
        isLoggedin = true;
      }

      return {
        verified: isLoggedin
      };
    };

    if (verified) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
  return WithAuthComponent;
};

export default WithAuth;
