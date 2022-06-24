/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';
const AddProduct = () => {
  const [step, setStep] = useState(1);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false); 
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [productDetails, setProductDetails] = useState({
    fields: {
      title: '',
      description: '',
      category: '',
      subCategory: '',
      price: 0,
      photoCategory: '',
      state: '',
      district: '',
      pinCode: ''
    },
    errors: {
      title: '',
      description: '',
      category: '',
      subCategory: '',
      price: '',
      photoCategory: '',
      state: '',
      district: '',
      pinCode: ''
    }
  });

  const formalidation = async () => {
    let fields = { ...productDetails.fields };
    let errors = { ...productDetails.errors };
    let formIsValid = true;

    if (step === 1) {
      if (fields['title'] === '') {
        formIsValid = false;
        errors['title'] = 'Title cannot be empty';
      } else {
        errors['title'] = '';
      }

      if (fields['description'] === '') {
        formIsValid = false;
        errors['description'] = 'Description cannot be empty';
      } else {
        errors['description'] = '';
      }

      if (fields['category'] === '') {
        formIsValid = false;
        errors['category'] = 'Category cannot be empty';
      } else {
        errors['category'] = '';
      }

      if (fields['subCategory'] === '') {
        formIsValid = false;
        errors['subCategory'] = 'Sub-Category cannot be empty';
      } else {
        errors['subCategory'] = '';
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
      if (fields['photoCategory'] === '') {
        formIsValid = false;
        errors['photoCategory'] = 'Category cannot be empty';
      } else {
        errors['photoCategory'] = '';
      }

      if (fields['state'] === '') {
        formIsValid = false;
        errors['state'] = 'State cannot be empty';
      } else {
        errors['state'] = '';
      }

      if (fields['district'] === '') {
        formIsValid = false;
        errors['district'] = 'District cannot be empty';
      } else {
        errors['district'] = '';
      }

      if (fields['pinCode'] === '') {
        formIsValid = false;
        errors['pinCode'] = 'Pin Code cannot be empty';
      } else if (isNaN(fields['price'])) {
        formIsValid = false;
        errors['pinCode'] = 'Pin Code must be numeric';
      } else {
        errors['pinCode'] = '';
      }
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

  const createPost = () => {

    console.log(productDetails)

  }



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
                <p>Photos & location</p>
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
                      productDetails.errors.title !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    placeholder="Add Title..."
                    id="firstName"
                    name="title"
                    onChange={updateValue}
                    value={productDetails?.fields['title']}
                  />
                  <div className="invalid-feedback">{productDetails.errors.title}</div>
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
                    onChange={updateValue}
                    value={productDetails?.fields['category']}
                  >
                    <option disabled value="">
                      Choose Cateogry
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="invalid-feedback">{productDetails.errors.category}</div>
                </div>
                <div className="form-group position-relative">
                  <select
                    required="required"
                    aria-label="Default select example"
                    className={[
                      'form-select',
                      productDetails.errors.subCategory !== '' && stepOne ? 'is-invalid' : null
                    ].join(' ')}
                    id="subCategory"
                    name="subCategory"
                    onChange={updateValue}
                    value={productDetails?.fields['subCategory']}
                  >
                    <option disabled value="">
                      Pick a sub-category
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="invalid-feedback">{productDetails.errors.subCategory}</div>
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
                <div className="form-group row ms-0 me-0 mb-4">
                  <div className="col-12 p-0 pb-2">
                    <span style={{ display: 'block', color: '#969090', fontSize: '18px' }}>
                      Add Photos of your Product
                    </span>
                    <span style={{ display: 'block', color: '#969090' }}>
                      <small>you can add upto 12 photos</small>
                    </span>
                  </div>
                  <div className="col-4 col-lg-2 ps-1 pe-1">
                    <img src="/img/clip.png" alt="" />
                  </div>
                  <div className="col-4 col-lg-2 ps-1 pe-1">
                    <div>
                      <button className="btn">
                        <img src="/img/browse_ic.svg" alt="" />
                      </button>
                      <input type="file" name="myfile" hidden={true} />
                    </div>
                  </div>
                </div>
                <div className="form-group position-relative">
                  <select
                    required="required"
                    aria-label="Default select example"
                    className={[
                      'form-select',
                      productDetails.errors.photoCategory !== '' && stepTwo ? 'is-invalid' : null
                    ].join(' ')}
                    id="photoCategory"
                    name="photoCategory"
                    onChange={updateValue}
                    value={productDetails?.fields['photoCategory']}
                  >
                    <option disabled value="">
                      Choose Cateogry
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="invalid-feedback">{productDetails.errors.photoCategory}</div>
                </div>
                <div className=" row ms-0 me-0 ">
                  <div className="col-6 ps-0 pe-2">
                    <div className="form-group position-relative">
                    <input
                      type="text"
                      required="required"
                      placeholder="State"
                      className={[
                        'form-control',
                        productDetails.errors.state !== '' && stepTwo ? 'is-invalid' : null
                      ].join(' ')}
                      id="state"
                      name="state"
                      onChange={updateValue}
                      value={productDetails?.fields['state']}
                    />
                    <div className="invalid-feedback">{productDetails.errors.state}</div>
                    </div>
                    
                  </div>
                  <div className="col-6 ps-2 pe-0">
                    <div className="form-group position-relative">
                    <input
                      type="text"
                      required="required"
                      placeholder="District"
                      className={[
                        'form-control',
                        productDetails.errors.district !== '' && stepTwo ? 'is-invalid' : null
                      ].join(' ')}
                      id="district"
                      name="district"
                      onChange={updateValue}
                      value={productDetails?.fields['district']}
                    />
                    <div className="invalid-feedback">{productDetails.errors.district}</div>
                    </div>
                    
                  </div>
                </div>
                <div className="form-group position-relative">
                  <input
                    type="text"
                    required="required"
                    placeholder="Pincode"
                    className={[
                      'form-control',
                      productDetails.errors.pinCode !== '' && stepTwo ? 'is-invalid' : null
                    ].join(' ')}
                    id="pinCode"
                    name="pinCode"
                    onChange={updateValue}
                    value={productDetails?.fields['pinCode']}
                  />
                  <div className="invalid-feedback">{productDetails.errors.pinCode}</div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary nextBtn pull-right" type="button" onClick={stepComplete}>
                    Next <i className="fas fa-arrow-right"></i>
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
*/
            }
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default withAuthWraper(AddProduct, ['admin', 'super-admin', 'user']);
