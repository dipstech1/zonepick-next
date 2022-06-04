import { useState, useEffect } from 'react'
import Axios from "services/axios.interceptor"
import ImageUploader from 'ui-lib/ImageUploader/ImageUploader';
import { getDataFromLocalstorage } from "utils/storage.util";


const AddProduct = () => {

  const [productDetails, setProductDetails] = useState({
    "productName":"",
    "productDetailsData":"",
    "productId": "",
    "product_status": "",
    "price": "",
    "purpose": "",
    "quantity": 0,
    "seller_details": ""
  });

  const [parentProductList, setparentProductList] = useState([])

  useEffect(() => {
    (async ()=>{
      let {data} = await Axios.get("products/lookup");
      setparentProductList([...data])
    })()
  },[])

  const addProduct = async() => {
    console.log(productDetails);
    productDetails.seller_details = getDataFromLocalstorage('userid')
    let added = await Axios.post("products", productDetails);

    console.log("added ", added);
  } 

  return (
    <section className="pb-4 pb-lg-5 my-3">
      <div className="container">
        <div className="row m-0 py-3 justify-content-center">
          <div className="bredcamp">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb  mb-0">
                <li className="breadcrumb-item">Sell</li>
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
                <div className="form-group">
                  <input type="text" required="required" className="form-control" placeholder="Product name"
                    id="firstName" onChange={e =>  setProductDetails({...productDetails, productName:e.target.value})}/>
                </div>
                <div className="form-group">
                  <textarea rows="7" type="text" required="required" className="form-control"
                    placeholder="Description" onChange={e =>  setProductDetails({...productDetails, productDetailsData:e.target.value})} ></textarea>
                </div>
                <div className="form-group">
                  <select className="form-select" required="required" aria-label="Default select example"  onChange={e =>  setProductDetails({...productDetails,product_status :e.target.value})}>
                    <option selected disabled>Status</option>
                    <option value="New">New</option>
                    <option value="Broken">Broken</option>
                    <option value="Need repair">Need repair</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-select" required="required" aria-label="Default select example">
                    <option selected disabled onChange={e =>  setProductDetails({...productDetails, productId:e.target.value})}>Choose Cateogry</option>
                    {
                      parentProductList.length && parentProductList.map((lst,i) => <option key={i} value={lst.productId}>{lst.name}</option>)
                    }
                    
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-select" required="required" aria-label="Default select example"  onChange={e =>  setProductDetails({...productDetails, purpose:e.target.value})}>
                    <option selected disabled>Purpose</option>
                    <option value="Purchase">Purchase</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" required="required" className="form-control" placeholder="Price"
                    id="price"  onChange={e =>  setProductDetails({...productDetails, price:+(e.target.value)})}/>
                </div>
                <div className="form-group">
                  <input type="number" required="required" className="form-control" placeholder="Quantity"
                    id="quantity"  onChange={e =>  setProductDetails({...productDetails, quantity:+(e.target.value)})}/>
                </div>
                <div className='form-group'>
                    <ImageUploader max={6} multi />
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary nextBtn pull-right" type="button" onClick={addProduct}>Add product <i className="fas fa-arrow-right"></i></button>
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
  )
}

export default AddProduct