/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import { useRouter } from 'next/router';
const EditProfile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [EditProfile, setEditProfile] = useState({
    fullName: 'Jessy',
    phoneNo: '1234567890',
    email: 'jessy@emetacomm.com',
    aboutMe: 'Admin emetacomm.com',
    profilePic: '/img/profile_pic.png',
    userId: ''
  });

  const [errorFiled, setErrorFiled] = useState({
    fullName: false,
    phoneNo: false,
    email: false,
    aboutMe: false
  });

  useEffect(() => {
    const userId = getDataFromLocalstorage('userid');
    setUserId(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updateProfile = async () => {

    EditProfile.userId = userId;


    console.log(EditProfile);

    const errorFlag = Object.keys(errorFiled).every((k) => errorFiled[k] === false)

    console.log(errorFlag)

    if (!errorFlag) {
      alert('Fill all fields')
    }

    /* 
    let updated = await Axios.post('updateProfile', EditProfile);
    */
  };

 const countLetter = (string) => {  
    var count = {};
    string.split('').forEach(function(s) {
       count[s] ? count[s]++ : count[s] = 1;
    });
    return Object.keys(count).length;
  }



  return (
    <Layout title="Edit Profile Page">
      <div id="pageContainer">
        <div className="container">
          <div className="row m-0 mb-4">
            <div className="bredcamp">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb  mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row m-0 py-3 justify-content-center">
            <div className="col-12 col-lg-2 us_pic text-center py-3 py-lg-5 position-relative">
              <img src={EditProfile.profilePic} className="m-auto mr-lg-auto" alt="" />
              <div className="ed_img dropdown">
                <i className="fas fa-pen dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Change Profile Photo
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Remove Profile photo
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row m-0 justify-content-center">
            <div className="col-12 col-lg-8 p-0 ">
              <form className="row m-0 edit_userform needs-validation" id="form1" noValidate>
                <div className="col-12 col-lg-6">
                  <label>Name</label>
                  <input type="text" className="form-control tooltipstered" placeholder="Full name" required={true}
                  value={EditProfile.fullName}
                  onChange={(e) =>{

                    if (e.target.value === '') {
                      setErrorFiled({
                        ...errorFiled,
                        fullName: true
                      })
                      
                    } else {
                      setErrorFiled({
                        ...errorFiled,
                        fullName: false
                      }) 
                    }

                    setEditProfile({
                      ...EditProfile,
                      fullName: e.target.value
                    })

                    
                    }
                  }                  
                  />
                  { errorFiled.fullName ?
                  <div className="invalid-feedback" >
                      <div>
                        Name is required
                      </div>
                    </div> : null
                  }
                </div>
                <div className="col-12 col-lg-6">
                  <label>Phone Number</label>
                  <input type="text" maxLength={10} minLength={10} className="form-control tooltipstered" placeholder="Phone no." required={true}
                  value={EditProfile.phoneNo}
                  onChange={(e) =>{

                    const re = /^[0-9\b]+$/;    

                   const phoneLengh = countLetter(e.target.value)

                    if (e.target.value === '') {
                      setErrorFiled({
                        ...errorFiled,
                        phoneNo: true
                      })
                      
                    } else {
                      setErrorFiled({
                        ...errorFiled,
                        phoneNo: false
                      }) 
                    }

                    if (e.target.value === '' || re.test(e.target.value)) {
                      setEditProfile({
                        ...EditProfile,
                        phoneNo: e.target.value
                      })
                   }
                    
                   }
                  }  
                  />

                { errorFiled.phoneNo ?
                  <div className="invalid-feedback" >
                      <div>
                        Phone No. is required
                      </div>
                    </div> : null
                  }

                </div>
                <div className="col-12 col-lg-6">
                  <label>About Me</label>
                  <textarea  type="text"   className="form-control h-auto"  rows="3" placeholder="About" required={true}
                  value={EditProfile.aboutMe}
                  onChange={(e) =>{

                    if (e.target.value === '') {
                      setErrorFiled({
                        ...errorFiled,
                        aboutMe: true
                      })
                      
                    } else {
                      setErrorFiled({
                        ...errorFiled,
                        aboutMe: false
                      }) 
                    }


                    setEditProfile({
                      ...EditProfile,
                      aboutMe: e.target.value
                    })
                    }
                  }
                  >

                  </textarea>

                  { errorFiled.aboutMe ?
                  <div className="invalid-feedback" >
                      <div>
                        About Me is required
                      </div>
                    </div> : null
                  }


                </div>
                <div className="col-12 col-lg-6">
                  <label>Email ID</label>
                  <input type="email" className="form-control tooltipstered" placeholder="abc@gmail.com"  required={true}
                  
                  value={EditProfile.email}
                    onChange={(e) =>{

                      if (e.target.value === '') {
                        setErrorFiled({
                          ...errorFiled,
                          email: true
                        })
                        
                      } else {
                        setErrorFiled({
                          ...errorFiled,
                          email: false
                        }) 
                      }


                        setEditProfile({
                          ...EditProfile,
                          email: e.target.value
                        })
                      }
                    }

                  />
                  { errorFiled.email ?
                  <div className="invalid-feedback" >
                      <div>
                        Email is required
                      </div>
                    </div> : null
                  }
                </div>
                <div className="col-12 col-lg-5 mt-4">
                  <p>
                    Connected Account:{' '}
                    <a href="#">
                      <img src="/img/google.svg" width="60px" alt="" />
                    </a>
                  </p>
                </div>
                <div className="col-12 col-lg-5 mt-4">
                  <button type="button" className="btn btn-outline-warning dcc btn-sm ms-lg-4">
                    DISCONNECT
                  </button>
                </div>
                <div className="col-12 fbutton mt-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-outline-warning btn-sm ms-lg-4">
                      Discard
                    </button>
                    <button type="button" className="btn btn-log" onClick={updateProfile}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuthWraper(EditProfile, ['admin', 'super-admin', 'user']);
