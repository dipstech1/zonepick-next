import authPage from 'hoc/authPage';
import { useState, useEffect } from 'react'
import axiosInterceptor from 'services/axios.interceptor';
import { getDataFromLocalstorage } from 'utils/storage.util';

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
        if (items && items.data.purchasables) {
            let totalPr = 0
            items.data.purchasables.forEach((item) => {
                totalPr += item?.price
            })
            setTotalPrice(totalPr)
            setPurchaseData(items.data.purchasables)
        }

    }

    return (
        <>
            <section class="section-pagetop bg">
                <div class="container">
                    <h2 class="title-page">Shopping cart</h2>
                </div>
            </section>

            <section class="section-content padding-y">
                <div class="container">

                    <div class="row">
                        <main class="col-md-9">
                            <div class="card">

                                <CartItems data={purchasableData} />

                                <div class="card-body border-top">
                                    <button href="#" class="btn btn-primary float-md-right" > Make Purchase <i class="fa fa-chevron-right"></i> </button>
                                    <a href="#" class="btn btn-light"> <i class="fa fa-chevron-left"></i> Continue shopping </a>
                                </div>
                            </div>

                            <div class="alert alert-success mt-3">
                                <p class="icontext"><i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
                            </div>

                        </main>
                        <aside class="col-md-3">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label>Have coupon?</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" name="" placeholder="Coupon code" />
                                                <span class="input-group-append">
                                                    <button class="btn btn-primary">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body" >
                                    <dl class="dlist-align" >
                                        <dt>Total price:</dt>
                                        <dd class="text-right">INR {totalPrice}</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd class="text-right">INR 658</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Total:</dt>
                                        <dd class="text-right  h5"><strong>Rs.2000</strong></dd>
                                    </dl>
                                    <hr />
                                    <p class="text-center mb-3">
                                        <img src="assets/images/misc/payments.png" height="26" />
                                    </p>

                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>

            <section class="section-name bg padding-y">
                <div class="container">
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
            </section>

        </>
    )
}

export default authPage(Cart)