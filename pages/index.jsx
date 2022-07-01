import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import Layout from "../components/Layout/layout";
import ProductCard from "../components/productCard /productCard";
import axios from "../services/axios.interceptor";
let page = 0;
export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [key, setKey] = useState("BUY");

  let [productData, setProductData] = useState([]);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getProductData(userId,'BUY');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreProduct = () => {
    page += 1;
    getProductData(userId,key);
  };

  const getProductData = async (userId,key) => {
    setLoading(true);
    setProductData([]);
    let url = "";

    if (userId) {
      url = key === "BUY" ? "products/purchase" : "products/rent";
    } else {
      url = key === "BUY" ? "products/bypass/purchase" : "products/bypass/rent";
    }

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
    setKey(k);
    getProductData(userId,k);
  };

  return (
    <>
      <Layout title="Home">
        <div id="pageContainer" className="container">
          <div id={"editTabs"}>
            <div>
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => onTabChange(k)} className="mb-3">
                <Tab eventKey="BUY" title={"Buy"}></Tab>
                <Tab eventKey="Borrow" title={"Borrow"}></Tab>
              </Tabs>
            </div>
          </div>

          <Row>
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
        </div>
      </Layout>
    </>
  );
}
