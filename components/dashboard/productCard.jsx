import Image from "next/image"
import { useRouter } from "next/router"
import Card from "ui-lib/Cards/Card"
import style from './productcard.module.scss'
const productCard = ({ productDetails }) => {
    const router = useRouter();
    const goToDetails = (e,data) => {
        e.stopPropagation();
        console.log("productDetails ", data);
        router.push(`product/${data.productId}`)
    }
    return (
        <>
            <div class="container-fluid">
                <div class="row justify-content-center">
                    {
                        productDetails.map((data, i) => {
                            return (
                                <div class="col-md-3 col-sm-12 product-card my-4 mx-2" onClick={(e)=>goToDetails(e,data)}>
                                    <Card >
                                        <Image src={'https://thumbs.dreamstime.com/b/dslr-camera-13618571.jpg'} height="200px" width="200px" />
                                        {/* <Image src={`${data.arimageurl}`} height="200px" width="200px" /> */}
                                        <div class={`${style.cardbody} mt-2`}>
                                            <div class={`${style.cardproductdesc}`}>
                                                <div class="desc card-txt">
                                                    <span class="product-name">{data.name}</span>
                                                </div>
                                                <div class="owner card-txt">
                                                    From: <span> {data.seller_details.name}</span>
                                                </div>
                                                <div class="location card-txt">
                                                    <span> Seller </span> | <span> {data.seller_details.pincode}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}



export default productCard