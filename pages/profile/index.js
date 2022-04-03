import { toast } from 'react-toastify';
import FileUploadS3 from '../../helpers/fileuploader'
const Profile = () => {

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
            <div class="edit-wrapper">
                <form novalidate>
                    <div class="profile-img d-flex justify-content-center">
                        <label class="hoverable" for="fileInput">
                            <img src='https://www.w3schools.com/howto/img_avatar.png' />
                            <div class="hover-text">Choose file</div>
                            <div class="background"></div>
                        </label>
                        <br />
                        <input id="fileInput" type='file' onChange={onSelectFile}/>
                    </div>
                    <div class="row">
                        <div class="col-md-6 com-sm-12 my-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Name</label>
                                <input type="text" class="form-control" placeholder="John Doe" />
                            </div>

                        </div>
                        <div class="col-md-6 com-sm-12 my-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Phone</label>
                                <input type="text" class="form-control" placeholder="" />
                            </div>

                        </div>
                        <div class="col-md-6 com-sm-12 my-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Pin code</label>
                                <input type="text" class="form-control" formControlName="pincode" placeholder="" />
                            </div>
                        </div>
                        <div class="col-md-6 com-sm-12 my-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" formControlName="email" placeholder="name@example.com" />
                            </div>

                        </div>

                    </div>
                    <div class="button-utility d-flex justify-content-around">
                        <div>
                            <button class="btn btn-danger" >Discard</button>
                        </div>
                        <div>
                            <button class="btn btn-success" >Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile