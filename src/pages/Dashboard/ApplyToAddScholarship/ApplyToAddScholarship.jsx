import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import LoadingPage from '../../Loading/LoadingPage';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApplyToAddScholarship = () => {
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxiosSecure();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (authLoading) {
        return <LoadingPage />
    }

    const onSubmit = async (data) => {
        setLoading(true)
        console.log(data)
        const applicationData = {
            ...data,
            applied_at: new Date().toISOString(),
            status: 'pending',
            photo_url: user?.photoURL,
        }
        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            text: 'You want to submit your application',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Apply!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await axiosInstance.post(`/publishers/apply`,
                    applicationData
                )
                console.log(result.data);
                if (result.data.insertedId) {
                    Swal.fire({
                        title: "Application Submitted!",
                        icon: "success",
                        html: `
                            Your application will be verified by our Authority.
                            <br/>
                            <br/>
                            Check your email and <b>ScholarlyLink</b> profile.
                        `,
                    }).then(async(result) => {
                        if(result.isConfirmed){
                            navigate('/dashboard/myProfile')
                        }
                    })
                }
            }
        });
    }


    return (
        <div className='min-h-screen flex items-center justify-center p-2'>
            <div className="p-6 rounded-2xl  shadow-[0_0px_15px_5px_rgba(0,0,0,0.05),0_0px_20px_2px_rgba(0,0,0,0.05)]">
                <h2 className="text-2xl font-bold font-roboto">
                    Apply to Publish Your Institute's Scholarships!
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='sm:p-3'>
                    {/* Name field */}
                    <fieldset className='fieldset'>
                        <label className="label">Your Name</label>
                        <input
                            type="text"
                            {
                            ...register("name", {
                                required: 'Name is required',

                            })
                            }
                            value={user?.displayName}
                            className="input w-full"
                            placeholder="Your Name" />
                        {
                            errors?.name?.type === 'required' &&
                            <p role='alert' className="text-red-500 ">Name is required</p>
                        }
                    </fieldset>

                    {/* Email */}
                    <fieldset className='fieldset'>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {
                            ...register("email", {
                                required: 'Email is required',

                            })
                            }
                            value={user?.email}
                            className="input w-full"
                            placeholder="Email" />
                        {
                            errors?.email?.type === 'required' &&
                            <p role='alert' className="text-red-500 ">Email is required</p>
                        }
                    </fieldset>

                    {/* Phone Number */}
                    <fieldset className='fieldset'>
                        <label className="label">Phone Number</label>
                        <input
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            {
                            ...register("phone_number", {
                                required: 'Phone Number is required',
                                minLength: {
                                    value: 9,
                                    message: 'Phone Number must be at lest 9 characters long.'
                                },

                            })
                            }
                            className="input w-full"
                            placeholder="Phone Number" />
                        {
                            errors?.phone_number &&
                            <p role='alert' className="text-red-500 ">
                                {errors?.phone_number?.message}
                            </p>
                        }
                    </fieldset>
                    <fieldset className='fieldset'>
                        <label className="label">Institute Name </label>
                        <input
                            type="text"
                            {
                            ...register("institute_name", {
                                required: 'Institute Name is required',

                            })
                            }
                            className="input w-full"
                            placeholder="Institute name" />
                        {
                            errors?.institute_name?.type === 'required' &&
                            <p role='alert' className="text-red-500 ">
                                {errors?.institute_name?.message}
                            </p>
                        }
                    </fieldset>



                    <div>
                        <p className="">Already have an account? go to
                            <Link className='btn btn-link text-blue-400' to={`/login`}>Login</Link>
                        </p>
                    </div>
                    <button
                        disabled={loading}
                        className="btn btn-primary font-bold text-gray-800 mt-4 w-full">
                        Apply Now
                        {
                            loading && <span className="loading loading-spinner loading-md"></span>
                        }

                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyToAddScholarship;