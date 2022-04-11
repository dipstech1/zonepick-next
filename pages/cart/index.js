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
        if (items && items.data.purchasables) {
            setCartItemData(items.data.purchasables);
            setTotalPriceData(items.data.purchasables)
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
        axiosInterceptor.post(`ptransaction`, { purchasables: purchasableData, userid: userId })
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

            <section className="py-3 py-lg-4">
                <div className="container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </>
    )
}

export default authPage(Cart)