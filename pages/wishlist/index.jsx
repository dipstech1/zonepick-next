import { useEffect, useState } from 'react';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';

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
    if (res.status == 200) {
      getWishlistItems(userId)
    }
  };

  const goToProductDetails = (wishdata) => {
    console.log("wishdata ", wishdata);
    router.push(`product/${wishdata.productId[0].ParentId}/${wishdata.productId[0].recordId}`)

 }


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
                      <div className="row m-0" onClick={(e) => goToProductDetails(wishdata)}>
                        <div className="col-12 col-lg-2">
                          <img src="./img/item_1.png" className="w-100 mb-3 mb-lg-0" />
                        </div>
                        <div className="col-12 col-lg-9">
                          <div>
                            <small>
                              <b className="text-success">{wishdata?.productId[0].product_status}</b>{' '}
                            </small>
                            <b>{wishdata?.productId[0].product.name}</b>
                            {/* <small><b className="text-success"><i className="fas fa-star"></i> 4.5</b> (600)</small> */}
                            {/* <h6>₹329 <span className="text-black-50"> ₹500</span></h6> */}
                            <h6>₹{wishdata?.productId[0].price} </h6>
                          </div>
                        </div>
                        <div className="col-12 col-lg-1">
                          <p>
                            <button
                              className="btn btn-sm"
                              onClick={(e) => removeWishListItem(wishdata)}
                            >
                              <i className="fas fa-trash text-black-50"></i>
                            </button>
                          </p>
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
