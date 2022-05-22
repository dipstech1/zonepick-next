import S3 from 'react-aws-s3';


const config = {
    bucketName: 'ecom',
    dirName: 'media', /* optional */
    region: 'ap-south-1',
    accessKeyId: '',
    secretAccessKey: '',
   
}

const ReactS3Client = new S3(config);

export default ReactS3Client