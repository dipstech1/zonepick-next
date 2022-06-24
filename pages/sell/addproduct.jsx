import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import withAuthWraper from '../../components/withAuthWraper';
import Axios from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';

const AddProduct = () => {
  const router = useRouter();

  const [productDetails, setProductDetails] = useState({
    productName: 'NA',
    productDetailsData: 'NA2',
    item_description: 'Test35',
    productId: '',
    product_status: '',
    price: 0,
    purpose: '',
    quantity: 0,
    seller_details: ''
  });

  const [errors, setErrors] = useState({
    productId: '',
    product_status: '',
    price: '',
    purpose: '',
    quantity: ''
  });

  const [parentProductList, setparentProductList] = useState([]);

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
      try {
        value = parseFloat(value);
      } catch (error) {
        value = 0;
      }
    }
    setProductDetails({ ...productDetails, [name]: value });
    if (value === '' || value === 0) {
      setErrors({ ...errors, [name]: 'error' });
    }
  };

  const addProduct = async () => {
    let product = productDetails;
    product.seller_details = getDataFromLocalstorage('userid');

    try {
      let added = await Axios.post('products', product);

      if (added.data.acknowledge) {
        router.replace('/dashboard');
        toast.success('Product added Successfully');
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const stepComplete = async (event) => {
    let product = productDetails;
    product.seller_details = getDataFromLocalstorage('userid');

    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
         addProduct()
      }
      form.classList.add('was-validated');
    });
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
          <div className="m-0 mt-5">
            <form className="needs-validation" noValidate>
              <div className={['row justify-content-center'].join(' ')}>
                <div className="col-12 col-lg-7 p-lg-0">
                  <div className="row mt-2 mb-2">
                    <div className="col-md-12">
                      <div className="form-group position-relative">
                        <select
                          required="required"
                          aria-label="Default select example"
                          className={['form-select'].join(' ')}
                          id="productId"
                          name="productId"
                          onChange={updateValue}
                          value={productDetails['productId']}
                        >
                          <option disabled value="">
                            Choose Product
                          </option>
                          {parentProductList.length &&
                            parentProductList.map((lst, i) => (
                              <option key={i} value={lst.productId}>
                                {lst.name}
                              </option>
                            ))}
                        </select>
                        {errors?.productId !== '' ? <div className="invalid-feedback">AAA</div> : null}
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2 mb-2">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <select
                          required="required"
                          aria-label="Default select example"
                          className={['form-select'].join(' ')}
                          id="product_status"
                          name="product_status"
                          onChange={updateValue}
                          value={productDetails['product_status']}
                        >
                          <option disabled value="">
                            Status
                          </option>
                          <option value="New">New</option>
                          <option value="Broken">Broken</option>
                          <option value="Need repair">Need repair</option>
                        </select>
                        <div className="invalid-feedback">{errors?.product_status}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <select
                          required="required"
                          aria-label="Default select example"
                          className={['form-select'].join(' ')}
                          id="purpose"
                          name="purpose"
                          onChange={updateValue}
                          value={productDetails['purpose']}
                        >
                          <option value="" disabled>
                            Purpose
                          </option>
                          <option value="Purchase">Purchase</option>
                          <option value="Rent">Rent</option>
                        </select>
                        <div className="invalid-feedback">{errors?.purpose}</div>{' '}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <input
                          type="number"
                          required="required"
                          className={['form-control'].join(' ')}
                          placeholder="Price"
                          id="price"
                          name="price"
                          onChange={updateValue}
                          value={productDetails['price']}
                          min={1}
                        />
                        <div className="invalid-feedback">{errors?.price}</div>{' '}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <input
                          type="number"
                          required="required"
                          className={['form-control'].join(' ')}
                          placeholder="Quantity"
                          id="quantity"
                          name="quantity"
                          onChange={updateValue}
                          value={productDetails['quantity']}
                          min={1}
                        />
                        <div className="invalid-feedback">{errors?.quantity}</div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary nextBtn pull-right" type="button" onClick={stepComplete}>
                      Add Product
                    </button>
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

export default withAuthWraper(AddProduct, ['admin', 'super-admin', 'user']);
