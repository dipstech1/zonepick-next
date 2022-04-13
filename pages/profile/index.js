
const Profile = () => {

     
    return (
        <>
              <section class="py-3 py-lg-5">
        <div class="container">
          <div class="row m-0 py-3 border-bottom justify-content-center">
            <div class="col-12 col-lg-2 us_pic">
              <img src="./img/profile_pic.png" class="m-auto mr-lg-auto" />
            </div>
            <div class="col-12 col-lg-10 usName">
                <h6>Jessy <a href="edit_profile.html" class="btn btn-outline-warning btn-sm ms-lg-4">Edit Profile</a></h6>
                <p class="text-dark">100 Followers<span class="ms-lg-4">50 Following</span></p>
                <span class="rat">8.2<small><i class="fas fa-star"></i></small></span>
                <p>Connected Account: <a href="javascript:void(0);"><img src="./img/google.svg" width="60px" /></a></p>
            </div>
          </div>

          <div class="row m-0 mt-2 mt-lg-3 network_wrapper">
            <div class="card border-0">
              <div class="card-header border-0">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                      <li class="nav-item">
                          <a class="nav-link active" aria-current="true" data-bs-toggle="tab" href="#sell">Sell</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" data-bs-toggle="tab" href="#lend">Lend</a>
                      </li>
                  </ul>
              </div>
              <div class="card-body tab-content p-0 pt-4 pb-4">
                <div class="tab-pane active" id="sell">
                  <div class="row m-0">
                      <div class="text-center">
                        <h5 class="text-black-50">Post Your First Ad!</h5>
                        <img src="./img/jobpost_df.svg" class="jobp_def py-3" />
                        <a href="javascript:void(0);" class="btn postjob_btn">Post an advirtisement</a>
                      </div>
                  </div>
                </div>
                <div class="tab-pane" id="lend">
                  <p class="card-text text-center py-5">No Data</p>
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