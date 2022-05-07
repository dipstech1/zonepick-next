import { useRouter } from "next/router"

const Profile = () => {
  const router = useRouter();

  const addProduct = () => {
    router.push('product/addproduct')
  }
     
    return (
        <>
              <section className="py-3 py-lg-5">
        <div className="container">
          <div className="row m-0 py-3 border-bottom justify-content-center">
            <div className="col-12 col-lg-2 us_pic">
              <img src="./img/profile_pic.png" className="m-auto mr-lg-auto" />
            </div>
            <div className="col-12 col-lg-10 usName">
                <h6>Jessy <a href="edit_profile.html" className="btn btn-outline-warning btn-sm ms-lg-4">Edit Profile</a></h6>
                <p className="text-dark">100 Followers<span className="ms-lg-4">50 Following</span></p>
                <span className="rat">8.2<small><i className="fas fa-star"></i></small></span>
                <p>Connected Account: <a href="javascript:void(0);"><img src="./img/google.svg" width="60px" /></a></p>
            </div>
          </div>

          <div className="row m-0 mt-2 mt-lg-3 network_wrapper">
            <div className="card border-0">
              <div className="card-header border-0">
                  <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                      <li className="nav-item">
                          <a className="nav-link active" aria-current="true" data-bs-toggle="tab" href="#sell">Sell</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" href="#lend">Lend</a>
                      </li>
                  </ul>
              </div>
              <div className="card-body tab-content p-0 pt-4 pb-4">
                <div className="tab-pane active" id="sell">
                  <div className="row m-0">
                      <div className="text-center">
                        <h5 className="text-black-50">Post Your First Ad!</h5>
                        <img src="./img/jobpost_df.svg" className="jobp_def py-3" />
                        <a href="javascript:void(0);" className="btn postjob_btn" onClick={addProduct}>Post an advirtisement</a>
                      </div>
                  </div>
                </div>
                <div className="tab-pane" id="lend">
                  <p className="card-text text-center py-5">No Data</p>
              </div>
              </div>
            </div>
          </div>

        </div>
    </section>
        </>
    )
}

export default Profile