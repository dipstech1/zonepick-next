import { useEffect, useState, useRef } from "react";
import { Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../utils/axios.interceptor";

const FaecetSearch = ({ onSearch, onClearSearch }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const [optionalField, setOptionalField] = useState([]);

  const [category, setCategory] = useState({
    categoryName: "",
    categoryId: "",
  });
  const [subcategory, setSubcategory] = useState({
    subcategoryName: "",
    subcategoryId: "",
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
        setCategoryList(item);
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
          item.push({ value: data[i].id, label: data[i].subcategoryName, filters: data[i].filters });
        }
        setSubcategoryList(item);
      }
      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const clearSubcategory = () => {
    setCategory({
      categoryName: "",
      categoryId: "",
    });
    setSubcategory({
      subcategoryName: "",
      subcategoryId: "",
    });

    const item = [];
    setSubcategoryList(item);
    setFilterList(item);
  };

  const clearSubcategoryFilter = () => {
    setSubcategory({
      subcategoryName: "",
      subcategoryId: "",
    });
    const item = [];
    setFilterList(item);
  };

  const showHideFilter = (e) => {
    if (e.target.nextSibling.classList) {
      if (e.target.nextSibling.classList.contains("d-block")) {
        e.target.nextSibling.classList.remove("d-block");
        e.target.nextSibling.classList.add("d-none");
        e.target.firstChild.classList.add("fa-angle-left");
        e.target.firstChild.classList.remove("fa-angle-down");
      } else {
        e.target.nextSibling.classList.add("d-block");
        e.target.nextSibling.classList.remove("d-none");
        e.target.firstChild.classList.remove("fa-angle-left");
        e.target.firstChild.classList.add("fa-angle-down");
      }
    }
  };

  const getFilterData = (data) => {
    setSubcategory({
      ...subcategory,
      subcategoryId: data.value,
      subcategoryName: data.label,
    });
    setFilterList(data.filters);

    onSearch({ category: category.categoryId, subcategory: data.value });

    const temp = [];

    setOptionalField(temp);
  };

  const buildFilter = (opName, value, label, index) => {
    // console.log(optionalField);
    const _optionalField = optionalField || [];
    const opField = optionalField[opName] || [];

    if (value === true) {
      opField.push(label);
      _optionalField[opName] = opField;
      setOptionalField(_optionalField);
    } else {
      if (opField.length === 1) {
        opField.pop();
      } else {
        opField.splice(index, 1);
      }

      _optionalField[opName] = opField;

      setOptionalField(_optionalField);
    }

    const filter = {
      category: category.categoryId,
      subcategory: subcategory.subcategoryId,
    };

    const keys = Object.keys(_optionalField);

    for (let i = 0; i < keys.length; i++) {
      if (_optionalField[keys[i]].length > 0) {
        Object.assign(filter, { [keys[i]]: _optionalField[keys[i]] });
      }
    }
    onSearch(filter);
  };

  return (
    <>
      <Card className="w-100 mt-2">
        <Card.Header className="bg-white">
          <Card.Title className="mb-0">Filter</Card.Title>
        </Card.Header>

        <Card.Body className="pt-1 search">
          <span className="fs-6 fw-bold mb-4" style={{ cursor: "pointer" }} onClick={clearSubcategory}>
            Categories
          </span>
          <div className="mt-2">
            {category.categoryName === "" ? (
              <ul>
                {categoryList.length > 0 &&
                  categoryList.map((data, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setCategory({ ...category, categoryId: data.value, categoryName: data.label });
                          getSubcategorytList(data.label);
                        }}
                      >
                        <span className="me-2">
                          <i className="fa fa-angle-left"></i>
                        </span>
                        <span> {data.label}</span>
                      </li>
                    );
                  })}
              </ul>
            ) : null}

            {category.categoryName !== "" && subcategory.subcategoryName === "" ? (
              <>
                <span className="me-2 ms-2" style={{ cursor: "pointer" }} onClick={clearSubcategory}>
                  <i className="fa fa-angle-down"></i>
                </span>
                <span> {category.categoryName}</span>
                <ul className="ms-3">
                  {subcategoryList.length > 0 &&
                    subcategoryList.map((data, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            getFilterData(data);
                          }}
                        >
                          <span className="me-2">
                            <i className="fa fa-angle-left"></i>
                          </span>
                          <span> {data.label}</span>
                        </li>
                      );
                    })}
                </ul>
              </>
            ) : null}

            {category.categoryName !== "" && subcategory.subcategoryName !== "" ? (
              <div>
                <div className="ms-2">
                  <div>
                    <span className="me-2 ms-2" style={{ cursor: "pointer" }} onClick={clearSubcategory}>
                      <i className="fa fa-angle-down"></i>
                    </span>
                    <span> {category.categoryName}</span>
                  </div>

                  <div className="ms-2">
                    <span className="me-2 ms-2" style={{ cursor: "pointer" }} onClick={clearSubcategoryFilter}>
                      <i className="fa fa-angle-down"></i>
                    </span>
                    <span> {subcategory.subcategoryName}</span>
                  </div>

                  <div className="ms-3">
                    <ul>
                      {filterList.length > 0 &&
                        filterList.map((data, i) => {
                          return (
                            <li key={i}>
                              <div className="d-block mb-1" onClick={(e) => showHideFilter(e)}>
                                <i className="fa fa-angle-down ms-2 me-2"></i>
                                {data.filterName}
                              </div>
                              <div className="d-block ms-3">
                                {data?.options?.length > 0 &&
                                  data?.options.map((item, j) => {
                                    return (
                                      <div key={j}>
                                        <Form.Check
                                          inline
                                          label={item.name}
                                          name={`inline-${i}-${j}`}
                                          type={"checkbox"}
                                          id={`inline-${i}-${j}`}
                                          onChange={(e) => {
                                            const opName = "optionalField" + (i + 1);
                                            buildFilter(opName, e.target.checked, item.name, j);
                                          }}
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default FaecetSearch;
