/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/layout";
import axios from "../../utils/axios.interceptor";

const SellerPage = () => {
  const router = useRouter();
  const [sellerList, setSellerList] = useState([]);
  useEffect(() => {
    getSellerItems();
  }, []);

  const getSellerItems = async () => {
    try {
      let resp = await axios.get("profile");
      if (resp.data && resp.data.data.length > 0) {
        setSellerList(resp.data.data);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onSellerClick = (item) => {
    sessionStorage.setItem("products", JSON.stringify(item));
    router.push("/sellers/" + item.id);
  };

  return (
    <>
      <Layout title="Our Sellers">
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>

            <Breadcrumb.Item active>Our Sellers</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            {sellerList.length > 0 &&
              sellerList.map((data, i) => {
                return (
                  <Col key={i} md={6} lg={4} className="mb-3">
                    <Card className="shadow-sm product-row">
                      <Card.Body className="p-0">
                        <Row>
                          <Col md={5}>
                            <div className="image-container">
                              <img
                                src={"/uploads/avator/" + data?.profileImage}
                                className="img-responsive-orderhistory w-100"
                                alt="dd"
                                onError={(e) => {
                                  e.currentTarget.src = "/uploads/avator/1.jpg";
                                }}
                              />
                              <div className={["top-left bg-secondary"].join(" ")}>{data.products.length} Products</div>
                            </div>
                          </Col>
                          <Col md={7} className="pt-2">
                            <span className="d-flex fw-bold fs-6">{data?.name}</span>
                            <div className="d-flex mt-1">
                              <StarRatings
                                starDimension="14px"
                                rating={parseInt(data?.avgSellerRating) | 0}
                                starRatedColor="#311b92"
                                numberOfStars={5}
                                name="usertRating"
                              />
                            </div>
                            {/*
                            <div className="d-block mb-2">
                              <i className="fa fa-mobile-retro me-3"></i>{" "}
                              <Link href={"tel:" + data.phone}>{data.phone}</Link>
                            </div>
                            */
                            }
                            <div className="d-block text-nowrap mt-2 small">
                              <i className="fa fa-envelope me-2"></i>
                              <Link href={"mailto:" + data.email} style><span>{data.email}</span></Link>
                            </div>
                            <div
                              className="d-block mt-4 float-end me-3 animate-i text-deep-purple-900"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                onSellerClick(data);
                              }}
                            >
                              View Products <span className="lefttoright"><i className="fas fa-arrow-right"></i></span>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default SellerPage;
