import Image from "next/image"
import Card from "ui-lib/Cards/Card"
import style from './productcard.module.scss'
const productCard = ({ productDetails }) => {
    return (
        <>
            <div class="container-fluid">
                <div class="row justify-content-center">
                    {
                        productDetails.map((data, i) => {
                            return (
                                <div class="col-md-3 col-sm-12 product-card my-4 mx-2" >
                                    <Card >
                                        <Image src={'https://thumbs.dreamstime.com/b/dslr-camera-13618571.jpg'} height="200px" width="200px" />
                                        <div class={`${style.cardbody} mt-2`}>
                                            <div class={`${style.cardproductdesc}`}>
                                                <div class="desc card-txt">
                                                    <span class="product-name">Apple IpHone</span>
                                                </div>
                                                <div class="owner card-txt">
                                                    From: <span> Maxwell</span>
                                                </div>
                                                <div class="location card-txt">
                                                    <span> Seller </span> | <span> 711101</span>
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