/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProductCard = ({ productDetails, addToWishList }) => {
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

  useEffect(() => {}, []);

  return (
    <>
      <div className="card" onClick={goToDetails}>
        <div className="position-relative">
          <img src="/img/item_1.png" className="card-img-top" alt="..." />
          <div href="">
            <div className="like" onClick={addToWishlist}>
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title">
            <span>{productDetails.product.name}</span>
          </h4>
          <h5 className="card-title">
            Price: INR <span>{productDetails.price}</span>
          </h5>
          <p className="card-text">{productDetails.purpose}</p>
          <div className="user_name mt-3">
            <p>{productDetails.seller_details.name}</p>
            <p>
              <small>{productDetails.seller_details.name}</small> |{' '}
              <small>{productDetails.seller_details.address1}</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
