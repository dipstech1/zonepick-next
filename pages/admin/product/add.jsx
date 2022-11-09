/* eslint-disable @next/next/no-img-element */
import { getCookie } from 'cookies-next';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import MyAccountLayout from '../../../components/Account/myaccount';
import ImageUploader from '../../../components/imageUploader';
import Layout from '../../../components/Layout/layout';
import withAuth from '../../../components/withAuth';
import axios from '../../../utils/axios.interceptor';
import * as S3 from 'aws-sdk/clients/s3';
import ARUploader from '../../../components/arUploader';
import ImageUpload from '../../../components/uploader';
import commonService from '../../../utils/commonService';

const AddProductPage = () => {
  const router = useRouter();
  const [step, setStep] = useState({
    currentStep: 1,
    completeStep: 1,
  });

  const components = {
    DropdownIndicator: null,
  };

  const [AWSCredentials, setAWSCredentials] = useState({
    AccessKeyID: '',
    SecretAccessKey: '',
    Region: '',
    BucketName: '',
  });

  const [brandOptions, setBrandOptions] = useState([]);

  const [uploadpercent, setUploadPercent] = useState(0);
  const [uploadCurrent, setUploadCurrent] = useState(0);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  const [imageData, setImageData] = useState({
    productImage: [],
    threeSixtyImage: [],
    threedImage: [],
    ARImage: [],
    allImage: [],
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      subcategory: '',
      price: '',
      brand: '',
      brandId: '',
      userid: '',
      arimageurl: '',
      arimagedata: '',
      images: [],
      specifications: [],
      specificationsValue: '',
      discountPercent: 0,
      productRewardPercent: '',
      optionalField1: '',
      optionalField2: '',
      optionalField3: '',
      optionalField4: '',
      thumbnail: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(2, 'Must be at least 2 characters'),
      brand: Yup.string().required('Required').min(2, 'Must be at least 2 characters'),
      price: Yup.number().required('Required').min(1, 'Must be greater than 0'),
      description: Yup.string().required('Required').min(5, 'Must be at least 5 characters'),
      category: Yup.string().required('Required'),
      subcategory: Yup.string().required('Required'),
      productRewardPercent: Yup.number().required('Required').min(0, 'Must be 0 Or greater than 0'),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      setStep({ ...step, completeStep: 2, currentStep: 2 });

      // formik.resetForm();
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getBrandtList();
    getCategoryList();
    GetAWSCredentials();
  }, []);

  const getBrandtList = async () => {
    try {
      let resp = await axios.get('brand');
      if (resp.data.data.length > 0) {
        const item = [];
        for (let i = 0; i < resp.data.data.length; i++) {
          item.push({ value: resp.data.data[i].id, label: resp.data.data[i].brandName });
        }
        setBrandOptions([...item]);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const getCategoryList = async () => {
    try {
      let resp = await axios.get('category/categories');
      if (resp.data.length > 0) {
        const item = [];
        for (let i = 0; i < resp.data.length; i++) {
          item.push({ value: resp.data[i].id, label: resp.data[i].categoryName });
        }
        setCategoryOptions([...item]);
      }
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const getSubcategoryList = async (categoryName) => {
    try {
      const sendData = {
        category: categoryName,
      };
      let resp = await axios.post('category', sendData);
      if (resp.data.length > 0) {
        const data = resp.data[0].subcategories;
        const item = [];
        for (let i = 0; i < data.length; i++) {
          item.push({ value: data[i].id, label: data[i].subcategoryName });
        }
        setSubcategoryOptions([...item]);
      }
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const updateStep = (i) => {
    console.log(step.completeStep + '----' + i);

    if (step.completeStep === 1 && i < 2) {
      setStep({ ...step, currentStep: 1 });
    }

    if (step.completeStep === 2 && i < 3) {
      if (i == 1) {
        setStep({ ...step, currentStep: 1 });
      } else {
        setStep({ ...step, currentStep: 2 });
      }
    }

    if (step.completeStep === 3) {
      setStep({ ...step, currentStep: i });
    }
  };

  const createOption = (label) => ({
    label: label,
    value: label,
    spec: label,
  });

  const handleKeyDown = (event) => {
    // const { inputValue, value } = this.state;
    // if (!inputValue) return;

    const value = formik.values.specifications || [];

    const inputValue = formik.values.specificationsValue;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        // console.group("Value Added");
        // console.log(value);
        // console.groupEnd();
        value.push(createOption(inputValue));
        formik.setFieldValue('specifications', value);
        event.preventDefault();
    }
  };

  const getCategoryData = () => {
    const data = categoryOptions.filter((e) => {
      return e.value === parseInt(formik.values.category);
    });

    // console.log(data);

    return data;
  };

  const getSubcategoryData = () => {
    const data = subcategoryOptions.filter((e) => {
      return e.value === parseInt(formik.values.subcategory);
    });

    return data;
  };

  const getBrandData = () => {
    const data = brandOptions.filter((e) => {
      return e.label === formik.values.brand;
      // return e.value === parseInt(formik.values.brandId);
    });
    // console.log(data);
    return data;
  };

  const onNextClick = async () => {
    if (imageData.productImage.length > 0) {
      const imageList = [];

      imageData.productImage.forEach((e) => {
        imageList.push({
          fileInfo: e.fileInfo,
          fileType: 'image',
          fileUrl: e.fileUrl,
          status: 'Pending',
        });
      });

      imageData.threeSixtyImage.forEach((e) => {
        imageList.push({
          fileInfo: e.fileInfo,
          fileType: '360',
          fileUrl: e.fileUrl,
          status: 'Pending',
        });
      });

      imageData.ARImage.forEach((e) => {
        imageList.push({
          fileInfo: e.fileInfo,
          fileType: 'ar',
          fileUrl: e.fileUrl,
          status: 'Pending',
        });
      });

      setImageData({ ...imageData, allImage: imageList });

      setStep({ ...step, completeStep: 3, currentStep: 3 });
    } else {
      toast.warning('Upload atleast one product Image');
    }
  };

  const imageLoaded = (data) => {
    setImageData({ ...imageData, productImage: data });
  };

  const image360Loaded = (data) => {
    setImageData({ ...imageData, threeSixtyImage: data });
  };

  const ARImageLoaded = (data) => {
    setImageData({ ...imageData, ARImage: data });
  };

  const onSubmitClick = async () => {
    const images = [];
    let imageList = [...imageData.allImage];

    let arimageurl = '';

    for (let i = 0; i < imageData.allImage.length; i++) {
      const file = imageData.allImage[i].fileInfo.file;
      const fileType = imageData.allImage[i].fileInfo.file.type.split('/');
      const fileName = imageData.allImage[i].fileInfo.file.name;

      setUploadCurrent(fileName);

      let data = [];

      if (imageData.allImage[i].fileType !== 'ar') {
        data = await uploadFiles(file, fileType[1], fileName);
      } else {
        const ftype = fileName.split('.');

        data = await uploadFiles(file, ftype[ftype.length - 1], fileName);
      }

      if (data.status === 'success' && imageData.allImage[i].fileType !== 'ar') {
        images.push({ url: data.fileName, type: imageData.allImage[i].fileType });
        imageList[i].status = 'done';
      } else {
        arimageurl = data.fileName;
        imageList[i].status = 'done';
      }
      setImageData({ ...imageData, allImage: imageList });
    }

    setUploadPercent(0);

    let product = {
      name: formik.values.name,
      description: formik.values.description,
      category: formik.values.category,
      subcategory: formik.values.subcategory,
      price: formik.values.price,
      brand: formik.values.brand,
      userid: '',
      arimageurl: arimageurl,
      arimagedata: '',
      images: images,
      specifications: formik.values.specifications,
      discountPercent: 0,
      productRewardPercent: parseInt(formik.values.productRewardPercent),
      optionalField1: formik.values.optionalField1,
      optionalField2: formik.values.optionalField2,
      optionalField3: formik.values.optionalField3,
      optionalField4: formik.values.optionalField4,
      thumbnail: formik.values.thumbnail
    };
    product.userid = getCookie('userid');

    try {
      let added = await axios.post('admin/create-product-entry', product);

      if (added.data.acknowledge) {
        router.replace('/admin/product');
        toast.success('Product added Successfully');
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const GetAWSCredentials = async () => {
    try {
      let resp = await axios.get('utilities/aws');

      if (resp.data) {
        setAWSCredentials(resp.data);
      }

      //  console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error('Fail');
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

      const filename_with_suffix = new Date().valueOf() + '.' + filetype;
      let params = {
        Bucket: 'www.emetacomm.com',
        Key: 'upload_doc/images/' + filename_with_suffix,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
      };

      if (filetype === 'glb') {
        params.Key = 'upload_doc/glb/' + filename_with_suffix;
      }

      if (filetype === 'fbx') {
        params.Key = 'upload_doc/fbx/' + filename_with_suffix;
      }

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

  const onChangeThumbnails = (data) => {
    formik.setFieldValue('thumbnail', data.fileName);
  };

  return (
    <>
      <Layout title='Add Product' metaDescription={[{ name: 'description', content: 'Add Product' }]}>
        <div id='pageContainer' className='container'>
          <Breadcrumb className='m-2'>
            <Link href='/' passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href='/account' passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href='/admin/product' passHref>
              <Breadcrumb.Item>Product</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title='Add Product' activeLink={10} enableBack={true}>
            <div className='step-form'>
              <ul>
                <li
                  className={step.currentStep === 1 || step.currentStep === 2 || step.currentStep === 3 ? 'active' : 'deactive'}
                  onClick={() => updateStep(1)}
                >
                  Product Details
                </li>
                <li className={step.currentStep === 2 || step.currentStep === 3 ? 'active' : 'deactive'} onClick={() => updateStep(2)}>
                  Photos
                </li>
                <li className={step.currentStep === 3 ? 'active' : 'deactive'} onClick={() => updateStep(3)}>
                  Preview
                </li>
              </ul>
            </div>
            <div className='px-md-5 px-2 py-3'>
              {step.currentStep === 1 ? (
                <Container>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className='mb-2 position-relative' controlId='name'>
                          <Form.Label className='fw-bold'>Product Name:</Form.Label>
                          <Form.Control
                            type='text'
                            name='name'
                            placeholder='Enter Product Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={formik.touched.name && formik.errors.name ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='brand'>
                          <Form.Label className='fw-bold'>Brand:</Form.Label>
                          <Select
                            menuPlacement='bottom'
                            options={brandOptions}
                            placeholder='Select Brand'
                            value={getBrandData()}
                            onChange={(selectedOption) => {
                              formik.setFieldValue('brand', selectedOption.label);
                              formik.setFieldValue('brandId', selectedOption.value);
                            }}
                            className={formik.touched.brand && formik.errors.brand ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.brand}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className='mb-2 position-relative' controlId='price'>
                          <Form.Label className='fw-bold'>Price:</Form.Label>
                          <Form.Control
                            type='number'
                            name='price'
                            placeholder='Enter Price'
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            className={formik.touched.price && formik.errors.price ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.price}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className='mb-2 position-relative' controlId='productRewardPercent'>
                          <Form.Label className='fw-bold'>Reward Percent:</Form.Label>
                          <Form.Control
                            type='number'
                            name='productRewardPercent'
                            placeholder='Enter Reward Percent'
                            value={formik.values.productRewardPercent}
                            onChange={formik.handleChange}
                            className={formik.touched.productRewardPercent && formik.errors.productRewardPercent ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.productRewardPercent}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className='mb-2 position-relative' controlId='description'>
                          <Form.Label className='fw-bold'>Description:</Form.Label>
                          <Form.Control
                            as='textarea'
                            name='description'
                            rows={3}
                            placeholder='Description'
                            style={{ resize: 'none' }}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className={formik.touched.description && formik.errors.description ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.description}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='category'>
                          <Form.Label className='fw-bold'>Category:</Form.Label>
                          <Select
                            menuPlacement='top'
                            options={categoryOptions}
                            placeholder='Select Category'
                            value={getCategoryData()}
                            onChange={(selectedOption) => {
                              getSubcategoryList(selectedOption.label);
                              formik.setFieldValue('category', selectedOption.value);
                              formik.setFieldValue('subcategory', '');
                            }}
                            className={formik.touched.category && formik.errors.category ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.category}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='subcategory'>
                          <Form.Label className='fw-bold'>Subcategory:</Form.Label>
                          <Select
                            menuPlacement='top'
                            options={subcategoryOptions}
                            placeholder='Select Subcategory'
                            value={getSubcategoryData()}
                            onChange={(selectedOption) => {
                              formik.setFieldValue('subcategory', selectedOption.value);
                            }}
                            className={formik.touched.subcategory && formik.errors.subcategory ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.subcategory}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className='mb-2 position-relative' controlId='specifications'>
                          <Form.Label className='fw-bold'>Specifications:</Form.Label>
                          <CreatableSelect
                            components={components}
                            inputValue={formik.values.specificationsValue}
                            isClearable
                            isMulti
                            menuIsOpen={false}
                            onChange={(selectedOption) => {
                              //console.log(selectedOption)
                              formik.setFieldValue('specifications', selectedOption);
                            }}
                            onInputChange={(selectedOption) => {
                              // console.log(selectedOption);
                              formik.setFieldValue('specificationsValue', selectedOption);
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder='Type specifications and press enter'
                            value={formik.values.specifications}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.specifications}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='optionalField1'>
                          <Form.Label className='fw-bold'>Optional Field-1:</Form.Label>
                          <Form.Control
                            type='text'
                            name='optionalField1'
                            placeholder='Enter Optional Field-1'
                            value={formik.values.optionalField1}
                            onChange={formik.handleChange}
                            className={formik.touched.optionalField1 && formik.errors.optionalField1 ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.optionalField1}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='optionalField2'>
                          <Form.Label className='fw-bold'>Optional Field-2:</Form.Label>
                          <Form.Control
                            type='text'
                            name='optionalField2'
                            placeholder='Enter Optional Field-2'
                            value={formik.values.optionalField2}
                            onChange={formik.handleChange}
                            className={formik.touched.optionalField2 && formik.errors.optionalField2 ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.optionalField2}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='optionalField3'>
                          <Form.Label className='fw-bold'>Optional Field-3:</Form.Label>
                          <Form.Control
                            type='text'
                            name='optionalField3'
                            placeholder='Enter Optional Field-3'
                            value={formik.values.optionalField3}
                            onChange={formik.handleChange}
                            className={formik.touched.optionalField3 && formik.errors.optionalField3 ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.optionalField3}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className='mb-2 position-relative' controlId='optionalField4'>
                          <Form.Label className='fw-bold'>Optional Field-4:</Form.Label>
                          <Form.Control
                            type='text'
                            name='optionalField4'
                            placeholder='Enter Optional Field-4'
                            value={formik.values.optionalField4}
                            onChange={formik.handleChange}
                            className={formik.touched.optionalField4 && formik.errors.optionalField4 ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type='invalid'>{formik.errors.optionalField4}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId='submitButton' className='float-end mt-3'>
                      <Button variant='deep-purple-900' type='submit'>
                        Next
                      </Button>
                    </Form.Group>
                  </Form>
                </Container>
              ) : null}

              {step.currentStep === 2 ? (
                <Container>
                  <Row>
                    <Col id={'editTabs'}>
                      <Tabs defaultActiveKey='pimage' id='uncontrolled-tab-example' className='mb-3 nav-fill'>
                        <Tab eventKey='thumbnails' title={'Product Thumbnails'}>
                          <ImageUpload
                            info={{ type: 'image', url: commonService.productThumbUrl + '1667556172570.png' }}
                            onUploadComplete={onChangeThumbnails}
                            AWSCredentials={AWSCredentials}
                            mode='add'
                            location='images/product'
                          />
                        </Tab>

                        <Tab eventKey='pimage' title='Product Image'>
                          <ImageUploader
                            maxUpload={5}
                            info={'Add Product Photos'}
                            onSelectionChanged={imageLoaded}
                            id={'normal'}
                            imagesList={imageData.productImage}
                          ></ImageUploader>
                        </Tab>
                        <Tab eventKey='360image' title={'360  Image'}>
                          <ImageUploader
                            maxUpload={2}
                            info={'Add 360  Photos'}
                            onSelectionChanged={image360Loaded}
                            id={'img360'}
                            imagesList={imageData.threeSixtyImage}
                          ></ImageUploader>
                        </Tab>
                        <Tab eventKey='3d' title='AR Image'>
                          <ARUploader
                            maxUpload={1}
                            info={'Add AR  Photos'}
                            onSelectionChanged={ARImageLoaded}
                            id={'AR'}
                            imagesList={imageData.ARImage}
                          ></ARUploader>
                        </Tab>
                      </Tabs>
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col xs={12}>
                      <div className='float-end'>
                        <Button
                          variant='pink-700 me-2'
                          type='button'
                          onClick={() => {
                            setStep({ ...step, currentStep: 1 });
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          variant='deep-purple-900 ms-1'
                          type='button'
                          onClick={(e) => {
                            onNextClick();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              ) : null}

              {step.currentStep === 3 ? (
                <Container className='ms-md-5'>
                  <Row>
                    <Col md={12} className='mt-2'>
                      <b>Product Name:</b> {formik.values.name}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className='mt-2'>
                      <b>Brand:</b> {formik.values.brand}
                    </Col>

                    <Col md={6} className='mt-2'>
                      <b>Price:</b> {formik.values.price}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className='mt-2'>
                      <b>Reward Percent:</b> {formik.values.productRewardPercent}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className='mt-2'>
                      <b>Category:</b> {getCategoryData()[0]?.label}
                    </Col>
                    <Col md={6} className='mt-2'>
                      <b>Subcategory:</b> {getSubcategoryData()[0]?.label}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className='mt-2'>
                      <b>Description:</b> {formik.values.description}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className='mt-2'>
                      <b>Specifications:</b>
                      <ul>
                        {formik.values.specifications.length > 0 &&
                          formik.values.specifications.map((data, i) => {
                            return <li key={i}>{data.value}</li>;
                          })}
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className='mt-2'>
                      <b>Optional Field-1:</b> {formik.values.optionalField1}
                    </Col>
                    <Col md={6} className='mt-2'>
                      <b>Optional Field-2:</b> {formik.values.optionalField2}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className='mt-2'>
                      <b>Optional Field-3:</b> {formik.values.optionalField3}
                    </Col>
                    <Col md={6} className='mt-2'>
                      <b>Optional Field-4:</b> {formik.values.optionalField4}
                    </Col>
                  </Row>

                  {uploadpercent > 0 ? (
                    <Row>
                      <Col md={12} className='mb-2 mt-2 fw-bold'>
                        <ProgressBar now={uploadpercent} label={`${uploadCurrent}` + ' -- ' + `${uploadpercent}%`}></ProgressBar>
                      </Col>
                    </Row>
                  ) : null}

                  <Row>
                    <Col md={12} className='mb-2 mt-2 fw-bold'>
                      Product Images:
                    </Col>
                    {imageData.allImage.length > 0 &&
                      imageData.allImage.map((link, i) => (
                        <Col xs={6} lg={4} key={i}>
                          <div className='uploader-container border border-danger mb-2'>
                            <div className='pe-1 pt-1 pb-1 image-container'>
                              {link.fileType !== 'ar' ? (
                                <img src={link.fileUrl} alt={'xx'} className='img-responsive-uploader' />
                              ) : (
                                <img src={'/img/3d-min.jpg'} alt={'xx'} className='img-responsive-uploader' />
                              )}

                              <div className='top-left'>
                                <span className='text-uppercase'>{link.fileType}</span>
                              </div>
                              <div className='bottom-right'>
                                <span className='text-uppercase'>{link.status}</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                  </Row>

                  <Row className='mt-5'>
                    <Col xs={12}>
                      <div className='float-end'>
                        <Button
                          variant='pink-700 me-2'
                          type='button'
                          onClick={() => {
                            setStep({ ...step, currentStep: 2 });
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          variant='deep-purple-900 ms-1'
                          type='button'
                          onClick={(e) => {
                            onSubmitClick();
                          }}
                        >
                          Add Product
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              ) : null}
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddProductPage, ['ADMIN']);
