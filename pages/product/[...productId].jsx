/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SellerInfo from '../../components/seller-info/SellerInfo';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import axiosInterceptor from '../../services/axios.interceptor';
import Layout from '../../components/layout';
import { toast } from 'react-toastify';
import ThreeSixtyView from './threeSixtyView';
import ThreeDView from './threedview';
import ModalRoot from '../../ui-lib/Modal/modalRoot';
import ModalService from '../../ui-lib/Modal/modalService';
const ProductDetails = ({ productData }) => {
  let [productDetails, setProductDetails] = useState({});
  const router = useRouter();

  let [productInfo, setProductInfo] = useState({});

  let [imgLink, setImgLink] = useState('/house/modern-home.jpg');

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    
    if (!router.isReady) { return };
    

    if (router.query.productId) {
      getProductDetails(router.query.productId);
    }

    //console.log('productDetails ', productDetails);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

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

  const updateImageLink = (e) => {
    setImgLink(e.target.src);
  };

  const open360Modal = () => {
    const imageInfo = {
      imgSrc: [
        { url: '/360-image/a-mirror-in-a-room.jpeg' },
        { url: '/360-image/bedroom-with-a-large-bed-in-a-room.jpeg' },
        { url: '/360-image/large-bed-in-a-room.jpeg' }
      ]
    };

    const modalClass = 'modal-lg';

    ModalService.open(ThreeSixtyView, { imageInfo: imageInfo }, modalClass);
  };

  const open3DModal = () => {
    const imageInfo = {
      imgurl: '/glb/flat.glb'
    };

    const modalClass = 'modal-lg';

    ModalService.open(ThreeDView, { imageInfo: imageInfo }, modalClass);
  };

  return (
    <>
      <ModalRoot />
      <Layout title="Product Details">
        <section id="pageContainer">
          <div className="container">
            <div className="row m-0 row m-0 mt-4 mt-lg-5 shadow-sm pb-3">
              <div className="text-dark mb-3">
                <b>{productDetails?.product?.name}</b>
                <button
                  onClick={() => addToCart(productDetails)}
                  className="btn btn-sm btn-outline-warning"
                  style={{ marginLeft: '10px' }}
                >
                  <i className="fas fa-plus"></i> Add to Cart
                </button>
              </div>

              {/* <div className="det">Rs. {productDetails?.price}</div> 
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
            */}
              <div className="col-12 col-lg-8">
                <div className="row " style={{ minHeight: '194px' }}>
                  <div className="col-12 d-flex content-center text-center">
                    <img src={imgLink} alt="img" className="img-fluid" style={{ height: 450, width: '100%' }} />
                  </div>
                </div>

                <div className="row mt-2 d-flex">
                  <div className="col-md-9">
                    <img
                      src="/house/modern-home.jpg"
                      alt="img"
                      className="p-1"
                      style={{ height: 80, width: 80, cursor: 'pointer' }}
                      onClick={updateImageLink}
                    />
                    <img
                      src="/house/modern-home-2.jpg"
                      alt="img"
                      className="p-1"
                      style={{ height: 80, width: 80, cursor: 'pointer' }}
                      onClick={updateImageLink}
                    />
                    <img
                      src="/house/modern-home-3.jpg"
                      alt="img"
                      className="p-1"
                      style={{ height: 80, width: 80, cursor: 'pointer' }}
                      onClick={updateImageLink}
                    />
                  </div>
                  <div className="col-md-3 content-center align-self-center" style={{ whiteSpace: 'nowrap' }}>
                    <span>
                      <button className="btn btn-sm btn-orange-800 ms-1" onClick={open360Modal}>
                        360&#176; View
                      </button>
                    </span>
                    <span>
                      <button className="btn btn-sm btn-pink-800 ms-1" onClick={open3DModal}>
                        3d View
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              {productDetails?.product?.name && <SellerInfo sellerData={productDetails.seller_details} />}
            </div>
            {/*
          <div className="row m-0 mt-4 mt-lg-4 shadow-sm pb-3">

            <div className='col-12'>

              <img src='' alt='img'/>

            </div>
            
          </div>
       */}
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
    </>
  );
};

export default ProductDetails;
