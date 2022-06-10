import ProductCard from '../../components/product-card/proudct-card';
import { useState, useEffect } from 'react';
import Axios from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import Layout from '../../components/layout';
import withAuthWraper from '../../components/withAuthWraper';
let page = 0;

const Home = ({ data }) => {
  let [UserId, SetUserId] = useState();
  // const userID = getDataFromLocalstorage('userid')
  let [productData, setProductData] = useState([]);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);
  const [tabList, setTabList] = useState([
    { title: 'BUY', isActive: true },
    { title: 'BORROW', isActive: false }
  ]);

  const tabChange = (i) => {
    tabList.forEach((tab) => {
      tab.isActive = !tab.isActive;
    });
    setTabList([...tabList]);
    page = 0;
    getProductData();
  };

  useEffect(() => {
    SetUserId(getDataFromLocalstorage('userid'));
    getProductData();
    // setProductData(data); 

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreProduct = () => {
    page += 1;
    getProductData();
  };

  const getProductData = async () => {
    setLoading(true);
    let activeTab = tabList.find((t) => t.isActive);
    let url = activeTab.title === 'BUY' ? 'products/bypass/purchase' : 'products/bypass/rent';

    let d = await Axios.get(url, { params: { page } });
    console.log('productData ', d.data);

    if (d.data.total) {
      setProductData([...productData, ...d.data.data]);
      setTotal(d.data.total);
    } else {
      setProductData([]);
    }
    setLoading(false);
  };

  const addToWishList = async (data) => {
    /*data['userid'] = UserId;
    console.log(data);
    let wishlistRes = await Axios.post('wishlist', data);
    console.log(wishlistRes);

    if (wishlistRes.status == 201) {
      alert('Item added to wishlist');
    }*/
  };

  return (
    <Layout title="Dashboard">
      <div className="">
        <section className="banner">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-lg-6 banner_text">
                <h2>
                  A fresh approach to shopping <span>Absolutely. Positively. Perfect.</span>
                </h2>
                <div className="input-group mt-3 mt-lg-4">
                  <input
                    type="search"
                    className="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)"
                  />
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-3 py-lg-5">
          <div className="container">
            <div className="row m-0">
              <div className="col-12 col-lg-3 p-0 inner_fSelect">
                <select className="form-select" aria-label="Default select example" defaultValue="">
                  <option value="">Recommendations</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="row m-0 mt-4 mt-lg-5 network_wrapper">
              <div className="card border-0">
                <div className="card-header border-0">
                  <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                    {tabList.map((tab, i) => {
                      return (
                        <li className="nav-item" key={i} onClick={tabChange}>
                          <a
                            className={`nav-link ${tab.isActive === true ? 'active' : ''}`}
                            aria-current="true"
                            data-bs-toggle="tab"
                            href="#buy"
                          >
                            {tab.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="card-body tab-content p-0 pt-4 pb-4">
                  <div className="tab-pane active" id="buy">
                    <div className="row m-0">
                      {productData.length > 0 &&
                        productData.map((product, i) => {
                          return (
                            <div key={i} className="col-12 col-lg-4 mb-3 plr-3">
                              <ProductCard productDetails={product} addToWishList={addToWishList} enablewishList={'no'}/>
                            </div>
                          );
                        })}
                    </div>
                    {productData.length && total > productData.length ? (
                      <div className="col-12 text-center" onClick={getMoreProduct}>
                        <a style={{cursor:'pointer'}} className="load_more">
                          See More <img src="/img/load_more.svg" width="20px" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                  <div className="tab-pane" id="borrow">
                    {productData.length == 0 ? <p className="card-text text-center py-5">No Data</p> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
