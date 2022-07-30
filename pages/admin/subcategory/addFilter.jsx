import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const AddFilterPage = ({ info, onSaveData, onDelete, index }) => {
  const formiks = useFormik({
    initialValues: {
      tempId: 0,
      filterName: "",
      options: [],
      optionsValue: "",
    },
    validationSchema: Yup.object({
      filterName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
     // console.log(JSON.stringify(values, null, 2));
       onSaveData(values, index);
    },
  });

  useEffect(() => {
    formiks.setFieldValue("tempId", info.tempId || 0);
    formiks.setFieldValue("filterName", info.filterName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const onDeleteClick = () => {
    onDelete(info);
  };


  const createOption = (label) => ({
    label: label,
    value: label,
    name: label,
  });

  const handleKeyDown = (event) => {
    // const { inputValue, value } = this.state;
    // if (!inputValue) return;

    const value = formiks.values.options || [];

    const inputValue = formiks.values.optionsValue;
    switch (event.key) {
      case "Enter":
      case "Tab":
        // console.group("Value Added");
        // console.log(value);
        // console.groupEnd();
        value.push(createOption(inputValue));
        formiks.setFieldValue("options", value);
        event.preventDefault();
    }
  };

  return (
    <>
      <Card className="shadow-sm mb-2">
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-2 position-relative" controlId="categoryName">
                  <Form.Label className="fw-bold">Filter Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="filterName"
                    placeholder="Enter Filter Name"
                    value={formiks.values.filterName}
                    onChange={formiks.handleChange}
                    className={formiks.touched.filterName && formiks.errors.filterName ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">{formiks.errors.filterName}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-2 position-relative" controlId="options">
                  <Form.Label className="fw-bold">Options:</Form.Label>
                  <CreatableSelect
                    components={components}
                    inputValue={formiks.values.optionsValue}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(selectedOption) => {
                      //console.log(selectedOption)
                      formiks.setFieldValue("options", selectedOption);
                    }}
                    onInputChange={(selectedOption) => {
                      // console.log(selectedOption);
                      formiks.setFieldValue("optionsValue", selectedOption);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type options and press enter"
                    value={formiks.values.options}
                  />
                  <Form.Control.Feedback type="invalid">{formiks.errors.options}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="submitButton" className="text-center mt-3">
              <Button
                variant="danger"
                type="button"
                size="sm"
                className="me-2"
                style={{ width: 100, fontSize: "0.70rem" }}
                onClick={() => onDeleteClick(index)}
              >
                Remove
              </Button>
              <Button
                variant="success"
                type="button"
                size="sm"
                style={{ width: 100, fontSize: "0.70rem" }}
                onClick={formiks.handleSubmit}
              >
                Save
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddFilterPage;
