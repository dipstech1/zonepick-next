import { useRouter } from "next/router";
import { Button, Card } from "react-bootstrap";
import common from "../../utils/commonService";

const ProductCard = ({ productDetails, addToWishList }) => {
  const router = useRouter();

  const goToDetails = (e, data) => {
    e.stopPropagation();
    router.push(`product/${productDetails.ParentId}/${productDetails.recordId}`);
  };

  const onClickWishlist = (e) => {
    e.stopPropagation();
    const body = {
      recordId: productDetails.recordId
    };
    addToWishList(body);
  };

  return (
    <>
      {productDetails ?
        <Card onClick={goToDetails} style={{ cursor: 'pointer' }} className='product-row shadow-sm'>
          <div className="image-container" >
            <Card.Img variant="top" src={common.imageUrl + (productDetails?.product?.name ? productDetails?.product?.images[0]?.url : productDetails?.images[0]?.url)} style={{ height: 250, maxWidth: "100%" }} />
            <div className="top-left ">{productDetails?.purpose || null}</div>
          </div>
          <Card.Body>
            <Card.Title>
              <span>{productDetails?.product?.name || productDetails?.name}</span>
            </Card.Title>
            <div>
              <div className="d-block mb-1 fw-bold mt-2">
                {common.getCurrencyWithFormat(productDetails?.price || productDetails?.items[0]?.price)}
              </div>
              <div className="d-block  mb-1">
                <span className="fw-bold">{productDetails?.product?.name ? productDetails?.product?.category?.categoryName : productDetails?.category?.categoryName} [{productDetails?.product?.name ? productDetails?.product?.subcategory?.subcategoryName : productDetails?.subcategory?.subcategoryName}]</span>
              </div>
              <div className="d-block  mb-1">
                <span className={["badge ", common.calculateAvgRating(productDetails?.product?.name ? productDetails : productDetails?.items[0]).className].join(" ")}>
                  <i className="fa fa-star"></i> {common.calculateAvgRating(productDetails?.product?.name ? productDetails : productDetails?.items[0]).rating}
                </span>
                <span className="ms-2 text-muted">
                  <small>({productDetails?.product?.name ? productDetails?.countOfPeopleVoted : productDetails?.items[0]?.countOfPeopleVoted})</small>
                </span>
              </div>
              <div className="d-block  mb-1">
                <span className="fw-bold">Seller :</span> {productDetails?.product?.name ? productDetails?.sellerDetails?.name : productDetails?.items[0]?.seller_details?.name}
              </div>
            </div>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card> : null
      }
    </>
  );
};

export default ProductCard;