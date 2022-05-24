import { useState, useEffect } from 'react'
import Image from 'next/image';
import SellerInfo from '/components/seller-info/SellerInfo'
import { getDataFromLocalstorage } from 'utils/storage.util';
import axiosInterceptor from 'services/axios.interceptor';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProductDetails = ({ productData }) => {
  let [productDetails, setProductDetails] = useState({});
  const router = useRouter();
  useEffect(() => {
    (
      async () => {
        console.log("router.query ", router.query);
        if(router.query.productId){
          let prodId = router.query.productId;
        // let res = await axiosInterceptor.get(`products/${prodId[0]}/${prodId[1]}`)
        let res = await axiosInterceptor.post(`products/details`,{
          "productId" : prodId[0],
          "recordId" : prodId[1],
          "userid" :  getDataFromLocalstorage('userid')
        })
        console.log("det ", res.data);
        setProductDetails(res.data[0])
        }
        
      }
    )()
  }, [])

  useEffect(() => {
    console.log("productDetails ", productDetails);
  }, [productDetails])

  const addToCart = () => {
    let { recordId, purpose, _id, name } = productDetails;
    let userid = getDataFromLocalstorage('userid');
    axiosInterceptor.post('cart', {
      userid,
      recordId,
      _id,
      "ordered_quantity": 1,
      purpose
    }).then((res => {
      toast.success("Product added to cart")
      console.log("added to cart");
    })).catch(err => console.log(err))
  }

  return (
    <>

      <section className="py-3 py-lg-4">
        <div className="container">


          <div className="row m-0 row m-0 mt-4 mt-lg-5 shadow-sm pb-3">
            <p className="text-dark mb-3"><b>{productDetails?.product?.name}</b>
            <button onClick={addToCart} className="btn btn-sm btn-outline-warning" style={{marginLeft:"10px"}}><i className="fas fa-plus"></i> Add to Cart</button>

            </p>

            {/* <div className="det">Rs. {productDetails?.price}</div> */}
            <div className="col-12 col-lg-8">
              <div className="owl-carousel productimg-slider owl-theme">
                <div className="item">
                  <img src="/img/product_img.png" />
                </div>
                <div className="item">
                  <img src="/img/product_img.png" />
                </div>
                <div className="item">
                  <img src="/img/product_img.png" />
                </div>
                <div className="item">
                  <img src="/img/product_img.png" />
                </div>
              </div>
            </div>
            {
              productDetails?.product?.name && <SellerInfo sellerData={productDetails.seller_details} />
            }
          </div>


          <div className="row m-0 mt-4 mt-lg-4 shadow-sm pb-3">
            <div className="col-6 col-lg-3 mb-2 mb-lg-0 mb_clip">
              <img src="/img/clip.png" />
            </div>
            <div className="col-6 col-lg-3 mb-2 mb-lg-0 mb_clip">
              <img src="/img/clip.png" />
            </div>
            <div className="col-6 col-lg-3 mb-2 mb-lg-0 mb_clip">
              <img src="/img/clip.png" />
            </div>
          </div>


          <div className="row m-0 mt-4 mt-lg-4">
            <div className="card border-0 shadow-sm p-3">
              <h6>Details</h6>
              <div className="brand_details">
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

          {/* <div className="row m-0 mt-4 mt-lg-4">
          <h6>Related Ads</h6>
          <div className="owl-carousel Popular-slider owl-theme">
            <div className="item">
              <div className="card border-0 shadow">
                <div className="position-relative">
                  <img src="/img/item_1.png" className="card-img-top" alt="..." />
                  <a href="">
                    <div className="like">
                      <i className="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: INR <span>30,000</span></h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card border-0 shadow">
                <div className="position-relative">
                  <img src="/img/item_1.png" className="card-img-top" alt="..." />
                  <a href="">
                    <div className="like">
                      <i className="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: INR <span>30,000</span></h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card border-0 shadow">
                <div className="position-relative">
                  <img src="/img/item_1.png" className="card-img-top" alt="..." />
                  <a href="">
                    <div className="like">
                      <i className="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: INR <span>30,000</span></h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card border-0 shadow">
                <div className="position-relative">
                  <img src="/img/item_1.png" className="card-img-top" alt="..." />
                  <a href="">
                    <div className="like">
                      <i className="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: INR <span>30,000</span></h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="user_name mt-3">
                    <p>Amit Shah</p>
                    <p><small>Ramrajatala</small> | <small>July, 2021</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card border-0 shadow">
                <div className="position-relative">
                  <img src="/img/item_1.png" className="card-img-top" alt="..."/>
                  <a href="">
                    <div className="like">
                      <i className="fas fa-heart"></i>
                    </div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: INR <span>30,000</span></h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="user_name mt-3">
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


      {/* <div className="product-details-wrapper">
                <section className="row mx-3 mb-5 my-5">

                    <div className="col-md-8 col-sm-12">
                        
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="card mb-3" >
                            <div className="card-body mb-3 prod-details ">
                                <h3 className="det">{productDetails.name}</h3>
                                <div className="det">Rs. {productDetails.price}</div>
                                <div className="action-btn text-center mt-3">
                                    <button className="primary-btn" onClick={addToCart}>Add to cart</button>
                                </div>
                            </div>

                        </div>
                        <div className="mb-4">
                            {
                                productDetails && <SellerInfo sellerData={productDetails.seller_details} />
                            }

                        </div>
                        <div>
                        </div>
                    </div >

                </section >

                <section className="row mx-4">
                    <div className="col-md-6 col-sm-12">
                        <div className="card pb-3">
                            <div className="card-body mb-3 prod-details">
                                Product Details
                                <div className="feature-wrapper d-flex flex-wrap">
                                    <div className="chip" >
                                        {
                                            productDetails && productDetails?.specifications?.map(
                                                (spec,i)=> <div key={i} className="chip-content">{spec}</div>

                                            )
                                        }
                                    </div>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="col-md-6 col-sm-12 my-md-0 my-sm-2 ">
                <div className="card pb-3">
                    <div className="card-body mb-3 prod-details ">
                        Product Specification
                    </div>
                    <div>
                        <div className="specs">
                            <div className="topic">Brand:</div>
                            <div className="det">{productDetails.brand} </div>
                        </div>
                        <div className="specs">
                            <div className="topic">Category:</div>
                            <div className="det">{productDetails.category} </div>
                        </div>
                        <div className="specs">
                            <div className="topic">Origin:</div>
                            <div className="det">{productDetails.origin}</div>
                        </div>
                        <div className="specs">
                            <div className="topic">Status:</div>
                            <div className="det">{productDetails.product_status} </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >

            </div > */}
    </>
  )
}

// export const getServerSideProps = async (ctx) => {
//     const { productId } = ctx.params
//     console.log("paran ", productId)
//     let productData = await Axios.get(`products/${productId}`, {
//         headers: { Authorization: `Bearer ${ctx.req.cookies.token}` }
//     })
//     return {
//         props: {
//             productData: productData.data
//         }
//     }

// }

export default ProductDetails