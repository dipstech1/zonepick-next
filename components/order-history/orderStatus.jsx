import React from 'react'

const orderStatus = () => {
    return (
        <div className="card border-0 py-3 border-bottom">
            <h5 className="mb-3 text-bold pb-2">Order Status</h5>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio1" name='orderRadio' value="option1" />
                <label className="form-check-label mb-0" htmlFor="orderRadio1">
                    2 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio2" value="option1" name='orderRadio' />
                <label className="form-check-label mb-0" htmlFor="orderRadio2">
                    2-4 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio3" value="option1" name='orderRadio' />
                <label className="form-check-label mb-0" htmlFor="orderRadio3">
                    4-8 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio4" value="option1" name='orderRadio' />
                <label className="form-check-label mb-0" htmlFor="orderRadio4">
                    1 Year
                </label>
            </div>
        </div>
    )
}

export default orderStatus