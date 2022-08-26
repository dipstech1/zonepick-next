/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../utils/axios.interceptor";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Select from "react-select";

const AddAdvtPage = () => {
  const router = useRouter();

  const [productOptions, setProductOptions] = useState([]);
  const [termsOptions, setTermsOptions] = useState([]);

  const [statusOptions, setStatusOptions] = useState([
    { value: "New", label: "New" },
    { value: "Broken", label: "Broken" },
    { value: "Need repair", label: "Need repair" },
  ]);

  const [purposeOptions, setPurposeOptions] = useState([
    { value: "Purchase", label: "Purchase" },
    { value: "Rent", label: "Rent" },
  ]);

  const [parentProductList, setparentProductList] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: "NA",
      productDetailsData: "NA2",
      itemDescription: "",
      productId: "",
      productStatus: "",
      price: "",
      purpose: "",
      quantity: "",
      sellerDetails: "",
      sellerRewardPercent: "",
      termsId: null,
      sellerDiscountPercent: "",
      taxName1: "",
      taxPercentage1: "",
      taxName2: "",
      taxPercentage2: "",
      taxName3: "",
      taxPercentage3: ""
    },
    validationSchema: Yup.object({
      productId: Yup.string().required("Required"),
      productStatus: Yup.string().required("Required"),
      price: Yup.number().required("Required").min(1, "Must be greater than 0"),
      purpose: Yup.string().required("Required"),
      quantity: Yup.number().required("Required").min(1, "Must be greater than 0"),
      itemDescription: Yup.string().required("Required"),
      sellerRewardPercent: Yup.number().required("Required").min(1, "Must be greater than 0"),
      taxName1: Yup.string().required("Required"),
      taxPercentage1: Yup.number().required("Required").min(1, "must be greater than 0"),
      taxName2: Yup.string().required("Required"),
      taxPercentage2: Yup.number().required("Required").min(1, "must be greater than 0"),
      taxName3: Yup.string().required("Required"),
      taxPercentage3: Yup.number().required("Required").min(1, "must be greater than 0"),
      termsId: Yup.number().required("Required"),
      sellerDiscountPercent: Yup.number().required("Required")
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      addProduct(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getparentProductList();
    getTermsList();
  }, []);

  const getparentProductList = async () => {
    try {
      let resp = await axios.get("products/lookup");
      if (resp.data.length > 0) {
        setparentProductList([...resp.data]);
        const item = [];

        for (let i = 0; i < resp.data.length; i++) {
          item.push({ value: resp.data[i].productId, label: resp.data[i].name });
        }
        //  console.log(item);

        setProductOptions([...item]);
      }
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getTermsList = async () => {
    try {
      let res = await axios.get("terms");
      if (res.data.length > 0) {
        const item = [];
        for (let i = 0; i < res.data.length; i++) {
          item.push({ value: res.data[i].id, label: res.data[i].termsName })
          setTermsOptions([...item]);
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("fail");
    }
  }

  const addProduct = async (product) => {
    // let sendData = values

    product.sellerDetails = getCookie("userid");
    console.log(product);

    try {
      let added = await axios.post("products", product);

      if (added.data.acknowledge) {
        router.back();
        toast.success("Advt. added Successfully");
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
      <Layout title="Post new Advt." metaDescription={[{ name: "description", content: "Post new Advt." }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/sell/add" passHref>
              <Breadcrumb.Item>My Listing</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Post New Advt.</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Post new Advt." activeLink={5} enableBack={true}>
            <div className="py-3 px-5">
              <Row>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="productId">
                          <Form.Label className="fw-bold">Product Name:</Form.Label>
                          <Select
                            options={productOptions}
                            placeholder="Select Product Name"
                            defaultValue={formik.values.productId}
                            onChange={(selectedOption) => {
                              formik.setFieldValue("productId", selectedOption.value);
                            }}
                            className={formik.touched.productId && formik.errors.productId ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.productId}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-2 position-relative" controlId="productStatus">
                          <Form.Label className="fw-bold">Status:</Form.Label>
                          <Select
                            options={statusOptions}
                            placeholder="Select Product Status"
                            defaultValue={formik.values.productStatus}
                            onChange={(selectedOption) => {
                              formik.setFieldValue("productStatus", selectedOption.value);
                            }}
                            className={formik.touched.productStatus && formik.errors.productStatus ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.productStatus}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2 position-relative" controlId="purpose">
                          <Form.Label className="fw-bold">Purpose:</Form.Label>
                          <Select
                            options={purposeOptions}
                            placeholder="Select Product Purpose"
                            defaultValue={formik.values.purpose}
                            onChange={(selectedOption) => {
                              formik.setFieldValue("purpose", selectedOption.value);
                            }}
                            className={formik.touched.purpose && formik.errors.purpose ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.purpose}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-2 position-relative" controlId="purpose">
                          <Form.Label className="fw-bold">Terms Name:</Form.Label>
                          <Select
                            options={termsOptions}
                            placeholder="Select Terms"
                            defaultValue={formik.values.termsId}
                            onChange={(selectedOption) => {
                              formik.setFieldValue("termsId", selectedOption.value);
                            }}
                            className={formik.touched.termsId && formik.errors.termsId ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.termsId}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-2 position-relative" controlId="price">
                          <Form.Label className="fw-bold">Discount Percent:</Form.Label>
                          <Form.Control
                            type="number"
                            name="sellerDiscountPercent"
                            placeholder="Enter Discount Percent"
                            value={formik.values.sellerDiscountPercent}
                            onChange={formik.handleChange}
                            className={formik.touched.sellerDiscountPercent && formik.errors.sellerDiscountPercent ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.sellerDiscountPercent}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="price">
                          <Form.Label className="fw-bold">Price:</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder="Enter Price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            className={formik.touched.price && formik.errors.price ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="quantity">
                          <Form.Label className="fw-bold">Quantity:</Form.Label>
                          <Form.Control
                            type="number"
                            name="quantity"
                            placeholder="Enter Quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.quantity && formik.errors.quantity ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.quantity}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="sellerRewardPercent">
                          <Form.Label className="fw-bold">Reward Percent:</Form.Label>
                          <Form.Control
                            type="number"
                            name="sellerRewardPercent"
                            placeholder="Enter Reward Percent"
                            value={formik.values.sellerRewardPercent}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.sellerRewardPercent && formik.errors.sellerRewardPercent ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.sellerRewardPercent}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="taxName1">
                          <Form.Label className="fw-bold">Tax Name1:</Form.Label>
                          <Form.Control
                            type="text"
                            name="taxName1"
                            placeholder="Enter Tax Name1"
                            value={formik.values.taxName1}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.taxName1 && formik.errors.taxName1 ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.taxName1}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-2 position-relative" controlId="taxName1">
                          <Form.Label className="fw-bold">Tax Percentage1:</Form.Label>
                          <Form.Control
                            type="number"
                            name="taxPercentage1"
                            placeholder="Enter Tax Percentage1"
                            value={formik.values.taxPercentage1}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.taxPercentage1 && formik.errors.taxPercentage1 ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.taxPercentage1}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="taxName2">
                          <Form.Label className="fw-bold">Tax Name2:</Form.Label>
                          <Form.Control
                            type="text"
                            name="taxName2"
                            placeholder="Enter Tax Name2"
                            value={formik.values.taxName2}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.taxName2 && formik.errors.taxName2 ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.taxName2}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-2 position-relative" controlId="taxName2">
                          <Form.Label className="fw-bold">Tax Percentage2:</Form.Label>
                          <Form.Control
                            type="number"
                            name="taxPercentage2"
                            placeholder="Enter Tax Percentage2"
                            value={formik.values.taxPercentage2}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.taxPercentage2 && formik.errors.taxPercentage2 ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.taxPercentage2}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="taxName3">
                          <Form.Label className="fw-bold">Tax Name3:</Form.Label>
                          <Form.Control
                            type="text"
                            name="taxName3"
                            placeholder="Enter Tax Name3"
                            value={formik.values.taxName3}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.taxName3 && formik.errors.taxName3 ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.taxName3}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-2 position-relative" controlId="taxName3">
                          <Form.Label className="fw-bold">Tax Percentage3:</Form.Label>
                          <Form.Control
                            type="number"
                            name="taxPercentage3"
                            placeholder="Enter Tax Percentage3"
                            value={formik.values.taxPercentage3}
                            onChange={formik.handleChange}
                            maxLength="10"
                            className={formik.touched.taxPercentage3 && formik.errors.taxPercentage3 ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.taxPercentage3}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3 mt-2 position-relative" controlId="itemDescription">
                          <Form.Control
                            as="textarea"
                            name="itemDescription"
                            rows={4}
                            placeholder="Product Description"
                            style={{ resize: "none" }}
                            value={formik.values.itemDescription}
                            onChange={formik.handleChange}
                            className={formik.touched.itemDescription && formik.errors.itemDescription ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.itemDescription}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="submitButton" className="text-center mt-5">
                      <Button variant="deep-purple-900" type="submit">
                        Add Product
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
export default withAuth(AddAdvtPage);
