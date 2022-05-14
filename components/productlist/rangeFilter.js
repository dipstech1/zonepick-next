import React from 'react'

const rangeFilter = () => {
    return (
        <div class="card border-0 py-3 border-bottom">
            <h6 class="mb-3">Budget</h6>
            <div>
                <input type="text" id="rangePrimary" name="rangePrimary" value="" />
                <p id="priceRangeSelected"></p>
            </div>
        </div>
    )
}

export default rangeFilter