import Image from "next/image"
import { useRouter } from "next/router"
import Card from "ui-lib/Cards/Card"
import style from './productcard.module.scss'

const productCard = ({ productDetails,addToWishList }) => {
    const router = useRouter();
    const goToDetails = (e, data) => {
        e.stopPropagation();
        router.push(`product/${productDetails.ParentId}/${productDetails.recordId}`)
    }

    const addToWishlist = (e) => {
        e.stopPropagation();
        const body = {
            recordId: productDetails.recordId,
        }
        addToWishList(body)
    }
    return (
        <>
            <div className="card" onClick={goToDetails}>
                <div className="position-relative" >
                    <img src="/img/item_1.png" className="card-img-top" alt="..." />
                    <div href="">
                        <div className="like" onClick={addToWishlist}>
                            <i className="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Price: INR <span>{productDetails.price}</span></h5>
                    <p className="card-text">{productDetails.purpose}</p>
                    <div className="user_name mt-3">
                        <p>{productDetails.seller_details.name}</p>
                        <p><small>{productDetails.seller_details.name}</small> | <small>{productDetails.seller_details.address1}</small></p>
                    </div>
                </div>
            </div>
        </>
    )
}



export default productCard