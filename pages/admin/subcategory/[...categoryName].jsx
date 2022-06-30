/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import { toast } from "react-toastify";
import axios from "../../../services/axios.interceptor";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const SubCategoryPage = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [categoryName, setcategoryName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  useEffect(() => {
    if (!router.isReady) return;
    const categoryName = router.query["categoryName"];

    console.log(categoryName);

    

    const userId = getCookie("userid");
    setUserId(userId);

    if (router.query["categoryName"]) {
      setcategoryName(categoryName)
      getSubcategoryItems(categoryName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }

   /* try {
      let resp = await axios.get("category/all");
      if (resp.data.length > 0) {
        const data = resp.data;
        const filterData = data.filter((item) => {
          return item.categoryName.toString() === categoryName.toString();
        });

        if (filterData) {
          setCategoryId(filterData[0]["id"]);
          setSubcategoryList([...filterData[0]["subcategories"]]);
        }
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }*/
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
        let res = await axios.delete("admin/delete-subcategory", {data:sendData});
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
    sessionStorage.setItem("categoryId", categoryId);
    router.push("add");
  };

  const onEditClick = (item) => {
    sessionStorage.setItem("subcategory", JSON.stringify(item));
    router.push("edit");
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
            <Link href="/admin/subcategory" passHref>
              <Breadcrumb.Item>Subcategory</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{router.query["categoryName"]}</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout
            title={"Subcategory(s) of " + router.query["categoryName"]}
            activeLink={9}
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
                    <Col key={i} md={6} className="mt-2 mb-2">
                      <Card className="shadow-sm">
                        <Card.Body className="text-center">
                          <div className="d-inline-block fs-5">{data?.subcategoryName}</div>
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
export default withAuth(SubCategoryPage);
