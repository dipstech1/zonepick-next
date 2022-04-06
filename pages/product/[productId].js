import { useState, useEffect } from 'react'
import Image from 'next/image';
import SellerInfo from '/components/seller-info/SellerInfo'
import Axios from "services/axios.interceptor"
import { getDataFromLocalstorage } from 'utils/storage.util';
import axiosInterceptor from 'services/axios.interceptor';
import { toast } from 'react-toastify';

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
            toast.success("Product added to cart")
            console.log("added to cart");
        })).catch(err => console.log(err))
    }

    return (
        <>

<section class="py-3 py-lg-4">
      <div class="container">
      

        <div class="row m-0 row m-0 mt-4 mt-lg-5 shadow-sm pb-3">
          <p class="text-dark mb-3"><b>Advertisement ID: 0000000000</b></p>
          <div class="col-12 col-lg-8">
            <div class="owl-carousel productimg-slider owl-theme">
                <div class="item">
                  <img src="/img/product_img.png" />
                </div>
                <div class="item">
                  <img src="/img/product_img.png" />
                </div>
                <div class="item">
                  <img src="/img/product_img.png" />
                </div>
                <div class="item">
                  <img src="/img/product_img.png" />
                </div>
            </div>
          </div>
          <SellerInfo/>
        </div>


        <div class="row m-0 mt-4 mt-lg-4 shadow-sm pb-3">
          <div class="col-6 col-lg-3 mb-2 mb-lg-0 mb_clip">
            <img src="/img/clip.png" />
          </div>
          <div class="col-6 col-lg-3 mb-2 mb-lg-0 mb_clip">
            <img src="/img/clip.png" />
          </div>
          <div class="col-6 col-lg-3 mb-2 mb-lg-0 mb_clip">
            <img src="/img/clip.png" />
          </div>
        </div>


        <div class="row m-0 mt-4 mt-lg-4">
          <div class="card border-0 shadow-sm p-3">
            <h6>Details</h6>
            <div class="brand_details">
              <p>Brand: <span>Mi</span></p>
              <p>Price: <span>INR 20,000</span></p>
              <p>Iphone 11 without face id health 87</p>
              <p>Iphone 11 </p>
              <p>Face id not working </p>
              <p> 64gb </p>
              <p>87health </p>
              <p> With box</p>
            </div>
          </div>
        </div>

        {/* <div class="row m-0 mt-4 mt-lg-4">
          <h6>Related Ads</h6>
          <div class="owl-carousel Popular-slider owl-theme">
            <div class="item">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img src="/img/item_1.png" class="card-img-top" alt="..." />
                  <a href="">
                    <div class="like">
                      <i class="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Price: INR <span>30,000</span></h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div class="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img src="/img/item_1.png" class="card-img-top" alt="..." />
                  <a href="">
                    <div class="like">
                      <i class="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Price: INR <span>30,000</span></h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div class="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img src="/img/item_1.png" class="card-img-top" alt="..." />
                  <a href="">
                    <div class="like">
                      <i class="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Price: INR <span>30,000</span></h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div class="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img src="/img/item_1.png" class="card-img-top" alt="..." />
                  <a href="">
                    <div class="like">
                      <i class="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Price: INR <span>30,000</span></h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div class="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img src="/img/item_1.png" class="card-img-top" alt="..."/>
                  <a href="">
                    <div class="like">
                      <i class="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Price: INR <span>30,000</span></h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div class="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
</section>


            {/* <div class="product-details-wrapper">
                <section class="row mx-3 mb-5 my-5">

                    <div class="col-md-8 col-sm-12">
                        
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

            </div > */}
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