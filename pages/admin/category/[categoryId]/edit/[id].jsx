import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row, Tab, Tabs, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../../../components/Account/myaccount";
import Layout from "../../../../../components/Layout/layout";
import withAuth from "../../../../../components/withAuth";
import axios from "../../../../../utils/axios.interceptor";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import FilterData from "../../../../../components/filterData";

const EditCategoryPage = () => {
  const router = useRouter();

  const [key, setKey] = useState("home");

  const [categoryName, setcategoryName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isAddFilter, setIsAddFilter] = useState(false);
  const [isAddFilterData, setIsAddFilterData] = useState(false);
  const [filterId, setFilterId] = useState("");
  const [mode, setMode] = useState("Add");

  const formik = useFormik({
    initialValues: {
      userid: "",
      subcategoryName: "",
      id: "",
    },
    validationSchema: Yup.object({
      subcategoryName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      editSubcategory(values);
    },
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["categoryId"]) {
      if (router.query["categoryName"]) {
        setcategoryName(router.query["categoryName"]);
        getSubcategory(router.query["categoryName"]);
      } else {
        getCategory(router.query["categoryId"]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getCategory = async (categoryId) => {
    try {
      let resp = await axios.get("category/all");
      if (resp.data.length > 0) {
        const tempData = resp.data;
        const data = tempData.filter((e) => {
          return parseInt(e.id) === parseInt(categoryId);
        });
        if (data.length > 0) {
          setcategoryName(data[0].categoryName);
          getSubcategory(data[0].categoryName);
        }
      }
      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getSubcategory = async (categoryName) => {
    const sendData = {
      category: categoryName.toString(),
    };
    try {
      let resp = await axios.post("category", sendData);
      if (resp.data.length > 0) {
        if (resp.data[0].subcategories?.length > 0) {
          const subcategories = resp.data[0].subcategories;

          const tempData = subcategories.filter((e) => {
            return parseInt(e.id) === parseInt(router.query["id"]);
          });

          if (tempData.length > 0) {
            setFilterData(tempData[0].filters)
            console.log("tempData", tempData)
            formik.setFieldValue("subcategoryName", tempData[0].subcategoryName);
            formik.setFieldValue("id", tempData[0].id);
          }
        }
      }
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const editSubcategory = async (subcategory) => {
    subcategory.userid = getCookie("userid");
    //console.log(subcategory);

    try {
      let resp = await axios.post("admin/update-subcategory", subcategory);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Subcategory Updated Successfully");
      } else {
        toast.error("Fail");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const filterClick = async (e) => {
    e.preventDefault();

    let data = {
      filterName: filterName,
      subcategory: formik.values.id
    }

    try {
      let added = await axios.post(`admin/add-filter`, data);
      if (added.data.acknowledge) {
        setIsAddFilter(false);
        getSubcategory(router.query["categoryName"]);
        toast.success("Filter Added");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail")
    }
  }

  const filterDataAddClick = async (data) => {
    try {
      let resp = await axios.post("admin/add-filterdata", data);
      if (resp.data.acknowledge) {
        toast.success("Filter Data Added Successfully");
        setIsAddFilterData(false);
        getSubcategory(router.query["categoryName"]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const filterDataEditClick = async (data) => {
    try {
      let resp = await axios.post("admin/update-filterdataname", data);
      if (resp.data.acknowledge) {
        toast.success("Successfully Updated");
        isAddFilterDataClick();
        getSubcategory(router.query["categoryName"]);

      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  }

  const isAddFilterDataClick = () => {
    setIsAddFilterData(!isAddFilterData);
  };

  const onFilterEditClick = ({ id, filterName }) => {
    setIsAddFilter(true);
    setFilterName(filterName);
    setFilterId(id);
    setMode("Edit");
  }

  const handleUpdate = async () => {
    try {
      let resp = await axios.post("admin/update-filtername", { id: parseInt(filterId), filterName });
      if (resp.data.acknowledge) {
        toast.success("successfully Updated");
        setIsAddFilter(false);
        getSubcategory(router.query["categoryName"]);

      }
    } catch (error) {
      console.log(error);
      toast.error("Fail")
    }
  };

  return (
    <>
      <Layout title="Edit Category" metaDescription={[{ name: "description", content: "Edit Category" }]}>
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
            <Breadcrumb.Item active>Edit Subcategory</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title={"Edit Subcategory of " + formik.values.subcategoryName} activeLink={8} enableBack={true}>
            <div id={"editTabs"}>
              <div className="nav-no-fills">
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                  <Tab eventKey="home" title={"Details"}>
                    <Row>
                      <Col>
                        <Form onSubmit={formik.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Group className="mb-2 position-relative" controlId="subcategoryName">
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
                              Update
                            </Button>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="filter" title={"Filters"}>
                    <div className="d-block text-end mb-2">
                      <Button variant="deep-purple-900" size="sm"
                        type="button"
                        style={{ fontSize: ".90rem" }}
                        onClick={() => setIsAddFilter(!isAddFilter)}
                      >
                        {isAddFilter ? "Show Filters" : "Add New Filter"}
                      </Button>
                    </div>
                    {
                      isAddFilter ?
                        <Card>
                          <Card.Body>
                            <Row>
                              <Form.Group className="mb-2 position-relative" controlId="filter">
                                <Form.Label className="fw-bold">Filter Name:</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="filter"
                                  placeholder="Enter Filter Name"
                                  value={filterName}
                                  onChange={(e) => setFilterName(e.target.value)}
                                />
                              </Form.Group>
                            </Row>
                            {mode === "Add" ?
                              <Form.Group controlId="submitButton" className="text-center mt-5">
                                <Button variant="primary"
                                  size="sm"
                                  style={{ width: '120px' }}
                                  onClick={(e) => filterClick(e)}
                                >
                                  Add
                                </Button>
                                <Button variant="danger" className="ms-2"
                                  size="sm"
                                  style={{ width: '120px' }}
                                  onClick={() => setIsAddFilter(false)}
                                >
                                  Cancel
                                </Button>
                              </Form.Group> :
                              <Form.Group controlId="submitButton" className="text-center mt-5">
                                <Button variant="primary"
                                  size="sm"
                                  style={{ width: '120px' }}
                                  onClick={handleUpdate}
                                >
                                  Update
                                </Button>
                                <Button variant="danger" className="ms-2"
                                  size="sm"
                                  style={{ width: '120px' }}
                                  onClick={() => setIsAddFilter(false)}
                                >
                                  Cancel
                                </Button>
                              </Form.Group>
                            }
                          </Card.Body>
                        </Card>
                        :
                        filterData.length > 0 &&
                        filterData.map((filter, i) => (
                          <Row key={i} className="mb-2">
                            <Col>
                              <Card>
                                <Card.Body>
                                  <div className="d-block text-end mb-2">
                                    <Button variant="warning" size="sm"
                                      type="button"
                                      style={{ fontSize: ".80rem" }}
                                      onClick={() => setIsAddFilterData(!isAddFilterData)}
                                    >
                                      {isAddFilterData ? "Show Filter Data" : "Add New Filter Data"}
                                    </Button>
                                  </div>
                                  <div className="d-inline-block mb-2 fw-bold">
                                    Filter Name: {filter?.filterName}
                                  </div>
                                  <div className="d-inline-block float-end mb-2">
                                    <i className="fa fa-edit me-3"
                                      title="Edit Filter Name"
                                      onClick={(e) => onFilterEditClick(filter)}
                                      style={{ cursor: 'pointer' }}>
                                    </i>
                                    <i className="fa fa-trash"
                                      title="Delete Filter"
                                      style={{ cursor: 'pointer' }}>
                                    </i>
                                  </div>
                                  <FilterData key={i} isAddFilterDataClick={isAddFilterDataClick} filterDataEditClick={filterDataEditClick} filterData={filter} filterDataAddClick={filterDataAddClick} isAddFilterData={isAddFilterData} />
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        ))
                    }
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
export default withAuth(EditCategoryPage, ["ADMIN"]);
