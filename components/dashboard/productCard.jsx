import Image from "next/image"
import { useRouter } from "next/router"
import Card from "ui-lib/Cards/Card"
import style from './productcard.module.scss'
const productCard = ({ productDetails }) => {
    const router = useRouter();
    const goToDetails = (e, data) => {
        e.stopPropagation();
        console.log("productDetails ", data);
        router.push(`product/${productDetails.productId}`)
    }
    return (
        <>
            <div class="card" onClick={goToDetails}>
                <div class="position-relative">
                    <img src="/img/item_1.png" class="card-img-top" alt="..." />
                    <a href="">
                        <div class="like">
                            <i class="fas fa-heart"></i>
                        </div>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Price: INR <span>{productDetails.price}</span></h5>
                    <p class="card-text">{productDetails.purpose}</p>
                    <div class="user_name mt-3">
                        <p>{productDetails.seller_details.name}</p>
                        <p><small>{productDetails.seller_details.state}</small> | <small>{productDetails.seller_details.pincode}</small></p>
                    </div>
                </div>
            </div>
        </>
    )
}



export default productCard