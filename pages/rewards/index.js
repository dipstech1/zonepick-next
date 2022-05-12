
import RewardCard from '/components/rewards/rewardCard'
const Rewards = () => {
  return (
    <section class="py-4 py-lg-5">
    <div class="container">
      <div class="row m-0 mb-4">
        <div class="bredcamp">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb  mb-0">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">My Rewards</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="rw_heder row m-0 mb-3">
        <h1><span>Total</span> 3,250 Points</h1>
      </div>
      <div class="row m-0">
        <div class="col-6 col-lg-4 mb-3 ple_res">
         <RewardCard/>
        </div>
        <div class="col-6 col-lg-4 mb-3 ple_res">
          {/* <a href="javascript:void(0);" class="exp_div">
            <div class="rew_card">
              <div class="rew_icon"><img src="./img/rew_icon.png" /></div>
              <div class="rew_text">
                <h6>10% off your next order </h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing.
                </p>
              </div>
            </div>
          </a> */}
          <RewardCard/>
        </div>
        <div class="col-6 col-lg-4 mb-3 ple_res">
        <RewardCard/>
        </div>
        <div class="col-6 col-lg-4 mb-3 ple_res">
        <RewardCard/>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Rewards