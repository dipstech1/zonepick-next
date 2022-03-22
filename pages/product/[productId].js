import { useState, useEffect } from 'react'
import Image from 'next/image';
import SellerInfo from '/components/seller-info/SellerInfo'
import Axios from "services/axios.interceptor"
import { getDataFromLocalstorage } from 'utils/storage.util';
import axiosInterceptor from 'services/axios.interceptor';

const ProductDetails = ({ productData }) => {
    let [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        console.log("productData eff ", productData[0])
        setProductDetails(productData[0])
    }, [])

    const addToCart = () => {
        let {productId,purpose,_id,name} = productDetails;
        let userid = getDataFromLocalstorage('userid');
        axiosInterceptor.post('cart', {
            userid,
            productId,
            _id,
            "quantity": 1,
            purpose
        }).then((res => {
            console.log("added to cart");
        })).catch(err => console.log(err))
    }

    return (
        <>
            <div class="product-details-wrapper">
                <section class="row mx-3 mb-5 my-5">

                    <div class="col-md-8 col-sm-12">
                        {/* <div class="image-gallerty-wrapper d-flex flex-column">
                        <div class="base-img">
                            <Image src="/public/images/productdetail.jpg" width="80%" height="300px"/>
                        </div>
                        <div class="other-img row my-3">
                            <div class="img-display col-6 com-sm-12">
                                 <Image src="/public/images/other-product.jpg" width="100px" height="100px"/>
                            </div>
                            <div class="img-display col-6 com-sm-12">
                                 <Image src="/public/images/other-product.jpg" width="100px" height="100px"/>
                            </div>
                        </div>
                    </div> */}
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="card mb-3" >
                            <div class="card-body mb-3 prod-details ">
                                <h3 class="det">{productDetails.name}</h3>
                                <div class="det">Rs. {productDetails.price}</div>
                                <div class="action-btn text-center mt-3">
                                    <button class="primary-btn" onClick={addToCart}>Add to cart</button>
                                </div>
                            </div>

                        </div>
                        <div class="mb-4">
                            {
                                productDetails && <SellerInfo sellerData={productDetails.seller_details} />
                            }

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
                                <div class="feature-wrapper d-flex flex-wrap">
                                    <div class="chip" >
                                        {
                                            productDetails && productDetails?.specifications?.map(
                                                (spec,i)=> <div key={i} class="chip-content">{spec}</div>

                                            )
                                        }
                                    </div>
                            </div>
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
                            <div class="det">{productDetails.brand} </div>
                        </div>
                        <div class="specs">
                            <div class="topic">Category:</div>
                            <div class="det">{productDetails.category} </div>
                        </div>
                        <div class="specs">
                            <div class="topic">Origin:</div>
                            <div class="det">{productDetails.origin}</div>
                        </div>
                        <div class="specs">
                            <div class="topic">Status:</div>
                            <div class="det">{productDetails.product_status} </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >

            </div >
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { productId } = ctx.params
    let productData = await Axios.get(`products/${productId}`, {
        headers: { Authorization: `Bearer ${ctx.req.cookies.token}` }
    })
    return {
        props: {
            productData: productData.data
        }
    }
}

export default ProductDetails