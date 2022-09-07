/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as S3 from "aws-sdk/clients/s3";
import axios from "../utils/axios.interceptor";

let count = 0;

const ImageUploader = ({
  maxUpload = 2,
  info = "",
  onSelectionChanged,
  id = "xv",
  imagesList = [],
  mode = "add",
  productId = "",
  AWSCredentials = {},
}) => {
  const [imgsSrc, setImgsSrc] = useState([]);
  const [imgInfo, setImgInfo] = useState([]);

  const [uploadpercent, setUploadpercent] = useState(0);
  const [uploadCurrent, setUploadCurrent] = useState(0);

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
        items.push({ url: element.fileUrl, id: element.id, fileUrl: element.fileUrl });
      });
      setImgsSrc(items);
      if (count < 2) {
        setImgInfo(items);
        count = count + 1;
      }
    }

    console.log("TYAH");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList]);

  const getFile = () => {
    document.getElementById(`img${id}`).click();
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onFileChange = async (e) => {
    // setImgsSrc([]);
    // setImgInfo([]);

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
          reader.onloadend = async () => {
            if (mode === "edit") {
              prepareUpload(imageArray);
            }
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

  const removeImage = (index, id) => {
    if (mode === "edit") {
      deleteEnrty(id);
      const array = [...imgsSrc];
      array.splice(index, 1);
      setImgsSrc([...array]);

      const array2 = [...imgInfo];
      array2.splice(index, 1);
      setImgInfo([...array2]);
    } else {
      const array = [...imgsSrc];
      array.splice(index, 1);
      setImgsSrc([...array]);

      const array2 = [...imgInfo];
      array2.splice(index, 1);
      setImgInfo([...array2]);
    }
  };

  const prepareUpload = async (imageArray) => {
    for (let i = 0; i < imageArray.length; i++) {
      const file = imageArray[i].fileInfo.file;
      const fileType = imageArray[i].fileInfo.file.type.split("/");
      const fileName = imageArray[i].fileInfo.file.name;

      setUploadCurrent(fileName);

      let data = [];

      if (imageArray[i].fileType !== "AR IMAGE") {
        data = await uploadFiles(file, fileType[1], fileName);
      } else {
        data = await uploadFiles(file, "glb", fileName);
      }

      if (data.status === "success" && imageArray[i].fileType !== "AR IMAGE") {
        createEntry(data);
      }
    }
  };

  const uploadFiles = async (file, filetype, filename) => {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: AWSCredentials.AccessKeyID,
        secretAccessKey: AWSCredentials.SecretAccessKey,
        region: AWSCredentials.Region,
      });

      const filename_with_suffix = new Date().valueOf() + "." + filetype;
      let params = {
        Bucket: "www.emetacomm.com",
        Key: "upload_doc/images/" + filename_with_suffix,
        Body: file,
        ACL: "public-read",
        ContentType: contentType,
      };

      if (filetype === "glb") {
        params.Key = "upload_doc/glb/" + filename_with_suffix;
      }

      bucket
        .upload(params)
        .on("httpUploadProgress", (evt) => {
          console.log((evt.loaded / evt.total) * 100);
          setUploadpercent(((evt.loaded / evt.total) * 100).toFixed(0));
        })
        .send((err, data) => {
          if (err) {
            console.log("There was an error uploading your file: ", err);
          }
        });

      bucket.upload(params, (err, data) => {
        if (err) {
          console.log("There was an error uploading your file: ", err);

          reject({
            status: "error",
          });
        }

        resolve({
          status: "success",
          fileName: filename_with_suffix,
        });
      });
    });
  };

  const createEntry = async (data) => {
    let imgType = "image";

    if (id === "img360") {
      imgType = "360";
    }

    try {
      const sendData = {
        url: data.fileName,
        type: imgType,
        productId: productId,
      };
      let resp = await axios.post("product-image", sendData);

      if (resp.data.acknowledge == true) {
        toast.success("Image Uploaded");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const deleteEnrty = async (id) => {
    try {
      let resp = await axios.delete(`product-image/${id}`);
      if (resp.data.acknowledge == true) {
        toast.success("Image Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
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
          imgsSrc.map((data, i) => (
            <Col xs={6} lg={4} key={i}>
              <div className="uploader-container border border-danger mb-2">
                <div className="pe-1 pt-1 pb-1 image-container">
                  <img src={data.url} alt={"xx"} className="img-responsive-uploader" />
                  <div className="top-right" onClick={(e) => removeImage(i, data.id)}>
                    <i className="fa fa-times"></i>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
      {uploadpercent > 0 || uploadpercent < 100  ? (
        <Row>
          <Col md={12} className="mb-2 mt-2 fw-bold">
            <ProgressBar now={uploadpercent} label={`${uploadCurrent}` + " -- " + `${uploadpercent}%`}></ProgressBar>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default ImageUploader;
