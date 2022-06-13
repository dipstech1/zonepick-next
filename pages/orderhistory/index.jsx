/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import OrderManufacture from '../../components/order-history/orderManufacturer';
import OrderStatus from '../../components/order-history/orderStatus';
import withAuthWraper from '../../components/withAuthWraper';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import { useRouter } from 'next/router';
import StarRatings from 'react-star-ratings';

import OrderModal from '../../components/order-history/orderModal';
import ModalRoot from '../../ui-lib/Modal/modalRoot';
import ModalService from '../../ui-lib/Modal/modalService';

const OrderHistory = () => {
  const router = useRouter();

  const [span, setSpan] = useState(2);

  const [userId, setUserId] = useState(null);
  let [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    const userId = getDataFromLocalstorage('userid');
    setUserId(userId);
    getOrderedItems(userId,span);
  }, [span]);

  const getOrderedItems = async (userId,span) => {
    let items = await axiosInterceptor.post(`purchase/all`, { userid: userId,span: span });
    console.log('items order ', items.data.data);
    if (items && items.data.data) {
      setOrderHistory(items.data.data);
      // setTotalPriceData(items.data.data)
    }
  };

  const goToProductDetails = (orderData) => {
    console.log('orderData ', orderData);
    router.push(`product/${orderData.productId[0].ParentId}/${orderData.productId[0].recordId}`);
  };

  const openOrderModal = (orderInfo, order) => {
    console.log(orderInfo.transactionId);

    const orderdetails = {
      orderDetails: { ...order?.productId[0] },
      transactionDetails: { transactionId: orderInfo.transactionId, purchase_date: orderInfo.purchase_date }
    };

    ModalService.open(OrderModal, { orderdetails: orderdetails });
  };

  const convertToDate = (timestamp) => {
    // Months array
    const months_arr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    // Convert timestamp to milliseconds
    const date = new Date(parseInt(timestamp));

    // Year
    const year = date.getFullYear();

    // Month
    const month = months_arr[date.getMonth()];

    //  const month = [date.getMonth() + 1];

    // Day
    const day = date.getDate();

    // Hours
    const hours = date.getHours();

    // Minutes
    const minutes = '0' + date.getMinutes();

    // Seconds
    const seconds = '0' + date.getSeconds();

    // Display date in MM-dd-yyyy format
    const fulldate = month + ' ' + day + ' ';

    return fulldate;
  };

  const delivarytatus = (timestamp) => {
    const months_arr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];


    const today = new Date();
    const date = new Date(parseInt(timestamp));
    date.setDate(date.getDate() + 7);

    // Month
    const month = months_arr[date.getMonth()];
    const day = date.getDate();
    // Hours
    const hours = date.getHours();
    // Minutes
    const minutes = '0' + date.getMinutes();
    // Seconds
    const seconds = '0' + date.getSeconds();
    // Display date in MM-dd-yyyy format
    const fulldate = month + ' ' + day + ' ';

    console.log(fulldate);

    return fulldate;
  };

  const orderStausChanged = (e)=> {
    setSpan(parseInt(e.value))
  }

  return (
    <>
      <ModalRoot />
      <Layout title="Order History">
        <section id="pageContainer">
          <div className="container">
            <div className="row m-0 mb-4">
              <div className="bredcamp">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb  mb-0">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Order History
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row m-0 justify-content-end">
              <div className="col-12 col-lg-3 ex_filter">
                <div className="input-group position-relative">
                  <input
                    type="search"
                    className="form-control w-100 mb-4 pt-0 pb-0"
                    placeholder="Search..."
                    aria-label="Username"
                  />
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

                  <OrderStatus orderValue={span} orderStausChanged={orderStausChanged} />

                  <OrderManufacture />
                </div>
              </div>
              <div className="col-12 col-lg-9">
                {orderHistory.length > 0
                  ? orderHistory.map((order, i) => {
                      return order.transactions.map((lst, ind) => {
                        return (
                          <div style={{ cursor: 'pointer' }} className="or_dhover" key={ind}>
                            <div className="row m-0" onClick={(e) => openOrderModal(order, lst)}>
                              <div className="col-12 col-lg-2">
                                <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" alt="product Logo" />
                              </div>
                              <div className="col-12 col-lg-4">
                                <div>
                                  <Link href={`product/${lst?.productId[0].ParentId}/${lst?.productId[0].recordId}`}>
                                    <a>{lst?.productId[0].product.name}</a>
                                  </Link>
                                  <small>Color: Black</small>
                                  <small>{lst?.productId[0].seller_details.name}</small>
                                  <span style={{ display: 'inline-block' }} className="pt-2">
                                    <StarRatings
                                      starDimension="16px"
                                      rating={3}
                                      starRatedColor="#e74c3c"
                                      numberOfStars={5}
                                      name="rating"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="col-12 col-lg-2 text-lg-center">
                                <p>
                                  <span>
                                    {' '}
                                    {lst?.productId[0]?.price?.toLocaleString('en-IN', {
                                      style: 'currency',
                                      currency: 'INR'
                                    })}
                                  </span>
                                </p>
                              </div>
                              <div className="col-12 col-lg-4">
                                <p>
                                  <b>
                                    <i className="fas fa-circle text-success"></i> Ordered on{' '}
                                    {convertToDate(order.purchase_date)}
                                  </b>
                                </p>
                                <p>
                                  <b>
                                    <i className="fas fa-circle text-success"></i> Delivered on {delivarytatus(order.purchase_date)}
                                  </b>                                 
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })
                  : null}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default withAuthWraper(OrderHistory);
