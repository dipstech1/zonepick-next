import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Breadcrumb, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/layout";
import Review from "../../components/product_review/review";
import SellerInfo from "../../components/seller-info/SellerInfo";
import WithAuth from "../../components/withAuth";
import axios from "../../services/axios.interceptor";
import { productData } from "./data";
import ImageViewer from "../../components/product_image/imageViewer";

const ProductDetailsPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [productDetails, setProductDetails] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);
  const [showSellerInfo, setShowSellerInfo] = useState(true);
  const [key, setKey] = useState("About");

  useEffect(() => {
    if (!router.isReady) return;
    const productId = router.query["productId"];

    const userId = getCookie("userid");
    setUserId(userId);

    if (router.query["productId"]) {
      getProductDetails(productId, userId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getProductDetails = async (prodId, userId) => {
    /* const productData = {
      productId: prodId[0],
      recordId: prodId[1],
      userid: userId
    };*/

    try {
      /* let resp = await axios.post(`products/details`, productData);
      if (resp.data.length > 0) {
        setProductDetails(resp.data);
      }*/

      setProductDetails(productData);

      console.log(productData);

      setIsLoaded(true);

      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const addToCart = () => {
    let { recordId, purpose, _id, name } = productDetails;
    console.log("addToCart");
    /*let userid = getDataFromLocalstorage('userid');
    axiosInterceptor
      .post('cart', {
        userid,
        recordId,
        _id,
        ordered_quantity: 1,
        purpose
      })
      .then((res) => {
        toast.success('Product added to cart');
        console.log('added to cart');
      })
      .catch((err) => console.log(err));*/
  };

  const calculateRating = () => {
    const total =
      parseFloat(productDetails.AvgProductDeliveryRating) +
      parseFloat(productDetails.AvgProductPackagingRating) +
      parseFloat(productDetails.AvgProductQualityRating) +
      parseFloat(productDetails.AvgProductRating);

    const ovarallRating = total / 4;

    return parseInt(ovarallRating);
  };

  const addToWishList = () => {
    let { recordId, purpose, _id, name } = productDetails;
    console.log("addToWishList");
    /*let userid = getDataFromLocalstorage('userid');
    axiosInterceptor
      .post('cart', {
        userid,
        recordId,
        _id,
        ordered_quantity: 1,
        purpose
      })
      .then((res) => {
        toast.success('Product added to cart');
        console.log('added to cart');
      })
      .catch((err) => console.log(err));*/
  };

  const onIimageViewTabChanged = (e) => {
    /* if (e !== 'image-1') {
      setShowSellerInfo(false)
    } else {
      setShowSellerInfo(true)
    }*/
  };

  return (
    <>
      <>
        <Layout title="Product Details">
          <div id="pageContainer" className="container">
            <Breadcrumb className="m-2">
              <Link href="/" passHref>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Link>

              <Breadcrumb.Item active>Product Details</Breadcrumb.Item>
            </Breadcrumb>
            {isLoaded ? (
              <>
                <Row className="mt-3">
                  <Col>
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Row>
                          <Col>
                            <div className="fs-4 fw-bold d-inline-block">{productDetails?.product?.name} </div>
                            <sup>
                              <Badge bg={productDetails?.purpose === "Purchase" ? "primary" : "secondary"}>{productDetails?.purpose}</Badge>
                            </sup>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <span className="fs-6 fw-bold">
                              {(productDetails?.price).toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <StarRatings
                              starDimension="17px"
                              rating={calculateRating() | 0}
                              starRatedColor="#311b92"
                              numberOfStars={5}
                              name="usertRating"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <button
                              onClick={() => addToCart()}
                              className="btn btn-sm btn-outline-deep-purple-900 ms-1"
                              style={{ marginLeft: "10px" }}
                            >
                              <i className="fas fa-cart-plus me-2"></i> Add to Cart
                            </button>
                            <button
                              onClick={() => addToWishList()}
                              className="btn btn-sm btn-outline-deep-orange-900 ms-2"
                              style={{ marginLeft: "10px" }}
                              disabled={productDetails?.isWishlisted}
                            >
                              <i className="fas fa-heart me-2"></i> Add to Wishlist
                            </button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={showSellerInfo === true ? 8 : 12}>
                    <ImageViewer
                      imageData={productDetails?.product?.images}
                      onIimageViewTabChanged={onIimageViewTabChanged}
                      arImageUrl="/uploads/product/glb/flat.glb"
                    ></ImageViewer>
                    <Row className="mt-2">
                      <Col>
                        <Card className="shadow-sm">
                          <Card.Body id="editTabs" className="p-0">
                            <div className="nav-no-curve">
                              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="About" title={"About"}>
                                  <div className="p-2">About</div>
                                </Tab>
                                <Tab eventKey="Feature" title={"Feature"}>
                                  <div className="p-2 ms-3">
                                    <Row>
                                      {productDetails?.product?.specifications?.length > 0 &&
                                        productDetails?.product?.specifications.map((data, i) => {
                                          return (
                                            <Col key={i} md={4} className="mb-2">
                                              <i className="fas fa-dot-circle me-2"></i> {data.spec}
                                            </Col>
                                          );
                                        })}
                                    </Row>
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Review comments={productDetails?.comments}></Review>
                  </Col>
                  {showSellerInfo ? (
                    <Col md={4}>
                      <SellerInfo sellerData={productDetails?.seller_details}></SellerInfo>
                    </Col>
                  ) : null}
                </Row>
              </>
            ) : (
              <Row>
                <Col>
                  <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
                    <h4>Data being Loaded</h4>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Layout>
      </>
    </>
  );
};

export default WithAuth(ProductDetailsPage);
