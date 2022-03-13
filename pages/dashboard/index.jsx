import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
const Dashboard = () => {
  const arr = [1,2,3,4,5,6,7,8]
  return (
    <div>
       {/* <ul class="nav nav-tabs mt-3">
                <li class="nav-item mx-1">
                  <span class="nav-link">Test</span>
                </li>
                <li class="nav-item mx-1">
                  <span class="nav-link">Test2</span>
                </li>
                
              </ul> */}
        <ProductCard productDetails = {arr}/>
    </div>
  )
}

export default authPage(Dashboard)