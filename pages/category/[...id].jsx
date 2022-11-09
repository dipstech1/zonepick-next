import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/layout";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";

let page = 0;

const CategoryDetailsPage = () => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryId: 0,
    subcategoryName: "",
    subcategoryId: 0,
  });
  let [productData, setProductData] = useState([]);
  let [productDataTemp, setProductDataTemp] = useState([]);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [subcategoryList, setSubcategoryList] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    const categoryId = router.query["id"];

    if (router.query["id"] && router.query["id"].length === 1) {
      getProductData(categoryId[0], 0);
      setCategoryData({ ...categoryData, categoryId: parseInt(categoryId[0]) });
    }

    if (router.query["id"] && router.query["id"].length === 2) {
      getProductData(categoryId[0], categoryId[1]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getProductData = async (categoryId, subcategoryId) => {
    let sendData = {};
    let apiUrl = "";

    if (subcategoryId === 0) {
      sendData = {
        category: categoryId,
      };
      apiUrl = "products/category?page=" + page;
    } else {
      sendData = {
        category: categoryId,
        subcategory: subcategoryId,
      };

      apiUrl = "products/category-and-subcategory?page=" + page;
    }

    try {
      let resp = await axios.post(apiUrl, sendData);
      if (resp.data.total > 0) {
        setProductData([...productData, ...resp.data.data]);
        setProductDataTemp([...productDataTemp, ...resp.data.data]);
        setTotal(resp.data.total);
        if (subcategoryId === 0) {
          setCategoryData({
            ...categoryData,
            categoryId: resp.data.data[0].category.id,
            categoryName: resp.data.data[0].category.categoryName,
            subcategoryId: 0,
          });
          getSubcategoryItems(resp.data.data[0].category.categoryName);
        } else {
          setCategoryData({
            ...categoryData,
            categoryId: resp.data.data[0].category.id,
            categoryName: resp.data.data[0].category.categoryName,
            subcategoryId: resp.data.data[0].subcategory.id,
            subcategoryName: resp.data.data[0].subcategory.subcategoryName,
          });
        }
      } else {
        // setCategoryData({ ...categoryData, subcategoryId: subcategoryId });
        setTotal(0);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getMoreProduct = () => {
    page += 1;
    if (categoryData.subcategoryId === 0) {
      getProductData(categoryData.categoryId, 0);
    } else {
      setCategoryData({ ...categoryData, subcategoryId: subcategoryId });
      getProductData(categoryData.categoryId, categoryData.subcategoryId);
    }
  };

  const goToProductDetails = (data) => {
    router.push(`/product/${data.items[0].ParentId}/${data.items[0].recordId}`);
  };

  const getSubcategoryItems = async (categoryName) => {
    const sendData = {
      category: categoryName,
    };
    try {
      let resp = await axios.post("category", sendData);
      if (resp.data.length > 0) {
        setSubcategoryList(resp.data[0]?.subcategories);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onSubcategoryClick = async (item, index) => {
    console.log(categoryData);

    setCategoryData({ ...categoryData, subcategoryId: item.id, subcategoryName: item.subcategoryName });

    productData = [];
    setProductData(productData);
    router.push("/category/" + categoryData.categoryId + "/" + item.id);
  };

  return (
    <>
      <Layout title="Category Details">
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/category" passHref>
              <Breadcrumb.Item>Shop by Category</Breadcrumb.Item>
            </Link>
            {categoryData.subcategoryId === 0 ? (
              <Breadcrumb.Item active>{categoryData.categoryName}</Breadcrumb.Item>
            ) : (
              <>
                <Link href={`/category/${categoryData.categoryId}`} passHref>
                  <Breadcrumb.Item>{categoryData.categoryName}</Breadcrumb.Item>
                </Link>
                <Breadcrumb.Item active>{categoryData.subcategoryName}</Breadcrumb.Item>
              </>
            )}
          </Breadcrumb>

          <Row className="mb-3 d-flex flex-row flex-nowrap overflow-auto text-center">
            {subcategoryList?.length > 0 &&
              subcategoryList?.map((data, i) => (
                <Col
                  key={i}
                  xs={4}
                  sm={3}
                  md={2}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    onSubcategoryClick(data, i);
                  }}
                >
                  <Card className="shadow-sm">
                    <Card.Body
                      className={[
                        "p-1 text-center",
                        data?.id === categoryData.subcategoryId ? "bg-deep-purple-900 text-white" : null,
                      ].join(" ")}
                    >
                      {data?.subcategoryName}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>

          <Row>
            {productData.length > 0 &&
              productData.map((product, i) => {
                return (
                  <Col key={i} md={3} className="mb-3">
                    <Card
                      style={{ cursor: "pointer" }}
                      className="product-row shadow-sm"
                      onClick={(e) => goToProductDetails(product)}
                    >
                      <div className="image-container">
                        <Card.Img
                          variant="top"
                          src={common.productThumbUrl + product?.thumbnail}
                          style={{ height: "250px", objectFit: "fill" }}
                        />
                        <div className="top-left ">{product?.purpose}</div>
                      </div>
                      <Card.Body>
                        <Card.Title>
                          <span>{product?.name}</span>
                        </Card.Title>
                        <div>
                          <div className="d-block mb-1 fw-bold mt-2">
                            {common.getCurrencyWithFormat(product?.items[0]?.price)}
                          </div>
                          <div className="d-block  mb-1">
                            <span className="fw-bold">
                              {product?.category?.categoryName} [{product?.subcategory?.subcategoryName}]
                            </span>
                          </div>
                          <div className="d-block  mb-1">
                            <span
                              className={["badge ", common.calculateAvgRating(product?.items[0]).className].join(" ")}
                            >
                              <i className="fa fa-star"></i> {common.calculateAvgRating(product?.items[0]).rating}
                            </span>
                            <span className="ms-2 text-muted">
                              <small>({product?.items[0]?.countOfPeopleVoted || 0})</small>
                            </span>
                          </div>
                          <div className="d-block  mb-1">
                            <span className="fw-bold">Seller :</span> {product?.items[0]?.sellerDetails?.name || 'NA'}
                          </div>
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
};

export default CategoryDetailsPage;
