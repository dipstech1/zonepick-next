import {useRef} from 'react'
import { toast } from 'react-toastify';
import FileUploadS3 from '../../helpers/fileuploader'
const ProfileDetails = () => {

     const fileIp = useRef();

    const changePic = () => {
        fileIp.current.click();
    }

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            console.log(event.target.files[0]);

            if (event.target.files[0].size > max_size) {
                toast.error('Maximum size allowed is ' + max_size / 1000 + 'Mb', "Max size exceeded")

                return false;
            }

            if (!allowed_types.includes(event.target.files[0].type)) {
                toast.error('Only Images are allowed ( JPG | PNG )', "Type error");
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

            FileUploadS3.uploadFile(file)
                .then(res => toast.success("Profile picture uploaded successfully"))
                .catch(err => console.log(err))


        }
    }
    return (
        <>
             <section class="py-3 py-lg-5">
                <div class="container">
                    <div class="row m-0 py-3 justify-content-center">
                        <div class="bredcamp">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb  mb-0">
                                    <li class="breadcrumb-item"><a href="#">Profile</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Edit Profile</li>
                                </ol>
                            </nav>
                        </div>
                        <div class="col-12 col-lg-2 us_pic text-center py-3 py-lg-5 position-relative">
                            <img src="./img/profile_pic.png" class="m-auto mr-lg-auto" />
                                <div class="ed_img dropdown">
                                    <i class="fas fa-pen dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" onClick={changePic}>Change Profile Photo</a></li>
                                        <li><a class="dropdown-item" href="#">Remove Profile photo</a></li>
                                    </ul>

                                    <input type="file" hidden ref={fileIp} onChange={onSelectFile}/>
                                </div>
                        </div>
                    </div>
                    <div class="row m-0 justify-content-center">
                        <div class="col-12 col-lg-8 p-0">
                            <form class="row m-0 edit_userform">
                                <div class="col-12 col-lg-6">
                                    <label>Name</label>
                                    <input type="text" class="form-control" placeholder="Full name" />
                                </div>
                                <div class="col-12 col-lg-6">
                                    <label>Phone Number</label>
                                    <input type="number" class="form-control" placeholder="Phone no." />
                                </div>
                                <div class="col-12 col-lg-6">
                                    <label>About Me</label>
                                    <textarea type="text" class="form-control h-auto" rows="3" placeholder="Phone no."></textarea>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <label>Email ID</label>
                                    <input type="email" class="form-control" placeholder="abc@gmail.com" />
                                </div>
                                <div class="col-12 col-lg-5 mt-4">
                                    <p>Connected Account: <a href="javascript:void(0);"><img src="./img/google.svg" width="60px" /></a></p>
                                </div>
                                <div class="col-12 col-lg-5 mt-4">
                                    <button class="btn btn-outline-warning dcc btn-sm ms-lg-4">DISCONNECT</button>
                                </div>
                                <div class="col-12 fbutton mt-4">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <button class="btn btn-outline-warning btn-sm ms-lg-4">Discard</button>
                                        <button class="btn btn-log">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileDetails