import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
import { useState, useEffect } from "react";
import Axios from "services/axios.interceptor"
import { getCookie } from 'cookies-next';
let page = 0

const Dashboard = ({ data }) => {
  console.log("token data  ", data);
  let [productData, setProductData] = useState([])
  let [loading, setLoading] = useState(false)
  const [tabList, setTabList] = useState([{ title: "BUY", isActive: true }, { title: "BORROW", isActive: false }])

  const tabChange = (i) => {
    tabList.forEach((tab) => {
      tab.isActive = !tab.isActive
    });
    setTabList([...tabList]);
    getProductData()
  }

  useEffect(() => {
    getProductData()
    // setProductData(data);

  }, []);

  const getMoreProduct = () => {
    page += 1;
    getProductData()

  }

  const getProductData = async () => {
    setLoading(true)
    let activeTab = tabList.find(t => t.isActive);
    let url = activeTab.title === "BUY" ? "products/purchase" : "products/rent";
    
    let d = await Axios.get(url,{params:{page}})
    setProductData([...productData, ...d.data.data]);
    console.log("productData ", d.data.data);
    setLoading(false)

  }


  return (
    <div className="">
      <section className="banner">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-lg-6 banner_text">
              <h2>A fresh approach to shopping <span>Absolutely. Positively. Perfect.</span></h2>
              <div className="input-group mt-3 mt-lg-4">
                <input type="search" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                <span className="input-group-text"><i className="fas fa-search"></i></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-3 py-lg-5">
        <div className="container">
          <div className="row m-0">
            <div className="col-12 col-lg-2 p-0 inner_fSelect">
              <select className="form-select" aria-label="Default select example">
                <option selected>Recommendations</option>
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
                        <a className={`nav-link ${tab.isActive === true ? 'active' : ''}`} aria-current="true" data-bs-toggle="tab" href="#buy">{tab.title}</a>
                      </li>
                    )
                  })}

                </ul>
              </div>
              <div className="card-body tab-content p-0 pt-4 pb-4">
                <div className="tab-pane active" id="buy">
                  <div className="row m-0">
                    {
                      productData.length > 0 && productData.map((product, i) => {
                        return (
                          <div key={i} className="col-12 col-lg-4 mb-3 plr-3">
                            <ProductCard productDetails={product}/>
                          </div>
                        )
                      })
                    }

                  </div>
                  <div className="col-12 text-center" onClick={getMoreProduct}>
                    <a href="javascript:void(0);" className="load_more">See More <img src="/img/load_more.svg" width="20px" /></a>
                  </div>
                </div>
                <div className="tab-pane" id="borrow">
                  <p className="card-text text-center py-5">No Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// export async function getStaticProps(){
//   console.log("server getStaticProps token ", ctx);
//   return {
//       props:{

//       }
//   }
// }

// export async function getServerSideProps({ req, res }) {

//   console.log("request ", req.cookies)

//   if (!req.cookies.token) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/account/login",
//       },
//       props: {},
//     };
//   }

//   let data = await Axios.get("products/purchase", {
//     headers: { Authorization: `Bearer ${req.cookies.token}` }
//   })
//   console.log("data asdasd ", data.data);
//   return { props: { data: data.data } };
// }



export default authPage(Dashboard)