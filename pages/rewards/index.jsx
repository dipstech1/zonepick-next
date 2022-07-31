/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";

const RewardPage = () => {

  const [userId, setUserId] = useState(null);
  let [orderHistory, setOrderHistory] = useState([]);
  const [span, setSpan] = useState(2);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getOrderedItems(userId, span);
  }, [span]);

  const getOrderedItems = async (userId, span) => {
    try {
      let resp = await axios.post(`purchase/all`, { userid: userId, span: span });
      if (resp.data.data.length > 0) {
        setOrderHistory(resp.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };


  return (
    <>
      <Layout title="Rewards" metaDescription={[{ name: "description", content: "Rewards Page" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Rewards</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Rewards" activeLink={2}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
              <h4>Page Under Construction</h4>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(RewardPage);
