import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';
import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';

const Profile = () => {
  const [userId, setUserId] = useState(null);

  let [profileImage, setProfileImage] = useState('/img/profile_pic.png');
  let [userFullName, setUserFullName] = useState('Jessy');
  let [follwers, setFollwers] = useState(100);
  let [following, setFollowing] = useState(50);
  let [userRating, setUserRating] = useState(8.2);

  const router = useRouter();

  const [userData, setUserData] = useState({
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    address5: '',
    email: '',
    name: '',
    aboutme: '',
    phone: '',
    userId: ''
  });

  useEffect(() => {
    const userId = getDataFromLocalstorage('userid');
    setUserId(userId);
  //  getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getUserData = async (userId) => {
    let res = await axiosInterceptor.get(`profile/${userId}`);
   // console.log(res);
    setUserData({ ...res.data[0] });
  };

  const addProduct = () => {
    router.push('product/addproduct');
  };

  return (
    <Layout title="Profile Page">
      <div id="pageContainer">
        <div className="container py-3">
          <div className="row m-0 py-5 border-bottom profile_container justify-content-center">
            <div className="col-md-3 text-center">
              <img
                layout="fixed"
                className="m-auto mr-lg-auto Profile_img"
                src={profileImage}
                width='140px'
                height='140px'
                alt="Profile Picture"
              />
            </div>
            <div className="col-md-9 text-center text-sm-center text-md-start text-lg-start mt-lg-1 mt-2">
              <div className="row">
                <div className="col-12">
                  <h6 style={{ fontWeight: 500, fontSize: 20 }}>
                    {userFullName}{' '}
                    <Link href="/profile/edit-profile">
                      <a className="btn btn-outline-warning btn-sm ms-md-4 ms-4"> Edit Profile </a>
                    </Link>
                    <Link href="/rewards">
                      <a className="btn btn-outline-warning btn-sm ms-md-4 ms-4"> Rewards </a>
                    </Link>                   
                  </h6>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <span>{follwers} Followers</span> <span className="ms-4">{following} Following</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <span className="rating">
                    {' '}
                    {userRating} <i className="fas fa-star text-orange-900 ms-2"></i>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 container2">
                  <span style={{ top: '10px' }}>Connected Account:</span>{' '}
                  <a>
                    <img layout="fixed" src="/img/google.svg" width="50px" height="50px" alt="ss" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-0 mt-2 mt-md-3" style={{ paddingTop: '1.8rem' }}>
            <div className="col-12 " id="editTabs">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Sell
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Lend
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="text-center pb-5">
                    <h5 className="text-black-50">Post Your First Ad!</h5>
                    <img
                      src="/img/jobpost_df.svg"
                      className="jobp_def py-3"
                      alt="xx"
                      width="800px"
                      height="600px"
                      layout="fixed"
                    />
                    <p>
                      <a className="btn postjob_btn" style={{whiteSpace:'nowrap'}} onClick={addProduct}>
                        Post an advirtisement
                      </a>
                    </p>
                  </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="text-center py-5" style={{ height: '400px' }}>
                    No Data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuthWraper(Profile, ['admin', 'super-admin', 'user']);
