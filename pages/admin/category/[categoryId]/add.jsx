import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../../components/Account/myaccount";
import Layout from "../../../../components/Layout/layout";
import withAuth from "../../../../components/withAuth";
import axios from "../../../../utils/axios.interceptor";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import AddFilterPage from "./addFilter";

const AddCategoryPage = () => {
  const router = useRouter();
  const [key, setKey] = useState("home");

  const [filterList, setFilterList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [categoryName, setcategoryName] = useState("");

  const formik = useFormik({
    initialValues: {
      userid: "",
      id: "",
      subcategoryName: "",
      filters: [],
    },
    validationSchema: Yup.object({
      subcategoryName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      addCategory(values);
    },
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["categoryId"]) {

      formik.setFieldValue("id", parseInt(router.query["categoryId"]));

      if (router.query["categoryName"]) {
        setcategoryName(router.query["categoryName"])
      } else {
        getCategory(router.query["categoryId"]);
      }


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
        }
      }
      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const addCategory = async (subcategory) => {
    subcategory.userid = getCookie("userid");
    subcategory.filters = filters;

    try {
      let resp = await axios.post("admin/create-subcategory", subcategory);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Subcategory added Successfully");
      } else {
        toast.error("Fail");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onAddItem = () => {
    const d = new Date();
    let value = Object.assign([], filterList);

    value.push({
      tempId: d.getTime(),
      filterName: "",
      options: [],
    });

    setFilterList(value);
  };

  const onSaveItem = (data, index) => {
    let value = Object.assign([], filterList);

    value[index].filterName = data.filterName;
    value[index].options = data.options;

    setFilterList(value);

    setFilters(value);

    //  console.log(value);
  };

  const onDeleteItem = (data) => {
    let value = Object.assign([], filterList);

    const temp = value.filter((element) => {
      return element.tempId !== data.tempId;
    });

    setFilterList(temp);
    setFilters(value);
    // console.log(data)
  };

  return (
    <>
      <Layout title="Add SubCategory" metaDescription={[{ name: "description", content: "Add SubCategory" }]}>
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
            <Link href={"/admin/category/" + router.query["categoryId"]} passHref>
              <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Add Subcategory</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Add Subcategory" activeLink={8} enableBack={true}>
            <div id={"editTabs"}>
              <div className="nav-no-fills">
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                  <Tab eventKey="home" title={"Details"}>
                    <Row>
                      <Col>
                        <Form onSubmit={formik.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Group className="mb-2 position-relative" controlId="categoryName">
                                <Form.Label className="fw-bold">Subcategory Name:</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="subcategoryName"
                                  placeholder="Enter Subcategory Name"
                                  value={formik.values.subcategoryName}
                                  onChange={formik.handleChange}
                                  className={formik.touched.subcategoryName && formik.errors.subcategoryName ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.subcategoryName}</Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group controlId="submitButton" className="text-center mt-5">
                            <Button variant="deep-purple-900" type="submit" style={{ width: "120px" }}>
                              Add
                            </Button>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="filter" title={"Filters"}>
                    <div className="d-block text-end mb-2">
                      <Button variant="warning" size="sm" type="button" onClick={onAddItem} style={{ fontSize: "0.70rem" }}>
                        Add Filter
                      </Button>
                    </div>

                    {filterList.length > 0 &&
                      filterList.map((data, i) => {
                        return (
                          <div key={i}>
                            <AddFilterPage info={data} onSaveData={onSaveItem} index={i} onDelete={onDeleteItem}></AddFilterPage>
                          </div>
                        );
                      })}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddCategoryPage, ["ADMIN"]);
