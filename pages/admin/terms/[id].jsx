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

const EditTermsPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userId: "",
      termsName: "",
      id: "",
    },
    validationSchema: Yup.object({
      termsName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      editTerms(values);
    },
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["id"]) {
      formik.setFieldValue("id", router.query["id"][0]);

      getDetails(router.query["id"]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getDetails = async (id) => {
    try {
      let resp = await axios.get(`terms/${id}`);
      if (resp.data) {
        formik.setFieldValue("termsName", resp.data?.termsName);
      }
    //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const editTerms = async (terms) => {
    terms.userId = getCookie("userid");
    //  console.log(terms);

    try {
      let resp = await axios.put(`terms/${terms.id}`, terms);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Terms Updated Successfully");
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
      <Layout title="Edit Terms" metaDescription={[{ name: "description", content: "Edit Terms" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/admin/terms" passHref>
              <Breadcrumb.Item>Terms</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Edit Terms</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Terms" activeLink={11} enableBack={true}>
            <div className="py-3 px-5">
              <Row>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="termsName">
                          <Form.Label className="fw-bold">Terms Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name="termsName"
                            placeholder="Enter Terms Name"
                            value={formik.values.termsName}
                            onChange={formik.handleChange}
                            className={formik.touched.termsName && formik.errors.termsName ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.termsName}</Form.Control.Feedback>
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
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(EditTermsPage, ["ADMIN"]);
