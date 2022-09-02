import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MyAccountLayout from "../../../../components/Account/myaccount";
import Layout from "../../../../components/Layout/layout";
import withAuth from "../../../../components/withAuth";
import axios from "../../../../utils/axios.interceptor";

const SubCategoryPage = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [categoryName, setcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  useEffect(() => {
    if (!router.isReady) return;
    const userId = getCookie("userid");
    setUserId(userId);

    if (router.query["categoryId"]) {
       getCategory(router.query["categoryId"]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getCategory = async (categoryId) => {
    try {
      let resp = await axios.get("category/categories");
      if (resp.data.length > 0) {
        const tempData = resp.data;
        const data = tempData.filter((e) => {
          return parseInt(e.id) === parseInt(categoryId);
        });

        if (data.length > 0) {
          setcategoryName(data[0].categoryName);
          getSubcategoryItems(data[0].categoryName);
        }
      }
      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getSubcategoryItems = async (categoryName) => {
    const sendData = {
      category: categoryName.toString(),
    };
    try {
      let resp = await axios.post("category", sendData);
      if (resp.data.length > 0) {
        setCategoryId(resp.data[0]["id"]);
        setSubcategoryList(resp.data[0]?.subcategories);
      }
      // console.log(resp.data);
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
        subcategoryName: item.subcategoryName,
      };

      // console.log(sendData);

      try {
        let res = await axios.delete("admin/delete-subcategory", { data: sendData });
        if (res.data.acknowledge == true) {
          getSubcategoryItems(categoryName);
          toast.success("Subcategory Deleted");
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
    router.push("" + categoryId +"/add?categoryName=" + categoryName);
  };

  const onEditClick = (item) => {
    router.push("" + categoryId +"/edit/"+ item.id +"?categoryName=" + categoryName);
  };

  return (
    <>
      <Layout title="Subcategory" metaDescription={[{ name: "description", content: "Subcategory" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/admin/category" passHref>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{categoryName}</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout
            title={"Subcategory(s) of " + categoryName}
            activeLink={8}
            enableBack={true}
            enableButton={true}
            iconClass="fa fa-add"
            tooltipText="Add New Subcategory"
            buttoClick={(e) => onbuttonClick(e)}
          >
            <div className="px-3 py-3">
              <Row>
                {subcategoryList?.length > 0 &&
                  subcategoryList?.map((data, i) => (
                    <Col key={i} md={12} className="mt-2 mb-2">
                      <Card className="shadow-sm">
                        <Card.Body>
                          <div className="d-inline-block">{data?.subcategoryName}</div>
                          <div className="d-inline-block float-end">
                            <Button variant="default" size="sm" onClick={(e) => onEditClick(data)}>
                              <i className="fa fa-edit"></i>
                            </Button>
                            <Button variant="default" size="sm" onClick={(e) => onDeleteClick(data)}>
                              <i className="fa fa-trash"></i>
                            </Button>
                          </div>
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
export default withAuth(SubCategoryPage, ["ADMIN"]);
