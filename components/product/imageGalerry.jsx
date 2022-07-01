/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
const ImageGallery = ({ imageData = [] }) => {
  console.log(imageData);
  let [imgLink, setImgLink] = useState("");
  const updateImageLink = (e) => {
    setImgLink(e.target.src);
  };

  useEffect(() => {
    if (imageData.length > 0) {
      setImgLink("/uploads/product/" + imageData[0].url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  return (
    <>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  
                  <img src={imgLink} alt="img" className="img-fluid" style={{ height: 450, width: "100%" }} />
                </Col>
              </Row>

              {imageData.length > 0 &&
                imageData.map((data, i) => {
                  return (
                    <img
                      key={i}
                      src={"/uploads/product/" + data.url}
                      alt="img"
                      className="p-1"
                      style={{ height: 80, width: 80, cursor: "pointer" }}
                      onClick={updateImageLink}
                    />
                  );
                })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ImageGallery;
