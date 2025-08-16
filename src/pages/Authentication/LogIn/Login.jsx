import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
// import SocialLogin from '../../shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = data => {
        setLoading(true)
        signInUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    title: "Successfully Logged in!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1700
                });
                setLoading(false);
                navigate(location.state?.from || '/')
            })
            .catch(err => {
                console.log(err);
                setLoading(false);

                if (err.code === 'auth/invalid-credential') {
                    Swal.fire({
                        title: "Oops!",
                        html: `<strong>Email</strong> or <strong>Password</strong> might not correct!
                            <br/>
                            <br/>
                            Check your email password is correct!
                        `,
                        icon: "error",
                        showConfirmButton: true,
                        // timer: 1700
                    });

                } else {
                    Swal.fire({
                        title: "Oops!",
                        text: 'Some kind of Error occurred, Check your email password is correct',
                        icon: "error",
                        showConfirmButton: true,
                        // timer: 1700
                    });
                }
            })
    }
    return (
        <div className=' w-full flex items-center justify-center'>
            <div className="card-body shadow-[0_0px_15px_20px_rgba(80,247,255,0.05),0_0px_5px_5px_rgba(202,235,102,0.1)] rounded-2xl max-w-sm w-full">
                <h1 className='text-5xl font-bold'>Welcome Back</h1>
                <p className="text-lg font-semibold">Login to ScholarlyLink</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        {/* Email */}
                        <input
                            type="email"
                            {...register(
                                'email',
                                { required: true }
                            )
                            }
                            className="input w-full"
                            placeholder="example@email.com" />
                        {
                            errors?.email?.type === 'required' &&
                            <p role='alert' className="text-red-500 ">Email is required</p>
                        }

                        {/* Password */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register(
                                'password',
                                {
                                    required: 'Password is required',
                                }
                            )
                            }
                            className="input w-full"
                            placeholder="Abc123@" />
                        {
                            errors?.password &&
                            <p
                                role='alert'
                                className="text-red-500"
                                dangerouslySetInnerHTML={{ __html: errors.password.message.replace(/ - /g, '  <br/> -- ') }}
                            />
                        }

                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <div>
                            <p className="">Don't have an account? go to
                                <Link className='btn btn-link text-blue-400' to={`/register`}>Register</Link>
                            </p>
                        </div>
                        <button
                            disabled={loading}
                            className="btn btn-primary text-black mt-4">
                            Login
                            {
                                loading && <span className="loading loading-spinner loading-md"></span>
                            }
                        </button>
                    </fieldset>
                </form>
                {/* <SocialLogin></SocialLogin> */}
            </div>
        </div>
    );
};

export default Login;