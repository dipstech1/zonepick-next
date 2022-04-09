const SellerInfo = ({sellerData}) => {
  console.log("sellerData ", sellerData);
  return (
    <>
        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <div className="card border-0 shadow-sm mb-3 u_dat">
              <p className="text-dark mb-3"><b>Seller Description</b></p>
              <div className="user_follow">
                  <div className="d-flex">
                    <div>
                      <img src="/img/profile_pic.png" className="img-fluid" alt="..." />
                    </div>
                    <div className="f_user_name">
                      <p className="text-dark mb-0"><b>{sellerData.name}</b></p>
                        <p className="card-text"><a >View Phone Number</a></p>
                    </div>
                  </div>
                <div>
                  <button className="btn btn-sm btn-outline-warning"><i className="fas fa-plus"></i> Follow</button>
                </div>
              </div>
              <button className="btn btn-log">Call Seller</button>
              <button className="btn btn-log">Chat With Seller</button>
            </div>

            <div className="card border-0 shadow-sm mt-3">
              <p className="text-dark mb-3"><b>Know Sellers Location</b></p>
              <div className="map">
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.7790097324114!2d88.41790441531634!3d22.587367185175207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759bfbf7bcb3%3A0x1deed2e1ae913b9e!2sKolkata%20Book%20Fair%20Ground%20Karunamoyee!5e0!3m2!1sen!2sin!4v1648890847929!5m2!1sen!2sin" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              </div>
            </div>
          </div>
    </>
  )
}

export default SellerInfo