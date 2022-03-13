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
                                        <div class={`${style.cardbody}`}>
                                            <h5 class={`${style.cardtitle}`}>Card title</h5>
                                            <p class={`${style.cardtext}`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
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