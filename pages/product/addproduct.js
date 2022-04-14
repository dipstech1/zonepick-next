import { useState, useEffect } from 'react'
import Axios from "services/axios.interceptor"
import { getDataFromLocalstorage } from "utils/storage.util";


const addProduct = () => {

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

  const addProduct = async() => {
    console.log(productDetails);
    productDetails.seller_details = getDataFromLocalstorage('userid')
    productDetails.productId = "959bc070-e85b-4d29-b552-41328402ec63"
    let added = await Axios.post("products", productDetails);

    console.log("added ", added);
  } 

  return (
    <section class="pb-4 pb-lg-5 my-3">
      <div class="container">
        <div class="row m-0 py-3 justify-content-center">
          <div class="bredcamp">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb  mb-0">
                <li class="breadcrumb-item">Sell</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row m-0">
          {/* <div class="stepwizard">
              <div class="stepwizard-row setup-panel">
                <div class="stepwizard-step">
                  <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
                  <p>Product Details</p>
                </div>
                <div class="stepwizard-step">
                  <a href="#step-2" type="button" class="btn btn-default btn-circle disabled">2</a>
                  <p>Photos & location</p>
                </div>
                <div class="stepwizard-step">
                  <a href="#step-3" type="button" class="btn btn-default btn-circle disabled">3</a>
                  <p>Review Details</p>
                </div>
              </div>
            </div> */}
          <form role="form" id="form">
            <div class="row setup-content justify-content-center" id="step-1">
              <div class="col-12 col-lg-7 p-lg-0">
                <div class="form-group">
                  <input type="text" required="required" class="form-control" placeholder="Product name"
                    id="firstName" onChange={e =>  setProductDetails({...productDetails, productName:e.target.value})}/>
                </div>
                <div class="form-group">
                  <textarea rows="7" type="text" required="required" class="form-control"
                    placeholder="Description" onChange={e =>  setProductDetails({...productDetails, productDetailsData:e.target.value})} ></textarea>
                </div>
                <div class="form-group">
                  <select class="form-select" required="required" aria-label="Default select example"  onChange={e =>  setProductDetails({...productDetails,product_status :e.target.value})}>
                    <option selected disabled>Status</option>
                    <option value="New">New</option>
                    <option value="Broken">Broken</option>
                    <option value="Need repair">Need repair</option>
                  </select>
                </div>
                <div class="form-group">
                  <select class="form-select" required="required" aria-label="Default select example">
                    <option selected disabled>Choose Cateogry</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="form-group">
                  <select class="form-select" required="required" aria-label="Default select example"  onChange={e =>  setProductDetails({...productDetails, purpose:e.target.value})}>
                    <option selected disabled>Purpose</option>
                    <option value="Purchase">Purchase</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div class="form-group">
                  <input type="text" required="required" class="form-control" placeholder="Price"
                    id="price"  onChange={e =>  setProductDetails({...productDetails, price:+(e.target.value)})}/>
                </div>
                <div class="form-group">
                  <input type="number" required="required" class="form-control" placeholder="Quantity"
                    id="quantity"  onChange={e =>  setProductDetails({...productDetails, quantity:+(e.target.value)})}/>
                </div>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary nextBtn pull-right" type="button" onClick={addProduct}>Add product <i class="fas fa-arrow-right"></i></button>
                </div>
              </div>
            </div>
            {/* <div class="row setup-content justify-content-center" id="step-2">
                <div class="col-12 col-lg-7 p-lg-0">
                    <div class="form-group row ms-0 me-0 mb-4">
                      <div class="col-12 p-0">
                        <p>Add Photos of your Product 
                          <small>you can add upto 12 photos</small>
                        </p>
                      </div>
                      <div class="col-6 col-lg-2 ps-1 pe-1">
                        <img src="./img/clip.png" />
                      </div>
                      <div class="col-6 col-lg-2 ps-1 pe-1 cts_brows">
                        <div class="upload-btn-wrapper">
                          <button class="btn"><img src="./img/browse_ic.svg" /></button>
                          <input type="file" name="myfile" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <select class="form-select" required="required" aria-label="Default select example">
                        <option selected disabled>Choose Cateogry</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="form-group row ms-0 me-0">
                      <div class="col-6 ps-0 pe-2">
                        <input type="text" required="required" class="form-control"
                        placeholder="State" />
                      </div>
                      <div class="col-6 ps-2 pe-0">
                        <input type="text" required="required" class="form-control"
                        placeholder="District" />
                      </div>
                    </div>
                    <div class="form-group">
                      <input type="text" required="required" class="form-control"
                        placeholder="Pincode" />
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-primary nextBtn pull-right" type="button">Next <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
              </div>
              <div class="row setup-content justify-content-center" id="step-3">
                <div class="col-12 col-lg-7 p-lg-0">
                  <p class="mb-4"><b>Review your details</b></p>
                </div>
                <div class="col-12 col-lg-7 p-lg-0">
                  <div class="form-group row ms-0 me-0 mb-4 justify-content-center">
                    <div class="col-7 col-lg-3 us_pic text-center position-relative">
                      <img src="./img/profile_pic.png" class="m-auto mr-lg-auto" />
                      <div class="ed_img dropdown">
                        <i class="fas fa-pen dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">Change Profile Photo</a></li>
                          <li><a class="dropdown-item" href="#">Remove Profile photo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" required="required" class="form-control" placeholder="Name"
                      id="firstName" />
                  </div>
                  <div class="mt-4 mb-3">
                    <p class="text-dark mb-1"><b>Take one step more to verify your account</b></p>
                    <p class="text-black-50">A verification code will be sent by sms or by email to you</p>
                  </div>
                  <div class="d-lg-flex justify-content-lg-center">
                    <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fas fa-mobile"></i> &nbsp; Verify by Mobile Number</a>
                    <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fas fa-envelope"></i> &nbsp; Verify by Email</a>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button class="btn btn-primary finish_btn pull-right" type="submit">Post your Ad</button>
                  </div>
                </div>
              </div> */}
          </form>
        </div>
      </div>
    </section>
  )
}

export default addProduct