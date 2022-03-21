import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
import style from './dashboard.module.scss'
import { useState,useEffect} from "react";
import Axios from "services/axios.interceptor"
import { getCookie } from 'cookies-next';

const Dashboard = ({data }) => {
  console.log("token data  ", data );
  let [productData,setProductData] = useState([])
  let [loading,setLoading] = useState(false)
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

  const getProductData = async() => {
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
      <section className={`${style.bgimage}`}>
        <div className={`${style.h100}`}>
          <div className={`${style.h100}`}>
            <div className={`${style.imgwrapper} ${style.h100}`}>
              <h2>A fresh approach to shopping</h2>
              <p>Absolutely. Positively. Perfect.</p>
            </div>
          </div>
        </div>
      </section>
      <div className={`${style.productlist}  p-4  `}>
        <div className={`${style.type} mb-3  `}>
          Latest Products
        </div>
        <ul className="nav nav-tabs mt-3">
          {
            tabList.map((tab, i) => {
              return (
                <>
                  <li className={`${style.navitem} mx-1 `}  key={i} onClick={()=>tabChange(i)} >
                    <span className={`nav-link ${tab.isActive === true ? 'active':''}`}>{tab.title}</span>
                  </li>
                </>
              )
            })
          }

        </ul>

        {
         !loading && productData.length ? <ProductCard productDetails={productData} /> : <div>Loading...</div>
        }
        
        
      </div>
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

  if(!req.cookies.token){
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
      props:{},
    };
  }

    let data = await Axios.get("products/purchase",{
      headers:{ Authorization: `Bearer ${req.cookies.token}` }
    })
   console.log("data asdasd ", data.data);
  return { props: {data:data.data} };
}



export default authPage(Dashboard)