import React from 'react'

const orderStatus = () => {
    return (
        <div class="card border-0 py-3 border-bottom">
            <h6 class="mb-3">Order Status</h6>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel5" value="option1" />
                <label class="form-check-label mb-0" for="checkboxNoLabel5">
                    2 Months
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel6" value="option1" />
                <label class="form-check-label mb-0" for="checkboxNoLabel6">
                    2-4 Months
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel7" value="option1" />
                <label class="form-check-label mb-0" for="checkboxNoLabel7">
                    4-8 Months
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel8" value="option1" />
                <label class="form-check-label mb-0" for="checkboxNoLabel8">
                    1 Year
                </label>
            </div>
        </div>
    )
}

export default orderStatus