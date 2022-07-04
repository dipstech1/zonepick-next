import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import StarRatings from "react-star-ratings/build/star-ratings";
import { toast } from "react-toastify";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import WithAuth from "../../components/withAuth";
import axios from "../../utils/axios.interceptor";

const OrderRating = () => {
  const router = useRouter()
  
  const [ratingDetails, setRatingDetails] = useState({
    id: 0,
    ProductName: '',
    ProductRating: 0,
    ProductDeliveryRating: 0,
    ProductQualityRating: 0,
    ProductPackagingRating: 0,
    SellerRating: 0,
    SellerCommunicationRating: 0,
    remarks: '',
    reviewerId: '',
    productRecord: '',
    seller: ''
  });

  const [status, setStatus] = useState(false);

  useEffect(() => {    
    const details = JSON.parse(sessionStorage.getItem('OrderDetails'));

    updateRating(details);        
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateRating =(orderInfo) =>{
    

    const userId = orderInfo?.userData?.userId;   

    let review = [];

    const comments = orderInfo?.orderDetails.comments || [];

  //  console.log(comments)

    if (comments.length > 0) {
      review = comments.filter((e) => {
        return e.reviewerId === userId;
      });
    }

    if (review.length > 0) {
      setRatingDetails({
        ...ratingDetails,
        id: review[0].id,
        ProductName: orderInfo?.orderDetails?.product?.name,
        ProductRating: parseInt(review[0].ProductRating),
        ProductDeliveryRating: parseInt(review[0].ProductDeliveryRating),
        ProductQualityRating: parseInt(review[0].ProductQualityRating),
        ProductPackagingRating: parseInt(review[0].ProductPackagingRating),
        SellerRating: parseInt(review[0].SellerRating),
        SellerCommunicationRating: parseInt(review[0].SellerCommunicationRating),
        remarks: review[0].remarks,
        reviewerId: orderInfo?.userData?.userId,
        productRecord: orderInfo?.orderDetails.recordId,
        seller: orderInfo?.orderDetails?.seller_details.userid
      });

      setStatus(true);
    } else {
      setRatingDetails({
        ...ratingDetails,
        reviewerId: orderInfo?.userData?.userId,
        productRecord: orderInfo?.orderDetails.recordId,
        seller: orderInfo?.orderDetails?.seller_details.userid
      });
    }
  }

  const updateValue = (value, name) => {
    setRatingDetails({ ...ratingDetails, [name]: value });
  };

  const onSubmitRating = async (e) => {
    e.preventDefault();

    const sendData = {
      ProductRating: ratingDetails.ProductRating.toString(),
      ProductDeliveryRating: ratingDetails.ProductDeliveryRating.toString(),
      ProductQualityRating: ratingDetails.ProductQualityRating.toString(),
      ProductPackagingRating: ratingDetails.ProductPackagingRating.toString(),
      SellerRating: ratingDetails.SellerRating.toString(),
      SellerCommunicationRating: ratingDetails.SellerCommunicationRating.toString(),
      remarks: ratingDetails.remarks,
      reviewerId: ratingDetails.reviewerId,
      productRecord: ratingDetails.productRecord,
      seller: ratingDetails.seller
    };

    console.log(ratingDetails);

    let message = '';

    try {
      let response = '';

      if (status) {
        response = await axios.patch('comment/' + ratingDetails.id, sendData);
        message = 'Rating updated Successfully';
      } else {
        response = await axios.post('comment', sendData);
        message = 'Rating added Successfully';
      }

      if (response.data.acknowledge) {
        toast.success(message);
        router.back()
      } else {
        toast.warning('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };
  

    return(
        <>
        <Layout title="Orders" metaDescription={[{ name: "description", content: "Profile Page" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/orders" passHref>
              <Breadcrumb.Item>My Orders</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Product Rating &amp; Review</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title={"Product Rating & Review of [" + ratingDetails.ProductName +"]"} activeLink={4} enableBack={true}>

          <form role="form" id="form" className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex">Product Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-3">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.ProductRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="ProductRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Delivery Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.ProductDeliveryRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="ProductDeliveryRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Quality Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.ProductQualityRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="ProductQualityRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Packaging Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.ProductPackagingRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="ProductPackagingRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Seller Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.SellerRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="SellerRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Communication Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.SellerCommunicationRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="SellerCommunicationRating"
                  />
                </span>
              </div>

              <div className="col-md-10 mt-4">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Remarks"
                  id="remarks"
                  name="remarks"
                  value={ratingDetails.remarks}
                  onChange={(e) => updateValue(e.target.value, 'remarks')}
                  required
                  rows={5}
                  style={{ resize: 'none' }}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-10">
                <button className="btn btn-orange text-white float-end" type="button" onClick={onSubmitRating}>
                  Submit
                </button>
              </div>
            </div>
          </form>
            

          </MyAccountLayout>
        </div>
      </Layout></>
    )
} 

export default WithAuth(OrderRating);