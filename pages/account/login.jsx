import Router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {accountService } from 'services';
import { fetchWrapper } from 'helpers';
import axios from 'axios';
import { setDataLocalStorage } from 'utils/storage.util';


const login = () => {
    const router = useRouter();
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required').min(4,"Minimun 4 charecters needed")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit({ username, password }) {

        // const res = await signIn('credentials', {
        //     redirect: false,
        //     email: username,
        //     password: password,
        //     callbackUrl: `${window.location.origin}`,
        //   });

        //   console.log("res ", res)

        // fetchWrapper.post(`/api/account`, JSON.stringify({ username, password })).then(async(res) => {
        //      let data = await res.json();
        //     console.log(data);
        //     localStorage.setItem("token". data.token)
        // }).catch(err => console.log(err))
       let loginData = await fetchWrapper.post(`/api/account`, JSON.stringify({ username, password }))
      let data = await loginData.json();
      console.log(data);
      setDataLocalStorage('token', data?.token);
      setDataLocalStorage('userid', data?.userid);
      router.replace("/dashboard")
        
    }
    return (
        // <div className="col-md-6 offset-md-3 mt-5">
        //     <div className="card">
        //         <h4 className="card-header">Login</h4>
        //         <div className="card-body">
        //             <form onSubmit={handleSubmit(onSubmit)}>
        //                 <div className="form-group">
        //                     <label>Username</label>
        //                     <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.username?.message}</div>
        //                 </div>
        //                 <div className="form-group">
        //                     <label>Password</label>
        //                     <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
        //                     <div className="invalid-feedback">{errors.password?.message}</div>
        //                 </div>
        //                 <button disabled={formState.isSubmitting} className="btn btn-primary my-3">
        //                     {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        //                     Login
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
        <section class="login">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-12 col-lg-6 login_form">
              <div class="navbar-brand"><h6><b>Logo</b></h6></div>
              <div class="log_text">
                <h5>
                  <span>Nice to see you again!</span>
                  Welcome Back!
                </h5>
                <form class="mt-lg-5 mt-4"  onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="username"{...register('username')}/>
                    <label for="floatingInput">Email ID or Phone Number</label>
                  </div>
                  <div className="invalid-feedback">{errors.username?.message}</div>
                  <div class="form-floating position-relative">
                    <input type="password" class="form-control pe-5" id="floatingPassword" placeholder="123456"  name="password"  {...register('password')} />
                    <label for="floatingPassword">Password</label>
                    <a href="javascript:void(0);"><i class="fas fa-eye-slash"></i></a>
                  </div>
                  <button class="btn btn-log">Login
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  </button>
                  <img src="/img/or.svg" class="w-100"/>
                  <button class="btn btn-logG"><img src="/img/google_icon.svg"/>Login with Google</button>
                  <p class="text-center pt-2">Have not met us before? <a href="register.html">Register</a></p>
                </form>
              </div>
            </div>
            <div class="col-12 col-lg-6 login_img p-0 d-none d-lg-block">
              <img src="/img/login_bg.png" />
            </div>
          </div>
        </div>
      </section>
    )
}

export default login