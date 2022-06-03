import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SellerInfo from '../../components/seller-info/SellerInfo';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import axiosInterceptor from '../../services/axios.interceptor';
import Layout from '../../components/layout';
import { toast } from 'react-toastify';
const ProductDetails = ({ productData }) => {
  let [productDetails, setProductDetails] = useState({});
  const router = useRouter();

  let [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    // console.log('router.query ', router.query);

    window.scrollTo(0, 0);
    window.scrollTo(0, 0);

    if (router.query.productId) {
      getProductDetails(router.query.productId);
    }

    console.log('productDetails ', productDetails);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetails = async (prodId) => {
    const userId = getDataFromLocalstorage('userid');

    const productData = {
      productId: prodId[0],
      recordId: prodId[1],
      userid: userId
    };

    // const productData = {"productId":"959bc070-e85b-4d29-b552-41328402ec63","recordId":"70e58997-7b26-4ecf-ade2-67e18932d297","userid":"a95eace5-2d17-4723-bfc7-95f88a5752ff"}

    let res = await axiosInterceptor.post(`products/details`, productData);
    console.log('det ', res.data);
    setProductDetails(res.data);

    // setProductInfo(res.data[0])
  };

  const addToCart = (data) => {
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
      <section id="pageContainer">
        <div className="container">
          <div className="row m-0 row m-0 mt-4 mt-lg-5 shadow-sm pb-3">
            <p className="text-dark mb-3">
              <b>{productDetails?.product?.name}</b>
              <button
                onClick={() => addToCart(productDetails)}
                className="btn btn-sm btn-outline-warning"
                style={{ marginLeft: '10px' }}
              >
                <i className="fas fa-plus"></i> Add to Cart
              </button>
            </p>

            {/* <div className="det">Rs. {productDetails?.price}</div> */}
            <div className="col-12 col-lg-8">
              <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/img/product_img.png" />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/product_img.png" />
                  </div>
                  <div className="carousel-item">
                    <img src="/img/product_img.png" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#myCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#myCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            {productDetails?.product?.name && <SellerInfo sellerData={productDetails.seller_details} />}
          </div>

          <div className="row m-0 mt-4 mt-lg-4 shadow-sm pb-3">
            <div className="col-6 col-lg-3 mb-2 ms-1 me-1 mb-lg-0 mb_clip">
              <img src="/img/clip.png" />
            </div>
            <div className="col-6 col-lg-3 mb-2 mb-lg-0 ms-1 me-1 mb_clip">
              <img src="/img/clip.png" />
            </div>
            <div className="col-6 col-lg-3 mb-2 mb-lg-0 ms-1 me-1 mb_clip">
              <img src="/img/clip.png" />
            </div>
          </div>

          <div className="row m-0 mt-4 mt-lg-4">
            <div className="card border-0 shadow-sm p-3">
              <h6>Details:</h6>
              <div className="brand_details ps-2">
                <div>Name: {productDetails?.product?.name}</div>
                <div>
                  Brand: <span>{productDetails?.product?.brand}</span>
                </div>
                <div>
                  Price: &nbsp;
                  <span>                    
                    {productDetails?.price?.toLocaleString('en-IN', {
                                      style: 'currency',
                                      currency: 'INR'
                                    })}
                  </span>
                </div>

                <div>
                  Description: <span>{productDetails?.product?.description}</span>
                </div>
                <p>
                  Specifications:
                  <ul className="pt-2">
                    {productDetails?.product?.specifications.length > 0 &&
                      productDetails?.product?.specifications.map((itm, i) => {
                        return <li key={i}>{itm.spec}</li>;
                      })}
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
