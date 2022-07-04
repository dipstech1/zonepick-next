import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout/layout';
import axios from "../../utils/axios.interceptor";
 const Category = () => {
  

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryItems();
  }, []);

  const getCategoryItems = async () => {
    try {
      let resp = await axios.get("category/categories");
      if (resp.data.length > 0) {
        setCategoryList(resp.data);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  
  return (
    <>
      <Layout title="Category">
        <div id='pageContainer' className='container d-flex align-items-center justify-content-center'>

        <div className="">
              <h4>Page Under Construction</h4>
            </div>

        </div>
      </Layout>
    </>
  );
}

export default Category