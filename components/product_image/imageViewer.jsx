/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import Image360Gallery from "./image360Gallery";
import ImageGallery from "./imageGallery";
import ModelViewGTLF from "./ModelViewGTLF";
const ImageViewer = ({ imageData = [], arImageUrl = "", arimage = "", scaleImage = [1.1, 1.1, 1.1], onIimageViewTabChanged }) => {
  const [key, setKey] = useState("image-1");

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (onIimageViewTabChanged instanceof Function) {
      onIimageViewTabChanged(key);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (imageData.length > 0) {
      const tempData = imageData.filter((e) => {
        return e.type === "360Image";
      });

      if (tempData.length > 0) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
  }, [imageData]);

  const onThreeChange = (data) => {
    console.log(data);
  };

  return (
    <>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body id="editTabs" className="p-0">
              <div className="nav-no-curve">
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                  <Tab eventKey="image-1" title={"Image Gallery"}>
                    {key === "image-1" ? <ImageGallery imageData={imageData}></ImageGallery> : null}
                  </Tab>
                  {status ? (
                    <Tab eventKey="image-2" title={"360° Image Gallery"}>
                      {key === "image-2" ? <Image360Gallery imageData={imageData}></Image360Gallery> : null}
                    </Tab>
                  ) : null}

                  {arimage !== "" ? (
                    <Tab eventKey="image-3" title={"3d View"}>
                      {key === "image-3" ? <ModelViewGTLF arImageUrl={arImageUrl} scale={scaleImage}></ModelViewGTLF> : null}
                    </Tab>
                  ) : null}
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ImageViewer;
