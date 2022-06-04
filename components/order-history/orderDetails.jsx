import { useEffect } from 'react';

const OrderDetails = (props) => {
  // console.log("details ", props)

  useEffect(() => {
    console.log(props);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertToDate = (timestamp) => {
    // Months array
    var months_arr = [
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
    var date = new Date(parseInt(timestamp));

    // Year
    var year = date.getFullYear();

    // Month
    var month = months_arr[date.getMonth()];

    //  var month = [date.getMonth() + 1];

    // Day
    var day = date.getDate();

    // Hours
    var hours = date.getHours();

    // Minutes
    var minutes = '0' + date.getMinutes();

    // Seconds
    var seconds = '0' + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    var fulldate = month + ' ' + day + ' ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return fulldate;
  };

  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <b>Order Id : </b>
          <span>{props?.details?.transactionDetails?.transactionId}</span>
        </li>
        <li className="list-group-item">
          <b>Order Date : </b>
          <span>{convertToDate(props?.details?.transactionDetails?.purchase_date)}</span>
        </li>
        <li className="list-group-item">
          <b>Name : </b>
          <span>{props?.details?.orderDetails?.product?.name}</span>
        </li>
        <li className="list-group-item">
          <b>Price : </b>
          <span>
            {props?.details?.orderDetails?.price?.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR'
            })}
          </span>
        </li>
        <li className="list-group-item">
          <b>Brand : </b>
          <span>{props?.details?.orderDetails?.product?.brand}</span>
        </li>
        <li className="list-group-item">
          <b>Description : </b>
          <span>{props?.details?.orderDetails?.product?.description}</span>
        </li>
        <li className="list-group-item">
          <b>Seller Name : </b>
          <span>{props?.details?.orderDetails?.seller_details?.name}</span>
        </li>
        <li className="list-group-item">
          <b>Seller Address : </b>
          <span>{props?.details?.orderDetails?.seller_details?.address1}</span>
        </li>
        <li className="list-group-item">
          <b>Seller Email : </b>
          <span>{props?.details?.orderDetails?.seller_details?.email}</span>
        </li>
        <li className="list-group-item">
          <b>Seller Phone No. : </b>
          <span>{props?.details?.orderDetails?.seller_details?.phone}</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderDetails;
