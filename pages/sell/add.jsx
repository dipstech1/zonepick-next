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
import axios from "../../services/axios.interceptor";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Select from "react-select";

const AddAdvtPage = () => {
  const router = useRouter();

  const [productOptions, setProductOptions] = useState([]);

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
      item_description: "Test35",
      productId: "",
      product_status: "",
      price: "",
      purpose: "",
      quantity: "",
      seller_details: "",
    },
    validationSchema: Yup.object({
      productId: Yup.string().required("Select a Product Name"),
      product_status: Yup.string().required("Select a Product Status"),
      price: Yup.number().required("Enter Price").min(1, "Must be greater than 0"),
      purpose: Yup.string().required("Select a Product Purpose"),
      quantity: Yup.number().required("Enter Quantity").min(1, "Must be greater than 0"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      addProduct(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getparentProductList();
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

  const addProduct = async (product) => {
    // let sendData = values

    product.seller_details = getCookie("userid");
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
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="product_status">
                          <Form.Label className="fw-bold">Status:</Form.Label>
                          <Select
                            options={statusOptions}
                            placeholder="Select Product Status"
                            defaultValue={formik.values.product_status}
                            onChange={(selectedOption) => {
                              formik.setFieldValue("product_status", selectedOption.value);
                            }}
                            className={formik.touched.product_status && formik.errors.product_status ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.product_status}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
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
