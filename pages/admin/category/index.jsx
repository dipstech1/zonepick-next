/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import { toast } from "react-toastify";
import axios from "../../../utils/axios.interceptor";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import common from "../../../utils/commonService";

const Category = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getCategoryItems();
  }, []);

  const getCategoryItems = async () => {
    try {
      let resp = await axios.get("category/categories");
      if (resp.data.length > 0) {
        setCategoryList(resp.data);
      }
      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onDeleteClick = async (item) => {
    const cnf = confirm("Are you sure you want to delete?");

    if (cnf) {
      const sendData = {
        userid: userId,
        id: item.id,
        categoryName: item.categoryName,
      };

      //  console.log(sendData);

      try {
        let res = await axios.delete("admin/delete-category", { data: sendData });
        if (res.data.acknowledge == true) {
          getCategoryItems();
          toast.success("Category Deleted");
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }
  };

  const onbuttonClick = (e) => {
    router.push("category/add");
  };

  const onEditClick = (item) => {
    sessionStorage.setItem("category", JSON.stringify(item));
    router.push("category/edit");
  };

  const onCategoryClick = (item) => {
    const surl = "category/" + item.id;
    router.push(surl);
  };

  return (
    <>
      <Layout title="Category" metaDescription={[{ name: "description", content: "Category" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Category</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout
            title="Category"
            activeLink={8}
            enableButton={true}
            iconClass="fa fa-add"
            tooltipText="Add New Category"
            buttoClick={(e) => onbuttonClick(e)}
          >
            <div className="px-3 py-3">
              <Row>
                {categoryList.length > 0 &&
                  categoryList.map((data, i) => (
                    <Col key={i} md={12} className="mt-2 mb-2">
                      <Card className="shadow-sm">
                        <Card.Body>
                          <Row>
                            <Col md={3} lg={2}>
                              <Card.Img variant="top" src={common.imageUrl + data?.image} style={{ height: 100, maxWidth: "100%" }} />
                            </Col>
                            <Col md={9} lg={10} >
                              <div className="d-inline-block me-2 mt-4 fw-bold" style={{ cursor: "pointer" }} onClick={(e) => onCategoryClick(data)}>
                                {data?.categoryName}
                              </div>
                              <div className="d-inline-block float-end">
                                <Button variant="default" size="sm" onClick={(e) => onCategoryClick(data)}>
                                  <i className="fa fa-folder-tree"></i>
                                </Button>

                                <Button variant="default" size="sm" onClick={(e) => onEditClick(data)}>
                                  <i className="fa fa-edit"></i>
                                </Button>
                                <Button variant="default" size="sm" onClick={(e) => onDeleteClick(data)}>
                                  <i className="fa fa-trash"></i>
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(Category, ["ADMIN"]);
