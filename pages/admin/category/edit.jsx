/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";
import common from "../../../utils/commonService";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import ImageUploader from "../../../components/imageUploader";

const EditCategoryPage = () => {
  const router = useRouter();
  const [image, setImage] = useState("");

  const formik = useFormik({
    initialValues: {
      userid: "",
      categoryName: "",
      id: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      editCategory(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem("category")) {
      const data = JSON.parse(sessionStorage.getItem("category"));
      formik.setFieldValue("categoryName", data.categoryName);
      formik.setFieldValue("id", data.id);
      setImage(data.image);
    } else {
      router.push("/admin/category");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editCategory = async (category) => {
    category.userid = getCookie("userid");
    //  console.log(category);

    try {
      let resp = await axios.post("admin/update-category", category);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Category Updated Successfully");
      } else {
        toast.error("Fail");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const imageLoaded = (data) => {
    console.log(data);
    // setImageData({ ...imageData, productImage: data });
  };

  const onImageChange = () => {

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
            <Breadcrumb.Item active>Edit Category</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Category" activeLink={8} enableBack={true}>
            <div id="editTabs" className="py-3 px-5">
              <Tabs defaultActiveKey="name" id="uncontrolled-tab" className="mb-3 nav-fill">
                <Tab eventKey="name" title="Category Name">
                  <Row>
                    <Col>
                      <Form onSubmit={formik.handleSubmit}>
                        <Row>
                          <Col>
                            <Form.Group className="mb-2 position-relative" controlId="categoryName">
                              <Form.Label className="fw-bold">Category Name:</Form.Label>
                              <Form.Control
                                type="text"
                                name="categoryName"
                                placeholder="Enter Category Name"
                                value={formik.values.categoryName}
                                onChange={formik.handleChange}
                                className={formik.touched.categoryName && formik.errors.categoryName ? "is-invalid" : ""}
                              />
                              <Form.Control.Feedback type="invalid">{formik.errors.categoryName}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group controlId="submitButton" className="text-center mt-5">
                          <Button variant="deep-purple-900" type="submit" style={{ width: '120px' }}>
                            Update
                          </Button>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="image" title="Category Image">
                  <Row>
                    <Col xs={6} lg={4}>
                      <div className="uploader-container border border-danger mb-2">
                        <div className="pe-1 pt-1 pb-1 image-container">
                          <img src={common.imageUrl + image} alt={"xx"} className="img-responsive-uploader" />
                          <div className="top-right" >
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6} lg={3} className={"uploader-container "}>
                      <button type="button" className="btn" >
                        <div className="image-container">
                          <img src="/img/browse_ic.svg" alt="" className="img-responsive-uploader" />
                          <div className="centered text-nowrap">Upload Your Image(s)</div>
                        </div>
                      </button>
                      <input
                        type="file"
                        className="custom-file-input"
                        accept={"image/png,image/jpg,image/jpeg"}
                        // id={`img${id}`}
                        multiple={true}
                        onChange={onImageChange}
                      // hidden={true}
                      />
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(EditCategoryPage, ['ADMIN']);
