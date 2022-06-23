import { useEffect } from 'react';

import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import ModalBody from '../../ui-lib/Modal/modalBody';
import ModalFooter from '../../ui-lib/Modal/modalFooter';
import ModalHeader from '../../ui-lib/Modal/modalHeader';
import Axios from '../../services/axios.interceptor';
import { toast } from 'react-toastify';

const RatingModal = (props) => {
  const [ratingDetails, setRatingDetails] = useState({
    id: 0,
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
    const userId = props?.orderdetails?.userData?.userId;

    let review = [];

    const comments = props?.orderdetails?.orderDetails.comments || [];

    if (comments.length > 0) {
      review = comments.filter((e) => {
        return e.reviewerId === userId;
      });
    }

    if (review.length > 0) {
      setRatingDetails({
        ...ratingDetails,
        id: review[0].id,
        ProductRating: parseInt(review[0].ProductRating),
        ProductDeliveryRating: parseInt(review[0].ProductDeliveryRating),
        ProductQualityRating: parseInt(review[0].ProductQualityRating),
        ProductPackagingRating: parseInt(review[0].ProductPackagingRating),
        SellerRating: parseInt(review[0].SellerRating),
        SellerCommunicationRating: parseInt(review[0].SellerCommunicationRating),
        remarks: review[0].remarks,
        reviewerId: props?.orderdetails?.userData?.userId,
        productRecord: props?.orderdetails?.orderDetails.recordId,
        seller: props?.orderdetails?.orderDetails?.seller_details.userid
      });

      setStatus(true);
    } else {
      setRatingDetails({
        ...ratingDetails,
        reviewerId: props?.orderdetails?.userData?.userId,
        productRecord: props?.orderdetails?.orderDetails.recordId,
        seller: props?.orderdetails?.orderDetails?.seller_details.userid
      });
    }
  }, []);

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
        response = await Axios.patch('comment/' + ratingDetails.id, sendData);
        message = 'Rating updated Successfully';
      } else {
        response = await Axios.post('comment', sendData);
        message = 'Rating added Successfully';
      }

      if (response.data.acknowledge) {
        props.close();
        toast.success(message);
      } else {
        toast.success('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.success('Fail');
    }
  };

  return (
    <>
      <ModalHeader>
        <h5 className="modal-title">{props?.orderdetails?.orderDetails?.product?.name}</h5>
        <button type="button" className="btn-close" onClick={props.close}></button>
      </ModalHeader>
      <ModalBody>
        <div className="container-fluid">
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

              <div className="col-md-12 mt-4">
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
              <div className="col-md-12">
                <button className="btn btn-orange text-white float-end" type="button" onClick={onSubmitRating}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

export default RatingModal;
