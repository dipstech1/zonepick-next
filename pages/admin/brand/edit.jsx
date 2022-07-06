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

const EditBrandPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userid: "",
      brandName: "",
      id: "",
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required("Enter Brand Name"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      editBrand(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem("brand")) {
      const data = JSON.parse(sessionStorage.getItem("brand"));
      formik.setFieldValue("brandName", data.brandName);
      formik.setFieldValue("id", data.id);
    } else {
      router.push("/admin/brand");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editBrand = async (brand) => {
    brand.userid = getCookie("userid");
    //  console.log(brand);

    try {
      let resp = await axios.patch(`brand/${brand.id}`, brand);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Brand Updated Successfully");
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
      <Layout title="Edit Brand" metaDescription={[{ name: "description", content: "Edit Brand" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/admin/brand" passHref>
              <Breadcrumb.Item>Brand</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Edit Brand</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Brand" activeLink={11} enableBack={true}>
            <div className="py-3 px-5">
              <Row>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="brandName">
                          <Form.Label className="fw-bold">Brand Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name="brandName"
                            placeholder="Enter Brand Name"
                            value={formik.values.brandName}
                            onChange={formik.handleChange}
                            className={formik.touched.brandName && formik.errors.brandName ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.brandName}</Form.Control.Feedback>
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
export default withAuth(EditBrandPage,['ADMIN']);
