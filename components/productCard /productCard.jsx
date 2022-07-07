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
      <Card onClick={goToDetails} style={{cursor: 'pointer'}} className='product-row shadow-sm'>
        <div className="image-container">
          <Card.Img variant="top" src={"/uploads/product/" + productDetails?.product?.images[0]?.url} style={{ height: 250, width: "100%" }} />
          <div className="top-left ">{productDetails?.purpose}</div>
        </div>
        <Card.Body>
          <Card.Title>
            <span>{productDetails?.product?.name}</span>
          </Card.Title>
          <div>
            <div className="d-block mb-1 fw-bold mt-2">
              {common.getCurrencyWithFormat(productDetails?.price)}              
            </div>
            <div className="d-block  mb-1">
              <span className="fw-bold">{productDetails?.product?.category?.categoryName } [{productDetails?.product?.subcategory?.subcategoryName}]</span> 
            </div>
            <div className="d-block  mb-1">
              <span className={["badge ", common.calculateAvgRating(productDetails).className].join(" ")}>
                <i className="fa fa-star"></i> {common.calculateAvgRating(productDetails).rating}
              </span>
              <span className="ms-2 text-muted">
                <small>({productDetails?.CountOfPeopleVoted})</small>
              </span>
            </div>
            <div className="d-block  mb-1">
              <span className="fw-bold">Seller :</span> {productDetails.seller_details.name}
            </div>
          </div>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
