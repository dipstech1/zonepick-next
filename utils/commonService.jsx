import getConfig from "next/config";
/*
const imageUrl= 'upload_doc/images/'
const avatorUrl= 'upload_doc/avator/'
const arUrl= 'upload_doc/glb/'*/


const imageUrl= 'https://www.emetacomm.com/upload_doc/images/'
const avatorUrl= 'https://www.emetacomm.com/upload_doc/avator/'
const arUrl= 'https://www.emetacomm.com/upload_doc/glb/'


const DateFromTimeStamp = (timestamp) => {
  // Months array
  const months_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  const minutes = "0" + date.getMinutes();

  // Seconds
  const seconds = "0" + date.getSeconds();

  // Display date in MM-dd-yyyy format
  const fulldate = month + " " + day + " ," + date.getFullYear();

  return fulldate;
};

const DateFromTimeStampTime = (timestamp) => {
  // Months array
  const months_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  const minutes = "0" + date.getMinutes();

  // Seconds
  const seconds = "0" + date.getSeconds();

  // Display date in MM-dd-yyyy format
  var fulldate = month + " " + day + ", " + year + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return fulldate;
};


const monthYearTimeStamp = (timestamp) => {
  // Months array
  const months_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  const minutes = "0" + date.getMinutes();

  // Seconds
  const seconds = "0" + date.getSeconds();

  // Display date in MM-dd-yyyy format
  const fulldate =  date.getFullYear() + '-' + month ;

  return fulldate;
};

const delivarytatus = (timestamp) => {
  const months_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const today = new Date();
  const date = new Date(parseInt(timestamp));
  date.setDate(date.getDate() + 7);

  // Month
  const month = months_arr[date.getMonth()];
  const day = date.getDate();
  // Hours
  const hours = date.getHours();
  // Minutes
  const minutes = "0" + date.getMinutes();
  // Seconds
  const seconds = "0" + date.getSeconds();
  // Display date in MM-dd-yyyy format
  const fulldate = month + " " + day + " ," + date.getFullYear();

  return fulldate;
};

const calculateRating = (product) => {
  if (product.length > 0) {
    let total = 0;

    for (let i = 0; i < product.length; i++) {
      const ProductRating = parseInt(product[i].ProductRating) || 0;
      const ProductDeliveryRating = parseInt(product[i].ProductDeliveryRating) || 0;
      const ProductQualityRating = parseInt(product[i].ProductQualityRating) || 0;
      const ProductPackagingRating = parseInt(product[i].ProductPackagingRating) || 0;
      const SellerRating = parseInt(product[i].SellerRating) || 0;
      const SellerCommunicationRating = parseInt(product[i].SellerCommunicationRating) || 0;

      const ovarall =
        (ProductRating + ProductDeliveryRating + ProductQualityRating + ProductPackagingRating + SellerRating + SellerCommunicationRating) / 6;

      total = total + ovarall;
    }

    const ovarallRating = total / product.length;

    let className = "";

    if (ovarallRating >= 4.0) {
      className = "bg-success";
    } else if (ovarallRating >= 2.0) {
      className = "bg-secondary";
    } else if (ovarallRating < 2.0) {
      className = "bg-danger";
    }

    return { className: className, rating: ovarallRating.toFixed(1), total: product.length };
  } else {
    return { className: "bg-primary", rating: "NA", total: 0 };
  }
};

const calculateAvgRating = (product) => { 

 // console.log(product?.avgProductRating)

  const total =
    parseFloat(product?.avgProductDeliveryRating || 0) +
    parseFloat(product?.avgProductPackagingRating || 0) +
    parseFloat(product?.avgProductQualityRating || 0) +
    parseFloat(product?.avgProductRating || 0);

  const ovarallRating = total / 4;

  let className = "";

  if (ovarallRating >= 4.0) {
    className = "bg-success";
  } else if (ovarallRating >= 2.0) {
    className = "bg-secondary";
  } else if (ovarallRating < 2.0) {
    className = "bg-danger";
  }

  if (product?.countOfPeopleVoted > 0) {
    return { className: className, rating: ovarallRating.toFixed(1), total: product.countOfPeopleVoted };
  } else {
    return { className: "bg-primary", rating: "0", total: product?.countOfPeopleVoted };
  }
};

const getCurrencyWithFormat = (value = 0) => {
  const { publicRuntimeConfig } = getConfig();

  return value.toLocaleString(publicRuntimeConfig.lang, {
    style: "currency",
    currency: publicRuntimeConfig.currency,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  DateFromTimeStamp: DateFromTimeStamp,
  DateFromTimeStampTime: DateFromTimeStampTime,
  monthYearTimeStamp:monthYearTimeStamp,
  calculateRating: calculateRating,
  calculateAvgRating: calculateAvgRating,
  delivarytatus: delivarytatus,
  getCurrencyWithFormat: getCurrencyWithFormat,
  imageUrl: imageUrl,
  avatorUrl: avatorUrl,
  arUrl: arUrl
};
