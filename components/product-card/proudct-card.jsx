/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductCard = ({ productDetails, addToWishList, enablewishList = 'yes' }) => {
  const router = useRouter();

  const goToDetails = (e, data) => {
    e.stopPropagation();
    router.push(`product/${productDetails.ParentId}/${productDetails.recordId}`);
  };

  const addToWishlist = (e) => {
    e.stopPropagation();
    const body = {
      recordId: productDetails.recordId
    };
    addToWishList(body);
  };

  const calculateRating = (product) => {
    if (product.length > 0) {
      let total = 0;

      for (let i = 0; i < product.length; i++) {
        const ProductRating = parseInt(product[i].ProductRating) || 0;
        const ProductDeliveryRating = parseInt(product[i].ProductDeliveryRating) || 0;
        const ProductQualityRating = parseInt(product[i].ProductQualityRating) || 0;
        const ProductPackagingRating = parseInt(product[i].ProductPackagingRating) || 0;
        const SellerRating = parseInt(product[i].SellerRating) || 0;
        const SellerCommunicationRating = parseInt(product[i].SellerCommunicationRating) || 0;

        const ovarall =
          (ProductRating +
            ProductDeliveryRating +
            ProductQualityRating +
            ProductPackagingRating +
            SellerRating +
            SellerCommunicationRating) /
          6;

        total = total + ovarall;
      }

      const ovarallRating = total / product.length;

      let className = '';

      if (ovarallRating >= 4.0) {
        className = 'bg-success';
      } else if (ovarallRating >= 2.0) {
        className = 'bg-secondary';
      } else if (ovarallRating < 2.0) {
        className = 'bg-danger';
      }

      return { className: className, rating: ovarallRating.toFixed(1) };
    } else {
      return { className: 'bg-primary', rating: 'NA' };
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="card" onClick={goToDetails}>
        <div className="position-relative">
          <img
            src={'/images/product/' + productDetails.product.images[0].url}
            className="card-img-top"
            style={{ height: '250px' }}
            alt="..."
          />
          {enablewishList === 'yes' ? (
            <div href="">
              <div className="like" onClick={addToWishlist}>
                <i className="fas fa-heart"></i>
              </div>
            </div>
          ) : null}
        </div>
        <div className="card-body">
          <h4 className="card-title">
            <span>{productDetails.product.name}</span>
          </h4>
          <h5 className="card-title">
            Price: INR <span>{productDetails.price}</span>
          </h5>
          <div className="pt-2 pb-2">
            <span className={['badge', calculateRating(productDetails?.comments).className].join(' ')}>
              <i className="fa fa-star"></i> {calculateRating(productDetails?.comments).rating}
            </span>
          </div>
          <p className="card-text">{productDetails.purpose}</p>
          {productDetails.seller_details ? (
            <div className="user_name mt-3">
              <p>{productDetails.seller_details.name}</p>
              <p>
                <small>{productDetails.seller_details.name}</small> |{' '}
                <small>{productDetails.seller_details.address1}</small>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
