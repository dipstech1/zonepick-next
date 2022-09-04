/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";
import common from "../../../utils/commonService";

let page = 0;

const MyProductList = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [productData, setProductData] = useState([]);

  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie("userid");
    page = 0;
    setProductData([]);
    setUserId(userId);
    getMyProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreProduct = () => {
    page += 1;
    getMyProducts();
  };

  const getMyProducts = async () => {
    try {
      setLoading(true);
      let resp = await axios.get(`admin/products?page=${page}`);
      // let resp = await axios.get("admin/products");
      if (resp.data) {
        setProductData([...productData, ...resp.data.data]);
        setTotal(resp.data.count);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
      setLoading(false);
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

  const onbuttonClick = (e) => {
    // console.log(productData)
    router.push("product/add");
  };

  const onEditClick = (item) => {
    sessionStorage.setItem("product", JSON.stringify(item));
    router.push("product/edit");
  };

  return (
    <>
      <Layout title="Product(s)" metaDescription={[{ name: "description", content: "Product(s)" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Product(s)</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout
            title="Product(s)"
            activeLink={10}
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
                                  <Image
                                    src={common.imageUrl + data?.images[0]?.url}
                                    className="img-responsive-1 w-100"
                                    alt="dd"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </Col>
                              <Col md={9} lg={10}>
                                <div className="p-2">
                                  <Row>
                                    <Col xs={10}>
                                      <b style={{ cursor: "pointer" }}>{data?.name}</b>
                                    </Col>
                                    <Col xs={2}>
                                      <div className="float-end pe-2">
                                        <span
                                          onClick={() => onEditClick(data)}
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
                                      <span className="mt-2 d-block">
                                        <small>Brand: {data?.brand}</small>
                                      </span>
                                      <span className="mt-2 d-block">
                                        <small>Date: {common.DateFromTimeStamp(data?.posted_date)}</small>
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
            {total > productData.length ? (
              <Row className="mt-3">
                <Col className="text-center">
                  <Button onClick={getMoreProduct}>
                    Load More {loading ? <span className="spinner-border spinner-border-sm me-1 ms-2"></span> : null}
                  </Button>
                </Col>
              </Row>
            ) : null}
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(MyProductList, ["ADMIN"]);
