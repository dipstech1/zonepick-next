/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../services/axios.interceptor";

const EditProfile = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
   const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  const [userData, setUserData] = useState({
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    email: "",
    name: "",
    aboutme: "",
    phone: "",
    userId: "",
  });

  const formik = useFormik({
    initialValues: {
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      address5: "",
      email: "",
      name: "",
      aboutMe: "",
      phone: "",
      userId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Your Name").min(3, "Must be at least 3 characters"),
      phone: Yup.string()
        .required("Enter Phone Number")
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Phone number is not valid")
        .max(10, "Phone number is not valid"),
      email: Yup.string().email("Invalid email address").required("Enter Email Address"),
      aboutMe: Yup.string().required("Enter About Me").min(3, "Must be at least 3 characters"),
      address1: Yup.string().required("Enter Address-1").min(1, "Must be at least 1 characters"),
      address2: Yup.string().required("Enter Address-2").min(1, "Must be at least 1 characters"),
      address3: Yup.string().required("Enter Address-3").min(1, "Must be at least 1 characters"),
      address4: Yup.string().required("Enter Address-4").min(1, "Must be at least 1 characters"),
     // address5: Yup.string().required("Enter Address-5").min(1, "Must be at least 10 characters"),
    }),
    onSubmit: (values) => {
     // console.log(JSON.stringify(values, null, 2));
      updateProfile(values)
    },
  });

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getUserData(userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async (userId) => {
    try {
      let resp = await axios.get(`profile/${userId}`);
      if (resp.data.length > 0) {
        setUserData({ ...resp.data[0] });
        setIsLoaded(true);
        formik.setFieldValue("userId", userId);
        formik.setFieldValue("name", resp.data[0].name || '');
        formik.setFieldValue("address1", resp.data[0].address1 || '');
        formik.setFieldValue("address2", resp.data[0].address2 || '');
        formik.setFieldValue("address3", resp.data[0].address3 || '');
        formik.setFieldValue("address4", resp.data[0].address4 || '');
      //  formik.setFieldValue("address5", resp.data[0].address5);
        formik.setFieldValue("email", resp.data[0].email || '');
        formik.setFieldValue("phone", resp.data[0].phone || '');
        formik.setFieldValue("aboutMe", resp.data[0].aboutMe || '');
      }

     // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const updateProfile = async (user) => {

    user.phone = +user.phone;

    try {
      let response = await axios.patch(`profile/${userId}`, user);

      if (response.data.acknowledged) {
        toast.success('Profile Successfully Updated');
        router.back();
      } else {
        toast.warning('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const changePic = (e) => {
    console.log(e);
  };

  return (
    <>
      <Layout title="Edit Profile" metaDescription={[{ name: "description", content: "Edit Profile" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Profile" enableBack={true}>
            {isLoaded ? (
              <div className="py-3 px-5">
                <Row className="mt-2">
                  <Col className="text-center">
                    <img className="m-auto mr-lg-auto profile_img" src={"/uploads/avator/" + userData.profile_image} alt="Profile Picture" />
                  </Col>
                </Row>

                <Row className="mt-4">
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
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-2 position-relative" controlId="address1">
                          <Form.Label className="fw-bold">Address Line 1:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address1"
                              placeholder="Address Line 1"
                              style={{ resize: "none" }}
                              value={formik.values.address1}
                              onChange={formik.handleChange}
                              className={formik.touched.address1 && formik.errors.address1 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address1}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-2 position-relative" controlId="address2">
                          <Form.Label className="fw-bold">Address Line 2:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address2"
                              placeholder="Address Line 2"
                              style={{ resize: "none" }}
                              value={formik.values.address2}
                              onChange={formik.handleChange}
                              className={formik.touched.address2 && formik.errors.address2 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address2}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="address3">
                          <Form.Label className="fw-bold">Address Line 3:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address3"
                              placeholder="Address Line 3"
                              style={{ resize: "none" }}
                              value={formik.values.address3}
                              onChange={formik.handleChange}
                              className={formik.touched.address3 && formik.errors.address3 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address3}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="address4">
                          <Form.Label className="fw-bold">Address Line 4:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address4"
                              placeholder="Address Line 4"
                              style={{ resize: "none" }}
                              value={formik.values.address4}
                              onChange={formik.handleChange}
                              className={formik.touched.address4 && formik.errors.address4 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address4}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="aboutMe">
                          <Form.Label className="fw-bold">About Me:</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="aboutMe"
                              rows={4}
                              placeholder="About Me"
                              style={{ resize: "none" }}
                              value={formik.values.aboutMe}
                              onChange={formik.handleChange}
                              className={formik.touched.aboutMe && formik.errors.aboutMe ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.aboutMe}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="submitButton" className="float-end mt-3">
                        <Button variant="deep-purple-900" type="submit" style={{width:132}}>
                          Save
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </div>
            ) : null}
          </MyAccountLayout>
        </div>




      </Layout>
    </>
  );
};

export default withAuth(EditProfile, ["admin", "super-admin", "user"]);
