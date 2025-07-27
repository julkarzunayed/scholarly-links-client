import axios from 'axios';
import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { capitalizeFirstLetter } from '../../utils/helper';
import useUserDB from '../../hooks/useUserDB';
import LoadingPage from '../Loading/LoadingPage';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const {
    fieldsetStyle,
} = {
    fieldsetStyle: "fieldset grid sm:grid-cols-2 sm:gap-x-5  bg-base-200 rounded-box  p-4"
}

const countriesNamePromise = fetch('../data/countryName.json').then(res => res.json())

const ScholarshipApplicationPage = () => {
    // const { id } = useParams();
    const location = useLocation();
    const countryName = use(countriesNamePromise);
    const { data: stateData } = location.state;
    const { user, loading: authLoading } = useAuth();
    const { userData: dbUser, userLoading } = useUserDB();
    const axiosInstance = useAxiosSecure();

    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState('');
    const [applicationId, setApplicationId] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // console.log(stateData)

    if (authLoading || userLoading) {
        return <LoadingPage />
    }

    if (!stateData?.scholarshipId && !stateData?.institute_name) {
        return
    }


    const onImageFileSelect = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setImageFile(formData)
    }
    const uploadImageToImageBB = async () => {
        // const image = e.target.files[0];
        // console.log(image)
        // const formData = new FormData();
        // formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_key}`

        const imageBBRes = await axios.post(url, imageFile)
        if (imageBBRes.data.status === 200) {
            return (imageBBRes.data.data.url);
        }
        else if (!imageBBRes.data.status === 200) {
            return null
        }

    }

    const onFormSubmit = async (data) => {
        console.log(data)
        setFileError('')
        if (imageFile === null) {
            setFileError('Select application Image File');
            return;
        }
        setLoading(true)

        const formDataToDisplay = {
            address: data.address,
            country: data.country,
            gender: data.gender,
            hsc_result: data.hsc_result,
            ssc_result: data.ssc_result,
            phone_number: data.phone_number,
        };

        let htmlContent = "<div style='text-align: left;' > ";

        for (const key in formDataToDisplay) {
            if (Object.hasOwnProperty.call(formDataToDisplay, key)) {
                const displayKey = key.replace(/_/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                htmlContent += `<p><strong>${displayKey}:</strong> ${formDataToDisplay[key]}</p>`;
            }
        }

        htmlContent += '</div>';

        Swal.fire({
            title: "Is Your Info Ok?",
            icon: "question",
            html: `
                <p>Please review the information before submitting:</p>
                <br/>
                <hr/>
                <br/>
                ${htmlContent}
            `,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const profilePic = await uploadImageToImageBB();
                console.log(profilePic)
                if (profilePic === null) {
                    setLoading(false)
                    Swal.fire({
                        title: "Profile Image Failed!",
                        text: 'There might some error occurred uploading Image',
                        icon: "error",

                    });
                    return
                }

                const applicationData = {
                    ...data,
                    photo: profilePic,
                    name: user?.displayName,
                    email: user?.email,
                    applicant_id: dbUser._id,
                    scholarship_id: stateData?._id,
                    applying_degree: stateData?.degree,
                    applying_date: new Date().toISOString(),
                    payment_status: 'not_paid'
                }

                console.log(applicationData)
                const result = await axiosInstance.post(`/application?userEmail${user?.email}`,
                    applicationData
                )

                console.log(result);

                if (result?.data?.insertedId) {
                    setApplicationId(result?.data?.insertedId)
                    setLoading(false)
                    Swal.fire({
                        title: "Application Submitted?",
                        text: "Will you pay the <strong>Application Fee</strong> now?",
                        icon: "question",
                        showCancelButton: true,
                        cancelButtonText: "No, Later",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Pay Now!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Payed!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Pay later!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    });
                } else { setLoading(false) }
            }else{
                setLoading(false)
            }
        });




    }

    return (
        <div className='p-2 pt-8 bg-base-200'>
            <div className="font-bold text-2xl ">
                Apply to {stateData?.institute_name}
            </div>
            <div className="p-3 py-7 bg-base-100 mt-6 rounded-2xl">
                <h2 className=" mb-4 text-center font-bold text-xl">
                    Application Required Information
                </h2>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <fieldset className={fieldsetStyle}>
                        <legend className="fieldset-legend">Additional Info</legend>

                        {/* Name */}
                        <div className="fieldset">
                            <label className='label text-primary-content'>Your Name</label>
                            <input
                                value={user?.displayName}
                                className='input input-accent w-full'
                                type="text" />
                        </div>

                        {/* Phone Number */}
                        <div className='fieldset'>
                            <label className='label'>Your Phone Number</label>
                            <input
                                className='input w-full'
                                placeholder='01700-000000'
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                {...register('phone_number', {
                                    required: 'Phone Number is required',
                                })}
                            />
                            {
                                errors?.phone_number &&
                                <p className="text-red-500">
                                    {errors?.phone_number?.message}
                                </p>
                            }
                        </div>

                        {/* Your Country */}
                        <div className='fieldset'>
                            <label className='label'>Your Country:</label>
                            <select
                                {
                                ...register('country', {
                                    required: 'Your Country is required'
                                })
                                }

                                defaultValue=""
                                className="select w-full">
                                <option value='' disabled={true}>Select a country</option>
                                {countryName?.map(country => <option
                                    value={country?.name}
                                    key={country.id}>
                                    {country?.name}
                                </option>)}
                            </select>
                            {
                                errors?.country &&
                                <p className="text-red-500">
                                    {errors?.country?.message}
                                </p>
                            }
                        </div>


                        {/* Address */}
                        <div className='fieldset'>
                            <label className='label'>Your Address</label>
                            <input
                                className='input w-full'
                                placeholder='Village, Post, District. . '
                                type="text"
                                {...register('address', {
                                    required: 'Your Address is required',
                                })}
                            />
                            {
                                errors?.address &&
                                <p className="text-red-500">
                                    {errors?.address?.message}
                                </p>
                            }
                        </div>

                        {/* Gender */}
                        <div className='fieldset'>
                            <label className='label'>Your Gender:</label>
                            <select
                                {
                                ...register('gender', {
                                    required: 'Gender is required'
                                })
                                }

                                defaultValue=""
                                className="select w-full">
                                <option value='' disabled={true}>Select a Gender</option>
                                <option value='male' >Male</option>
                                <option value='female' >Female</option>
                            </select>
                            {
                                errors?.gender &&
                                <p className="text-red-500">
                                    {errors?.gender?.message}
                                </p>
                            }
                        </div>

                        {/* Photo */}
                        <div className="fieldset">
                            <label className="label">Photo</label>
                            <input
                                onChange={onImageFileSelect}
                                type="file"
                                className="file-input file-input-secondary w-full" />
                            {
                                fileError && <p className="text-red-500">
                                    {fileError}
                                </p>
                            }
                        </div>

                    </fieldset>

                    {/* Applying Scholarship Info */}
                    <fieldset className={fieldsetStyle}>
                        <legend className="fieldset-legend">Additional Info</legend>

                        {/* University Name */}
                        <div className='fieldset'>
                            <label className='label'>University Name</label>
                            <input
                                value={stateData?.institute_name}
                                className='input input-accent w-full'
                                type="text" />
                        </div>

                        {/* Scholarship Name */}
                        <div className='fieldset'>
                            <label className='label'>Selected Scholarship Name</label>
                            <input
                                value={stateData?.scholarship_name}
                                className='input input-accent w-full'
                                type="text" />
                        </div>

                        {/* Subject */}
                        <div className='fieldset'>
                            <label className='label'>Selected Scholarship Subject</label>
                            <input
                                value={capitalizeFirstLetter(stateData?.subject)}
                                className='input input-accent w-full'
                                type="text" />
                        </div>

                        {/* Scholarship category */}
                        <div className='fieldset'>
                            <label className='label'>Selected Scholarship category</label>
                            <input
                                value={capitalizeFirstLetter(stateData?.scholarship_category)}
                                className='input input-accent w-full'
                                type="text" />
                        </div>
                    </fieldset>

                    {/* Academic Info */}
                    <fieldset className={fieldsetStyle}>
                        <legend className="fieldset-legend">Your Academic Info</legend>
                        {/* SSC Result */}
                        <div className='fieldset'>
                            <label className='label'>Your SSC Result</label>
                            <input
                                className='input w-full'
                                placeholder='GPA or CGPA'
                                type="text"
                                onWheel={(e) => e.target.blur()}
                                {...register('ssc_result', {
                                    required: 'SSC Result is required',
                                    // pattern: {
                                    //     value: /^\d+(\.\d+)?$/ ,
                                    //     message: 'Please enter digits (0-9)'
                                    // },
                                    min: {
                                        value: 2,
                                        message: 'Minimum Required GPA or CGPA more than 2'
                                    },
                                    max: {
                                        value: 5,
                                        message: 'Maximum Required GPA or CGPA more than 5'
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                            {
                                errors?.ssc_result &&
                                <p className="text-red-500">
                                    {errors?.ssc_result?.message}
                                </p>
                            }
                        </div>

                        {/* HSC Result */}
                        <div className='fieldset'>
                            <label className='label'>Your HSC Result</label>
                            <input
                                className='input w-full'
                                placeholder='GPA or CGPA'
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                {...register('hsc_result', {
                                    required: 'HSC Result is required',
                                    min: {
                                        value: 2,
                                        message: 'Minimum Required GPA or CGPA more than 2'
                                    },
                                    max: {
                                        value: 5,
                                        message: 'Maximum Required GPA or CGPA more than 5'
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                            {
                                errors?.hsc_result &&
                                <p className="text-red-500">
                                    {errors?.hsc_result?.message}
                                </p>
                            }
                        </div>
                    </fieldset>


                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        role="submit"
                        className='btn mt-4 w-full bg-primary'
                    >
                        Submit Application

                        {
                            loading && <span class="loading loading-spinner text-primary loading-md"></span>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ScholarshipApplicationPage;