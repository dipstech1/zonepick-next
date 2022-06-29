/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Breadcrumb, Button, Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import Layout from "../../components/Layout/layout";
import WithAuth from "../../components/withAuth";
import { toast } from "react-toastify";
import axios from "../../services/axios.interceptor";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import QuantityChanger from "../../components/quantity";

const Cart = () => {
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
    }
    else {
      cnf = true ;
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

  return (
    <>
      <Layout title="Shopping Cart">
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            <Col md={8} lg={9}>
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
                                <img src={"/uploads/product/" + itm?.productId[0]?.product?.images[0].url} alt="" className="shopping-cart-image" />
                              </td>
                              <td>{itm?.productId[0]?.product?.name}</td>
                              <td style={{ width: "135px" }}>
                                {itm?.productId[0]?.price?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })}
                              </td>
                              <td style={{ width: "95px" }}>
                                <QuantityChanger value={itm?.ordered_quantity} item={itm} onChangeQuantity={onChangeQuantity}></QuantityChanger>
                              </td>
                              <td style={{ width: "135px" }}>
                                {(itm?.productId[0]?.price * itm?.ordered_quantity).toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })}
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
            <Col md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Subtotal</span>
                      <span className="fw-bold">
                        {totalPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Tax ({tax + "%"})</span>
                      <span className="fw-bold">
                        {(totalPrice > 0 ? (totalPrice * tax) / 100 : 0).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Shipping</span>
                      <span className="fw-bold">
                        {shippingCharge.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                      <span>Grand Total</span>
                      <span className="fw-bold">
                        {(totalPrice > 0 ? totalPrice + (totalPrice * 5) / 100 + 15 : 0).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="d-grid gap-2 ps-3 pe-3 mt-2">
                        <Button variant="deep-purple-900" className="text-white">
                          Checkout
                        </Button>
                      </span>
                    </ListGroup.Item>
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
