import { yupResolver } from '@hookform/resolvers/yup';
import { setCookies } from 'cookies-next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import axiosInterceptor from '../../services/axios.interceptor';
import { setDataLocalStorage } from '../../utils/storage.util';

const Login = () => {
  const router = useRouter();
  console.log();
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(4, 'Minimum 4 characters needed')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit({ username, password }) {
    let d = await axiosInterceptor.post('api/login', { email: username, password });
    let data = d.data;
    // console.log("data", data);
    setDataLocalStorage('token', data?.accessToken);
    setDataLocalStorage('userid', data?.userid);
    setDataLocalStorage('refreshtoken', data?.refreshToken);
    setCookies('Login', 'LoggedIn', { maxAge: 60 * 30 });
    router.replace('/dashboard');
  }

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>

      <section className="login">
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="col-12 col-lg-6 login_form">
              <div className="navbar-brand">
                <h3>
                  <b>Logo</b>
                </h3>
              </div>
              <div className="log_text">
                <h5>
                  <span>Nice to see you again!</span>
                  Welcome Back!
                </h5>
                <form className="mt-lg-5 mt-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-floating mb-2">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="username"
                      {...register('username')}
                    />
                    <label htmlFor="floatingInput">Email ID or Phone Number</label>
                  </div>
                  <div className="invalid-feedback">{errors.username?.message}</div>
                  <div className="form-floating position-relative">
                    <input
                      type="password"
                      className="form-control pe-5"
                      id="floatingPassword"
                      placeholder="123456"
                      name="password"
                      {...register('password')}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <button className="btn btn-log">
                    Login
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1 ms-2"></span>}
                  </button>
                  <img src="/img/or.svg" className="w-100" width="500px" height="50px" alt="xx" />
                  <button className="btn btn-logG container3 text-center">
                    <i className="ms-2"></i>
                    <img src="/img/google_icon.svg" width="25px" height="25px" alt="xx" />
                    <span className="ms-2">Login with Google</span>
                  </button>
                  <p className="text-center pt-2">
                    Have not met us before?{' '}
                    <Link href="/account/signup">
                      <a>Register</a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-6 login_img p-0 d-none d-lg-block">
              <img src="/img/login_bg.png" layout="responsive" alt="x" height="100vh" width="100%" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
