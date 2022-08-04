/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { PanoViewer } from "@egjs/view360";
import common from "../../utils/commonService";
const Image360Gallery = ({ imageData = [] }) => {
  // console.log(imageLink);

  const [imageLinks, setImageLinks] = useState([]);

  let [imgLink, setImgLink] = useState("");

  const [containerRef, setContainerRef] = useState();

  useEffect(() => {
    if (imageData.length > 0) {
      const tempData = imageData.filter((e) => {
        return e.type === "360Image";
      });

      setImageLinks(tempData);

      if (tempData.length > 0) {
        setImgLink(common.imageUrl + tempData[0].url)        
      } 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  const set360Image = (imgUrl) => {

      const panoViewer = new PanoViewer(containerRef, {
      image: imgUrl,
      projectionType: "equirectangular",
      
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Card className="border-0">
            <Card.Body>
              <Row>
                <Col>
                  <div className="w-100 h-100" style={{minHeight: 400, width:'auto'}}>
                    <div ref={(ref) => setContainerRef(ref)} style={{ position: "relative", minHeight: "400px" }} />
                  </div>
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
                      onClick={() => set360Image(common.imageUrl + data.url)}
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

export default Image360Gallery;
