/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";

const Orders = () => {
  const router = useRouter();

  const [span, setSpan] = useState(2);

  const [userId, setUserId] = useState(null);
  let [orderHistory, setOrderHistory] = useState([]);
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

  const goToProductDetails = (orderData) => {
    console.log("orderData ", orderData);
    router.push(`product/${orderData.productId[0].ParentId}/${orderData.productId[0].recordId}`);
  };

  const openOrderDetails = (orderInfo, order) => {
    const orderdetails = {
      orderDetails: { ...order?.productId[0] },
      transactionDetails: { transactionId: orderInfo.transactionId, purchase_date: orderInfo.purchase_date },
    };

    sessionStorage.setItem("OrderDetails", JSON.stringify(orderdetails));
    router.push("/orders/details");
  };

  const openRatingPage = (orderInfo, order) => {
    const orderdetails = {
      orderDetails: { ...order?.productId[0] },
      transactionDetails: { transactionId: orderInfo.transactionId, purchase_date: orderInfo.purchase_date },
      userData: { userId: userId },
    };

    sessionStorage.setItem("OrderDetails", JSON.stringify(orderdetails));
    router.push("/orders/rating");
  };

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
            <Breadcrumb.Item active>My Orders</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="My Orders" activeLink={4}>
            <Row>
              <Col>
                {orderHistory.length ? (
                  orderHistory.map((order, ix) => {
                    return order.transactions.map((data, i) => {
                      return (
                        <Row key={i} className="mt-2 mb-3 ">
                          <Col>
                            <Card className="product-row">
                              <Card.Body className="p-0">
                                <Row>
                                  <Col md={3} lg={2}>
                                    <img
                                      src={"/uploads/product/" + data?.productId[0].product.images[0].url}
                                      className="img-responsive-1 w-100"
                                      alt="dd"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Col>
                                  <Col md={9} lg={10}>
                                    <div className="p-2">
                                      <Row>
                                        <Col md={7} style={{ cursor: "pointer" }}>
                                          <span className="d-inline-bloc" onClick={(e) => goToProductDetails(data)}>
                                            <b style={{ cursor: "pointer" }}>{data?.productId[0]?.product.name}</b>
                                          </span>
                                          <span className="float-end d-inline-block" onClick={(e) => goToProductDetails(data)}>
                                            <span>
                                              {common.getCurrencyWithFormat(data?.productId[0]?.price)}
                                            </span>
                                          </span>
                                          <div onClick={(e) => openOrderDetails(order, data)}>
                                            <div>
                                              <span
                                                className={["badge  badge-small", common.calculateAvgRating(data?.productId[0]).className].join(" ")}
                                              >
                                                <i className="fa fa-star"></i> {common.calculateAvgRating(data?.productId[0]).rating}
                                              </span>
                                              <span className="ms-2 text-muted">
                                                <small>({data?.productId[0]?.countOfPeopleVoted})</small>
                                              </span>
                                            </div> 
                                            <div className="d-block text-muted">Brand: {data?.productId[0]?.product?.brand}</div>
                                            <div className="d-block text-muted">Seller: {data?.productId[0]?.sellerDetails?.name}</div>
                                          </div>
                                        </Col>
                                        <Col md={5}>
                                          <div className="d-block mt-1">
                                            <b className="text-deep-purple-800 small">
                                              <i className="fas fa-box text-deep-purple-800 me-2"></i> Ordered On &nbsp;
                                              {common.DateFromTimeStamp(order.purchase_date)}
                                            </b>
                                          </div>
                                          <div className="d-block mt-3 small">
                                            <b className="text-success">
                                              <i className="fas fa-circle text-success"></i> Delivered on {common.delivarytatus(order.purchase_date)}
                                            </b>
                                          </div>
                                          <div
                                            className="d-block mt-3 small"
                                            onClick={(e) => openRatingPage(order, data)}
                                            style={{ cursor: "pointer" }}
                                          >
                                            <b className="text-primary">
                                              <i className="fas fa-star text-primary me-2"></i> Rate &amp; Review Product
                                            </b>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      );
                    });
                  })
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(Orders);
