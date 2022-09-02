import { getCookie, setCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Breadcrumb, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/layout";
import ImageViewer from "../../components/product_image/imageViewer";
import Rating from "../../components/product_review/rating";
import Review from "../../components/product_review/review";
import SellerInfo from "../../components/seller-info/SellerInfo";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";

const ProductDetailsPage = () => {
  const router = useRouter();
  const [cartPending, setCartPending] = useState(0);
  const [userId, setUserId] = useState(null);
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
    const sendData = {
      productId: prodId[0],
      recordId: prodId[1],
      userid: userId,
    };

    try {
      let resp = await axios.post(`products/details`, sendData);
      if (resp.data) {
        /*****  Temprary 360Images  ****/
        const idata = [
          { id: 4, url: "a-mirror-in-a-room.jpeg", type: "360Image" },
          { id: 5, url: "bedroom-with-a-large-bed-in-a-room.jpeg", type: "360Image" },
          { id: 6, url: "large-bed-in-a-room.jpeg", type: "360Image" },
        ];

       // resp.data.product.images = resp.data.product.images.concat(idata);

        // console.log(resp.data.product.images);

        /*****  Temprary 360Images  ****/

        setProductDetails(resp.data);
      }

      setIsLoaded(true);

      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const calculateRating = () => {
    const total =
      parseFloat(productDetails.avgProductDeliveryRating) +
      parseFloat(productDetails.avgProductPackagingRating) +
      parseFloat(productDetails.avgProductQualityRating) +
      parseFloat(productDetails.avgProductRating);

    const ovarallRating = total / 4;

    return parseInt(ovarallRating);
  };

  const addToCart = async () => {
    let { recordId, purpose, id, name } = productDetails;

    const sendData = {
      userid: userId,
      recordId: recordId,
      orderedQuantity: 1,
      purpose: purpose,
    };

    if (userId) {
      try {
        let response = await axios.post("cart", sendData);

        if (response.data.acknowledge) {
          let cartCount = parseInt(getCookie("Cart")) || 0;
          cartCount += 1;

          setCartPending(cartCount);

          setCookies("Cart", cartCount, { maxAge: 60 * 30 });

          toast.success("Product added to Cart");
        } else {
          toast.error("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    } else {
      toast.warning("Please Login to Continue");
    }
  };

  const addToWishList = async () => {
    const sendData = {
      userid: userId,
      recordId: productDetails?.recordId,
    };

    if (userId) {
      try {
        let response = await axios.post("wishlist", sendData);

        if (response.data.acknowledge) {
          toast.success("Product added to Wish List");
        } else {
          toast.error("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    } else {
      toast.warning("Please Login to Continue");
    }
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
        <Layout title="Product Details" cartCount={cartPending}>
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
                            <div className="fs-4 fw-bold d-inline-block me-2">{productDetails?.product?.name} </div>
                            <sup>
                              <Badge bg={productDetails?.purpose === "Purchase" ? "primary" : "secondary"}>
                                {productDetails?.purpose}
                              </Badge>
                            </sup>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <span className="fs-6 fw-bold">{common.getCurrencyWithFormat(productDetails?.price)}</span>
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
                      arImageUrl={common.arUrl + productDetails?.product?.arimageurl}
                      arimage ={productDetails?.product?.arimageurl}
                    ></ImageViewer>
                    <Row className="mt-2">
                      <Col>
                        <Card className="shadow-sm">
                          <Card.Body id="editTabs" className="p-0">
                            <div className="nav-no-curve">
                              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="About" title={"About"}>
                                  <div className="p-2 ms-3 text-blue-gray-900">
                                    <Row className="mb-3">
                                      <Col>
                                        <span className="border-bottom border-deep-purple-900 border-2 fs-5">
                                          Details
                                        </span>
                                        :-
                                      </Col>
                                    </Row>

                                    <Row className="ms-2 mb-2">
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Name :</span>
                                        {productDetails?.product?.name}
                                      </Col>
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Price :</span>
                                        {common.getCurrencyWithFormat(productDetails?.price)}
                                      </Col>
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Brand Name :</span>
                                        {productDetails?.product?.brand}
                                      </Col>
                                    </Row>

                                    <Row className="ms-2 mb-2">
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Condition :</span>
                                        {productDetails?.productStatus}
                                      </Col>
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">status :</span> {productDetails?.purpose}
                                      </Col>
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">
                                          Available for {productDetails?.purpose} :
                                        </span>
                                        {productDetails?.isAvailable ? "Yes" : "No"}
                                      </Col>
                                    </Row>

                                    <Row className="ms-2 mb-2">
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Category :</span>
                                        {productDetails.product?.category?.categoryName}
                                      </Col>
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Subcategory :</span>
                                        {productDetails.product?.subcategory?.subcategoryName}
                                      </Col>
                                      <Col md={4} className="mb-2">
                                        <span className="fs-6 fw-bold me-1">Posted On :</span>
                                        {common.DateFromTimeStampTime(productDetails?.product?.posted_date)}
                                      </Col>
                                    </Row>

                                    <div>
                                      <Row className="mb-3">
                                        <Col>
                                          <span className="border-bottom border-deep-purple-900 border-2 fs-5">
                                            Feature
                                          </span>
                                          :-
                                        </Col>
                                      </Row>
                                      <Row className="ms-2">
                                        {productDetails?.product?.specifications?.length > 0 &&
                                          productDetails?.product?.specifications.map((data, i) => {
                                            return (
                                              <Col key={i} md={4} className="mb-2">
                                                <i className="fa fa-circle-dot me-2"></i> {data.spec}
                                              </Col>
                                            );
                                          })}
                                      </Row>
                                    </div>

                                    {
                                      <>
                                        <Row className="mt-3 mb-3">
                                          <Col>
                                            <span className="border-bottom border-deep-purple-900 border-2 fs-5">
                                              Description
                                            </span>
                                            :-
                                          </Col>
                                        </Row>
                                        <Row className="ms-2 mb-2">
                                          <Col className="mb-2">{productDetails?.itemDescription}</Col>
                                        </Row>
                                      </>
                                    }
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
                      <SellerInfo sellerData={productDetails?.sellerDetails}></SellerInfo>
                      <Rating ProductData={productDetails}></Rating>
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

export default ProductDetailsPage;
