import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDataFromLocalstorage } from "utils/storage.util";

const authPage = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
      const accessToken = getDataFromLocalstorage('token')
      if (!accessToken) {
        Router.replace("/account/login");
      } else {
        // const data = await verifyToken(accessToken);
        // if (data.verified) {
        //   setVerified(data.verified);
        // } else {
        //   localStorage.removeItem("accessToken");
        //   Router.replace("/");
        // }
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default authPage;