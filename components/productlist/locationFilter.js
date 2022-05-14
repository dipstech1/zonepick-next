import React from 'react'

const locationFilter = () => {
  return (
    <div class="card border-0 py-3 border-bottom">
             
              <div class="flt_scroll">
                  <ul>
                    <li>
                      Locations
                      <ul>
                        <li class="text-black-50">West Bengal
                          <ul>
                            <li class="text-dark">Howrah(23)
                              <ul class="dist_name">
                                <li><a href="javascript:void(0);" class="active">- Ramrajatala</a></li>
                                <li><a href="javascript:void(0);">- Kadamtala</a></li>
                                <li><a href="javascript:void(0);">- Domjur</a></li>
                                <li><a href="javascript:void(0);">- Amta</a></li>
                              </ul>
                            </li>
                            <li class="pb-2 pt-1"><a href="javascript:void(0);">Load More</a></li>
                            <li class="text-dark">Kolkata
                              <ul class="dist_name">
                                <li><a href="javascript:void(0);">- Behala</a></li>
                                <li><a href="javascript:void(0);">- Sinthee </a></li>
                                <li><a href="javascript:void(0);">- jadavpur</a></li>
                              </ul>
                            </li>
                            <li class="pb-2 pt-1"><a href="javascript:void(0);">Load More</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
              </div>
            </div>

  )
}

export default locationFilter