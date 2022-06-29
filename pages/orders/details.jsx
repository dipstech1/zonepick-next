/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import WithAuth from "../../components/withAuth";
import common from "../../services/commonService";

const OrderDetails = () => {
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    setOrderInfo(JSON.parse(sessionStorage.getItem("OrderDetails")));

    //console.log(JSON.parse(sessionStorage.getItem("OrderDetails")));

    //console.log(orderInfo);
  }, []);

  return (
    <>
      <Layout title="Orders" metaDescription={[{ name: "description", content: "Profile Page" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/orders" passHref>
              <Breadcrumb.Item>My Orders</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Orders Details</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title={"Orders Details"} activeLink={4} enableBack={true}>
            <Row>
              <Col>
                <Card className="shadow-sm">
                  <Card.Body className="p-0">
                    {
                      <Row>
                        <Col md={3}>
                          <img
                            src={"/uploads/product/" + orderInfo?.orderDetails?.product.images[0].url}
                            className="img-responsive-1 w-100"
                            alt="dd"
                          />
                        </Col>
                        <Col md={9}>
                          <div className="p-2">
                            <Row>
                              <Col md={12}>
                                <Row>
                                  <Col>
                                    <b>{orderInfo?.orderDetails?.product.name}</b>
                                  </Col>
                                  <Col>
                                    <span className="float-end">
                                      <b>Order Date: </b> {common.DateFromTimeStamp(orderInfo?.transactionDetails?.purchase_date)}
                                    </span>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col md={8}>
                                    <b>Order Id: </b> {orderInfo?.transactionDetails?.transactionId}
                                  </Col>
                                </Row>

                                <Row className="mt-2">
                                  <Col>
                                    <b>Brand : </b>
                                    <span>{orderInfo?.orderDetails?.product?.brand}</span>
                                  </Col>
                                  <Col>
                                    <div className="float-end">
                                      <b>Price : </b>
                                      <span>
                                        {orderInfo?.orderDetails?.price.toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                        })}
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col>
                                    <b>Description : </b> {orderInfo?.orderDetails?.product?.description}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col>
                        <b>Seller Name:</b> {orderInfo?.orderDetails?.seller_details?.name}
                      </Col>
                      <Col>
                        <b>Phone:</b> {orderInfo?.orderDetails?.seller_details?.phone}
                      </Col>
                      <Col>
                        <b>Email:</b> {orderInfo?.orderDetails?.seller_details?.email}
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <b>Address:</b> {orderInfo?.orderDetails?.seller_details?.address1}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Card>
                  <Card.Body>
                    <Row className="mt-3">
                      <Col>
                        <div className="wraper">
                          <ul className="link-container">
                          <li className="link">
                              <a >Order Initiated</a>
                            </li>
                            <li className="link">
                              <a >Order Confirmed</a>
                            </li>
                            <li className="link">
                              <a>Packed</a>
                            </li>
                            <li className="link">
                              <a>Shipped</a>
                            </li>
                            <li className="link active">
                              <a>Out For Delivery</a>
                            </li>
                            <li className="link">
                              <a >Delivered</a>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};

export default WithAuth(OrderDetails);
