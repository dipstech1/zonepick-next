import {useState} from 'react'
import { useRouter, } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {accountService } from 'services';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignUp = () => {
    const router = useRouter();
    const [regData, setRegData] = useState(
        {
            username:"",email:"",state:"",phone:"",password:"",confirmPassword:""
        }
    )
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email:Yup.string().required("Email is required").email("Please enter a valid email format"),
        state:Yup.string().required("State is required"),
        phone:Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        password: Yup.string().required('Password is required').min(4,"Minimun 4 charecters needed"),
        confirmPassword:Yup.string().required("Please fill the field").oneOf([Yup.ref('password')],"Confirm password not matching")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit() {
       console.log(regData);
    }
    return (
        <section class="register">
        <div class="container p-0">
          <div class="row m-0">
            <div class="navbar-brand"><h6><b>Logo</b></h6></div>
              <div class="log_text">
                <h5><span>Be a part of us!</span></h5>
              </div>
          </div>
          <div class="row m-0 justify-content-center pb-4">
            <div class="col-12 col-lg-8 card shadow p-3 p-lg-4 mt-2 mt-lg-4 border-0">
              <form >
                <div class="form-floating">
                  <input onChange={(e)=>{setRegData({...regData,username:e.target.value})}} type="text" class="form-control" id="floatingInput" placeholder="Jon Dow"  {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                  <label for="floatingInput">Full Name</label>
                </div>
                <div class="row m-0">
                  <div class="form-floating col-12 col-lg-6 p-0 pe-lg-1">
                    <input type="email" onChange={(e)=>{setRegData({...regData,email:e.target.value})}} class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email ID</label>
                  </div>
                  <div class="form-floating col-12 col-lg-6 p-0 ps-lg-1">
                    <input type="text" onChange={(e)=>{setRegData({...regData,phone:e.target.value})}} class="form-control" id="floatingInput" placeholder="00000000000" />
                    <label for="floatingInput">Phone Number</label>
                  </div>
                </div>
                <div class="row m-0">
                  <div class="form-floating col-12 col-lg-6 p-0 pe-lg-1">
                      <select onChange={(e)=>{setRegData({...regData,state:e.target.value})}} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                        <option selected>Open this select menu</option>
                        <option value="1">West Bengal</option>
                        <option value="2">Bihar</option>
                        <option value="3">Punjab</option>
                      </select>
                      <label for="floatingSelectGrid">State</label>
                  </div>
                  <div class="form-floating col-12 col-lg-6 p-0 ps-lg-1">
                    <input type="text"  class="form-control" id="floatingInput" placeholder="NH123" />
                    <label for="floatingInput">Pincode</label>
                  </div>
                </div>
                <div class="form-floating position-relative">
                  <input onChange={(e)=>{setRegData({...regData,password:e.target.value})}} type="password" class="form-control pe-5" id="floatingPassword" placeholder="123456" />
                  <label for="floatingPassword">Password</label>
                  <a href="javascript:void(0);"><i class="fas fa-eye-slash"></i></a>
                </div>
                <div class="form-floating position-relative">
                  <input type="password" class="form-control pe-5" id="floatingPassword" placeholder="123456" />
                  <label for="floatingPassword">Confirm password</label>
                  <a href="javascript:void(0);"><i class="fas fa-eye-slash"></i></a>
                </div>
                <button onClick={onSubmit} className='btn btn-log' type='button'>Register</button>
                <img src="./img/or.svg" class="w-100" />
                <button class="btn btn-logG"><img src="./img/google_icon.svg" />Register with Google</button>
                <p class="text-center pt-2">Already have an acoount? <a href="login.html">Login</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
        // <div className="col-md-6 offset-md-3 mt-5">
        //     <div className="card">
        //         <h4 className="card-header">SignUp</h4>
        //         <div className="card-body">
        //             <form onSubmit={handleSubmit(onSubmit)}>
        //                 <div className="form-group">
        //                     <label>Username</label>
        //                     <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.username?.message}</div>
        //                 </div>
        //                 <div className="form-group">
        //                     <label>Email</label>
        //                     <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.email?.message}</div>
        //                 </div>
        //                 <div className="form-group">
        //                     <label>Phone</label>
        //                     <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.phone?.message}</div>
        //                 </div>
                       
        //                 <div className="form-group">
        //                     <label>Password</label>
        //                     <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.password?.message}</div>
        //                 </div>
        //                 <div className="form-group">
        //                     <label>Confirm Password</label>
        //                     <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        //                 </div>
        //                 <button disabled={formState.isSubmitting} className="btn btn-primary my-3" onClick={onSubmit}>
        //                     {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        //                     SignUp
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    )
}

export default SignUp