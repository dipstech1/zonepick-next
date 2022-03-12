import authPage from "hoc/authPage"
import ProductCard from 'components/dashboard/productCard'
const Dashboard = () => {
  const arr = [1,2,3,4,5,6,7,8]
  return (
    <div>
        <ProductCard productDetails = {arr}/>
    </div>
  )
}

export default authPage(Dashboard)