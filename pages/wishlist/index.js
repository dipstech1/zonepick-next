import { useState, useEffect } from 'react'
import axiosInterceptor from 'services/axios.interceptor';

const Wishlist = () => {

  

  return (
    <section className="py-4 py-lg-5">
      <div className="container">
        <div className="row m-0 mb-4">
          <div className="bredcamp col-12 col-lg-9">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb  mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">My Wishlist</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12 col-lg-9 wshlist">
            <a href="javascript:void(0);" className="or_dhover">
              <div className="row m-0">
                <div className="col-12 col-lg-2">
                  <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                </div>
                <div className="col-12 col-lg-9">
                  <p>
                    <b>boAt Storm 1.3" CurvedDisplay Smartwatch</b>
                    <small><b className="text-success"><i className="fas fa-star"></i> 4.5</b> (600)</small>
                    <h6>₹329 <span className="text-black-50"> ₹500</span></h6>
                  </p>
                </div>
                <div className="col-12 col-lg-1">
                  <p>
                    <button className="btn btn-sm"><i className="fas fa-trash text-black-50"></i></button>
                  </p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0);" className="or_dhover">
              <div className="row m-0">
                <div className="col-12 col-lg-2">
                  <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                </div>
                <div className="col-12 col-lg-9">
                  <p>
                    <b>boAt Storm 1.3" CurvedDisplay Smartwatch</b>
                    <small><b className="text-success"><i className="fas fa-star"></i> 4.5</b> (600)</small>
                    <h6>₹329 <span className="text-black-50"> ₹500</span></h6>
                  </p>
                </div>
                <div className="col-12 col-lg-1">
                  <p>
                    <button className="btn btn-sm"><i className="fas fa-trash text-black-50"></i></button>
                  </p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0);" className="or_dhover">
              <div className="row m-0">
                <div className="col-12 col-lg-2">
                  <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                </div>
                <div className="col-12 col-lg-9">
                  <p>
                    <b>boAt Storm 1.3" CurvedDisplay Smartwatch</b>
                    <small><b className="text-success"><i className="fas fa-star"></i> 4.5</b> (600)</small>
                    <h6>₹329 <span className="text-black-50"> ₹500</span></h6>
                  </p>
                </div>
                <div className="col-12 col-lg-1">
                  <p>
                    <button className="btn btn-sm"><i className="fas fa-trash text-black-50"></i></button>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Wishlist