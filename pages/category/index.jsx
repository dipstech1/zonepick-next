import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/layout";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";


const Category = () => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryItems();
  }, []);

  const getCategoryItems = async () => {
    try {
      let resp = await axios.get("category/categories");
      if (resp.data.length > 0) {
        setCategoryList(resp.data);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onCategoryClick = (item) => {
    router.push('/category/' + item.id)
  };

  return (
    <>
      <Layout title="Shop by Category">
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>

            <Breadcrumb.Item active>Shop by Category</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            {categoryList.length > 0 &&
              categoryList.map((data, i) => {
                return (
                  <Col key={i} md={3} className="mb-3">
                    <Card
                      className="shadow-sm"
                      onClick={(e) => {
                        onCategoryClick(data);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body>
                        <Card.Img variant="top" src={common.imageUrl + data?.image} style={{ height: 200, maxWidth: "100%" }} />
                        <div className="d-flex align-items-end justify-content-center fw-bold" style={{ height: 50 }}>
                          {data.categoryName}
                        </div>
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

export default Category;
