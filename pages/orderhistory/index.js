import OrderStatus from '/components/order-history/orderStatus';
import OrderManufacture from '/components/order-history/orderManufacturer';

import { useState, useEffect } from 'react'
import axiosInterceptor from 'services/axios.interceptor';
import { getDataFromLocalstorage } from 'utils/storage.util';

const OrderHistory = () => {
  let userId = getDataFromLocalstorage('userid');

  useEffect(() => {
    getWishlistItems();
  }, [])

  const getWishlistItems = async () => {
    let items = await axiosInterceptor.post(`purchase/all`,{"userid":userId});
    console.log("items ", items);
    // if (items && items.data.data) {
    //   setCartItemData(items.data.data);
    //   setTotalPriceData(items.data.data)
    // }

  }
  return (
    <section className="py-4 py-lg-5">
      <div className="container">
        <div className="row m-0 mb-4">
          <div className="bredcamp">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb  mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Order History</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row m-0 justify-content-end">
          <div className="col-12 col-lg-3 ex_filter">
            <div className="input-group position-relative">
              <input type="search" className="form-control w-100 mb-4 pt-0 pb-0" placeholder="Search..." aria-label="Username" />
              {/* <button className="input-group-text" style="right:0; left:auto;"><i className="fas fa-search"></i></button> */}
            </div>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12 col-lg-3">
            <div className="leftpart pe-lg-4 sticky-top" id="filterDiv">
              {/* <button type="button" className="btn-close btn-close btn-sm ml-auto d-lg-none" disabled aria-label="Close"></button> */}
              <div className="d-lg-none position-relative">
                <input type="search" className="form-control" placeholder="Search" />
                {/* <button className="input-group-text res_none"><i className="fas fa-search"></i></button> */}
              </div>

              <OrderStatus />

              <OrderManufacture />
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <a href="javascript:void(0);" className="or_dhover">
              <div className="row m-0">
                <div className="col-12 col-lg-2">
                  <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                </div>
                <div className="col-12 col-lg-4">
                  <p>
                    Lorem ipsum dolor sit amet
                    <small>Color:  Black</small>
                    <small>Seller: EverythingShop</small>
                  </p>
                </div>
                <div className="col-12 col-lg-2 text-lg-center">
                  <p>₹ <span>192</span></p>
                </div>
                <div className="col-12 col-lg-4">
                  <p>
                    <b><i className="fas fa-circle text-success"></i> Delivered on Mar 12</b>
                    <small>Your item has been delivered</small>
                  </p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0);" className="or_dhover">
              <div className="row m-0">
                <div className="col-12 col-lg-2">
                  <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                </div>
                <div className="col-12 col-lg-4">
                  <p>
                    Lorem ipsum dolor sit amet
                    <small>Color:  Black</small>
                    <small>Seller: EverythingShop</small>
                  </p>
                </div>
                <div className="col-12 col-lg-2 text-lg-center">
                  <p>₹ <span>192</span></p>
                </div>
                <div className="col-12 col-lg-4">
                  <p>
                    <b><i className="fas fa-circle text-success"></i> Delivered on Mar 12</b>
                    <small>Your item has been delivered</small>
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

export default OrderHistory