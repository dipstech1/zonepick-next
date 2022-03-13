import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
import style from './dashboard.module.scss'
import { useState } from "react";
const Dashboard = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const [tabList, setTabList] = useState([{ title: "BUY", isActive: true }, { title: "BORROW", isActive: false }])

  const tabChange = (i) => {
     tabList.forEach((tab) => {
       tab.isActive = !tab.isActive
     });
     setTabList([...tabList])
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
        <ProductCard productDetails={arr} />
      </div>
    </div>
  )
}

export default authPage(Dashboard)