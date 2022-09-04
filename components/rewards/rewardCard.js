import React from 'react'
import { Image } from 'react-bootstrap'

const rewardCard = () => {
  return (
    <a>
    <div className="rew_card">
      <div className="rew_icon"><Image src="/img/rew_icon.png" alt="img"/></div>
      <div className="rew_text">
        <h6>10% off your next order <span>New</span></h6>
        <p>
          Lorem Ipsum is simply dummy text of the printing.
        </p>
      </div>
    </div>
  </a>
  )
}

export default rewardCard