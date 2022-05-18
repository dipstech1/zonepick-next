import React, { useRef } from "react";
import S3 from "react-aws-s3";

const REACT_APP_ACCESS_ID = "AKIAUIC652DFHFY7QIF2";
const REACT_APP_ACCESS_KEY = "ge277aUp/MS7ZjsR2WrauO4wJvBhhOAt23Ux1X4o";
const REACT_APP_BUCKET_NAME = "nodoubtapp";
// const REACT_APP_DIR_NAME = "XXXXXXXXXXXXX";
const REACT_APP_REGION = "ap-south-1";

const FileUpload = () => {
    const fileInput = useRef();
    const handleClick = (event) => {
      event.preventDefault();
      let file = fileInput.current.files[0];
      let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
      const config = {
        bucketName: REACT_APP_BUCKET_NAME,
        region: REACT_APP_REGION,
        accessKeyId: REACT_APP_ACCESS_ID,
        secretAccessKey: REACT_APP_ACCESS_KEY
      };
  
      const ReactS3Client = new S3(config);
  
      ReactS3Client.uploadFile(file, newFileName)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };
    return (
      <>
        <form className="upload-steps" >
          <label>
            Upload file:
            <input type="file" ref={fileInput} />
          </label>
          <br />
          <button type="button" onClick={handleClick}>Upload</button>
        </form>
      </>
    );
}

export default FileUpload