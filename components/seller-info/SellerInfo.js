const SellerInfo = ({sellerData}) => {
  console.log("sellerData ", sellerData);
  return (
    <>
        <div class="seller-car-wrapper">
    <div class="card" >
        <h2>Seller Description</h2>
        <div class="card-body">
          <div class="seller-details d-flex flex-direction-column justify-content-between">
            <div class="d-flex">
                <div>
                    <img src="../../assets/images/seller-img.jpg"/>
                </div>
                <div class="mx-2">
                    <div class="d-flex seller-name-phn flex-column">
                        <div>{sellerData?.name}</div>
                        <div class="phn-no" >{sellerData?.phone}</div>
                    </div>
                  
                </div>
            </div>
            <div>
                <button class="secondary-btn">+Follow</button>
            </div>
          </div>

          <div class="action  mt-3">
              <div class="action-btn text-center mb-3">
                <button class="primary-btn">Email Seller</button>
              </div>
              <div class="action-btn text-center mb-3">
                <button class="primary-btn">Chat With Seller</button>
              </div>
          </div>
        </div>
      </div>
</div>
    </>
  )
}

export default SellerInfo