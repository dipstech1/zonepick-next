/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Button } from "react-bootstrap";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";
import Select from 'react-select'

const RewardPage = () => {
  const [userId, setUserId] = useState(null);
  let [orderHistory, setOrderHistory] = useState([]);
  let [span, setspan] = useState(2);
  const [totalRewards, setTotalRewards] = useState(0);
  const [chainType, setChainType] = useState("");

  const chainOptions = [
    {
      label: "ETH",
      value: "ETH",
    },
    {
      label: "PNB",
      value: "PNB",
    },
  ]

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getOrderedItems(userId, span);
  }, [span]);

  const getOrderedItems = async (userId, span) => {
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

        setTotalRewards(total);

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

  const onRedeemClick = async () => {
    const sendData = {
      redeemRewardPoint: 100,
      chainType: chainType,
    }
    try {
      let resp = await axios.post(`profile/redeem/${userId}`, sendData);
      if (resp.status === 201) {
        toast.success(`100 Points Redeemed`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
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
              <Row>
                <Col></Col>
                <Col lg={4} className="mb-2">
                  <Select
                    menuPlacement="bottom"
                    options={chainOptions}
                    placeholder="Select Chain Type"
                    onChange={(selectedOption) => {
                      setChainType(selectedOption.value);
                    }}
                  />
                </Col>
                <Col lg={5} >
                  <Button onClick={onRedeemClick} size="md">Redeem</Button>
                </Col>
              </Row>
              <div>
              </div>
            </div>

            <Row className="ms-1 me-1">
              <Col md={12} className="mb-2 bg-blue-100 pt-1 pb-1 fw-bold" style={{ borderRadius: "5px" }}>
                Reward History:
              </Col>

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
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(RewardPage);
