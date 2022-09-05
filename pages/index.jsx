import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import FaecetSearch from "../components/productFilter/FaecetSearch";
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
  const [productName, setProductName] = useState("");
  const [isCompare, setIsCompare] = useState(false);
  const [comparedProductCount, setComparedProductCount] = useState(0);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getProductData("BUY");
    localStorage.removeItem("productCompare");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreProduct = () => {
    page += 1;
    getProductData(key);
  };

  const getProductData = async (key) => {
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

      //  console.log(resp.data);
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
    getProductData(k);

  };

  const onSearchProducts = async (sendData) => {
    setLoading(true);
    productData = [];
    page = 0;
    setProductData(productData);
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

  const onSearchProductName = async () => {
    setLoading(true);
    setProductData([]);
    setTotal(0);

    try {
      let resp = await axios.get(`products/productName?productName=${productName}`);
      if (resp.data.total) {
        console.log("RESPONCE", resp)
        setProductData(resp?.data?.data);
        setTotal(resp?.data?.total);
      } else {
        setProductData([]);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Fail");
    }
    setLoading(false);
  }

  const goToCompare = (e) => {
    e.preventDefault();
    router.push("product/compare")
  };

  const onCheckBoxClick = (item, event) => {

    let sendData = [{
      productId: item.product?.productId,
      recordId: item.recordId,
    }];

    const getData = JSON.parse(localStorage.getItem("productCompare"));

    if (getData) {
      if (!event.target.checked) {
        const newData = getData.filter((product) => parseInt(product.recordId) !== parseInt(item.recordId));
        localStorage.setItem("productCompare", JSON.stringify(newData));
      } else {
        if (getData.length > 3) {
          return toast.info("You have already selected 4 products");
        } else {
          const newData = [...getData, ...sendData]
          localStorage.setItem("productCompare", JSON.stringify(newData));
        }
      }
    } else {
      localStorage.setItem("productCompare", JSON.stringify(sendData));
    };

    getCompareData();
  };

  const getCompareData = () => {
    let product = JSON.parse(localStorage.getItem("productCompare"));
    product.length > 0 ? setIsCompare(true) : setIsCompare(false);
    setComparedProductCount(product.length)
  }

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
                    <input
                      type="search"
                      className="form-control"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                    <span className="input-group-text">
                      <i className="fas fa-search"
                        style={{ cursor: "pointer" }}
                        onClick={onSearchProductName}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Container>
            <Row>
              <Col md={3}>
                <FaecetSearch onSearch={onSearchProducts}></FaecetSearch>
              </Col>
              <Col>
                <Row>
                  <Col md={12}>
                    <div id={"editTabs"}>
                      <div className="nav-no-fills">
                        <Tabs
                          id="controlled-tab-example"
                          activeKey={key}
                          onSelect={(k) => onTabChange(k)}
                          className="mb-3"
                        >
                          <Tab eventKey="BUY" title={"Buy"}></Tab>
                          <Tab eventKey="Borrow" title={"Borrow"}></Tab>
                        </Tabs>
                      </div>
                    </div>
                  </Col>
                </Row>
                {isCompare ?
                  <Row>
                    <Col>
                      <Button variant="indigo"
                        className="mb-3 ms-5 fixed-bottom"
                        onClick={goToCompare}
                        style={{ width: "150px" }}>Compare {comparedProductCount}</Button>
                    </Col>
                  </Row> : null
                }
                <Row className="ps-2 scrollable overflow-auto" style={{ minHeight: 400, overflow: 'auto' }}>
                  {productData.length > 0 &&
                    productData.map((product, i) => {
                      return (
                        <Col key={i} md={4} className="mb-3">
                          <ProductCard productDetails={product} addToWishList={addToWishList} onCheckBoxClick={onCheckBoxClick} />
                        </Col>
                      );
                    })}
                </Row>
                {total > productData.length ? (
                  <Row>
                    <Col className="text-center">
                      <Button type="button" variant="indigo" onClick={getMoreProduct}>
                        Load More{" "}
                        {loading ? <span className="spinner-border spinner-border-sm me-1 ms-2"></span> : null}
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    </>
  );
}
