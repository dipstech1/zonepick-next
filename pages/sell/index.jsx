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

const MyProductList = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getMyProducts(userId);
  }, []);

  const getMyProducts = async (userId) => {
    try {
      let resp = await axios.get(`profile/${userId}`);
      if (resp.data.length > 0) {
        setProductData([...resp.data[0].products]);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const removeMyProducts = async (item, ref = "") => {
    // console.log(item);
    /* try {
      let res = await axios.delete(`wishlist/${item?.wishlistId}`);
      if (res.data.acknowledge == true) {     
        getMyProducts(userId);
        if(ref===''){
          toast.success('Product Removed from My Listing');
        }     
      } else {
        toast.warning('Fail');
      }

    } catch (error) {
      console.log(error)
      toast.error('Fail');
    }*/
  };

  const goToProductDetails = (data) => {
    router.push(`product/${data.productId[0].ParentId}/${data.productId[0].recordId}`);
  };

  const onbuttonClick = (e) => {
    router.push("sell/add");
  };

  return (
    <>
      <Layout title="My Listing" metaDescription={[{ name: "description", content: "My Listing Page" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>My Listing</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout
            title="My Listing"
            activeLink={5}
            enableButton={true}
            iconClass="fa fa-add"
            tooltipText="Add New Product"
            buttoClick={(e) => onbuttonClick(e)}
          >
            <Row>
              <Col>
                {productData.length ? (
                  productData.map((data, i) => (
                    <Row key={i} className="mt-2 mb-3 ">
                      <Col>
                        <Card className="product-row">
                          <Card.Body className="p-0">
                            <Row>
                              <Col md={3} lg={2}>
                                <div className="image-container">
                                  <img
                                    src={common.imageUrl + data?.product?.images[0].url}
                                    className="img-responsive-1 w-100"
                                    alt="dd"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => goToProductDetails(data)}
                                  />
                                  <div
                                    className={[
                                      "top-left ",
                                      data.purpose === "Purchase" ? "bg-primary" : "bg-secondary",
                                    ].join(" ")}
                                  >
                                    {data.purpose}
                                  </div>
                                </div>
                              </Col>
                              <Col md={9} lg={10}>
                                <div className="p-2">
                                  <Row>
                                    <Col xs={10}>
                                      <small>
                                        <b className="text-success">{data?.product_status}</b>
                                      </small>
                                    </Col>
                                    <Col xs={2}>
                                      <div className="float-end pe-2">
                                        <span
                                          onClick={(e) => removeMyProducts(data)}
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="left"
                                          title="Edit Product"
                                        >
                                          <i className="fa fa-edit small me-4" style={{ cursor: "pointer" }}></i>
                                        </span>
                                        <span
                                          onClick={(e) => removeMyProducts(data)}
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="left"
                                          title="Delete Product"
                                        >
                                          <i className="fa fa-trash small" style={{ cursor: "pointer" }}></i>
                                        </span>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <b style={{ cursor: "pointer" }}>{data?.product?.name}</b>
                                      <div>
                                        <span
                                          className={[
                                            "badge  badge-small",
                                            common.calculateAvgRating(data).className,
                                          ].join(" ")}
                                        >
                                          <i className="fa fa-star"></i> {common.calculateAvgRating(data).rating}
                                        </span>
                                        <span className="ms-2 text-muted">
                                          <small>({data?.countOfPeopleVoted})</small>
                                        </span>
                                      </div>
                                      <span className="mt-2 d-inline-block">
                                        <b>{common.getCurrencyWithFormat(data?.price)}</b>
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
export default withAuth(MyProductList);
