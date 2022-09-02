/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

let count = 0;

const ImageUploader = ({ maxUpload = 2, info = "", onSelectionChanged, id = "xv", imagesList = [] }) => {
  const [imgsSrc, setImgsSrc] = useState([]);
  const [imgInfo, setImgInfo] = useState([]);

  useEffect(() => {
    onSelectionChanged(imgInfo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgInfo]);

  useEffect(() => {   
    if (imagesList.length > 0) {
      const items = [];
      setImgsSrc(items);
      const temp = imagesList || [];
      temp.forEach((element) => {
        items.push(element.fileUrl);
      });
      setImgsSrc(items);
    }

    console.log("TYAH");
  }, [imagesList]);

  const getFile = () => {
    document.getElementById(`img${id}`).click();
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onFileChange = async (e) => {
    setImgsSrc([]);
    setImgInfo([]);

    let filesArray = e.target.files;

    const imageArray = [];

    if (filesArray.length <= maxUpload) {
      for (var i = 0; i < filesArray.length; i++) {
        await delay(100);

        const imagefile = filesArray[i].type;
        const match = ["image/jpeg", "image/jpg", "image/png"];

        if (!(imagefile === match[0] || imagefile === match[1] || imagefile === match[2])) {
          toast.error("Please Select JPG/JPEG/PNG File.");
        } else {
          let fileObj = {
            name: filesArray[i].name,
            fileSize: filesArray[i].size,
            fileContentType: filesArray[i].type,
            file: filesArray[i],
          };
          const reader = new FileReader();
          reader.readAsDataURL(filesArray[i]);
          reader.onload = () => {
            imageArray.push({
              fileInfo: fileObj,
              fileUrl: reader.result,
            });

            // setImgsSrc((imgs) => [...imgs, reader.result]);
          };
          reader.onloadend = () => {
            setImgInfo((imgs) => [...imgs, imageArray[imageArray.length - 1]]);
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
        }
      }
    } else {
      toast.error(`Only ${maxUpload} images are allowed`);
    }
  };

  const removeImage = (index) => {
    const array = [...imgsSrc];
    array.splice(index, 1);
    setImgsSrc([...array]);

    const array2 = [...imgInfo];
    array2.splice(index, 1);
    setImgInfo([...array2]);
  };

  return (
    <div>
      <Row>
        <Col>
          <span style={{ display: "block", color: "#969090", fontSize: "18px" }}>{info}</span>
          <span style={{ display: "block", color: "#969090" }}>
            <small>you can add upto {maxUpload} photos</small>
          </span>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={6} lg={3} className={"uploader-container "}>
          <button type="button" className="btn" onClick={getFile}>
            <div className="image-container">
              <img src="/img/browse_ic.svg" alt="" className="img-responsive-uploader" />
              <div className="centered text-nowrap">Upload Your Image(s)</div>
            </div>
          </button>
          <input
            type="file"
            className="custom-file-input"
            accept={"image/png,image/jpg,image/jpeg"}
            id={`img${id}`}
            multiple={true}
            onChange={onFileChange}
            hidden={true}
          />
        </Col>

        {imgsSrc.length > 0 &&
          imgsSrc.map((link, i) => (
            <Col xs={6} lg={4} key={i}>
              <div className="uploader-container border border-danger mb-2">
                <div className="pe-1 pt-1 pb-1 image-container">
                  <img src={link} alt={"xx"} className="img-responsive-uploader" />
                  <div className="top-right" onClick={(e) => removeImage(i)}>
                    <i className="fa fa-times"></i>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ImageUploader;
