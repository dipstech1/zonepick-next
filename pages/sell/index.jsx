/* eslint-disable @next/next/no-img-element */
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';
import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import ProductCard from '../../components/product-card/proudct-card';

const SellPage = () => {
  const [userId, setUserId] = useState(null);

  let [productData, setProductData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const userId = getDataFromLocalstorage('userid');
    setUserId(userId);
    getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async (userId) => {
    let res = await axiosInterceptor.get(`profile/${userId}`);
    // console.log(res);
    setProductData([...res.data[0].products]);
  };

  const addProduct = () => {
    router.push('product/addproduct');
  };

  return (
    <Layout title="Sell Page">
      <div id="pageContainer">
        <div className="container py-3">
        <div className="row m-0 justify-content-center pb-4">
            <div className="bredcamp">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb  mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                  <a>Sell</a>
                  </li>
            
                </ol>
              </nav>
            </div>
          </div>

          <div className="row m-0">
            {productData.length > 0 &&
              productData.map((product, i) => {
                return (
                  <div key={i} className="col-12 col-lg-3 mb-3 plr-3">
                    <ProductCard productDetails={product} enablewishList={'no'} />
                  </div>
                );
              })}
          </div>
          <div className="row m-2">
            <div className="col-12">
              <a
                style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
                className="btn postjob_btn"
                onClick={addProduct}
              >
                Post an advirtisement
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuthWraper(SellPage, ['admin', 'super-admin', 'user']);
