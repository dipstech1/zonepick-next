import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
import { useState, useEffect } from "react";
import Axios from "services/axios.interceptor"
import { getCookie } from 'cookies-next';

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
    // getProductData()
    setProductData(data);

  }, []);

  const getProductData = async () => {
    setLoading(true)
    let activeTab = tabList.find(t => t.isActive);
    let url = activeTab.title === "BUY" ? "products/purchase" : "products/rent"
    let d = await Axios.get(url)
    setProductData(d.data);
    console.log("productData ", productData);
    setLoading(false)

  }


  return (
    <div className="">
      <section class="banner">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-12 col-lg-6 banner_text">
              <h2>A fresh approach to shopping <span>Absolutely. Positively. Perfect.</span></h2>
              <div class="input-group mt-3 mt-lg-4">
                <input type="search" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                <span class="input-group-text"><i class="fas fa-search"></i></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-3 py-lg-5">
        <div class="container">
          <div class="row m-0">
            <div class="col-12 col-lg-2 p-0 inner_fSelect">
              <select class="form-select" aria-label="Default select example">
                <option selected>Recommendations</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div class="row m-0 mt-4 mt-lg-5 network_wrapper">
            <div class="card border-0">
              <div class="card-header border-0">
                <ul class="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                  {tabList.map((tab, i) => {
                    return (
                      <li class="nav-item" key={i} onClick={tabChange}>
                        <a className={`nav-link ${tab.isActive === true ? 'active' : ''}`} aria-current="true" data-bs-toggle="tab" href="#buy">{tab.title}</a>
                      </li>
                    )
                  })}

                </ul>
              </div>
              <div class="card-body tab-content p-0 pt-4 pb-4">
                <div class="tab-pane active" id="buy">
                  <div class="row m-0">
                    {
                      productData.map((product, i) => {
                        return (
                          <div key={i} class="col-12 col-lg-4 mb-3 plr-3">
                            <ProductCard productDetails={product}/>
                          </div>
                        )
                      })
                    }

                  </div>
                  <div class="col-12 text-center">
                    <a href="javascript:void(0);" class="load_more">See More <img src="/img/load_more.svg" width="20px" /></a>
                  </div>
                </div>
                <div class="tab-pane" id="borrow">
                  <p class="card-text text-center py-5">No Data</p>
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

export async function getServerSideProps({ req, res }) {

  if (!req.cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
      props: {},
    };
  }

  let data = await Axios.get("products/purchase", {
    headers: { Authorization: `Bearer ${req.cookies.token}` }
  })
  console.log("data asdasd ", data.data);
  return { props: { data: data.data } };
}



export default authPage(Dashboard)