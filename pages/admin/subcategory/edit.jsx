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

const EditCategoryPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userid: "",
      subcategoryName: "",
      id: "",
    },
    validationSchema: Yup.object({
      subcategoryName: Yup.string().required("Enter Subcategory Name"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      editSubcategory(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem("subcategory")) {
      const data = JSON.parse(sessionStorage.getItem("subcategory"));
      formik.setFieldValue("subcategoryName", data.subcategoryName);
      formik.setFieldValue("id", data.id);
    } else {
      router.push("/admin/category");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editSubcategory = async (subcategory) => {
    subcategory.userid = getCookie("userid");
      console.log(subcategory);

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
            <Breadcrumb.Item active>Edit Subcategory</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Subcategory" activeLink={8} enableBack={true}>
            <div className="py-3 px-5">
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
                      <Button variant="deep-purple-900" type="submit" style={{width:'120px'}}>
                        Update
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
export default withAuth(EditCategoryPage,['ADMIN']);
