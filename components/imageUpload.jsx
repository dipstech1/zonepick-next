import { useEffect, useState } from "react";
import { Col, Row, ProgressBar } from "react-bootstrap";
import * as S3 from "aws-sdk/clients/s3";
import axios from "axios";

const baseURL = "https://jkv60g7gzg.execute-api.ap-south-1.amazonaws.com/dev";

const ImageUpload = ({ onClose }) => {
  /* Photo Upload Model */

  const [imageLocation, setImageLocation] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState();
  const [uploadpercent, setUploadpercent] = useState(0);

  const [AWSCredentials, setAWSCredentials] = useState({
    AccessKeyID: "",
    SecretAccessKey: "",
    Region: "",
    BucketName: "",
  });

  useEffect(() => {
    GetAWSCredentials();
  }, []);

  const GetAWSCredentials = async () => {
    try {
      const USER_TOKEN = sessionStorage.getItem("token");

      const AuthStr = "Bearer ".concat(USER_TOKEN);

      let url = `${baseURL}/utilities/aws`;
      let resp = await axios.get(url, { headers: { Authorization: AuthStr } });

      if (resp.data) {
        setAWSCredentials(resp.data);
      }

      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = (data) => {
    onClose({
      mode: "user",
    });
  };

  const getFile = () => {
    if (document.getElementById("imgload")) {
      document.getElementById("imgload")?.click();
    }
  };

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFiles(event.target.files);

      let msg = "";
      const imagefile = event.target.files[0].type;
      const match = ["image/jpeg", "image/jpg", "image/png"];

      const img = new Image();
      img.src = window.URL.createObjectURL(event.target.files[0]);

      img.onload = () => {
        if (!(imagefile === match[0] || imagefile === match[1] || imagefile === match[2])) {
          alert("Please Select JPG/JPEG/PNG File.");
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (events) => {
            setImageLocation(events.target.result);
          };

          reader.onloadend = () => {
            console.log("XX");
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
          setFileName(event.target.files[0].name);
        }
      };
    }
  };

  const upload = async () => {
    const file = selectedFiles.item(0);
    const filetypes = file.type.split("/");
    const data = await uploadFile(file, filetypes[1], file.name);

    if ((data.status = "success")) {
      onClose({
        mode: "program",
        imgUrl: "https://s3.ap-south-1.amazonaws.com/www.nftmetasoft.com/upload_documents/images/" + data.fileName,
      });
    }
  };

  const uploadFile = async (file, filetype) => {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: AWSCredentials.AccessKeyID,
        secretAccessKey: AWSCredentials.SecretAccessKey,
        region: AWSCredentials.Region,
      });

      const filename_with_suffix = new Date().valueOf() + "." + filetype;
      let params = {
        Bucket: "www.nftmetasoft.com",
        Key: "upload_documents/images/" + filename_with_suffix,
        Body: file,
        ACL: "public-read",
        ContentType: contentType,
      };

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

  /* Close Photo Upload Model */

  return (
    <>
      <div>
        <Row className="mb-2">
          <Col className="text-end">
            <span onClick={(e) => closeModal(true)} style={{ cursor: "pointer", fontSize: "20px" }}>
              &times;
            </span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6} lg={3} className={"uploader-container "}>
            <button type="button" className="btn" onClick={getFile}>
              <div className="image-container">
                <img src="/browse_ic.svg" alt="" className="img-responsive-uploader" />
                <div className="centered text-nowrap">Upload Image</div>
              </div>
            </button>
            <input
              type="file"
              className="custom-file-input"
              accept={"image/png,image/jpg,image/jpeg"}
              id={"imgload"}
              onChange={onFileChange}
              hidden={true}
            />
          </Col>
          <Col>{imageLocation !== "" ? <img src={imageLocation} alt="Images" id="previewing2" style={{ maxHeight: 90 }} /> : null}</Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <ProgressBar now={uploadpercent} label={uploadpercent}></ProgressBar>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col className="text-center">
            <button className="btn btn-primary" onClick={upload}>
              Upload
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ImageUpload;
