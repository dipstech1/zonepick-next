/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Button, Form, Tabs, Tab } from "react-bootstrap";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import { Flip, toast, ToastContainer } from "react-toastify";
import { getCookie } from "cookies-next";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";
import Select from 'react-select';
import { useFormik } from "formik";
import * as Yup from "yup";

const RewardPage = () => {
  const [userId, setUserId] = useState(null);
  let [orderHistory, setOrderHistory] = useState([]);
  let [span, setspan] = useState(2);
  const [totalRewards, setTotalRewards] = useState(0);
  const [redeemHistory, setRedeemHistory] = useState([]);

  const formik = useFormik({
    initialValues: {
      chainType: "",
      redeemRewardPoint: "",
    },
    validationSchema: Yup.object({
      chainType: Yup.string().required("Required"),
      redeemRewardPoint: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      onRedeemClick(values);
    }
  });

  const chainOptions = [
    {
      label: "ETH",
      value: "ETH",
    },
    {
      label: "BNB",
      value: "BNB",
    },
    {
      label: "POLYGON",
      value: "POLYGON"
    },
  ];

  useEffect(() => {

    getOrderedItems(span);
    getRedeemedItems();
  }, [span]);

  const getOrderedItems = async (span) => {
    const userId = getCookie("userid");
    try {
      let resp = await axios.post(`purchase/all`, { userid: userId, span: span });
      if (resp.data.data.length > 0) {
        const order = resp.data.data || [];
        const tempData = [];
        let total = 0;

        order.map((item) => {
          item.orderDate = common.monthYearTimeStamp(item.purchasedAt);
          total = total + parseFloat(item.purchaseTotalReward)
        });



        const result = order.reduce(function (r, a) {
          r[a.orderDate] = r[a.orderDate] || [];
          r[a.orderDate].push(a);
          return r;
        }, Object.create(null));

        const keys = Object.keys(result);

        keys.forEach((item) => {
          tempData.push({
            orderDate: item,
            order: result[item],
          });
        });

        // setTotalRewards(total);

        setOrderHistory(tempData);

        /* order.forEach((item) => {
          tempData.push({
            orderDate: common.monthYearTimeStamp(item.purchasedAt),
            orderId: item.transactionId,
            transactions: item.transactions,
          });
        });*/

        // setOrderHistory(order);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getRedeemedItems = async () => {
    const userId = getCookie("userid");
    try {
      let resp = await axios.get(`profile/${userId}`);
      if (resp.data.length > 0) {
        setRedeemHistory(resp.data[0]?.RewardRedeems);
        setTotalRewards(resp.data[0].rewardPoints);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onRedeemClick = async (sendData) => {
    const userId = getCookie("userid");

    try {
      let resp = await axios.post(`profile/redeem/${userId}`, sendData);
      if (resp.status === 201) {
        toast.success(`Congratulations! ${formik.values.redeemRewardPoint} Points Redeemed`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            transition: Flip,
          });
        getRedeemedItems();
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Try To Redeem Lesser Points");
    }
  };

  const onTabChange = () => {
    getRedeemedItems();
    getOrderedItems(span);
  };

  const group = (arr) => { };

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
            <div className="rw_heder row m-0 mb-3">
              <h1>
                <span>Total</span> <span className="fw-bold">{totalRewards}</span> <span>Points</span>
              </h1>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        name="redeemRewardPoint"
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter Points"
                        value={formik.values.redeemRewardPoint}
                        onChange={formik.handleChange}
                        className={formik.touched.redeemRewardPoint && formik.errors.redeemRewardPoint ? "is-invalid" : ""}
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.redeemRewardPoint}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={4} className="mb-2">
                    <Select
                      name="chainType"
                      menuPlacement="bottom"
                      options={chainOptions}
                      placeholder="Select Chain Type"
                      onChange={(selectedOption) => {
                        formik.setFieldValue("chainType", selectedOption.value);
                      }}
                      className={formik.touched.chainType && formik.errors.chainType ? "is-invalid" : ""}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.chainType}</Form.Control.Feedback>
                  </Col>
                  <Col lg={5} >
                    <Button type="submit" size="md">Redeem</Button>
                  </Col>
                </Row>
              </Form>
              <div>
              </div>
            </div>
            <div id="editTabs" className="py-3 px-5">
              <Tabs defaultActiveKey="RewardEarningHistory" onSelect={onTabChange} id="uncontrolled-tab" className="mb-3 nav-fill">
                <Tab eventKey="RewardEarningHistory" title={"Reward Earning History"}>
                  <Row className="ms-1 me-1">
                    {/* <Col md={12} className="mb-2 bg-blue-100 pt-1 pb-1 fw-bold" style={{ borderRadius: "5px" }}>
                    Reward Earning History:
                  </Col> */}

                    {orderHistory.length
                      ? orderHistory.map((data, i) => {
                        return (
                          <Row key={i} >
                            <Col
                              md={12}
                              className="mb-2 ms-2 bg-green-100 pt-1 pb-1 ps-2 fw-bold"
                              style={{ borderRadius: "5px" }}
                            >
                              {data.orderDate}
                            </Col>
                            <Col md={12} className="mb-2 ms-3">
                              {data.order.map((order, j) => {
                                return (
                                  <Card className="shadow-sm mb-2" key={j}>
                                    <Card.Body>
                                      <div className="block mb-1">
                                        <b>Order Id: </b> {order.transactionId}
                                      </div>

                                      <div className="inline-block mb-1">
                                        <span className="me-1">
                                          <b>Reward Point: </b> {order.purchaseTotalReward}
                                        </span>
                                        [
                                        {order.transactions.map((data, k) => {
                                          return (
                                            <span className="inline-block ms-1" key={k}>
                                              {data.productItemReward} {k + 1 >= order.transactions.length ? null : " + "}
                                            </span>
                                          );
                                        })}
                                        ]
                                      </div>
                                      <div className="block mb-1">
                                        <b>Order Date: </b> {common.DateFromTimeStamp(order.purchasedAt)}
                                      </div>
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            </Col>
                          </Row>
                        );
                      })
                      : null}
                  </Row>
                </Tab>
                <Tab eventKey="RewardRedeemHistory" title={"Reward Redeem History"}>
                  <Row className="ms-1 me-1">
                    {/* <Col md={12} className="mb-2 bg-blue-100 pt-1 pb-1 fw-bold" style={{ borderRadius: "5px" }}>
                    Reward Redeem History:
                  </Col> */}
                    {redeemHistory.length
                      ? redeemHistory.map((data, i) => {
                        return (
                          <Row key={i} >
                            <Col
                              md={12}
                              className="mb-1 bg-green-100 pt-1 pb-1 ps-2 fw-bold"
                              style={{ borderRadius: "5px" }}
                            >
                              {common.DateFromTimeStamp(data.redeemDate)}
                            </Col>
                            <Card className="shadow-sm mb-3" >
                              <Card.Body>
                                <div className="block mb-1">
                                  <b>Transaction Id: </b> {data.transactionId}
                                </div>

                                <div className="inline-block mb-1">
                                  <span className="me-1">
                                    <b>Redeem Reward Point: </b> {data.redeemRewardPoint}
                                  </span>
                                </div>
                                <div className="block mb-1">
                                  <b>Current Reward Point: </b> {data.currentRewardPoint}
                                </div>
                                <div className="block mb-1">
                                  <b>Chain Type: </b> {data.chainType}
                                </div>
                                <div className="block mb-1">
                                  <b>Token: </b> {data.token}
                                </div>
                                <div className="block mb-1">
                                  <b>To Address: </b> {data.toAddress}
                                </div>
                              </Card.Body>
                            </Card>
                          </Row>
                        );
                      })
                      : null}
                  </Row>
                </Tab>
              </Tabs>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(RewardPage);
