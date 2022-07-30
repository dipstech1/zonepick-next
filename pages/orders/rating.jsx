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
    productName: '',
    productRating: 0,
    productDeliveryRating: 0,
    productQualityRating: 0,
    productPackagingRating: 0,
    sellerRating: 0,
    sellerCommunicationRating: 0,
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

   // console.log(comments)

    if (comments.length > 0) {
      review = comments.filter((e) => {
        return e.reviewerId === userId;
      });
    }

    if (review.length > 0) {

      console.log(review) 



      setRatingDetails({
        ...ratingDetails,
        id: review[0].id,
        productName: orderInfo?.orderDetails?.product?.name,
        productRating: parseInt(review[0].productRating),
        productDeliveryRating: parseInt(review[0].productDeliveryRating),
        productQualityRating: parseInt(review[0].productQualityRating),
        productPackagingRating: parseInt(review[0].productPackagingRating),
        sellerRating: parseInt(review[0].sellerRating),
        sellerCommunicationRating: parseInt(review[0].sellerCommunicationRating),
        remarks: review[0].remarks,
        reviewerId: orderInfo?.userData?.userId,
        productRecord: orderInfo?.orderDetails.recordId,
        seller: orderInfo?.orderDetails?.sellerDetails.userid
      });

      setStatus(true);
    } else {
      setRatingDetails({
        ...ratingDetails,
        ProductName: orderInfo?.orderDetails?.product?.name,
        reviewerId: orderInfo?.userData?.userId,
        productRecord: orderInfo?.orderDetails.recordId,
        seller: orderInfo?.orderDetails?.sellerDetails.userid
      });
    }
  }

  const updateValue = (value, name) => {
    setRatingDetails({ ...ratingDetails, [name]: value });
  };

  const onSubmitRating = async (e) => {
    e.preventDefault();

    const sendData = {
      productRating: ratingDetails.productRating.toString(),
      productDeliveryRating: ratingDetails.productDeliveryRating.toString(),
      productQualityRating: ratingDetails.productQualityRating.toString(),
      productPackagingRating: ratingDetails.productPackagingRating.toString(),
      sellerRating: ratingDetails.sellerRating.toString(),
      sellerCommunicationRating: ratingDetails.sellerCommunicationRating.toString(),
      remarks: ratingDetails.remarks,
      reviewerId: ratingDetails.reviewerId,
      productRecord: ratingDetails.productRecord,
      seller: ratingDetails.seller
    };

    console.log(sendData);

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
        <Layout title="Orders" metaDescription={[{ name: "description", content: "order details Page" }]}>
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
          <MyAccountLayout title={"Product Rating & Review of [" + ratingDetails.productName +"]"} activeLink={4} enableBack={true}>

          <form role="form" id="form" className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex">Product Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-3">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.productRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="productRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Delivery Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.productDeliveryRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="productDeliveryRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Quality Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.productQualityRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="productQualityRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Packaging Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.productPackagingRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="productPackagingRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Seller Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.sellerRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="sellerRating"
                  />
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex">Communication Rating:</div>
                <span style={{ display: 'inline-block', cursor: 'pointer' }} className="mt-1 mb-1">
                  <StarRatings
                    starDimension="20px"
                    changeRating={updateValue}
                    rating={ratingDetails.sellerCommunicationRating}
                    starRatedColor="#e74c3c"
                    numberOfStars={5}
                    name="sellerCommunicationRating"
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