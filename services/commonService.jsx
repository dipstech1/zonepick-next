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
  var fulldate = month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

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
  const total =
    parseFloat(product.AvgProductDeliveryRating) +
    parseFloat(product.AvgProductPackagingRating) +
    parseFloat(product.AvgProductQualityRating) +
    parseFloat(product.AvgProductRating);

  const ovarallRating = total / 4;

  let className = "";

  if (ovarallRating >= 4.0) {
    className = "bg-success";
  } else if (ovarallRating >= 2.0) {
    className = "bg-secondary";
  } else if (ovarallRating < 2.0) {
    className = "bg-danger";
  }

 // console.log(product.CountOfPeopleVoted)

  if ((product.CountOfPeopleVoted > 0)) {
    return { className: className, rating: ovarallRating.toFixed(1), total: product.CountOfPeopleVoted };
  } else {
    return { className: "bg-primary", rating: "0", total: product.CountOfPeopleVoted };
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  DateFromTimeStamp: DateFromTimeStamp,
  DateFromTimeStampTime: DateFromTimeStampTime,
  calculateRating: calculateRating,
  calculateAvgRating: calculateAvgRating,
  delivarytatus: delivarytatus,
};
