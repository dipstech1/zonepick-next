import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie, removeCookies } from "cookies-next";

const WithAuth = (Component, users = []) => {
  console.log(users);
  const WithAuthComponent = (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      let query = [];
      if (Router.query["productId"]) {
        query = Router.query["productId"];
      }

      const accessToken = getCookie("token");
      if (!accessToken) {
        if (Router.pathname === "/product/[...productId]") {
          const rurl = "/account/login?returnUrl=/product/" + query[0] + "/" + query[1];
          Router.replace(rurl);
        } else {
          Router.replace("/account/login?returnUrl=" + Router.pathname);
        }
      } else {
        const data = verifyToken();
        if (data.verified) {
          setVerified(data.verified);
        } else {
          removeCookies("token");

          if (Router.pathname === "/product/[...productId]") {
            const rurl = "/account/login?returnUrl=/product/" + query[0] + "/" + query[1];
            Router.replace(rurl);
          } else {
            Router.replace("/account/login?returnUrl=" + Router.pathname);
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Router]);

    const verifyToken = () => {
      const accessToken = getCookie("token");
      let isLoggedin = false;
      if (getCookie("Login") && accessToken) {
        isLoggedin = true;
      }

      return {
        verified: isLoggedin,
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
