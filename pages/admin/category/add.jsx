/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const AddCategoryPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userid: "",
      categoryName: "",
      subcategories: [],
    },
    validationSchema: Yup.object({
        categoryName: Yup.string().required("Enter Category Name"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      addCategory(values);
    },
  });

  useEffect(() => {

    

    window.scrollTo(0, 0);
  }, []);

  const addCategory = async (category) => {
    
    category.userid = getCookie("userid");
    console.log(category);

    try {
      let resp = await axios.post("admin/create-category", category);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Category added Successfully");
      } else {
        toast.error("Fail");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  return (
    <>
      <Layout title="Add Category" metaDescription={[{ name: "description", content: "Add Category" }]}>
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
            <Breadcrumb.Item active>Add Category</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Add Category" activeLink={8} enableBack={true}>
            <div className="py-3 px-5">
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
                      <Button variant="deep-purple-900" type="submit" style={{width:'120px'}}>
                        Add
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddCategoryPage,['ADMIN']);
