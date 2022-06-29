/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../services/axios.interceptor";
import common from "../../services/commonService";

const AddressBook = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    // getAddressBook(userId);
  }, []);

  const getAddressBook = async (userId) => {
    try {
      let resp = await axios.get(`address/${userId}`);
      if (resp.data.length > 0) {
        setAddressList(resp.data);
      }
      // console.log(getData);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const removeWishListItem = async (item, ref = "") => {
    console.log(item);

    try {
      let res = await axios.delete(`address/${item?.addressId}`);
      if (res.data.acknowledge == true) {
        getAddressBook(userId);
        if (ref === "") {
          toast.success("Address Removed");
        }
      } else {
        toast.warning("Fail");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const addAddress = async (data) => {
    const sendData = {
      userid: userId,
      recordId: data.productId[0].recordId,
      ordered_quantity: 1,
      purpose: "Purchase",
    };

    try {
      let added = await axios.post("address", sendData);

      if (added.data.acknowledge) {
        removeWishListItem(data, "cart");
        toast.success("Address added");
      } else {
        toast.warning("Fail");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  return (
    <>
      <Layout title="Addressbook" metaDescription={[{ name: "description", content: "Address Book" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Addressbook</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Addressbook" activeLink={6}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
              <h4>Page Under Construction</h4>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddressBook);
