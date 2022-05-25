import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SellerInfo from '../../components/seller-info/SellerInfo';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import axiosInterceptor from '../../services/axios.interceptor';
import Layout from '../../components/layout';
const ProductDetails = ({ productData }) => {
  let [productDetails, setProductDetails] = useState({});
  const router = useRouter();
  useEffect(() => {
    (async () => {
      console.log('router.query ', router.query);
      if (router.query.productId) {
        /* let prodId = router.query.productId;
        let res = await axiosInterceptor.get(`products/${prodId[0]}/${prodId[1]}`);
        console.log('det ', res.data);
        setProductDetails(res.data[0]);*/
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    window.scrollTo(0, 0) 
  

    console.log('productDetails ', productDetails);
  }, [productDetails]);

  const addToCart = () => {
    let { recordId, purpose, _id, name } = productDetails;
    let userid = getDataFromLocalstorage('userid');
    axiosInterceptor
      .post('cart', {
        userid,
        recordId,
        _id,
        ordered_quantity: 1,
        purpose
      })
      .then((res) => {
        toast.success('Product added to cart');
        console.log('added to cart');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout title="Product Details">
      <section id='pageContainer'>
        <div className="container">
          <div className="row m-0 row m-0 mt-4 mt-lg-5 shadow-sm pb-3">
            <p className="text-dark mb-3">
              <b>{productDetails?.product?.name}</b>
              <button onClick={addToCart} className="btn btn-sm btn-outline-warning" style={{ marginLeft: '10px' }}>
                <i className="fas fa-plus"></i> Add to Cart
              </button>
            </p>

            {/* <div className="det">Rs. {productDetails?.price}</div> */}
            <div className="col-12 col-lg-8">
              <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>                  
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/img/product_img.png" />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/product_img2.png" />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/product_img3.jpg" />
                  </div>                  
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>

              </div>
            </div>
            {productDetails?.product?.name && <SellerInfo sellerData={productDetails.seller_details} />}
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
                <p>
                  Brand: <span>Mi</span>
                </p>
                <p>
                  Price: <span>INR 20,000</span>
                </p>
                <p>Iphone 11 without face id health 87</p>
                <p>Iphone 11 </p>
                <p>Face id not working </p>
                <p> 64gb </p>
                <p>87health </p>
                <p> With box</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
