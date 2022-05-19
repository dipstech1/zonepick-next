/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {  getCookie } from 'cookies-next';

const withAuthWraper = (WrappedComponent, users = []) => {
  console.log(users);
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      // if no accessToken was found,then we redirect to "/" page.
      if (!accessToken) {
        Router.replace('/account/login');
      } else {
        // we call the api that verifies the token.
        const data = verifyToken();
        // if token was verified we set the state.
        if (data.verified) {
          setVerified(data.verified);
        } else {
          // If the token was fraud we first remove it from localStorage and then redirect to "/"
          localStorage.removeItem('token');
          Router.replace('/');
        }
      }
    }, []);

    const verifyToken = () => {

      const accessToken = localStorage.getItem('token');
  
      let isLoggedin = false;
      if (getCookie('Login') && accessToken) {
          isLoggedin = true;
      }
  
  
  
      return {
          verified: isLoggedin
      }
  }



    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuthWraper;
