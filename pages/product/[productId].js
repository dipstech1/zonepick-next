import { useRouter } from 'next/router'
import Image from 'next/image'
const ProductDetails = () => {
    const router = useRouter();
    console.log(router)
    return (
        <>
            <div class="product-details-wrapper">
                <section class="row mx-3 mb-5 my-5">
                    <div class="image-gallerty-wrapper">
                        <div class="base-img">
                            <Image src="/public/images/productdetail.jpg" layout='fill'/>
                        </div>
                        <div class="other-img row my-3">
                            <div class="img-display col-6 com-sm-12">
                                 <Image src="/public/images/other-product.jpg" layout='fill'/>
                            </div>
                            <div class="img-display col-6 com-sm-12">
                                 <Image src="/public/images/other-product.jpg" layout='fill'/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-12">
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="card mb-3" >
                            <div class="card-body mb-3 prod-details ">
                                <h3 class="det">asd</h3>
                                <div class="det">asd</div>
                                <div class="action-btn text-center mt-3">
                                    <button class="primary-btn">Add to cart</button>
                                </div>
                            </div>

                        </div>
                        <div class="mb-4">
                        </div>
                        <div>
                        </div>
                    </div >

                </section >

                <section class="row mx-4">
                    <div class="col-md-6 col-sm-12">
                        <div class="card pb-3">
                            <div class="card-body mb-3 prod-details">
                                Product Details
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12 my-md-0 my-sm-2 ">
                        <div class="card pb-3">
                            <div class="card-body mb-3 prod-details ">
                                Product Specification
                            </div>
                            <div>
                                <div class="specs">
                                    <div class="topic">Brand:</div>
                                    <div class="det">asd </div>
                                </div>
                                <div class="specs">
                                    <div class="topic">Category:</div>
                                    <div class="det">asd </div>
                                </div>
                                <div class="specs">
                                    <div class="topic">Origin:</div>
                                    <div class="det">asd</div>
                                </div>
                                <div class="specs">
                                    <div class="topic">Status:</div>
                                    <div class="det">asd </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section >

            </div >
        </>
    )
}

export default ProductDetails