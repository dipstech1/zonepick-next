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
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";

const WishList = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getWishlistItems(userId);
  }, []);

  const getWishlistItems = async (userId) => {
    setWishlist([]);
    try {
      let resp = await axios.get(`wishlist/${userId}`);
      if (resp.data.length > 0) {
        setWishlist(resp.data);
      }
      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const removeWishListItem = async (item, ref = "") => {
    // console.log(item);

    let cnf = false;
    if (ref === "") {
      cnf = confirm("Are you sure you want to delete?");
    } else {
      cnf = true;
    }

    if (cnf) {
      try {
        let res = await axios.delete(`wishlist/${item?.wishlistId}`);
        if (res.data.acknowledge == true) {
          getWishlistItems(userId);
          if (ref === "") {
            toast.success("Product Removed from Wishlist");
          }
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }
  };

  const addToCart = async (data) => {
    const sendData = {
      userid: userId,
      recordId: data.productId[0].recordId,
      ordered_quantity: 1,
      purpose: "Purchase",
    };
    const cnf = confirm("Are you sure you want to move to Cart?");

    if (cnf) {
      try {
        let added = await axios.post("cart", sendData);

        if (added.data.acknowledge) {
          removeWishListItem(data, "cart");
          toast.success("Product added to Cart");
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }
  };

  const goToProductDetails = (data) => {
    router.push(`product/${data.productId[0].ParentId}/${data.productId[0].recordId}`);
  };

  return (
    <>
      <Layout title="Wishlist" metaDescription={[{ name: "description", content: "Wishlist Page" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="My Wishlist" activeLink={3}>
            <Row>
              <Col>
                {wishlist.length ? (
                  wishlist.map((data, i) => (
                    <Row key={i} className="mt-2 mb-3 ">
                      <Col>
                        <Card className="product-row">
                          <Card.Body className="p-0">
                            <Row>
                              <Col md={3} lg={2}>
                                <img
                                  src={common.imageUrl + data?.productId[0].product.images[0].url}
                                  className="img-responsive-1 w-100"
                                  alt="dd"
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => goToProductDetails(data)}
                                />
                              </Col>
                              <Col md={9} lg={10}>
                                <div className="p-2">
                                  <Row>
                                    <Col xs={11}>
                                      <small>
                                        <b className="text-success">{data?.productId[0]?.product_status}</b>
                                      </small>
                                    </Col>
                                    <Col xs={1}>
                                      <div className="float-end pe-2">
                                        <span
                                          onClick={(e) => removeWishListItem(data)}
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="left"
                                          title="Delete from Wishlist"
                                        >
                                          <i className="fa fa-trash small" style={{ cursor: "pointer" }}></i>
                                        </span>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <b style={{ cursor: "pointer" }} onClick={(e) => goToProductDetails(data)}>
                                        {data?.productId[0]?.product.name}
                                      </b>
                                      <div>
                                        <span className={["badge  badge-small", common.calculateAvgRating(data?.productId[0]).className].join(" ")}>
                                          <i className="fa fa-star"></i> {common.calculateAvgRating(data?.productId[0]).rating}
                                        </span>
                                        <span className="ms-2 text-muted">
                                          <small>({data?.productId[0]?.countOfPeopleVoted})</small>
                                        </span>
                                      </div>
                                      <span className="mt-2 d-inline-block">
                                        <b>{common.getCurrencyWithFormat(data?.productId[0]?.price)}</b>
                                      </span>
                                      <span className="float-end d-inline-block">
                                        <Button
                                          variant="deep-purple-900"
                                          size="sm"
                                          onClick={(e) => addToCart(data)}
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="left"
                                          title="Move To Cart"
                                        >
                                          Move To Cart
                                        </Button>
                                      </span>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ))
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
export default withAuth(WishList);
