/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import withAuthWraper from '../../components/withAuthWraper';
import axiosInterceptor from '../../services/axios.interceptor';
import { getDataFromLocalstorage } from '../../utils/storage.util';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import FileUploadS3 from '../../helpers/fileuploader'
const EditProfile = () => {
  const router = useRouter();

  const fileIp = useRef();

  const [userId, setUserId] = useState(null);

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

  const [errorFiled, setErrorFiled] = useState({
    name: false,
    phone: false,
    email: false,
    aboutme: false
  });

  useEffect(() => {
    const userId = getDataFromLocalstorage('userid');
    setUserId(userId);
    getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async (userId) => {
    let res = await axiosInterceptor.get(`profile/${userId}`);
    console.log(res);
    setUserData({ ...res.data[0] });
  };

  const updateProfile = async () => {
    userData.phone = +userData.phone;

    console.log(userData);
    let res = await axiosInterceptor.patch(`profile/${userId}`, userData);
    console.log(res);
  };

  const updateValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const changePic = () => {
    fileIp.current.click();
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      console.log(event.target.files[0]);

      if (event.target.files[0].size > max_size) {
        toast.error('Maximum size allowed is ' + max_size / 1000 + 'Mb', 'Max size exceeded');

        return false;
      }

      if (!allowed_types.includes(event.target.files[0].type)) {
        toast.error('Only Images are allowed ( JPG | PNG )', 'Type error');
        return false;
      }

      // reader.readAsDataURL(event.target.files[0]); // read file as data url

      // reader.onload = (event) => { // called once readAsDataURL is completed
      //   this.url = event?.target?.result;
      //   console.log(this.url);
      //   let blobImg = this.DataURIToBlob(this.url);
      //   console.log("BLOB", blobImg);
      // }

      let file = event.target.files[0];
      let filePath = 'images/' + Math.random() * 10000000000000000 + '_' + file.name;
      console.log(file, filePath);

     /* FileUploadS3.uploadFile(file)
        .then((res) => toast.success('Profile picture uploaded successfully'))
        .catch((err) => console.log(err));*/
    }
  };

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
                <input type="file" hidden ref={fileIp} onChange={onSelectFile} />
              </nav>
            </div>
          </div>

          <div className="row m-0 py-3 justify-content-center">
            <div className="col-12 col-lg-2 us_pic text-center py-3 py-lg-5 position-relative">
              <img src="/img/profile_pic.png" className="m-auto mr-lg-auto" alt="" />
              <div className="ed_img dropdown">
                <i className="fas fa-pen dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" onClick={changePic}>
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
                  <input
                    onChange={updateValue}
                    name="name"
                    type="text"
                    value={userData.name}
                    className="form-control"
                    placeholder="Full name"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <label>Phone Number</label>
                  <input
                    onChange={updateValue}
                    name="phone"
                    type="number"
                    value={userData.phone}
                    className="form-control"
                    placeholder="Phone no."
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <label>Address</label>
                  <input
                    onChange={updateValue}
                    name="address1"
                    type="text"
                    value={userData.address1}
                    className="form-control"
                    placeholder="Address1"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <label>Address2</label>
                  <input
                    onChange={updateValue}
                    name="address2"
                    type="text"
                    value={userData.address2}
                    className="form-control"
                    placeholder="Address2"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <label>Addres3</label>
                  <input
                    onChange={updateValue}
                    name="address3"
                    type="text"
                    value={userData.address3}
                    className="form-control"
                    placeholder="Address3"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <label>About Me</label>
                  <textarea
                    name="aboutme"
                    type="text"
                    className="form-control h-auto"
                    rows="3"
                    placeholder="About me"
                  ></textarea>
                </div>
                <div className="col-12 col-lg-6">
                  <label>Email ID</label>
                  <input
                    onChange={updateValue}
                    name="email"
                    type="email"
                    value={userData.email}
                    className="form-control"
                    placeholder="abc@gmail.com"
                  />
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
