import { Card, Col, Row } from "react-bootstrap";

const SellerInfo = ({ sellerData }) => {
  console.log(sellerData);

  return (
    <Card className="shadow-sm">
        <Card.Header className="border-bottom-0 bg-transparent">
            <Card.Title className="fs-5"><span className="border-bottom border-deep-purple-900 border-2">Seller Details</span></Card.Title>
        </Card.Header>
      <Card.Body style={{height:300}}>
        {sellerData ? (
          <Row>
            <Col>dd</Col>
          </Row>
        ) : (
          <Row>
            <Col>dd</Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default SellerInfo;
