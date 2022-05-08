import authPage from 'hoc/authPage';
import { useState, useEffect } from 'react'
import axiosInterceptor from 'services/axios.interceptor';
import { getDataFromLocalstorage } from 'utils/storage.util';
import { toast } from 'react-toastify';

import CartItems from '../../components/Cart/CartItems'

function Cart() {
    let userId = getDataFromLocalstorage('userid');

    let [purchasableData, setPurchaseData] = useState([]);
    let [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        getCartItems();
    }, [])

    const getCartItems = async () => {
        let items = await axiosInterceptor.get(`cart/${userId}`);
        console.log("items ", items);
        if (items && items.data.data) {
            setCartItemData(items.data.data);
            setTotalPriceData(items.data.data)
        }

    }

    const setCartItemData = (items) => {
        setPurchaseData([...items])
    }

    const setTotalPriceData = (itemData) => {
        let totalPr = 0
        itemData.forEach((item) => {
            totalPr += item?.price
        })
        setTotalPrice(totalPr)
    }

    const removeFromCart = async (itemId, itemIndex) => {
        console.log(itemIndex, purchasableData);
        axiosInterceptor.delete(`cart/${userId}/${itemId}`)
            .then(res => {
                toast.success("Item deleted from cart");
                purchasableData.splice(itemIndex, 1);
                setCartItemData(purchasableData);
                setTotalPriceData(purchasableData)

            }).catch((err) => console.log(err))
    }

    const purchase = async () => {
        axiosInterceptor.post(`purchase`, { userid: userId })
            .then(res => {
                toast.success("Transaction completed");
            }).catch((err) => console.log(err))
    }

    return (
        <>
            {/* <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">Shopping cart</h2>
                </div>
            </section>

            <section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">

                                <CartItems data={purchasableData} removeFromCart={removeFromCart} />

                                <div className="card-body border-top">
                                    <button  className="btn btn-primary float-md-right" onClick={purchase} > Make Purchase <i className="fa fa-chevron-right"></i> </button>
                                    <a href="#" className="btn btn-light"> <i className="fa fa-chevron-left"></i> Continue shopping </a>
                                </div>
                            </div>

                            <div className="alert alert-success mt-3">
                                <p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
                            </div>

                        </main>
                        <aside className="col-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Have coupon?</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="" placeholder="Coupon code" />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body" >
                                    <dl className="dlist-align" >
                                        <dt>Total price:</dt>
                                        <dd className="text-right">INR {totalPrice}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd className="text-right">INR 658</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Total:</dt>
                                        <dd className="text-right  h5"><strong>Rs.2000</strong></dd>
                                    </dl>
                                    <hr />
                                    <p className="text-center mb-3">
                                        <img src="assets/images/misc/payments.png" height="26" />
                                    </p>

                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>

            <section className="section-name bg padding-y">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </div>
            </section> */}

            <section className="innerbanner"></section>
            <section className="py-4 py-lg-5">
                <div className="container">
                    <div className="row m-0 mb-4 mb-lg-5">
                        <div className="bredcamp">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb  mb-0">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row m-0 justify-content-between">
                        <div className="shopping-cart table-responsive col-12 col-lg-8">
                            <table className="table table-striped table-sm">
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                                {
                                    purchasableData.length && purchasableData.map((itm, i) => {
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
                                                <td><b>{itm?.productId[0]?.price}</b></td>
                                                <td>
                                                    <div className="product-quantity">
                                                        <input data-min="1" data-max="0" type="text" name="quantity" value="1" readOnly="true" /><div className="quantity-selectors-container" >
                                                            <div className="quantity-selectors">
                                                                <button type="button" className="increment-quantity" aria-label="Add one" data-direction="1"><i className="fas fa-plus"></i></button>
                                                                <button type="button" className="decrement-quantity" aria-label="Subtract one" data-direction="-1" disabled="disabled"><i className="fas fa-minus"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <b>{itm?.productId[0]?.price * itm?.ordered_quantity}</b>
                                                </td>
                                                <td>
                                                    <button className="remove-product">
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </table>
                        </div>
                        <div className="col-12 col-lg-3 sticky-lg-top">
                            <div className="totals">
                                <div className="totals-item">
                                    <label>Subtotal</label>
                                    <div className="totals-value" id="cart-subtotal">71.97</div>
                                </div>
                                <div className="totals-item">
                                    <label>Tax (5%)</label>
                                    <div className="totals-value" id="cart-tax">3.60</div>
                                </div>
                                <div className="totals-item">
                                    <label>Shipping</label>
                                    <div className="totals-value" id="cart-shipping">15.00</div>
                                </div>
                                <div className="totals-item totals-item-total">
                                    <label>Grand Total</label>
                                    <div className="totals-value" id="cart-total">90.57</div>
                                </div>
                                <button className="btn btn-block btn-log mb-0" onClick={purchase}>Checkout</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default authPage(Cart)