import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Breadcrumb, Card, Col, Row } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import ImageGallery from "../../components/product/imageGalerry";
import Layout from "../../components/Layout/layout";
import Review from "../../components/product/review";
import SellerInfo from "../../components/seller-info/SellerInfo";
import WithAuth from "../../components/withAuth";
import axios from "../../services/axios.interceptor";
import { productData } from "./data";

const ProductDetailsPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [productDetails, setProductDetails] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);


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
                            <div className="fs-4 fw-bold d-inline-block">
                              {productDetails?.product?.name}{" "}
                              
                            </div>
                            <sup>
                                <Badge bg={productDetails?.purpose === "Purchase" ? "primary" : "secondary"} >{productDetails?.purpose}</Badge>
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
                <Row className="mt-2">
                      <Col>
                        <Card className="shadow-sm">
                          <Card.Body></Card.Body>
                        </Card>
                      </Col>
                    </Row>
                <Row className="mt-3">
                  <Col md={8}>
                    <ImageGallery imageData={productDetails?.product?.images}></ImageGallery>
                    <Row className="mt-2">
                      <Col>
                        <Card className="shadow-sm">
                          <Card.Body></Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Review comments={productDetails?.comments}></Review>
                  </Col>
                  <Col md={4}>
                    <SellerInfo sellerData={productDetails?.seller_details}></SellerInfo>
                  </Col>
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
