import React from 'react'

const CartItems = ({ data = [], removeFromCart }) => {
    console.log("daya ", data)

    const itemData = (itemList = []) => {
        return (
            < >
                {
                    itemList.map((itm, i) => {
                        return (
                            <tr>
                                <td>
                                    <figure className="itemside">
                                        <div className="aside"><img src="assets/images/items/1.jpg" className="img-sm" /></div>
                                        <figcaption className="info">
                                            <a href="#" className="title text-dark">{itm.name}</a>
                                            <p className="text-muted small">Country:{itm.origin} <br /> Brand: {itm.brand}</p>
                                        </figcaption>
                                    </figure>
                                </td>
                                <td>
                                    <select className="form-control">
                                        <option  >{itm.quantity}</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="price-wrap">
                                        <var className="price">Rs.{itm.price * itm.quantity}</var>
                                        <small className="text-muted"> Rs.{itm.price } each </small>
                                    </div>
                                </td>
                                <td className="text-right">
                                    {/* <a data-original-title="Save to Wishlist" title="" href="" className="btn btn-light mr-2" data-toggle="tooltip"> <i className="fa fa-heart"></i></a> */}
                                    <button href="" className="btn btn-light" onClick={(e) => removeFromCart(itm?.productId,i)}> Remove</button>
                                </td>
                            </tr>
                        )
                    })
                }

            </>
        )
    }

    return (
        <>
            <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">
                    <tr className="small text-uppercase">
                        <th scope="col">Product</th>
                        <th scope="col" width="120">Quantity</th>
                        <th scope="col" width="120">Price</th>
                        <th scope="col" className="text-right" width="200"> </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.length ? itemData(data) : <div>Loading...</div>
                    }

                </tbody>
            </table>
        </>
    )
}

export default CartItems