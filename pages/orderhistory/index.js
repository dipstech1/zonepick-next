import OrderStatus from '/components/order-history/orderStatus';
import OrderManufacture from '/components/order-history/orderManufacturer';
import StarRatings from 'react-star-ratings';

import { useState, useEffect } from 'react'
import axiosInterceptor from 'services/axios.interceptor';
import { getDataFromLocalstorage } from 'utils/storage.util';
import { useRouter } from "next/router"
import Link from 'next/link';
import ModalRoot from 'ui-lib/Modal/ModalRoot';
import ModalService from 'ui-lib/Modal/ModalService';
import OrderModal from 'components/order-history/orderModal';
import OrderDetails from 'components/order-history/orderDetails';

const OrderHistory = () => {
  let userId = getDataFromLocalstorage('userid');
  const router = useRouter();

  let [orderHistory, setOrderHistory] = useState([])
  const [selectedOrder, setSelectedOrder] = useState({})

  useEffect(() => {
    getWishlistItems();
  }, [])

  const getWishlistItems = async () => {
    let items = await axiosInterceptor.post(`purchase/all`, { "userid": userId });
    // console.log("items order ", items.data.data);
    if (items && items.data.data) {
      setOrderHistory(items.data.data);
      // setTotalPriceData(items.data.data)
    }
  }

  const goToProductDetails = (wishdata) => {
    console.log("wishdata ", wishdata);
    router.push(`product/${wishdata.productId[0].ParentId}/${wishdata.productId[0].recordId}`)

  }

  const openOrderModal = (order) => {
     console.log(order)
      ModalService.open(OrderModal,{orderdetails:{...order?.productId[0]}})
  }
  return (
    <section className="py-4 py-lg-5">
        <ModalRoot/>
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
            {
              orderHistory.length > 0 ?
                orderHistory.map((order, i) => {
                  return order.transactions.map((lst, ind) => {
                    return (
                      <a href="javascript:void(0);" className="or_dhover" key={ind}>
                        <div className="row m-0" onClick={(e) => openOrderModal(lst)}>
                          <div className="col-12 col-lg-2">
                            <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                          </div>
                          <div className="col-12 col-lg-4">
                            <p>
                              <Link href={`product/${lst?.productId[0].ParentId}/${lst?.productId[0].recordId}`}>
                                <a>
                                  {lst?.productId[0].product.name}

                                </a>
                              </Link>
                              <small>Color:  Black</small>
                              <small>Seller: EverythingShop</small>
                            </p>
                            <StarRatings
                              starDimension='15px'
                              rating={3}
                              starRatedColor="#e74c3c"
                              numberOfStars={5}
                              name='rating'
                            />
                          </div>
                          <div className="col-12 col-lg-2 text-lg-center">
                            <p>₹ <span> {lst?.productId[0]?.price}</span></p>

                          </div>
                          <div className="col-12 col-lg-4">
                            <p>
                              <b><i className="fas fa-circle text-success"></i> Delivered on Mar 12</b>
                              <small>Your item has been delivered</small>
                            </p>
                          </div>
                        </div>
                      </a>
                    )
                  })
                })

                : null
            }

            <div style={{display:"none"}}>
                <OrderDetails details={selectedOrder}/>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderHistory