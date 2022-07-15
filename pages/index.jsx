import { getCookie } from "cookies-next";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";

import { toast } from "react-toastify";

import Layout from "../components/Layout/layout";
import ProductCard from "../components/productCard/productCard";
import ProductFilter from "../components/productFilter/productFilter";
import axios from "../utils/axios.interceptor";
let page = 0;

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [key, setKey] = useState("BUY");

  const [showFilter, setShowFilter] = useState(false);

  let [productData, setProductData] = useState([]);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getProductData(userId, "BUY");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreProduct = () => {
    page += 1;
    getProductData(userId, key);
  };

  const getProductData = async (userId, key) => {
    setLoading(true);
    setProductData([]);
    let url = key === "BUY" ? "products/purchase" : "products/rent";

    try {
      let resp = await axios.get(url, { params: { page } });
      if (resp.data.total) {
        setProductData([...productData, ...resp.data.data]);
        setTotal(resp.data.total);
      } else {
        setProductData([]);
      }

      console.log(resp.data);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      toast.error("Fail");
    }

    setLoading(false);
  };

  const addToWishList = (data) => {
    console.log(data);
  };

  const onTabChange = (k) => {
    productData = [];
    page = 0;
    setProductData(productData);
    setKey(k);
    getProductData(userId, k);
  };

  const onSearchProducts = async (sendData) => {
    setLoading(true);
    setProductData([]);
    setTotal(0);
    let url = "products/filter";

    try {
      let resp = await axios.post(url, sendData);
      if (resp.data.total) {
        setProductData([...productData, ...resp.data.data]);
        setTotal(resp.data.total);
      } else {
        setProductData([]);
      }

      console.log(resp.data);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      toast.error("Fail");
    }

    setLoading(false);
  };

  

  return (
    <>
      <Layout title="Home">
        <div className="mb-3">
          <section className="banner">
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-12 col-lg-6 banner_text">
                  <h2>
                    A fresh approach to shopping <span>Absolutely. Positively. Perfect.</span>
                  </h2>
                  <div className="input-group mt-3 mt-lg-4">
                    <input type="search" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Container>
            <Row>
              <Col md={8}>
                <div id={"editTabs"}>
                  <div className="nav-no-fills">
                    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => onTabChange(k)} className="mb-3">
                      <Tab eventKey="BUY" title={"Buy"}></Tab>
                      <Tab eventKey="Borrow" title={"Borrow"}></Tab>
                    </Tabs>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <Button
                  variant="default"
                  className="float-end me-2"
                  onClick={(e) => {
                    !showFilter ? setShowFilter(true) : setShowFilter(false);
                  }}
                >
                  <i className="fa fa-filter"></i>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="position-relative">
                <div id="display-search" className={showFilter ? "visible" : null}>
                  <ProductFilter onSearch={onSearchProducts} onClearSearch={getProductData}></ProductFilter>
                </div>
              </Col>
            </Row>

            <Row className="ps-2" style={{ minHeight: 400 }}>
              {productData.length > 0 &&
                productData.map((product, i) => {
                  return (
                    <Col key={i} md={3} className="mb-3">
                      <ProductCard productDetails={product} addToWishList={addToWishList} />
                    </Col>
                  );
                })}
            </Row>
            {total > productData.length ? (
              <Row>
                <Col className="text-center">
                  <Button type="button" variant="indigo" onClick={getMoreProduct}>
                    Load More {loading ? <span className="spinner-border spinner-border-sm me-1 ms-2"></span> : null}
                  </Button>
                </Col>
              </Row>
            ) : null}
          </Container>
        </div>
      </Layout>
    </>
  );
}
