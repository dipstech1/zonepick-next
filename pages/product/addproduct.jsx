import { useEffect, useState } from 'react';
import Axios from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import Layout from '../../components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageUploader from '../../ui-lib/ImageUploader/ImageUploader';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const router = useRouter();

  const [productDetails, setProductDetails] = useState({
    fields: {
      productName: '',
      productDetailsData: '',
      item_description: 'Test35',
      productId: '',
      product_status: '',
      price: 0,
      purpose: '',
      quantity: 0,
      seller_details: ''
    },
    errors: {
      productName: '',
      productDetailsData: '',
      item_description: 'Test35',
      productId: '',
      product_status: '',
      price: 0,
      purpose: '',
      quantity: 0,
      seller_details: ''
    }
  });

  const [parentProductList, setparentProductList] = useState([]);

  const [step, setStep] = useState(1);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getparentProductList();
  }, []);

  const getparentProductList = async () => {
    let { data } = await Axios.get('products/lookup');
    setparentProductList([...data]);
  };

  const updateValue = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'quantity') {
      value = parseFloat(value);
    }

    let fields = { ...productDetails.fields };
    let errors = { ...productDetails.errors };
    fields[name] = value;
    errors[name] = '';
    setProductDetails({ fields, errors });
    formalidation();
  };

  const addProduct = async () => {
    let product = productDetails.fields;
    product.seller_details = getDataFromLocalstorage('userid');

    try {
      let added = await Axios.post('products', product);

      if (added.data.acknowledge) {
        router.replace('/dashboard');
        toast.success('Product added Successfully');
      } else {
        toast.success('Fail');
      }
    } catch (error) {
      console.log(error)
      toast.success('Fail');
    }
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

  const formalidation = async () => {
    let fields = { ...productDetails.fields };
    let errors = { ...productDetails.errors };
    let formIsValid = true;

    if (step === 1) {
      if (fields['productName'] === '') {
        formIsValid = false;
        errors['productName'] = 'Product Name cannot be empty';
      } else {
        errors['productName'] = '';
      }

      if (fields['productDetailsData'] === '') {
        formIsValid = false;
        errors['productDetailsData'] = 'Description cannot be empty';
      } else {
        errors['productDetailsData'] = '';
      }

      /* if (fields['productId'] === '') {
        formIsValid = false;
        errors['productId'] = 'Category cannot be empty';
      } else {
        errors['productId'] = '';
      }*/

      if (fields['product_status'] === '') {
        formIsValid = false;
        errors['product_status'] = 'Status cannot be empty';
      } else {
        errors['product_status'] = '';
      }

      if (fields['purpose'] === '') {
        formIsValid = false;
        errors['purpose'] = 'Purpose cannot be empty';
      } else {
        errors['purpose'] = '';
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

      if (fields['quantity'] === '') {
        formIsValid = false;
        errors['quantity'] = 'Quantity cannot be empty';
      } else if (fields['quantity'] === 0) {
        formIsValid = false;
        errors['quantity'] = 'Quantity cannot be Zero';
      } else {
        errors['quantity'] = '';
      }
    }

    if (step === 2) {
    }

    setProductDetails((state) => {
      state.errors = errors;
      return state;
    });

    return formIsValid;
  };

  return (
    <Layout title="Add new Product">
      <section className="pb-4 pb-lg-5" id="pageContainer">
        <div className="container py-3">
          <div className="row m-0 justify-content-center">
            <div className="bredcamp">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb  mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link href="/sell">Sell</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Product</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row m-0 mt-5">
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
                  <p>Photos & 3d Models</p>
                </div>
              </div>
            </div>
            <form role="form" id="form">
              <div
                className={['row setup-content justify-content-center', step !== 1 ? 'hide_element' : null].join(' ')}
                id="step-1"
              >
                <div className="col-12 col-lg-7 p-lg-0">
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <div className="form-group position-relative">
                        <input
                          type="text"
                          required="required"
                          className={[
                            'form-control',
                            productDetails.errors.productName !== '' && stepOne ? 'is-invalid' : null
                          ].join(' ')}
                          placeholder="Product Name"
                          id="productName"
                          name="productName"
                          onChange={updateValue}
                          value={productDetails?.fields['productName']}
                        />
                        <div className="invalid-feedback">{productDetails.errors.productName}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2 mb-2">
                    <div className="col-md-12">
                      <div className="form-group position-relative">
                        <textarea
                          rows="7"
                          required="required"
                          className={[
                            'form-control',
                            productDetails.errors.productDetailsData !== '' && stepOne ? 'is-invalid' : null
                          ].join(' ')}
                          placeholder="Description"
                          id="productDetailsData"
                          name="productDetailsData"
                          onChange={updateValue}
                          value={productDetails?.fields['productDetailsData']}
                          style={{ resize: 'none' }}
                        ></textarea>
                        <div className="invalid-feedback">{productDetails.errors.productDetailsData}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2 mb-2">
                    <div className="col-md-12">
                      <div className="form-group position-relative">
                        <select
                          required="required"
                          defaultValue=""
                          aria-label="Default select example"
                          className={[
                            'form-select',
                            productDetails.errors.productId !== '' && stepOne ? 'is-invalid' : null
                          ].join(' ')}
                          id="productId"
                          name="productId"
                          onChange={updateValue}
                          value={productDetails?.fields['productId']}
                        >
                          <option disabled value="">
                            Choose Category
                          </option>
                          {parentProductList.length &&
                            parentProductList.map((lst, i) => (
                              <option key={i} value={lst.productId}>
                                {lst.name}
                              </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{productDetails.errors.productId}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2 mb-2">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <select
                          required="required"
                          defaultValue=""
                          aria-label="Default select example"
                          className={[
                            'form-select',
                            productDetails.errors.product_status !== '' && stepOne ? 'is-invalid' : null
                          ].join(' ')}
                          id="product_status"
                          name="product_status"
                          onChange={updateValue}
                          value={productDetails?.fields['product_status']}
                        >
                          <option disabled value="">
                            Status
                          </option>
                          <option value="New">New</option>
                          <option value="Broken">Broken</option>
                          <option value="Need repair">Need repair</option>
                        </select>
                        <div className="invalid-feedback">{productDetails.errors.product_status}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <select
                          required="required"
                          defaultValue=""
                          aria-label="Default select example"
                          className={[
                            'form-select',
                            productDetails.errors.purpose !== '' && stepOne ? 'is-invalid' : null
                          ].join(' ')}
                          id="purpose"
                          name="purpose"
                          onChange={updateValue}
                          value={productDetails?.fields['purpose']}
                        >
                          <option value="" disabled>
                            Purpose
                          </option>
                          <option value="Purchase">Purchase</option>
                          <option value="Rent">Rent</option>
                        </select>
                        <div className="invalid-feedback">{productDetails.errors.purpose}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <input
                          type="text"
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
                    </div>
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <input
                          type="number"
                          required="required"
                          className={[
                            'form-control',
                            productDetails.errors.quantity !== '' && stepOne ? 'is-invalid' : null
                          ].join(' ')}
                          placeholder="Quantity"
                          id="quantity"
                          name="quantity"
                          onChange={updateValue}
                          value={productDetails?.fields['quantity']}
                        />
                        <div className="invalid-feedback">{productDetails.errors.quantity}</div>
                      </div>
                    </div>
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
                <div className="row">
                  <div>Image: </div>
                  <div className="col-12">
                    <div className="my-3">
                      <ImageUploader max={6} multi />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div>360&#176; Image: </div>
                  <div className="col-12">
                    <div className="my-3">
                      <ImageUploader max={6} multi />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div>3d/ Ar Image: </div>
                  <div className="col-12">
                    <div className="my-3">
                      <ImageUploader max={6} multi />
                    </div>
                  </div>
                </div>

                <div className="row" style={{ marginTop: '35px' }}>
                  <div className="col-12">
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary nextBtn pull-right" type="button" onClick={addProduct}>
                        Add product <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AddProduct;
