import { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useFormik } from "formik";
import { Breadcrumb, Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../utils/axios.interceptor";

const components = {
  DropdownIndicator: null,
};

const ProductFilter = ({ onSearch, onClearSearch }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      category: "",
      subcategory: "",
      optionalField1: [
        {
          label: 'Amoled',
          value: 'Amoled',
          spec: 'Amoled',
        }
      ],
      optionalField1Value: "",
      optionalField2: [
        {
          label: 'Android',
          value: 'Android',
          spec: 'Android',
        },
        {
          label: 'iOS',
          value: 'iOS',
          spec: 'iOS',
        }
      ],
      optionalField2Value: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Select a Category"),
      subcategory: Yup.string().required("Select a Subcategory"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));

      const optionalField1 = [];
      const optionalField2 = [];

      for (let i = 0; i < values.optionalField1.length; i++) {
        optionalField1.push(values.optionalField1[i].value);
      }

      for (let j = 0; j < values.optionalField2.length; j++) {
        optionalField2.push(values.optionalField2[j].value);
      }

      const sendData = {
        category: values.category,
        subcategory: values.subcategory,
        optionalField1: optionalField1,
        optionalField2: optionalField2,
      };

      if (onSearch instanceof Function) {
        onSearch(sendData);
      }

      //  getProducts(sendData);

      // formik.resetForm();
    },
  });

  useEffect(() => {
    getCategorytList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
     // console.log(resp.data);
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
    //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getCategoryData = () => {
    const data = categoryOptions.filter((e) => {
      return e.value === parseInt(formik.values.category);
    });

    return data;
  };

  const getSubategoryData = () => {
    const data = subcategoryOptions.filter((e) => {
      return e.value === parseInt(formik.values.subcategory);
    });

    return data;
  };

  const createOption = (label) => ({
    label: label,
    value: label,
    spec: label,
  });

  const handleKeyDownOptionalField1 = (event) => {
    const value = formik.values.optionalField1 || [];
    const inputValue = formik.values.optionalField1Value;
    switch (event.key) {
      case "Enter":
      case "Tab":
        value.push(createOption(inputValue));
        formik.setFieldValue("optionalField1", value);
        event.preventDefault();
    }
  };

  const handleKeyDownOptionalField2 = (event) => {
    const value = formik.values.optionalField2 || [];
    const inputValue = formik.values.optionalField2Value;
    switch (event.key) {
      case "Enter":
      case "Tab":
        value.push(createOption(inputValue));
        formik.setFieldValue("optionalField2", value);
        event.preventDefault();
    }
  };

  const onClearClick = () => {
    onClearSearch("Y");
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2 position-relative" controlId="category">
                  <Form.Label className="fw-bold">Category:</Form.Label>
                  <Select
                    id="category"
                    menuPlacement="bottom"
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
                    id="subcategory"
                    menuPlacement="bottom"
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
              <Col md={6}>
                <Form.Group className="mb-2 position-relative" controlId="optionalField1">
                  <Form.Label className="fw-bold">optionalField1:</Form.Label>
                  <CreatableSelect
                    id="optionalField1"
                    components={components}
                    inputValue={formik.values.optionalField1Value}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(selectedOption) => {
                      //console.log(selectedOption)
                      formik.setFieldValue("optionalField1", selectedOption);
                    }}
                    onInputChange={(selectedOption) => {
                      // console.log(selectedOption);
                      formik.setFieldValue("optionalField1Value", selectedOption);
                    }}
                    onKeyDown={handleKeyDownOptionalField1}
                    placeholder="Type optionalField1 and press enter"
                    value={formik.values.optionalField1}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.optionalField1}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2 position-relative" controlId="optionalField2">
                  <Form.Label className="fw-bold">optionalField2:</Form.Label>
                  <CreatableSelect
                    id="optionalField2"
                    components={components}
                    inputValue={formik.values.optionalField2Value}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(selectedOption) => {
                      //console.log(selectedOption)
                      formik.setFieldValue("optionalField2", selectedOption);
                    }}
                    onInputChange={(selectedOption) => {
                      // console.log(selectedOption);
                      formik.setFieldValue("optionalField2Value", selectedOption);
                    }}
                    onKeyDown={handleKeyDownOptionalField2}
                    placeholder="Type optionalField2 and press enter"
                    value={formik.values.optionalField2}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.optionalField2}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xd={12}>
                <div className='float-md-end'>
                <Button variant="danger" className="me-2" onClick={onClearClick}>
                  Clear Search
                </Button>
                <Button variant="deep-purple-900" className=" me-2" onClick={formik.handleSubmit}>
                  Search Product
                </Button>
                </div>
                
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
