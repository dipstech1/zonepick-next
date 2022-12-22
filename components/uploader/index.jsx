/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Col, Row, ProgressBar } from 'react-bootstrap';
import * as S3 from 'aws-sdk/clients/s3';
import commonService from '../../utils/commonService';

const ImageUpload = ({ info = {}, onUploadComplete, AWSCredentials, mode = 'add', location = 'images' }) => {
  
  const time = new Date().getTime();

  const [imageLocation, setImageLocation] = useState({
    url: null,
    type: 'image',
    status: 'pending',
  });
  const [fileName, setFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    // console.log(info);
    if (mode === 'edit') {
      if (info.url.includes('http')) {
        setImageLocation({ ...imageLocation, url: info.url, type: info.type });
      } else {
        setImageLocation({ ...imageLocation, url: commonService.imageUrl + info.url, type: info.type });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const getFile = () => {
    if (document.getElementById(`img-load-${time}`)) {
      document.getElementById(`img-load-${time}`)?.click();
    }
  };

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFiles(event.target.files);

      let msg = '';
      // const imageFile = event.target.files[0].type;
      // const match = ['image/jpeg', 'image/jpg', 'image/png'];

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      let format = 'image';

      reader.onload = (events) => {
        setImageLocation({ url: events.target.result, status: 'pending', type: format });
      };

      reader.onloadend = () => {
        console.log('XX');
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
      setFileName(event.target.files[0].name);
    }
  };

  const upload = async () => {
    const file = selectedFiles.item(0);
    const filetypes = file.type.split('/');
    const data = await uploadFile(file, filetypes[1], file.name);

    if ((data.status = 'success')) {
      onUploadComplete(data);
      setImageLocation({ ...imageLocation, status: 'Done' });
      setUploadPercent(0);
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

      const filename_with_suffix = new Date().valueOf() + '.' + filetype;
      let params = {
        Bucket: 'www.emetacomm.com',
        Key: `upload_doc/${location}/${filename_with_suffix}`,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
      };

      bucket
        .upload(params)
        .on('httpUploadProgress', (evt) => {
          console.log((evt.loaded / evt.total) * 100);
          setUploadPercent(((evt.loaded / evt.total) * 100).toFixed(0));
        })
        .send((err, data) => {
          if (err) {
            console.log('There was an error uploading your file: ', err);
          }
        });

      bucket.upload(params, (err, data) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);

          reject({
            status: 'error',
          });
        }

        resolve({
          status: 'success',
          fileName: filename_with_suffix,
        });
      });
    });
  };

  /* Close Photo Upload Model */

  return (
    <>
      <div>
        <Row className='mb-3'>
          <Col xs={6} md={2} className={'uploader-container '}>
            <button type='button' className='btn' onClick={getFile}>
              <div className='image-container'>
                <img src='/img/browse_ic.svg' alt='' className='img-responsive-uploader' />
                <div className='centered text-nowrap bg-blue-gray-100 text-black'>Upload Image</div>
              </div>
            </button>
            <input type='file' className='custom-file-input' id={`img-load-${time}`} onChange={onFileChange} hidden={true} />
          </Col>
          <Col md={2}>
            {imageLocation?.url !== '' ? (
              <div className='image-container'>
                <img src={imageLocation?.url} alt='Images' id='previewing2' style={{ maxHeight: 120 }} />
              </div>
            ) : null}
          </Col>
        </Row>

        {uploadPercent > 0 ? (
          <Row className='mb-3'>
            <Col>
              <ProgressBar now={uploadPercent} label={uploadPercent}></ProgressBar>
            </Col>
          </Row>
        ) : null}

        <Row className='mb-2'>
          <Col className='text-center'>
            <button
              className='btn btn-indigo btn-sm text-white'
              onClick={upload}
              type='button'
              disabled={selectedFiles.length === 0 || imageLocation.status === 'Done'}
            >
              Upload
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ImageUpload;
