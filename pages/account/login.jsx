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
export default function Login() {
  const router = useRouter();
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
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required").min(4, "Minimum 4 characters needed"),
    }),
    onSubmit: async (values) => {
      // console.log(JSON.stringify(values, null, 2));
      setSubmitted(true);
      await onLogin(values.username, values.password);
      setSubmitted(false);
    },
  });

  async function onLogin(username, password) {
    try {
      let d = await axios.post("api/login", { email: username, password });
      let data = d.data;
      // setDataLocalStorage('token', data?.accessToken);
      //  setDataLocalStorage('userid', data?.userid);
      // setDataLocalStorage('refreshtoken', data?.refreshToken);
      setCookies("token", data?.accessToken, { maxAge: 60 * 30 });
      setCookies("userid", data?.profile[0]?.userid, { maxAge: 60 * 30 });
      setCookies("refreshtoken", data?.refreshToken, { maxAge: 60 * 30 });
      setCookies("Login", "LoggedIn", { maxAge: 60 * 30 });
      setCookies("Cart", data?.cartPending, { maxAge: 60 * 30 });
      setCookies("user_name", data?.profile[0]?.name, { maxAge: 60 * 30 });
      setCookies("user_role", data?.profile[0]?.roletype, { maxAge: 60 * 30 });
      setCookies("ethnftWalletAddress", data?.profile[0]?.ethnftWalletAddress, { maxAge: 60 * 30 });
      setCookies("polygonnftWalletAddress", data?.profile[0]?.polygonnftWalletAddress, { maxAge: 60 * 30 });

      toast.success("Login Successful");
      router.replace(returnUrl);
    } catch (error) {
      console.log(error);
      toast.error("Credentials incorrect");
    }
  }

  return (
    <>
      <Layout title="Login Page" showNav={false} showFooter={false} metaDescription={[{ name: "description", content: "Login" }]}>
        <div className="container" style={{ height: "100vh" }}>
          <Row className="justify-content-center align-items-center h-100">
            <Col md={10}>
              <Card className="shadow-6">
                <Card.Body className="p-0">
                  <Row>
                    <Col md={6}>
                      <div className="p-2 ps-5 pe-5">
                        <Row className="mb-3">
                          <Col className="text-center" >
                            <Link href="/" passHref>
                              <Image src="/logo/logo.png" alt="Logo" width={120} height={70} style={{ cursor: 'pointer' }}></Image>
                            </Link>
                          </Col>
                        </Row>
                        <Row className="mt-3 mb-3">
                          <Col className="text-center">
                            <div className="d-block fs-5">
                              <span className="border-bottom  border-color-deep-purple-900">Login</span>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form onSubmit={formik.handleSubmit}>
                              <FloatingLabel label="Email Address" className="mb-3 position-relative" controlId="username">
                                <Form.Control
                                  type="text"
                                  name="username"
                                  placeholder="Enter Email Address"
                                  value={formik.values.username}
                                  onChange={formik.handleChange}
                                  className={formik.touched.username && formik.errors.username ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                              </FloatingLabel>

                              <FloatingLabel label="Password" className="mb-3 mt-2 position-relative" controlId="password">
                                <Form.Control
                                  type="password"
                                  name="password"
                                  placeholder="Phone No."
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                  maxLength="10"
                                  className={formik.touched.password && formik.errors.password ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                              </FloatingLabel>
                              <div className="d-block mb-3 mt-2 text-muted">
                                <Form.Check type="checkbox" id="remember" label="Remember Me" />
                              </div>

                              <div className="d-block mb-3 mt-2 text-muted text-center">
                                <small className="text-muted">
                                  <span className="me-1">Don&apos;t have an account yet?</span>{" "}
                                  <Link href={"/account/signup"} passHref>
                                    <span className="text-deep-purple-900" style={{ cursor: "pointer" }}>
                                      Sign Up
                                    </span>
                                  </Link>
                                </small>
                              </div>

                              <Form.Group controlId="submitButton" className="d-grid gap-2 ps-3 pe-3">
                                <Button variant="deep-purple-900" type="submit" className="text-white">
                                  Login
                                  {submitted ? <span className="spinner-border spinner-border-sm me-1 ms-2"></span> : null}
                                </Button>
                              </Form.Group>
                            </Form>
                          </Col>
                        </Row>
                        <Row className="mt-3 mb-1">
                          <Col>
                            <small className="hr-sect">Or Login With</small>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xs={12} md={6} className="d-grid gap-2 ps-3 pe-3 mt-2">
                            <Button variant="outline-orange">
                              <i className="fa-brands fa-google me-2" aria-hidden="true"></i> Google
                            </Button>
                          </Col>
                          <Col xs={12} md={6} className="d-grid gap-2 ps-3 pe-3 mt-2">
                            <Button variant="outline-primary">
                              <i className="fa-brands fa-facebook me-2" aria-hidden="true"></i> Facebook
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="login_logo"></div>
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
}
