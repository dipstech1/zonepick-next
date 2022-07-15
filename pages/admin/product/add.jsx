/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../components/Account/myaccount";
import ImageUploader from "../../../components/image";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";

const AddProductPage = () => {
  const router = useRouter();
  const [step, setStep] = useState({
    currentStep: 1,
    completeStep: 1,
  });

  const components = {
    DropdownIndicator: null,
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      subcategory: "",
      price: "",
      brand: "",
      userid: "",
      arimageurl: "",
      arimagedata: "",
      images: [{ url: "phone.png" }, { url: "phonesize.png" }],
      specifications: [],
      specificationsValue: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Product Name").min(2, "Must be at least 2 characters"),
      brand: Yup.string().required("Enter Brand Name").min(2, "Must be at least 2 characters"),
      price: Yup.number().required("Enter Price").min(1, "Must be greater than 0"),
      description: Yup.string().required("Enter Description").min(5, "Must be at least 5 characters"),
      category: Yup.string().required("Select a Category"),
      subcategory: Yup.string().required("Select a Subcategory"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setStep({ ...step, completeStep: 2, currentStep: 2 });

      // formik.resetForm();
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategorytList();
  }, []);

  const getCategorytList = async () => {
    try {
      let resp = await axios.get("category/categories");
      if (resp.data.length > 0) {
        const item = [];
        for (let i = 0; i < resp.data.length; i++) {
          item.push({ value: resp.data[i].id, label: resp.data[i].categoryName });
        }
        setCategoryOptions([...item]);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getSubcategorytList = async (categoryName) => {
    try {
      const sendData = {
        category: categoryName,
      };
      let resp = await axios.post("category", sendData);
      if (resp.data.length > 0) {
        const data = resp.data[0].subcategories;
        const item = [];
        for (let i = 0; i < data.length; i++) {
          item.push({ value: data[i].id, label: data[i].subcategoryName });
        }
        setSubcategoryOptions([...item]);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const udpdateStep = (i) => {
    console.log(step.completeStep + "----" + i);

    if (step.completeStep === 1 && i < 2) {
      setStep({ ...step, currentStep: 1 });
    }

    if (step.completeStep === 2 && i < 3) {
      if (i == 1) {
        setStep({ ...step, currentStep: 1 });
      } else {
        setStep({ ...step, currentStep: 2 });
      }
    }

    if (step.completeStep === 3) {
      setStep({ ...step, currentStep: i });
    }
  };

  const createOption = (label) => ({
    label: label,
    value: label,
    spec: label,
  });

  const handleKeyDown = (event) => {
    // const { inputValue, value } = this.state;
    // if (!inputValue) return;

    const value = formik.values.specifications || [];

    const inputValue = formik.values.specificationsValue;
    switch (event.key) {
      case "Enter":
      case "Tab":
        // console.group("Value Added");
        // console.log(value);
        // console.groupEnd();
        value.push(createOption(inputValue));
        formik.setFieldValue("specifications", value);
        event.preventDefault();
    }
  };

  const getCategoryData = () => {
    const data = categoryOptions.filter((e) => {
      return e.value === parseInt(formik.values.category);
    });

    // console.log(data);

    return data;
  };

  const getSubategoryData = () => {
    const data = subcategoryOptions.filter((e) => {
      return e.value === parseInt(formik.values.subcategory);
    });

    return data;
  };

  const onNextClick = () => {
    setStep({ ...step, completeStep: 3, currentStep: 3 });
  };

  const imageLoaded = (data) => {
    console.log(data);
  };

  const image360Loaded = (data) => {
    console.log(data);
  };

  const onSubmitClick = async () => {
    let product = {
      name: formik.values.name,
      description: formik.values.description,
      category: formik.values.category,
      subcategory: formik.values.subcategory,
      price: formik.values.price,
      brand: formik.values.brand,
      userid: "",
      arimageurl: "",
      arimagedata: "",
      images: [{ url: "phone.png" }, { url: "phonesize.png" }],
      specifications: formik.values.specifications,
    };
    product.userid = getCookie("userid");

    try {
      let added = await axios.post("admin/create-product-entry", product);

      if (added.data.acknowledge) {
        router.replace('/admin/product');
        toast.success("Product added Successfully");
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
      <Layout title="Add Product" metaDescription={[{ name: "description", content: "Add Product" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/admin/product" passHref>
              <Breadcrumb.Item>Product</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Add Product" activeLink={10} enableBack={true}>
            <div className="step-form">
              <ul>
                <li
                  className={step.currentStep === 1 || step.currentStep === 2 || step.currentStep === 3 ? "active" : "deactive"}
                  onClick={() => udpdateStep(1)}
                >
                  Product Details
                </li>
                <li className={step.currentStep === 2 || step.currentStep === 3 ? "active" : "deactive"} onClick={() => udpdateStep(2)}>
                  Photos
                </li>
                <li className={step.currentStep === 3 ? "active" : "deactive"} onClick={() => udpdateStep(3)}>
                  Preview
                </li>
              </ul>
            </div>
            <div className="px-md-5 px-2 py-3">
              {step.currentStep === 1 ? (
                <Container>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="name">
                          <Form.Label className="fw-bold">Product Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Product Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={formik.touched.name && formik.errors.name ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-2 position-relative" controlId="brand">
                          <Form.Label className="fw-bold">Brand Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name="brand"
                            placeholder="Enter Brand Name"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            className={formik.touched.brand && formik.errors.brand ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.brand}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="description">
                          <Form.Label className="fw-bold">Description:</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="description"
                            rows={3}
                            placeholder="Description"
                            style={{ resize: "none" }}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className={formik.touched.description && formik.errors.description ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-2 position-relative" controlId="category">
                          <Form.Label className="fw-bold">Category:</Form.Label>
                          <Select
                            menuPlacement="top"
                            options={categoryOptions}
                            placeholder="Select Category"
                            value={getCategoryData()}
                            onChange={(selectedOption) => {
                              getSubcategorytList(selectedOption.label);
                              formik.setFieldValue("category", selectedOption.value);
                              formik.setFieldValue("subcategory", "");
                            }}
                            className={formik.touched.category && formik.errors.category ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2 position-relative" controlId="subcategory">
                          <Form.Label className="fw-bold">Subcategory:</Form.Label>
                          <Select
                            menuPlacement="top"
                            options={subcategoryOptions}
                            placeholder="Select Subcategory"
                            value={getSubategoryData()}
                            onChange={(selectedOption) => {
                              formik.setFieldValue("subcategory", selectedOption.value);
                            }}
                            className={formik.touched.subcategory && formik.errors.subcategory ? "is-invalid" : ""}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.subcategory}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2 position-relative" controlId="specifications">
                          <Form.Label className="fw-bold">Specifications:</Form.Label>
                          <CreatableSelect
                            components={components}
                            inputValue={formik.values.specificationsValue}
                            isClearable
                            isMulti
                            menuIsOpen={false}
                            onChange={(selectedOption) => {
                              //console.log(selectedOption)
                              formik.setFieldValue("specifications", selectedOption);
                            }}
                            onInputChange={(selectedOption) => {
                              // console.log(selectedOption);
                              formik.setFieldValue("specificationsValue", selectedOption);
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Type specifications and press enter"
                            value={formik.values.specifications}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.specifications}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="submitButton" className="float-end mt-3">
                      <Button variant="deep-purple-900" type="submit">
                        Next
                      </Button>
                    </Form.Group>
                  </Form>
                </Container>
              ) : null}

              {step.currentStep === 2 ? (
                <Container>
                  <Row>
                    <Col id={"editTabs"} >                      
                      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 nav-fill">
                        <Tab eventKey="home" title="Product Image">
                          <ImageUploader maxUpload={5} info={"Add Product Photos"} onSelectionChanged={imageLoaded} id={"normal"}></ImageUploader>
                        </Tab>
                        <Tab eventKey="profile" title={"360  Image"}>
                          <ImageUploader maxUpload={2} info={"Add 360  Photos"} onSelectionChanged={image360Loaded} id={"img360"}></ImageUploader>
                        </Tab>
                        <Tab eventKey="contact" title="3d Model">
                          CC
                        </Tab>
                      </Tabs>                     
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={12}>
                      <div className="float-end">
                        <Button
                          variant="pink-700 me-2"
                          type="button"
                          onClick={() => {
                            setStep({ ...step, currentStep: 1 });
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="deep-purple-900 ms-1"
                          type="button"
                          onClick={(e) => {
                            onNextClick();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              ) : null}

              {step.currentStep === 3 ? (
                <Container className="ms-md-5">
                  <Row>
                    <Col md={12} className="mt-2">
                      <b>Product Name:</b> {formik.values.name}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-2">
                      <b>Brand:</b> {formik.values.brand}
                    </Col>

                    <Col md={6} className="mt-2">
                      <b>Price:</b> {formik.values.price}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-2">
                      <b>Category:</b> {getCategoryData()[0].label}
                    </Col>
                    <Col md={6} className="mt-2">
                      <b>Subcategory:</b> {getSubategoryData()[0].label}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mt-2">
                      <b>Description:</b> {formik.values.description}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mt-2">
                      <b>Specifications:</b>
                      <ul>
                        {formik.values.specifications.length > 0 &&
                          formik.values.specifications.map((data, i) => {
                            return <li key={i}>{data.value}</li>;
                          })}
                      </ul>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={12}>
                      <div className="float-end">
                        <Button
                          variant="pink-700 me-2"
                          type="button"
                          onClick={() => {
                            setStep({ ...step, currentStep: 2 });
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="deep-purple-900 ms-1"
                          type="button"
                          onClick={(e) => {
                            onSubmitClick();
                          }}
                        >
                          Add Product
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              ) : null}
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddProductPage,['ADMIN']);
