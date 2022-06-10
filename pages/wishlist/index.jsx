/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';
import StarRatings from 'react-star-ratings';

const Wishlist = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const userId = getDataFromLocalstorage('userid');
    setUserId(userId);
    getWishlistItems(userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function getWishlistItems(userId) {
    let getData = await axiosInterceptor.get(`wishlist/${userId}`);
    // console.log(getData);
    if (getData.status == 200) {
      setWishlist(getData.data);
    }
  }

  const removeWishListItem = async (item) => {
    console.log(item);
     let res = await axiosInterceptor.delete(`wishlist/${item?.wishlistId}`);
      if (res.data.acknowledge == true) {
       getWishlistItems(userId);
    }
  };

  const goToProductDetails = (wishdata) => {
    console.log('wishdata ', wishdata);
    router.push(`product/${wishdata.productId[0].ParentId}/${wishdata.productId[0].recordId}`);
  };

  return (
    <Layout title="Wishlist" protectedRoute={true}>
      <section className="" id="pageContainer">
        <div className="container">
          <div className="row m-0 mb-4">
            <div className="bredcamp col-12 col-lg-9">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb  mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    My Wishlist
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row m-0">
            <div className="col-12 col-lg-9 wshlist">
              {wishlist.length
                ? wishlist.map((wishdata, i) => (
                    <a style={{ cursor: 'pointer' }} className="or_dhover" key={i}>
                      <div className="row m-0">
                        <div className="col-12 col-lg-2" onClick={(e) => goToProductDetails(wishdata)}>
                          <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" alt="dd" />
                        </div>
                        <div className="col-12 col-lg-9 ">
                          <div>
                            <small>
                              <b className="text-success">{wishdata?.productId[0].product_status}</b>{' '}
                            </small>
                            <div
                              className="d-flex justify-content-between"
                              onClick={(e) => goToProductDetails(wishdata)}
                            >
                              <b>{wishdata?.productId[0].product.name}</b>
                              <span>
                                <StarRatings
                                  starDimension="16px"
                                  rating={3}
                                  starRatedColor="#e74c3c"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </span>
                            </div>
                            {/* <small><b className="text-success"><i className="fas fa-star"></i> 4.5</b> (600)</small> */}
                            {/* <h6>₹329 <span className="text-black-50"> ₹500</span></h6> */}
                            <h6>
                              {wishdata?.productId[0].price.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                              })}{' '}
                            </h6>
                          </div>
                        </div>
                        <div className="col-12 col-lg-1 d-flex content-center">
                          <button className="btn btn-sm" onClick={(e) => removeWishListItem(wishdata)}>
                            <i className="fas fa-trash text-black-50"></i>
                          </button>
                        </div>
                      </div>
                    </a>
                  ))
                : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withAuthWraper(Wishlist);
