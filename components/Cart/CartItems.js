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
                                    <figure class="itemside">
                                        <div class="aside"><img src="assets/images/items/1.jpg" class="img-sm" /></div>
                                        <figcaption class="info">
                                            <a href="#" class="title text-dark">{itm.name}</a>
                                            <p class="text-muted small">Country:{itm.origin} <br /> Brand: {itm.brand}</p>
                                        </figcaption>
                                    </figure>
                                </td>
                                <td>
                                    <select class="form-control">
                                        <option  >{itm.quantity}</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="price-wrap">
                                        <var class="price">Rs.{itm.price * itm.quantity}</var>
                                        <small class="text-muted"> Rs.{itm.price } each </small>
                                    </div>
                                </td>
                                <td class="text-right">
                                    {/* <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light mr-2" data-toggle="tooltip"> <i class="fa fa-heart"></i></a> */}
                                    <button href="" class="btn btn-light" onClick={(e) => removeFromCart(itm?.productId,i)}> Remove</button>
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
            <table class="table table-borderless table-shopping-cart">
                <thead class="text-muted">
                    <tr class="small text-uppercase">
                        <th scope="col">Product</th>
                        <th scope="col" width="120">Quantity</th>
                        <th scope="col" width="120">Price</th>
                        <th scope="col" class="text-right" width="200"> </th>
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