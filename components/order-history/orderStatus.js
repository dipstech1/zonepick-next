import React from 'react'

const orderStatus = () => {
    return (
        <div className="card border-0 py-3 border-bottom">
            <h6 className="mb-3">Order Status</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="checkboxNoLabel5" value="option1" />
                <label className="form-check-label mb-0" htmlFor="checkboxNoLabel5">
                    2 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="checkboxNoLabel6" value="option1" />
                <label className="form-check-label mb-0" htmlFor="checkboxNoLabel6">
                    2-4 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="checkboxNoLabel7" value="option1" />
                <label className="form-check-label mb-0" htmlFor="checkboxNoLabel7">
                    4-8 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="checkboxNoLabel8" value="option1" />
                <label className="form-check-label mb-0" htmlFor="checkboxNoLabel8">
                    1 Year
                </label>
            </div>
        </div>
    )
}

export default orderStatus