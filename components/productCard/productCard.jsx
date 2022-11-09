import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import common from '../../utils/commonService';
import { toast } from 'react-toastify';

const ProductCard = ({ productDetails, addToWishList, onCheckBoxClick }) => {
  const router = useRouter();

  const goToDetails = (e, data) => {
    e.stopPropagation();
    router.push(`product/${productDetails.ParentId}/${productDetails.recordId}`);
  };

  const onClickWishlist = (e) => {
    e.stopPropagation();
    const body = {
      recordId: productDetails.recordId,
    };
    addToWishList(body);
  };

  // const onCheckBoxClick = (item, event) => {

  //   let sendData = [{
  //     productId: item.product?.productId,
  //     recordId: item.recordId,
  //   }];

  //   const getData = JSON.parse(localStorage.getItem("productCompare"));

  //   if (getData) {
  //     if (!event.target.checked) {
  //       const newData = getData.filter((product) => parseInt(product.recordId) !== parseInt(item.recordId));
  //       localStorage.setItem("productCompare", JSON.stringify(newData));
  //     } else {
  //       if (getData.length > 3) {
  //         return toast.info("You have already selected 4 products");
  //       } else {
  //         const newData = [...getData, ...sendData]
  //         localStorage.setItem("productCompare", JSON.stringify(newData));
  //       }
  //     }
  //   } else {
  //     localStorage.setItem("productCompare", JSON.stringify(sendData));
  //   }
  // };

  return (
    <>
      {productDetails ? (
        <Card className='product-row shadow-sm'>
          <div onClick={goToDetails} style={{ cursor: 'pointer' }} className='image-container'>
            <Card.Img
              variant='top'
              src={common.productThumbUrl + (productDetails?.product?.name ? productDetails?.product?.thumbnail : productDetails?.thumbnail)}
              style={{ height: 250, maxWidth: '100%' }}
            />
            <div className='top-left '>{productDetails?.purpose || null}</div>
          </div>
          <Card.Body onClick={goToDetails} style={{ cursor: 'pointer' }}>
            <Card.Title>
              <span>{productDetails?.product?.name || productDetails?.name}</span>
            </Card.Title>
            <div>
              <div className='d-block mb-1 fw-bold mt-2'>
                {common.getCurrencyWithFormat(productDetails?.price || productDetails?.items[0]?.price)}
              </div>
              <div className='d-block  mb-1'>
                <span className='fw-bold'>
                  {productDetails?.product?.name ? productDetails?.product?.category?.categoryName : productDetails?.category?.categoryName} [
                  {productDetails?.product?.name
                    ? productDetails?.product?.subcategory?.subcategoryName
                    : productDetails?.subcategory?.subcategoryName}
                  ]
                </span>
              </div>
              <div className='d-block  mb-1'>
                <span
                  className={[
                    'badge ',
                    common.calculateAvgRating(productDetails?.product?.name ? productDetails : productDetails?.items[0]).className,
                  ].join(' ')}
                >
                  <i className='fa fa-star'></i>{' '}
                  {common.calculateAvgRating(productDetails?.product?.name ? productDetails : productDetails?.items[0]).rating}
                </span>
                <span className='ms-2 text-muted'>
                  <small>({productDetails?.product?.name ? productDetails?.countOfPeopleVoted : productDetails?.items[0]?.countOfPeopleVoted})</small>
                </span>
              </div>
              <div className='d-block  mb-1'>
                <span className='fw-bold'>Seller :</span>{' '}
                {productDetails?.product?.name ? productDetails?.sellerDetails?.name : productDetails?.items[0]?.seller_details?.name}
              </div>
            </div>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <Form>
              <Form.Check type={'checkBox'} id={`default-checkBox}`} label='Add to Compare' onClick={() => onCheckBoxClick(productDetails, event)} />
            </Form>
          </Card.Footer>
        </Card>
      ) : null}
    </>
  );
};

export default ProductCard;
