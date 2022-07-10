/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Button, Card, Col, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import Layout from "../../components/Layout/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "../../utils/axios.interceptor";
import Link from "next/link";
const SignUp = () => {
  const router = useRouter();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const [submitted, setSubmitted] = useState(false);
  const [returnUrl, setReturnUrl] = useState("/");

  useEffect(() => {
    if (!router.isReady) {
      return;
    } else {
      const query = router.query;
      if (query?.returnUrl !== undefined) {
        setReturnUrl(query?.returnUrl);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      state: "",
      pincode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email required"),
      phone: Yup.string()
        .required("Phone Number required")
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Phone number is not valid")
        .max(10, "Phone number is not valid"),
      state: Yup.string().required("State is required"),
      pincode: Yup.number().required("Pin Code is required"),
      password: Yup.string().required("Password is required").min(4, "Minimum 4 characters needed"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));
       setSubmitted(true);
        await onRegister(values);
       setSubmitted(false);
    },
  });

  async function onRegister(values) {

   const sendData = {
      name: values.name,
      email: values.email,
      phone: parseInt(values.phone),
      state: values.state,
      pincode: parseInt(values.pincode),
      password: values.password,
      address1:'ted'

    }

    try {
      let d = await axios.post("api/register", sendData);
      let data = d.data;
      console.log(data)

      toast.success("Registration Successful");
     // router.replace(returnUrl);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  }

  return (
    <>
      <Layout title="Registration Page" showNav={false} showFooter={false} metaDescription={[{ name: "description", content: "Registration" }]}>
        <div className="container" style={{ height: "100vh" }}>
          <Row className="justify-content-center align-items-center h-100">
            <Col md={10}>
              <Card className="shadow-6">
                <Card.Body className="p-0">
                  <Row>
                    <Col md={6}>
                      <div className="login_logo"></div>
                    </Col>
                    <Col md={6}>
                      <div className="p-2 ps-5 pe-5 mb-5">
                        <Row className="mb-3">
                          <Col className="text-center">
                            <Link href="/" passHref>
                              <Image src="/logo/logo.png" alt="Logo" width={120} height={70} style={{ cursor: "pointer" }}></Image>
                            </Link>
                          </Col>
                        </Row>
                        <Row className="mt-3 mb-3">
                          <Col className="text-center">
                            <div className="d-block fs-5">
                              <span className="border-bottom  border-color-deep-purple-900">Registration</span>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form onSubmit={formik.handleSubmit}>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-2 position-relative" controlId="name">
                                    <Form.Label className="fw-bold">Your Name:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="name"
                                      placeholder="Enter Your Name"
                                      value={formik.values.name}
                                      onChange={formik.handleChange}
                                      className={formik.touched.name && formik.errors.name ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <Form.Group className="mb-2 position-relative" controlId="password">
                                    <Form.Label className="fw-bold">password:</Form.Label>
                                    <Form.Control
                                      type="password"
                                      name="password"
                                      placeholder="Enter Password"
                                      value={formik.values.password}
                                      onChange={formik.handleChange}
                                      className={formik.touched.password && formik.errors.password ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <Form.Group className="mb-2 position-relative" controlId="confirmPassword">
                                    <Form.Label className="fw-bold">Confirm Password:</Form.Label>
                                    <Form.Control
                                      type="password"
                                      name="confirmPassword"
                                      placeholder="Enter Password"
                                      value={formik.values.confirmPassword}
                                      onChange={formik.handleChange}
                                      className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-2 position-relative" controlId="email">
                                    <Form.Label className="fw-bold">Email Address:</Form.Label>
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      placeholder="Email address"
                                      value={formik.values.email}
                                      onChange={formik.handleChange}
                                      className={formik.touched.email && formik.errors.email ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-2 position-relative" controlId="phone">
                                    <Form.Label className="fw-bold">Phone No:</Form.Label>
                                    <Form.Control
                                      type="phone"
                                      name="phone"
                                      placeholder="Phone No."
                                      value={formik.values.phone}
                                      onChange={formik.handleChange}
                                      maxLength="10"
                                      className={formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-2 position-relative" controlId="state">
                                    <Form.Label className="fw-bold">State Name:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="state"
                                      placeholder="Enter State Name"
                                      value={formik.values.state}
                                      onChange={formik.handleChange}
                                      className={formik.touched.state && formik.errors.state ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>

                                <Col md={6}>
                                  <Form.Group className="mb-2 position-relative" controlId="pincode">
                                    <Form.Label className="fw-bold">Pin code:</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="pincode"
                                      placeholder="Enter Pin Code"
                                      value={formik.values.pincode}
                                      onChange={formik.handleChange}
                                      className={formik.touched.pincode && formik.errors.pincode ? "is-invalid" : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.pincode}</Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group controlId="submitButton" className="d-grid gap-2 ps-3 pe-3 mt-4">
                                <Button variant="deep-purple-900" type="submit" className="text-white">
                                  Signup
                                  {submitted ? <span className="spinner-border spinner-border-sm me-1 ms-2"></span> : null}
                                </Button>
                              </Form.Group>
                            </Form>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
