import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
import style from './dashboard.module.scss'
const Dashboard = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className="">
      <section class={`${style.bgimage}`}>
        <div class={`${style.h-100}`}>
          <div class={`${style.h-100}`}>
            <div class={`${style.imgwrapper} ${style.h-100}`}>
              <h2>A fresh approach to shopping</h2>
              <p>Absolutely. Positively. Perfect.</p>
            </div>
          </div>
        </div>
      </section>
      <ProductCard productDetails={arr} />
    </div>
  )
}

export default authPage(Dashboard)