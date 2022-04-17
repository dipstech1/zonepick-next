import React from 'react'

const Wishlist = () => {
  return (
    <section class="py-4 py-lg-5">
      <div class="container">
        <div class="row m-0 mb-4">
          <div class="bredcamp col-12 col-lg-9">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb  mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">My Wishlist</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row m-0">
          <div class="col-12 col-lg-9 wshlist">
            <a href="javascript:void(0);" class="or_dhover">
              <div class="row m-0">
                <div class="col-12 col-lg-2">
                  <img src="./img/item_1.png" class="w-100 mb-3 mb-lg-0" />
                </div>
                <div class="col-12 col-lg-9">
                  <p>
                    <b>boAt Storm 1.3" CurvedDisplay Smartwatch</b>
                    <small><b class="text-success"><i class="fas fa-star"></i> 4.5</b> (600)</small>
                    <h6>₹329 <span class="text-black-50"> ₹500</span></h6>
                  </p>
                </div>
                <div class="col-12 col-lg-1">
                  <p>
                    <button class="btn btn-sm"><i class="fas fa-trash text-black-50"></i></button>
                  </p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0);" class="or_dhover">
              <div class="row m-0">
                <div class="col-12 col-lg-2">
                  <img src="./img/item_1.png" class="w-100 mb-3 mb-lg-0" />
                </div>
                <div class="col-12 col-lg-9">
                  <p>
                    <b>boAt Storm 1.3" CurvedDisplay Smartwatch</b>
                    <small><b class="text-success"><i class="fas fa-star"></i> 4.5</b> (600)</small>
                    <h6>₹329 <span class="text-black-50"> ₹500</span></h6>
                  </p>
                </div>
                <div class="col-12 col-lg-1">
                  <p>
                    <button class="btn btn-sm"><i class="fas fa-trash text-black-50"></i></button>
                  </p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0);" class="or_dhover">
              <div class="row m-0">
                <div class="col-12 col-lg-2">
                  <img src="./img/item_1.png" class="w-100 mb-3 mb-lg-0" />
                </div>
                <div class="col-12 col-lg-9">
                  <p>
                    <b>boAt Storm 1.3" CurvedDisplay Smartwatch</b>
                    <small><b class="text-success"><i class="fas fa-star"></i> 4.5</b> (600)</small>
                    <h6>₹329 <span class="text-black-50"> ₹500</span></h6>
                  </p>
                </div>
                <div class="col-12 col-lg-1">
                  <p>
                    <button class="btn btn-sm"><i class="fas fa-trash text-black-50"></i></button>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Wishlist