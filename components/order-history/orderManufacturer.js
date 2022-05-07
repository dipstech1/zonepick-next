import React from 'react'

const orderManufacturer = () => {
    return (
        <div className="card border-0 py-3 border-bottom">
            <h6 className="mb-3">Order Time</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="1" value="option1" />
                <label className="form-check-label mb-0" htmlFor="1">
                    All brands
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="2" value="option1" />
                <label className="form-check-label mb-0" htmlFor="2">
                    iPhone
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="3" value="option1" />
                <label className="form-check-label mb-0" htmlFor="3">
                    Vivo
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="4" value="option1" />
                <label className="form-check-label mb-0" htmlFor="4">
                    Oppo
                </label>
            </div>
        </div>
    )
}

export default orderManufacturer