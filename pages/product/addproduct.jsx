import {useEffect, useState} from 'react'
import Axios from "../../services/axios.interceptor"
import {getDataFromLocalstorage} from "../../utils/storage.util";
import Layout from "../../components/layout";
import Link from 'next/link';
import {useRouter} from "next/router";


const AddProduct = () => {

    const router = useRouter();

    const [productDetails, setProductDetails] = useState({
        "productName": "",
        "productDetailsData": "",
        "item_description":"Test35",
        "productId": "",
        "product_status": "",
        "price": 0,
        "purpose": "",
        "quantity": 0,
        "seller_details": ""
    });

    const [parentProductList, setparentProductList] = useState([])

    useEffect(() => {
      window.scrollTo(0, 0) 
      getparentProductList()
        
    }, [])


    const getparentProductList = async()=> {
      let {data} = await Axios.get("products/lookup");
      setparentProductList([...data])
    }

    const updateValue = (e) => {
      const { name, value } = e.target;
      if (name==='price' || name==='quantity') {
        value = parseFloat(value)
      } 
      setProductDetails({ ...productDetails, [name]: value });
    };

    const addProduct = async () => {
        
        productDetails.seller_details = getDataFromLocalstorage('userid')
        let added = await Axios.post("products", productDetails);
        router.replace('/dashboard');
        console.log("added ", added);

       console.log(productDetails)
    }

    return (
        <Layout title="Add new Product">
            <section className="pb-4 pb-lg-5" id='pageContainer'>
                <div className="container py-3">
                    <div className="row m-0 justify-content-center">
                        <div className="bredcamp">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb  mb-0">
                                    <li className="breadcrumb-item"><Link href='/'><a>Home</a></Link></li>
                                    <li className="breadcrumb-item active"><Link href='/sell'>Sell</Link></li>
                                    <li className="breadcrumb-item active">Add Product</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row m-0">
                        {/* <div className="stepwizard">
              <div className="stepwizard-row setup-panel">
                <div className="stepwizard-step">
                  <a href="#step-1" type="button" className="btn btn-primary btn-circle">1</a>
                  <p>Product Details</p>
                </div>
                <div className="stepwizard-step">
                  <a href="#step-2" type="button" className="btn btn-default btn-circle disabled">2</a>
                  <p>Photos & location</p>
                </div>
                <div className="stepwizard-step">
                  <a href="#step-3" type="button" className="btn btn-default btn-circle disabled">3</a>
                  <p>Review Details</p>
                </div>
              </div>
            </div> */}
                        <form role="form" id="form">
                            <div className="row setup-content justify-content-center" id="step-1">

                                <div className="col-12 col-lg-7 p-lg-0">
                                    <div className='row'>
                                        <div className='col-md-12 mb-2'>
                                            <div className="form-group">
                                                <input type="text" required="required" className="form-control"
                                                       placeholder="Product name" name='productName'
                                                       id="productName"  onChange={updateValue}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-2 mb-2'>
                                        <div className='col-md-12'>
                                                <div className="form-group">
                                                     <textarea rows="7" type="text" required="required" className="form-control"
                                                               placeholder="Description"  onChange={updateValue} name='productDetailsData'></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-2 mb-2'>
                                        <div className='col-md-12'>
                                            <div className="form-group">
                                                <select className="form-select" required="required" defaultValue=""
                                                        aria-label="Default select example" name='productId' onChange={updateValue}>
                                                    <option  disabled   value="" > Choose Category
                                                    </option>
                                                    {
                                                        parentProductList.length && parentProductList.map((lst, i) =>
                                                            <option key={i} value={lst.productId}>{lst.name}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-2 mb-2'>
                                        <div className='col-md-6'>
                                            <div className="form-group">
                                                <select className="form-select" required="required" defaultValue=""
                                                        aria-label="Default select example" name='product_status'
                                                        onChange={updateValue}>
                                                    <option disabled value="">Status</option>
                                                    <option value="New">New</option>
                                                    <option value="Broken">Broken</option>
                                                    <option value="Need repair">Need repair</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className="form-group">
                                                <select className="form-select" required="required" defaultValue=""
                                                        aria-label="Default select example" name="purpose" id='purpose'
                                                        onChange={updateValue}>
                                                    <option value='' disabled>Purpose</option>
                                                    <option value="Purchase">Purchase</option>
                                                    <option value="Rent">Rent</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-2 mb-2'>
                                        <div className='col-md-6'>
                                            <div className="form-group">
                                                <input type="text" required="required" className="form-control"
                                                       placeholder="Price" name="price"
                                                       id="price"  onChange={updateValue}/>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className="form-group">
                                                <input type="number" required="required" className="form-control"
                                                       placeholder="Quantity" name="quantity"
                                                       id="quantity"  onChange={updateValue}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{marginTop:'35px'}}>
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-primary nextBtn pull-right" type="button"
                                                        onClick={addProduct}>Add product <i className="fas fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row setup-content justify-content-center" id="step-2">
                <div className="col-12 col-lg-7 p-lg-0">
                    <div className="form-group row ms-0 me-0 mb-4">
                      <div className="col-12 p-0">
                        <p>Add Photos of your Product 
                          <small>you can add upto 12 photos</small>
                        </p>
                      </div>
                      <div className="col-6 col-lg-2 ps-1 pe-1">
                        <img src="./img/clip.png" />
                      </div>
                      <div className="col-6 col-lg-2 ps-1 pe-1 cts_brows">
                        <div className="upload-btn-wrapper">
                          <button className="btn"><img src="./img/browse_ic.svg" /></button>
                          <input type="file" name="myfile" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <select className="form-select" required="required" aria-label="Default select example">
                        <option selected disabled>Choose Cateogry</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="form-group row ms-0 me-0">
                      <div className="col-6 ps-0 pe-2">
                        <input type="text" required="required" className="form-control"
                        placeholder="State" />
                      </div>
                      <div className="col-6 ps-2 pe-0">
                        <input type="text" required="required" className="form-control"
                        placeholder="District" />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" required="required" className="form-control"
                        placeholder="Pincode" />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary nextBtn pull-right" type="button">Next <i className="fas fa-arrow-right"></i></button>
                    </div>
                </div>
              </div>
              <div className="row setup-content justify-content-center" id="step-3">
                <div className="col-12 col-lg-7 p-lg-0">
                  <p className="mb-4"><b>Review your details</b></p>
                </div>
                <div className="col-12 col-lg-7 p-lg-0">
                  <div className="form-group row ms-0 me-0 mb-4 justify-content-center">
                    <div className="col-7 col-lg-3 us_pic text-center position-relative">
                      <img src="./img/profile_pic.png" className="m-auto mr-lg-auto" />
                      <div className="ed_img dropdown">
                        <i className="fas fa-pen dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" h>Change Profile Photo</a></li>
                          <li><a className="dropdown-item" h>Remove Profile photo</a></li>
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
                    <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fas fa-mobile"></i> &nbsp; Verify by Mobile Number</a>
                    <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fas fa-envelope"></i> &nbsp; Verify by Email</a>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary finish_btn pull-right" type="submit">Post your Ad</button>
                  </div>
                </div>
              </div> */}
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default AddProduct