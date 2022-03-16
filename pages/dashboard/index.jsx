import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
import style from './dashboard.module.scss'
import { useState,useEffect} from "react";
import Axios from "services/axios.interceptor"
import { getCookie } from 'cookies-next';

const Dashboard = ({data}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  let [productData,setProductData] = useState([])
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
  }, []);

  const getProductData = async() => {
       let activeTab = tabList.find(t => t.isActive);
       let url = activeTab.title === "BUY" ? "products/purchase" : "products/rent"
      let d = await Axios.get(url)
      setProductData(d.data);
      console.log("productData ", productData);
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
                  <li className={`${style.navitem} mx-1 `} onClick={()=>tabChange(i)} >
                    <span className={`nav-link ${tab.isActive === true ? 'active':''}`}>{tab.title}</span>
                  </li>
                </>
              )
            })
          }

        </ul>

        {
          productData.length ? <ProductCard productDetails={productData} /> : null
        }
        
        
      </div>
    </div>
  )
}

// export async function getStaticProps(req,res){
//   console.log("asd1 ", req);
//   return {
//       props:{
          
//       }
//   }
// }



export default authPage(Dashboard)