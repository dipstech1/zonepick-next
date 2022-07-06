import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout/layout";
import common from "../../utils/commonService";

const SellerProductPage = () => {
  const router = useRouter();

  let [productData, setProductData] = useState([]);
  let [sellerName, setSellerName] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const sellerId = router.query["id"];

    if (sessionStorage.getItem("products")) {
      const data = JSON.parse(sessionStorage.getItem("products"));
      setProductData(data.products);
      setSellerName(data.name);

      console.log(data);
    } else {
      router.push("/sellers");
    }

    console.log(sellerId);
  }, [router]);

  const goToProductDetails = (data) => {
    router.push(`/product/${data.ParentId}/${data.recordId}`);
  };

  return (
    <>
      <Layout title="Category Details">
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/sellers" passHref>
              <Breadcrumb.Item>Our Sellers</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{sellerName}</Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            {productData.length > 0 &&
              productData.map((data, i) => {
                return (
                  <Col key={i} md={3} className="mb-3">
                    <Card style={{ cursor: "pointer" }} className="product-row shadow-sm" onClick={(e) => goToProductDetails(data)}>
                      <div className="image-container">
                        <Card.Img
                          variant="top"
                          src={"/uploads/product/" + data?.product?.images[0]?.url}
                          style={{ height: "250px", objectFit: "fill" }}
                        />
                        <div className="top-left ">{data?.purpose}</div>
                      </div>
                      <Card.Body>
                        <Card.Title>
                          <span>{data?.product?.name}</span>
                        </Card.Title>
                        <div className="d-block mb-1 fw-bold mt-2">{common.getCurrencyWithFormat(data?.price)}</div>

                        <div className="d-block  mb-1">
                          <span className={["badge ", common.calculateAvgRating(data).className].join(" ")}>
                            <i className="fa fa-star"></i> {common.calculateAvgRating(data).rating}
                          </span>
                          <span className="ms-2 text-muted">
                            <small>({data?.CountOfPeopleVoted})</small>
                          </span>
                        </div>
                        <div className="d-block  mb-1">
                          <span className="fw-bold">Seller :</span> {sellerName}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
          {productData.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
              No Data Found
            </div>
          ) : null}
        </div>
      </Layout>
    </>
  );
};
export default SellerProductPage;
