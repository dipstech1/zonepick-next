import { Card, Col, Row } from "react-bootstrap";
import StarRatings from "react-star-ratings";
const Rating = ({
  ProductData = {
    avgProductRating: "0.0",
    avgProductDeliveryRating: "0.0",
    avgProductQualityRating: "0.0",
    avgProductPackagingRating: "0.0",
    countOfPeopleVoted: "0.0"
  },
}) => {
  return (
    <>
      <Row className="mt-2">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="border-bottom-0 bg-transparent">
              <Card.Title className="fs-5">
                <span className="border-bottom border-deep-purple-900 border-2">Rating ({ProductData.countOfPeopleVoted})</span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-flex fw-bold">Product :</div>
              <div className="d-flex mb-2 ms-2">
                <StarRatings
                  starDimension="17px"
                  rating={parseInt(ProductData?.avgProductRating) | 0}
                  starRatedColor="#311b92"
                  numberOfStars={5}
                  name="usertRating"
                />
              </div>

              <div className="d-flex fw-bold">Delivery :</div>
              <div className="d-flex mb-2 ms-2">
                <StarRatings
                  starDimension="17px"
                  rating={parseInt(ProductData?.avgProductDeliveryRating) | 0}
                  starRatedColor="#311b92"
                  numberOfStars={5}
                  name="usertRating"
                />
              </div>

              <div className="d-flex fw-bold">Quality :</div>
              <div className="d-flex mb-2 ms-2">
                <StarRatings
                  starDimension="17px"
                  rating={parseInt(ProductData?.avgProductQualityRating) | 0}
                  starRatedColor="#311b92"
                  numberOfStars={5}
                  name="usertRating"
                />
              </div>

              <div className="d-flex fw-bold">Packaging :</div>
              <div className="d-flex mb-2 ms-2">
                <StarRatings
                  starDimension="17px"
                  rating={parseInt(ProductData?.avgProductPackagingRating) | 0}
                  starRatedColor="#311b92"
                  numberOfStars={5}
                  name="usertRating"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Rating;
