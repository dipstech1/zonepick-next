import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../../../components/Account/myaccount";
import Layout from "../../../../../components/Layout/layout";
import withAuth from "../../../../../components/withAuth";
import axios from "../../../../../utils/axios.interceptor";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const EditTermsDetailsPage = () => {
  const router = useRouter();
  const [termsName, setTermsName] = useState("");

  const formik = useFormik({
    initialValues: {
      id: 0,
      termsId: 0,
      userId: "",
      termsDetails: "",
      termsType: "",
      termsNo: 1,
    },
    validationSchema: Yup.object({
      termsDetails: Yup.string().required("Required"),
      termsType: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      editTerms(values);
    },
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["id"]) {
      formik.setFieldValue("id", router.query["id"]);
      formik.setFieldValue("termsId", router.query["termsId"]);
      getTermsDetails(router.query["id"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getTermsDetails = async (termsDetailsId) => {
    try {
      let resp = await axios.get(`terms-details/${termsDetailsId}`);
      if (resp.data) {

        formik.setFieldValue("termsDetails", resp.data.termsDetails);
        formik.setFieldValue("termsType",  resp.data.termsType);  
        formik.setFieldValue("termsNo",  resp.data.termsNo);
        setTermsName(resp.data.terms.termsName);      
      }
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const editTerms = async (termsDetails) => {
    termsDetails.userId = getCookie("userid");

    try {
      let resp = await axios.put(`terms-details/${termsDetails.id}`, termsDetails);

      if (resp.data.acknowledge) {
        router.back();
        toast.success("Terms Details updated Successfully");
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
      <Layout title="Add Terms Details" metaDescription={[{ name: "description", content: "Add Terms" }]}>
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
            <Link href={"/admin/terms/" + router.query["termsId"]} passHref>
              <Breadcrumb.Item>{termsName}</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Edit Terms Details</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Terms Details" activeLink={12} enableBack={true}>
            <div className="py-3 px-5">
              <Row>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="termsDetails">
                          <Form.Label className="fw-bold">Terms Details:</Form.Label>
                          <Form.Control
                            type="text"
                            name="termsDetails"
                            placeholder="Enter Terms Details"
                            value={formik.values.termsDetails}
                            onChange={formik.handleChange}
                            className={formik.touched.termsDetails && formik.errors.termsDetails ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.termsDetails}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="termsType">
                          <Form.Label className="fw-bold">Terms Type:</Form.Label>
                          <Form.Control
                            type="text"
                            name="termsType"
                            placeholder="Enter Terms Type"
                            value={formik.values.termsType}
                            onChange={formik.handleChange}
                            className={formik.touched.termsType && formik.errors.termsType ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.termsType}</Form.Control.Feedback>
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
export default withAuth(EditTermsDetailsPage, ["ADMIN"]);
