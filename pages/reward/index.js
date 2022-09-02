import RewardCard from '/components/rewards/rewardCard'
const Rewards = () => {
  return (
    <section className="py-4 py-lg-5">
    <div className="container">
      <div className="row m-0 mb-4">
        <div className="bredcamp">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb  mb-0">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">My Rewards</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="rw_heder row m-0 mb-3">
        <h1><span>Total</span> 3,250 Points</h1>
      </div>
      <div className="row m-0">
        <div className="col-6 col-lg-4 mb-3 ple_res">
         <RewardCard/>
        </div>
        <div className="col-6 col-lg-4 mb-3 ple_res">
          {/* <a href="javascript:void(0);" className="exp_div">
            <div className="rew_card">
              <div className="rew_icon"><img src="./img/rew_icon.png" /></div>
              <div className="rew_text">
                <h6>10% off your next order </h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing.
                </p>
              </div>
            </div>
          </a> */}
          <RewardCard/>
        </div>
        <div className="col-6 col-lg-4 mb-3 ple_res">
        <RewardCard/>
        </div>
        <div className="col-6 col-lg-4 mb-3 ple_res">
        <RewardCard/>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Rewards