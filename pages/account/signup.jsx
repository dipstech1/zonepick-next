import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {accountService } from 'services';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignUp = () => {
    const router = useRouter();

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

    function onSubmit({ username, password }) {
       
    }
    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
                <h4 className="card-header">SignUp</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.phone?.message}</div>
                        </div>
                       
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary my-3">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            SignUp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp