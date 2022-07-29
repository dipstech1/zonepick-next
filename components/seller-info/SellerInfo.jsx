/* eslint-disable @next/next/no-img-element */
import { Button, Card, Col, Row } from "react-bootstrap";
import common from "../../utils/commonService";



const SellerInfo = ({ sellerData }) => {
  // console.log(sellerData);

  return (
    <Card className="shadow-sm">
      <Card.Header className="border-bottom-0 bg-transparent">
        <Card.Title className="fs-5">
          <span className="border-bottom border-deep-purple-900 border-2">Seller Details</span>
          <button className="btn btn-sm btn-outline-deep-purple-900 ms-1 text-nowrap float-end">
            <i className="fas fa-plus me-2"></i> Follow
          </button>
        </Card.Title>
      </Card.Header>
      <Card.Body style={{ height: 300 }}>
        {sellerData ? (
          <>
            <Row>
              <Col xs="12" className="d-flex">
                <div>
                  <img
                    src={common.avatorUrl + sellerData.profileImage}
                    className="img-avatar"
                    alt="..."
                    style={{ width: 70, height: 70 }}
                    onError={(e) => {
                      e.currentTarget.src = "/img/avator/no-image-icon.jpg";
                    }}
                  />
                </div>
                <div className="ps-4">
                  <span className="text-dark mb-0 d-block">
                    <b>{sellerData.name}</b>
                  </span>
                  <span className="d-inline-block text-muted small">
                    <a>{sellerData?.email}</a>
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <div className="d-block">
                  <i className="fas fa-location-dot me-2"></i> {sellerData?.address1}
                  {sellerData?.address2}
                  {sellerData?.address3}
                  {sellerData?.address4}
                </div>
                <div className="d-block mt-2">
                  <i className="fas fa-phone me-2"></i> {sellerData?.phone}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={12} className="d-grid gap-2 ps-3 pe-3 mt-2">
                <Button variant="primary" size="sm">
                  <i className="fas fa-phone me-2" aria-hidden="true"></i> Call Seller
                </Button>
              </Col>
              <Col xs={12} className="d-grid gap-2 ps-3 pe-3 mt-2">
                <Button variant="indigo" size="sm">
                  <i className="fas fa-comments me-2" aria-hidden="true"></i> Chat with Seller
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col>Login to View Seller Info</Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default SellerInfo;
