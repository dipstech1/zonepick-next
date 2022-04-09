import Image from "next/image"
import { useRouter } from "next/router"
import Card from "ui-lib/Cards/Card"
import style from './productcard.module.scss'
const productCard = ({ productDetails }) => {
    const router = useRouter();
    const goToDetails = (e, data) => {
        e.stopPropagation();
        router.push(`product/${productDetails.ParentId}/${productDetails.recordId}`)
    }
    return (
        <>
            <div className="card" onClick={goToDetails}>
                <div className="position-relative">
                    <img src="/img/item_1.png" className="card-img-top" alt="..." />
                    <a href="">
                        <div className="like">
                            <i className="fas fa-heart"></i>
                        </div>
                    </a>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Price: INR <span>{productDetails.price}</span></h5>
                    <p className="card-text">{productDetails.purpose}</p>
                    <div className="user_name mt-3">
                        <p>{productDetails.seller_details.name}</p>
                        <p><small>{productDetails.seller_details.state}</small> | <small>{productDetails.seller_details.pincode}</small></p>
                    </div>
                </div>
            </div>
        </>
    )
}



export default productCard