/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Axios from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import withAuthWraper from '../../components/withAuthWraper';
const AddProduct = () => {
  const [step, setStep] = useState(1);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCategoryData();
  }, []);

  const [productDetails, setProductDetails] = useState({
    fields: {
      name: '',
      description: '',
      category: '',
      subcategory: '',
      price: 0,
      brand: '',
      userid: '',
      arimageurl: '',
      arimagedata: '',
      images: [{ url: 'phone.png' }, { url: 'phonesize.png' }],
      specifications: [{ spec: '32 GB RAM' }, { spec: 'Amoled display' }]
    },
    errors: {
      name: '',
      description: '',
      category: '',
      subcategory: '',
      brand: '',
      price: ''
    }
  });

  const [parentCategoryList, setparentCategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);

  const getCategoryData = async () => {
    try {
      let { data } = await Axios.get('category/categories');
      setparentCategoryList([...data]);
    } catch (error) {
      toast.error('Fail');
    }
  };

  const getSubCategoryData = async (e) => {
    let fields = { ...productDetails.fields };
    let errors = { ...productDetails.errors };
    fields.category = e.target.value;
    errors.category = '';
    setProductDetails({ fields, errors });

    const sendData = {
      category: e.target.selectedOptions[0].text
    };

    try {
      let { data } = await Axios.post('category', sendData);
      const subCat = data[0].subcategories;
      setsubcategoryList([...subCat]);
    } catch (error) {
      toast.error('Fail');
    }
  };

  const formalidation = async () => {
    let fields = { ...productDetails.fields };
    let errors = { ...productDetails.errors };
    let formIsValid = true;

    if (step === 1) {
      if (fields['name'] === '') {
        formIsValid = false;
        errors['name'] = 'Name cannot be empty';
      } else {
        errors['name'] = '';
      }

      if (fields['description'] === '') {
        formIsValid = false;
        errors['description'] = 'Description cannot be empty';
      } else {
        errors['description'] = '';
      }

      if (fields['brand'] === '') {
        formIsValid = false;
        errors['brand'] = 'Brand cannot be empty';
      } else {
        errors['brand'] = '';
      }

      if (fields['category'] === '') {
        formIsValid = false;
        errors['category'] = 'Category cannot be empty';
      } else {
        errors['category'] = '';
      }

      if (fields['subcategory'] === '') {
        formIsValid = false;
        errors['subcategory'] = 'Sub-Category cannot be empty';
      } else {
        errors['subcategory'] = '';
      }

      if (fields['price'] === '') {
        formIsValid = false;
        errors['price'] = 'Price cannot be empty';
      } else if (fields['price'] === 0) {
        formIsValid = false;
        errors['price'] = 'Price cannot be Zero';
      } else {
        errors['price'] = '';
      }
    }

    if (step === 2) {
      createPost();
    }

    setProductDetails((state) => {
      state.errors = errors;
      return state;
    });

    return formIsValid;
  };

  const updateValue = (e) => {
    const { name, value } = e.target;
    let fields = { ...productDetails.fields };
    let errors = { ...productDetails.errors };
    fields[name] = value;
    errors[name] = '';
    setProductDetails({ fields, errors });
    formalidation();
  };

  const stepComplete = async (e) => {
    e.preventDefault();

    const isValid = await formalidation();

    if (step == 1) {
      setStepOne(true);
      if (isValid) {
        setStep(2);
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    }

    if (step == 2) {
      setStepTwo(true);
    }

    console.log(productDetails);
  };

  const udpdateStep = (i) => {
    if (currentStep === 3) {
      setStep(i);
    }

    if (currentStep === 2) {
      if (i === 1) {
        setStep(1);
      }

      if (i === 2) {
        setStep(2);
      }
    }
  };

  let fileName = '';

  const getFile = () => {
    document.getElementById('upfile').click();
  };

  const [imgsSrc, setImgsSrc] = useState([]);

  const selectedFile = (e) => {

    if (imgsSrc.length < 5) {
      for (const file of e.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImgsSrc((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    } else {
      toast.error('Only 5 images allowed')
    }    
  };

  const removeImage = (index) => {
    var array = [...imgsSrc];     
    array.splice(index, 1);

    setImgsSrc([...array])
    
  };


  

  const [imgs360Src, setImgs360Src] = useState([]);

  const get360File = () => {
    document.getElementById('upfile2').click();
  };

  const selected360File = (e) => {

    if (imgs360Src.length < 3) {
      for (const file of e.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImgs360Src((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    } else {
      toast.error('Only 5 images allowed')
    }    
  };

  const remove360Image = (index) => {
    var array = [...imgs360Src];     
    array.splice(index, 1);
    setImgs360Src([...array])    
  };


  const [imgs3dSrc, setImgs3dSrc] = useState([]);

  const get3dFile = () => {
    document.getElementById('upfile3d').click();
  };

  const selected3dFile = (e) => {

    if (imgs3dSrc.length < 2) {
      for (const file of e.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImgs3dSrc((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    } else {
      toast.error('Only 1 images allowed')
    }    
  };

  const remove3dImage = (index) => {
    var array = [...imgs3dSrc];     
    array.splice(index, 1);
    setImgs3dSrc([...array])    
  };




  const createPost = async () => {
    let product = productDetails.fields;
    product.userid = getDataFromLocalstorage('userid');

    try {
      let added = await Axios.post('admin/create-product-entry', product);

      if (added.data.acknowledge) {
        toast.success('Product added Successfully');
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  return (
    <Layout title="Sell Page">
      <div id="pageContainer" className="container">
        <div className="bredcamp col-12 col-lg-9 pb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb  mb-0">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Add Product
              </li>
            </ol>
          </nav>
        </div>

        <section className="pt-4 pb-4 pb-lg-5">
          <div className="stepwizard">
            <div className="stepwizard-row">
              <div className="stepwizard-step">
                <button
                  type="button"
                  onClick={() => udpdateStep(1)}
                  className={['btn text-white', step === 1 ? 'btn-box btn-orange' : 'btn-circle btn-gray'].join(' ')}
                >
                  1
                </button>
                <p>Product Details</p>
              </div>
              <div className="stepwizard-step">
                <button
                  type="button"
                  onClick={() => udpdateStep(2)}
                  className={['btn text-white', step === 2 ? 'btn-box btn-orange' : 'btn-circle btn-gray'].join(' ')}
                >
                  2
                </button>
                <p>Photos</p>
              </div>
            </div>
          </div>

          <form className="row g-3 needs-validation" noValidate>
            <div
              className={['row setup-content justify-content-center', step !== 1 ? 'hide_element' : null].join(' ')}
              id="step-1"
            >
              <div className="col-12 col-lg-8 p-lg-0">
                <div className="form-group position-relative">
                  <input
                    type="text"
                    required="required"
                    className={[
                      'form-control',
                      productDetails.errors.name !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    placeholder="Product Name"
                    id="name"
                    name="name"
                    onChange={updateValue}
                    value={productDetails?.fields['name']}
                  />
                  <div className="invalid-feedback">{productDetails.errors.name}</div>
                </div>

                <div className="form-group position-relative">
                  <input
                    type="text"
                    required="required"
                    className={[
                      'form-control',
                      productDetails.errors.brand !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    placeholder="Brand Name"
                    id="brand"
                    name="brand"
                    onChange={updateValue}
                    value={productDetails?.fields['brand']}
                  />
                  <div className="invalid-feedback">{productDetails.errors.brand}</div>
                </div>

                <div className="form-group position-relative">
                  <textarea
                    rows="7"
                    type="text"
                    required="required"
                    className={[
                      'form-control',
                      productDetails.errors.description !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    style={{ resize: 'none' }}
                    placeholder="Description"
                    onChange={updateValue}
                    name="description"
                    value={productDetails?.fields['description']}
                  ></textarea>
                  <div className="invalid-feedback">{productDetails.errors.description}</div>
                </div>

                <div className="form-group position-relative">
                  <select
                    required="required"
                    aria-label="Default select example"
                    className={[
                      'form-select',
                      productDetails.errors.category !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    id="category"
                    name="category"
                    onChange={getSubCategoryData}
                    value={productDetails?.fields['category']}
                  >
                    <option disabled value="">
                      Choose Cateogry
                    </option>
                    {parentCategoryList.length &&
                      parentCategoryList.map((lst, i) => (
                        <option key={i} value={lst.id}>
                          {lst.category_name}
                        </option>
                      ))}
                  </select>
                  <div className="invalid-feedback">{productDetails.errors.category}</div>
                </div>
                <div className="form-group position-relative">
                  <select
                    required="required"
                    aria-label="Default select example"
                    className={[
                      'form-select',
                      productDetails.errors.subcategory !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    id="subcategory"
                    name="subcategory"
                    onChange={updateValue}
                    value={productDetails?.fields['subcategory']}
                  >
                    <option disabled value="">
                      Pick a sub-category
                    </option>
                    {subcategoryList.length &&
                      subcategoryList.map((lst, i) => (
                        <option key={i} value={lst.id}>
                          {lst.subcategory_name}
                        </option>
                      ))}
                  </select>
                  <div className="invalid-feedback">{productDetails.errors.subcategory}</div>
                </div>
                <div className="form-group position-relative">
                  <input
                    type="number"
                    min={0}
                    required="required"
                    className={[
                      'form-control',
                      productDetails.errors.price !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    placeholder="Price"
                    id="price"
                    name="price"
                    onChange={updateValue}
                    value={productDetails?.fields['price']}
                  />
                  <div className="invalid-feedback">{productDetails.errors.price}</div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary nextBtn pull-right" type="button" onClick={stepComplete}>
                    Proceed <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={['row setup-content justify-content-center', step !== 2 ? 'hide_element' : null].join(' ')}
              id="step-2"
            >
              <div className="col-12 col-lg-8 p-lg-0">

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Photos</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">360 Images</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">3d Images</a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                  <div className="form-group row ms-0 me-0 mb-4">
                    <div className="col-12 p-0 pb-2">
                      <span style={{ display: 'block', color: '#969090', fontSize: '18px' }}>
                        Add Photos of your Product
                      </span>
                      <span style={{ display: 'block', color: '#969090' }}>
                        <small>you can add upto 5 photos</small>
                      </span>
                    </div>

                    {imgsSrc.length > 0 &&
                      imgsSrc.map((link, i) => (
                        <div key={i} className="col-4 col-lg-3 ps-1 pe-1 pt-1 pb-1 image-container">
                          <img src={link} alt={'xx'} />
                          <div className="top-right" onClick={(e) => removeImage(i)}>
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                      ))}
                    <div className="col-4 col-lg-2 ps-1 pe-1">
                      <div>
                        <button type="button" className="btn" onClick={getFile}>
                          <img src="/img/browse_ic.svg" alt="" />
                        </button>
                        <input
                          type="file"
                          className="custom-file-input"
                          accept={'image/png,image/jpg,image/jpeg'}
                          id="upfile"
                          multiple={false}
                          onChange={selectedFile}
                          hidden={true}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="form-group row ms-0 me-0 mb-4">
                    <div className="col-12 p-0 pb-2">
                      <span style={{ display: 'block', color: '#969090', fontSize: '18px' }}>
                        Add 360 Photos of your Product
                      </span>
                      <span style={{ display: 'block', color: '#969090' }}>
                        <small>you can add upto 3 photos</small>
                      </span>
                    </div>

                    {imgs360Src.length > 0 &&
                      imgs360Src.map((link, i) => (
                        <div key={i} className="col-4 col-lg-3 ps-1 pe-1 pt-1 pb-1 image-container">
                          <img src={link} alt={'xx'} />
                          <div className="top-right" onClick={(e) => remove360Image(i)}>
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                      ))}
                    <div className="col-4 col-lg-2 ps-1 pe-1">
                      <div>
                        <button type="button" className="btn" onClick={get360File}>
                          <img src="/img/browse_ic.svg" alt="" />
                        </button>
                        <input
                          type="file"
                          className="custom-file-input"
                          accept={'image/png,image/jpg,image/jpeg'}
                          id="upfile2"
                          multiple={false}
                          onChange={selected360File}
                          hidden={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div className="form-group row ms-0 me-0 mb-4">
                    <div className="col-12 p-0 pb-2">
                      <span style={{ display: 'block', color: '#969090', fontSize: '18px' }}>
                        Add 3d Photos of your Product
                      </span>
                      <span style={{ display: 'block', color: '#969090' }}>
                        <small>you can add upto 1 photos</small>
                      </span>
                    </div>

                    {imgs3dSrc.length > 0 &&
                      imgs3dSrc.map((link, i) => (
                        <div key={i} className="col-4 col-lg-3 ps-1 pe-1 pt-1 pb-1 image-container">
                          <img src={link} alt={'xx'} />
                          <div className="top-right" onClick={(e) => remove3dImage(i)}>
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                      ))}
                    <div className="col-4 col-lg-2 ps-1 pe-1">
                      <div>
                        <button type="button" className="btn" onClick={get3dFile}>
                          <img src="/img/browse_ic.svg" alt="" />
                        </button>
                        <input
                          type="file"
                          className="custom-file-input"
                          accept={'image/png,image/jpg,image/jpeg'}
                          id="upfile3d"
                          multiple={false}
                          onChange={selected3dFile}
                          hidden={true}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

                
                

                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary nextBtn pull-right" type="button" onClick={stepComplete}>
                    Add Product <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
            {/*
            <div className={['row setup-content justify-content-center', step !== 3 ? 'hide_element' : null].join(' ')} id="step-3" >
              <div className="col-12 col-lg-7 p-lg-0">
                <p className="mb-4"><b>Review your details</b></p>
              </div>
              <div className="col-12 col-lg-7 p-lg-0">
                <div className="form-group row ms-0 me-0 mb-4 justify-content-center">
                  <div className="col-7 col-lg-3 us_pic text-center position-relative">
                    <img src="img/profile_pic.png" className="m-auto mr-lg-auto" alt='' />
                    <div className="ed_img dropdown">
                      <i className="fas fa-pen dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Change Profile Photo</a></li>
                        <li><a className="dropdown-item" href="#">Remove Profile photo</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" required="required" className="form-control" placeholder="Name"
                    id="firstName" />
                </div>
                <div className="mt-4 mb-3">
                  <p className="text-dark mb-1"><b>Take one step more to verify your account</b></p>
                  <p className="text-black-50">A verification code will be sent by sms or by email to you</p>
                </div>
                <div className="d-lg-flex justify-content-lg-center">
                  <a style={{cursor:"pointer"}} className="btn btn-outline-orange me-2" onClick={()=>verifyMobile()} ><i className="fas fa-mobile"></i> &nbsp; Verify by Mobile Number</a>
                  <a style={{cursor:"pointer"}} className="btn btn-outline-orange ms-2" onClick={()=>verifyEmail()}><i className="fas fa-envelope"></i> &nbsp; Verify by Email</a>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary finish_btn pull-right" type="button" onClick={()=> createPost()}>Post your Ad</button>
                </div>
              </div>
            </div>
*/}
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default withAuthWraper(AddProduct, ['admin', 'super-admin', 'user']);
