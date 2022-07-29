import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../utils/axios.interceptor";

const FaecetSearch = ({ onSearch, onClearSearch }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

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
          item.push({ value: data[i].id, label: data[i].subcategoryName });
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
    const item = [];
    setSubcategoryList(item);
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
            {subcategoryList.length === 0 ? (
              <ul>
                {categoryList.length > 0 &&
                  categoryList.map((data, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setCategoryName(data.label);
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
            ) : (
              <>
                <span className="me-2 ms-2" style={{ cursor: "pointer" }} onClick={clearSubcategory}>
                  <i className="fa fa-angle-down"></i>
                </span>
                <span> {categoryName}</span>
                <ul className="ms-3">
                  {subcategoryList.length > 0 &&
                    subcategoryList.map((data, i) => {
                      return <li key={i}>{data.label}</li>;
                    })}
                </ul>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default FaecetSearch;
