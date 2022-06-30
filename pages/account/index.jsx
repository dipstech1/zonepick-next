/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Breadcrumb, Col, Row, Tab, Tabs } from "react-bootstrap";
import StarRatings from "react-star-ratings/build/star-ratings";
import { toast } from "react-toastify";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../services/axios.interceptor";

const MyAccount = () => {
  const router = useRouter();
  const [key, setKey] = useState("home");

  const [isLoaded, setIsLoaded] = useState(false);

  const [userId, setUserId] = useState(null);

  const [userData, setUserData] = useState({
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    email: "",
    name: "",
    aboutMe: "",
    phone: "",
    userId: "",
    avgSellerRating: 0,
    roletype: "",
    profile_image: "1.jpg",
  });

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async (userId) => {
    try {
      let resp = await axios.get(`profile/${userId}`);
      if (resp.data.length > 0) {
        setUserData({ ...resp.data[0] });
        setIsLoaded(true);
      }

      console.log(resp.data);
    } catch (error) {
      // console.log(error);
      setIsLoaded(false);
      toast.error("Fail");
    }
  };

  const onbuttonClick = (e) => {
    router.push("/account/edit-profile");
  };

  return (
    <>
      <Layout title="Profile Page" metaDescription={[{ name: "description", content: "Profile Page" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>My Account</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="My Details" enableButton={true} iconClass={"fa-pencil"} buttoClick={(e) => onbuttonClick(e)}>
            {isLoaded ? (
              <Row className="mt-4">
                <Col md={4} lg={3}>
                  <img className="m-auto mr-lg-auto profile_img" src={"/uploads/avator/" + userData.profile_image} alt="Profile Picture" />
                </Col>
                <Col md={8} lg={9}>
                  <Row>
                    <Col xs={12}>
                      <b className="fs-3">{userData.name}</b>
                    </Col>
                    <Col xs={12}>
                      <Badge className="badge-small">{userData?.roletype}</Badge>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col xs={12}>
                      {/*
                        <div className="d-inline-block">
                          <span style={{ marginTop: 10 }}>
                            Rating: <b>{userData?.avgSellerRating}</b>
                          </span>
                        </div>*/}
                      <div style={{ display: "inline-block", cursor: "pointer", marginTop: "-100px" }} className="ms-2">
                        <StarRatings
                          starDimension="17px"
                          rating={parseInt(userData?.avgSellerRating) | 0}
                          starRatedColor="#311b92"
                          numberOfStars={5}
                          name="ProductRating"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs={12} id={"editTabs"}>
                      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                        <Tab
                          eventKey="home"
                          title={
                            <span>
                              <i className="fa fa-address-card me-2" /> Contact
                            </span>
                          }
                        >
                          <div className="contact mt-2 ms-2">
                            <div className="d-block">
                              <i className="fa fa-location-dot me-3"></i> {userData.address1}
                            </div>
                            <div className="d-block">
                              <i className="fa fa-location-dot me-3"></i> {userData.address2}
                            </div>
                            <div className="d-block">
                              <i className="fa fa-location-dot me-3"></i> {userData.address3}
                            </div>
                            <div className="d-block">
                              <i className="fa fa-location-dot me-3"></i> {userData.address4}
                            </div>
                            <div className="d-block">
                              <i className="fa fa-phone me-3"></i> <Link href={"tel:" + userData.phone}>{userData.phone}</Link>
                            </div>

                            <div className="d-block">
                              <i className="fa fa-envelope me-3"></i>
                              <Link href={"mailto:info@emetacomm.com"}>{userData.email}</Link>
                            </div>
                          </div>
                        </Tab>
                        <Tab
                          eventKey="profile"
                          title={
                            <span>
                              <i className="fa fa-user-alt me-2" /> About Me
                            </span>
                          }
                        >
                          {userData.aboutMe}
                        </Tab>
                      </Tabs>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : null}
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(MyAccount, ["admin", "super-admin", "user"]);
