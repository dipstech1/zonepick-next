/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import common from "../../utils/commonService";


const ImageGallery = ({ imageData = [] }) => {
  // console.log(imageLink);

  const [imageLinks, setImageLinks] = useState([]);

  let [imgLink, setImgLink] = useState("");
  const updateImageLink = (e) => {
    setImgLink(e.target.src);
  };

  useEffect(() => {
   
    if (imageData.length > 0) {

      const tempData = imageData.filter((e) => {
        return e.type === "normal";
      });

      setImageLinks(tempData);


      setImgLink(common.imageUrl + imageData[0].url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  return (
    <>
      <Row>
        <Col>
          <Card className="border-0">
            <Card.Body>
              <Row>
                <Col>
                  <img src={imgLink} alt="img" className="img-fluid" style={{ height: 450, width: "100%" }} />
                </Col>
              </Row>

              {imageLinks.length > 0 &&
                imageLinks.map((data, i) => {
                  return (
                    <img
                      key={i}
                      src={common.imageUrl + data.url}
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
