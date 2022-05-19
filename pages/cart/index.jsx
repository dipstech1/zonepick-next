import { useState, useEffect } from 'react';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import withAuthWraper from '../../components/withAuthWraper';

function Cart() {
  let [userId, SetUserId] = useState();
  // let userId = getDataFromLocalstorage('userid');

  const [triggerdata, setTriggerData] = useState(false);

  let [purchasableData, setPurchaseData] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (triggerdata) {
      console.log('');
    } else {
      SetUserId(getDataFromLocalstorage('userid'));
      const uId = getDataFromLocalstorage('userid');
      getCartItems(uId);
    }
  }, [triggerdata]);

  const getCartItems = async (userId) => {
    let items = await axiosInterceptor.get(`cart/${userId}`);
    console.log('items ', items);
    if (items && items.data.data) {
      setCartItemData(items.data.data);
      setTotalPriceData(items.data.data);
    }
  };

  const setCartItemData = (items = []) => {
    let productId = [];
    productId.push({ purpose: 'Iphone', price: 75000 });
    items.push({ id: 1, ordered_quantity: 2, productId });
    productId = [];
    productId.push({ purpose: 'Redme', price: 5000 });
    items.push({ id: 2, ordered_quantity: 1, productId });

    setPurchaseData([...items]);
  };

  const setTotalPriceData = (itemData) => {
    let totalPr = 0;
    itemData.forEach((item) => {
      totalPr += item?.price;
    });
    setTotalPrice(totalPr);
  };

  const removeFromCart = async (itemId, itemIndex) => {
    console.log(itemIndex, purchasableData);
    axiosInterceptor
      .delete(`cart/${userId}/${itemId}`)
      .then((res) => {
        toast.success('Item deleted from cart');
        purchasableData.splice(itemIndex, 1);
        setCartItemData(purchasableData);
        setTotalPriceData(purchasableData);
      })
      .catch((err) => console.log(err));
  };

  const purchase = async () => {
    axiosInterceptor
      .post(`purchase`, { userid: userId })
      .then((res) => {
        toast.success('Transaction completed');
      })
      .catch((err) => console.log(err));
  };

  const changeQuantity = (item = [], type) => {
    
    const data = purchasableData ;

    if (type === 'increment') {
      const val = item.ordered_quantity + 1;    
      data.map((e) => {
        if (e.id === item.id) {
          e.ordered_quantity = val;
        }
        return e;
      });
      
    } else {
      
      let val = item.ordered_quantity - 1;

      if (val < 1) {
        val = 1;
      }

      data.map((e) => {
        if (e.id === item.id) {
          e.ordered_quantity = val;
        }
        return e;
      });
    }

    setPurchaseData([...data])

    console.log(purchasableData);
  };

  return (
    <Layout title="Cart">
      <div id="pageContainer">
        <section className="py-4 py-lg-5">
          <div className="container">
            <div className="row m-0 mb-4 mb-lg-5">
              <div className="bredcamp">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb  mb-0">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shopping Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row m-0 justify-content-between">
              <div className="shopping-cart table-responsive col-12 col-lg-8">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasableData.length > 0 &&
                      purchasableData.map((itm, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <div className="product-image">
                                <img src="./img/banner.png" />
                              </div>
                            </td>
                            <td>
                              <h6>{itm?.productId[0]?.purpose}</h6>
                            </td>
                            <td>
                              <b>{itm?.productId[0]?.price}</b>
                            </td>
                            <td>
                              {
                                <div className="product-quantity">
                                  <input
                                    data-min="1"
                                    data-max="0"
                                    type="text"
                                    name="quantity"
                                    value={itm?.ordered_quantity}
                                    readOnly={true}
                                  />
                                  <div className="quantity-selectors-container">
                                    <div className="quantity-selectors">
                                      <button
                                        type="button"
                                        className="increment-quantity"
                                        aria-label="Add one"
                                        data-direction="1"
                                        onClick={() => changeQuantity(itm, 'increment')}
                                      >
                                        <i className="fas fa-plus"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="decrement-quantity"
                                        aria-label="Subtract one"
                                        data-direction="-1"                                      
                                        onClick={() => changeQuantity(itm, 'decrement')}
                                      >
                                        <i className="fas fa-minus"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              }
                            </td>
                            <td>
                              <b>{itm?.productId[0]?.price * itm?.ordered_quantity}</b>
                            </td>
                            <td>
                              <button className="remove-product">Remove</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="col-12 col-lg-3 sticky-lg-top">
                <div className="totals">
                  <div className="totals-item">
                    <label>Subtotal</label>
                    <div className="totals-value" id="cart-subtotal">
                      71.97
                    </div>
                  </div>
                  <div className="totals-item">
                    <label>Tax (5%)</label>
                    <div className="totals-value" id="cart-tax">
                      3.60
                    </div>
                  </div>
                  <div className="totals-item">
                    <label>Shipping</label>
                    <div className="totals-value" id="cart-shipping">
                      15.00
                    </div>
                  </div>
                  <div className="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div className="totals-value" id="cart-total">
                      90.57
                    </div>
                  </div>
                  <button className="btn btn-block btn-log mb-0" onClick={purchase}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default withAuthWraper(Cart, ['admin', 'super-admin']);
