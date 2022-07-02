/* eslint-disable @next/next/no-img-element */
import { getCookie, setCookies } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Form, ListGroup, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/layout";
import CryptoPaymentButton from "../../components/payment-button/cryptoPayment";
import PaymentButton from "../../components/payment-button/paymentButton";
import QuantityChanger from "../../components/quantity";
import WithAuth from "../../components/withAuth";
import axios from "../../services/axios.interceptor";

import common from "../../services/commonService";

const Cart = () => {
  const [cartPending, setCartPending] = useState(0);

  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("pay-1");

  const [addressIndex, setAddressIndex] = useState(1);

  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  let [tax, SetTax] = useState(5);

  let [shippingCharge, SetShippingCharge] = useState(15);
  let [purchasableData, setPurchaseData] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getCartItems(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCartItems = async (userId) => {
    try {
      let resp = await axios.get(`cart/${userId}`);
      if (resp && resp.data.data && resp.data.data.length > 0) {
        setCartItemData(resp.data.data);
        setTotalPriceData(resp.data.data);
        setCartPending(resp.data?.count);
        setCookies("Cart", resp.data?.count, { maxAge: 60 * 30 });
      }

      console.log(resp.data);
    } catch (error) {
      console.log(error);
      setIsLoaded(false);
      toast.error("Fail");
    }
  };

  const setCartItemData = (items = []) => {
    // console.log(items);
    setPurchaseData([...items]);
  };

  const setTotalPriceData = (itemData) => {
    let totalPr = 0;
    itemData.forEach((item) => {
      totalPr += item?.productId[0]?.price * item?.ordered_quantity;
    });
    setTotalPrice(totalPr);

    console.log(totalPr);
  };

  const onChangeQuantity = (e) => {
    let val = e.quantity;
    let item = e.item;

    const data = purchasableData;

    data.map((e) => {
      if (e.id === item.id) {
        e.ordered_quantity = val;
      }
      return e;
    });

    setPurchaseData([...data]);
    setTotalPriceData([...data]);
  };

  const removeFromCart = async (itemId, itemIndex, ref = "") => {
    let cnf = false;
    if (ref === "") {
      cnf = confirm("Are you sure you want to delete?");
    } else {
      cnf = true;
    }

    if (cnf) {
      try {
        let resp = await axios.delete(`cart/${userId}/${itemId}`);

        if (resp.data.acknowledge) {
          if (ref === "") {
            toast.success("Item deleted from cart");
          }
          purchasableData.splice(itemIndex, 1);
          setCartItemData(purchasableData);
          setCartPending(purchasableData.length);
          setCookies("Cart", purchasableData.length, { maxAge: 60 * 30 });
          setTotalPriceData(purchasableData);
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }
  };

  const addToWishList = async (data, itemIndex) => {
    const sendData = {
      userid: data.userid,
      recordId: data.productId[0].recordId,
    };

    const cnf = confirm("Are you sure you want to move to Wishlist?");
    if (cnf) {
      try {
        let resp = await axios.post("wishlist", sendData);

        if (resp.data.acknowledge) {
          removeFromCart(data.id, itemIndex, "wish");
          toast.success("Product added to Wish List Successfully");
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }
  };

  const userData = {
    name: "Sudipta Sarkar",
    email: "sudipta.sarkar4545@gmail.com",
    contact: "1234567890",
    address: "KOL",
    amount: (totalPrice + (totalPrice * 5) / 100 + 15) * 100,
  };

  const onPayClick = (responseData) => {
    console.log(responseData);

    if (responseData.status === "success") {
      purchase();
      console.log("c");
    } else {
      toast.error(responseData.error.code);
    }
  };

  const purchase = async () => {
    axios
      .post(`purchase`, { userid: userId })
      .then((res) => {
        toast.success("Transaction completed");
      })
      .catch((err) => console.log(err));
  };

  const changeQuantity = (item = [], type) => {
    const data = purchasableData;

    if (type === "increment") {
      const val = item.ordered_quantity + 1;
      data.map((e) => {
        if (e.id === item.id) {
          e.ordered_quantity = val;
        }
        return e;
      });
    } else {
      let val = item.ordered_quantity - 1;

      if (val < 1) {
        val = 1;
      }

      data.map((e) => {
        if (e.id === item.id) {
          e.ordered_quantity = val;
        }
        return e;
      });
    }

    setPurchaseData([...data]);
    setTotalPriceData([...data]);

    console.log(purchasableData);
  };

  return (
    <>
      <Layout title="Shopping Cart" cartCount={cartPending}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col md={8} lg={9}>
              {step === 0 ? (
                <Row>
                  <Col>
                    <Card className="shadow-sm">
                      <Card.Body className="shopping-cart">
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Sl</th>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchasableData.length > 0 &&
                              purchasableData.map((itm, i) => {
                                return (
                                  <tr key={i}>
                                    <td style={{ verticalAlign: "Middle" }}>{i + 1}</td>
                                    <td style={{ width: "60px !important" }}>
                                      <img
                                        src={"/uploads/product/" + itm?.productId[0]?.product?.images[0].url}
                                        alt=""
                                        className="shopping-cart-image"
                                      />
                                    </td>
                                    <td>{itm?.productId[0]?.product?.name}</td>
                                    <td style={{ width: "135px" }}>{common.getCurrencyWithFormat(itm?.productId[0]?.price)}</td>
                                    <td style={{ width: "95px" }}>
                                      <QuantityChanger value={itm?.ordered_quantity} item={itm} onChangeQuantity={onChangeQuantity}></QuantityChanger>
                                    </td>
                                    <td style={{ width: "135px" }}>
                                      {common.getCurrencyWithFormat(itm?.productId[0]?.price * itm?.ordered_quantity)}
                                    </td>

                                    <td style={{ whiteSpace: "nowrap", width: "85px" }}>
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => removeFromCart(itm?.id, i)}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="left"
                                        title="Remove from Cart"
                                      >
                                        <i className="fa fa-trash"></i>
                                      </Button>
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => addToWishList(itm, i)}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="left"
                                        title="Add to Wish List"
                                      >
                                        <i className="fa fa-heart"></i>
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : null}
              {step === 1 ? (
                <Row className="mb-2">
                  <Col>
                    <Card>
                      <Card.Header className="bg-transparent">
                        <Card.Title className="text-uppercase fs-6" style={{ marginTop: "0.5rem" }}>
                          <i
                            className="fa fa-arrow-left me-2"
                            onClick={(e) => {
                              setStep(0);
                            }}
                          ></i>{" "}
                          Delivery Address
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col xs={1}>
                              <Form.Check
                                inline
                                name="address-1"
                                type={"radio"}
                                id={"address-1"}
                                aria-label="address-1"
                                checked={addressIndex === 1}
                                onChange={(e) => {
                                  setAddressIndex(1);
                                }}
                              />
                            </Col>
                            <Col xs={11}>
                              <Row>
                                <Col xs={10}>
                                  <span className="text-uppercase">Soumi Mukherjee</span>
                                </Col>
                                <Col xs={2}>
                                  <span className="float-end me-2 ps-2 pe-2">
                                    <i className="fa fa-edit" style={{ cursor: "pointer" }}></i>
                                  </span>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col xs={10}>
                                  <span className="text-uppercase">121/C, Gandhi Road,Lalbaug Sub Post Office,Maharashtra,Maharashtra -401200</span>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col>
                              <Button
                                variant="deep-purple-900"
                                className="float-md-end"
                                onClick={(e) => {
                                  setStep(2);
                                }}
                              >
                                Continue
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : null}
              {step === 2 ? (
                <Row>
                  <Col>
                    <Card>
                      <Card.Header className="bg-transparent">
                        <Card.Title className="text-uppercase fs-6" style={{ marginTop: "0.5rem" }}>
                          <i
                            className="fa fa-arrow-left me-2"
                            onClick={(e) => {
                              setStep(1);
                            }}
                          ></i>{" "}
                          Payment Options
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>
                            <Form>
                              <ul style={{ listStyle: "none" }}>
                                <li className="mb-3">
                                  <Form.Check
                                    type="radio"
                                    name="pay-1"
                                    id="pay-1"
                                    label="Pay with Razor Pay"
                                    checked={payMethod === "pay-1"}
                                    onChange={(e) => {
                                      setPayMethod("pay-1");
                                    }}
                                  ></Form.Check>
                                </li>
                                <li>
                                  <Form.Check
                                    type="radio"
                                    name="pay-1"
                                    id="pay-2"
                                    label={"Pay with Crypto"}
                                    checked={payMethod === "pay-2"}
                                    onChange={(e) => {
                                      setPayMethod("pay-2");
                                    }}
                                  ></Form.Check>
                                </li>
                              </ul>
                            </Form>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col className="text-md-end">
                            {payMethod === "pay-1" ? (
                              <PaymentButton userData={userData} paymentResponse={onPayClick} buttonText={"Pay with Razorpay"}></PaymentButton>
                            ) : (
                              <CryptoPaymentButton
                                userData={userData}
                                paymentResponse={onPayClick}
                                buttonText={"Pay with Crypto"}
                                btnClass="btn-orange-800"
                              ></CryptoPaymentButton>
                            )}                            
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : null}
            </Col>
            <Col md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Subtotal</span>
                      <span className="fw-bold">{common.getCurrencyWithFormat(totalPrice)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Tax ({tax + "%"})</span>
                      <span className="fw-bold">{common.getCurrencyWithFormat(totalPrice > 0 ? (totalPrice * tax) / 100 : 0)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Shipping</span>
                      <span className="fw-bold">{common.getCurrencyWithFormat(shippingCharge)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Grand Total</span>
                      <span className="fw-bold">{common.getCurrencyWithFormat(totalPrice > 0 ? totalPrice + (totalPrice * 5) / 100 + 15 : 0)}</span>
                    </ListGroup.Item>
                    {step === 0 ? (
                      <ListGroup.Item>
                        <span className="d-grid gap-2 ps-3 pe-3 mt-2">
                          <Button
                            variant="deep-purple-900"
                            className="text-white"
                            onClick={(e) => {
                              setStep(1);
                            }}
                          >
                            Checkout
                          </Button>
                        </span>
                      </ListGroup.Item>
                    ) : null}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default WithAuth(Cart, ["user"]);
