import { getCookie } from 'cookies-next';
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

export default verifyToken;
