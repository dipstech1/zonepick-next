import React from 'react'

const orderManufacturer = () => {
    return (
        <div class="card border-0 py-3 border-bottom">
            <h6 class="mb-3">Order Time</h6>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="1" value="option1" />
                <label class="form-check-label mb-0" for="1">
                    All brands
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="2" value="option1" />
                <label class="form-check-label mb-0" for="2">
                    iPhone
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="3" value="option1" />
                <label class="form-check-label mb-0" for="3">
                    Vivo
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="4" value="option1" />
                <label class="form-check-label mb-0" for="4">
                    Oppo
                </label>
            </div>
        </div>
    )
}

export default orderManufacturer