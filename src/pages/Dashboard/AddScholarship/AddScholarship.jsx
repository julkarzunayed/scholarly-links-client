import axios from 'axios';
import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';


const countriesNamePromise = fetch('../data/countryName.json').then(res => res.json())

const {
    fieldsetStyle,
} = {
    fieldsetStyle: "fieldset grid sm:grid-cols-2 sm:gap-x-5 bg-base-200 rounded-box  p-4"
}

const checkboxStyle = {
    type: "checkbox",
    className: "checkbox text-secondary",
}


const AddScholarship = () => {
    const { user } = useAuth()
    const countryName = use(countriesNamePromise);

    const [imageFile, setImageFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
        Swal.fire({
            title: "Submit Scholarship?",
            text: "Is your scholarship information correct!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(data)
                setFileError('')
                if (imageFile === null) {
                    setFileError('Some error happen in institute Logo Field');
                    return;
                }
                setLoading(true)
                const profilePic = await uploadImageToImageBB();

                if (profilePic === null) {
                    setLoading(false);

                    Swal.fire({
                        title: "Profile Image Failed!",
                        text: 'There might some error occurred uploading Image',
                        icon: "error",

                    });
                    return;
                }

                // scholarship data
                const scholarshipData = {
                    institute_logo: profilePic,
                    publisher_email: user?.email,
                    ...data,
                    posted_at: new Date().toISOString(),
                }
                console.log(scholarshipData)
                //scholarship dato upload in DB
                const result = await axiosInstance.post(`/scholarship`, scholarshipData);
                console.log(result.data)
                if (result.data.insertedId) {
                    Swal.fire({
                        title: "Scholarship Published!",
                        text: 'Your scholarship published successfully.',
                        icon: "success",
                    });
                    navigate('/dashboard/myAddedScholarships')
                    setLoading(false)
                }
                setLoading(false)
            }
        });

    }

    return (
        <div className='p-2 py-10 shadow-[0_0px_15px_5px_rgba(0,0,0,0.05),0_0px_20px_2px_rgba(0,0,0,0.05)]'>
            <h1 className="text-4xl font-bold text-center ">
                Add a Scholarship
            </h1>
            <div className="max-w-3xl  mx-auto">
                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className=''>

                    <div className="">

                        {/* institute Details start */}

                        <fieldset className={fieldsetStyle}>
                            <legend className="fieldset-legend">Institute Details</legend>



                            {/* Institute Name */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution Name:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Institute Name'
                                    type="text"
                                    {
                                    ...register('institute_name', {
                                        required: 'Institute Name is required',
                                    })
                                    }
                                />
                                {
                                    errors?.institute_name &&
                                    <p className="text-red-500">
                                        {errors?.institute_name?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute Country */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution Country:</label>
                                <select
                                    {
                                    ...register('institute_country', {
                                        required: 'Institute Country is required'
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
                                    errors?.institute_country &&
                                    <p className="text-red-500">
                                        {errors?.institute_country?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute City */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institute City:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Institute City'
                                    type="text"
                                    {
                                    ...register('institute_city', {
                                        required: 'Institute City is required',
                                    })
                                    }
                                />
                                {
                                    errors?.institute_city &&
                                    <p className="text-red-500">
                                        {errors?.institute_city?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institution World Rank */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution World Rank:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Institution World Rank'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('world_rank', {
                                        required: 'Institution World Rank is required',
                                    })
                                    }
                                />
                                {
                                    errors?.world_rank &&
                                    <p className="text-red-500">
                                        {errors?.world_rank?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute Logo */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institute Logo:</label>
                                <input
                                    type="file"
                                    onChange={onImageFileSelect}
                                    required
                                    className="file-input w-full file-input-success" />
                                {
                                    fileError &&
                                    <p className="text-red-500">
                                        {fileError}
                                    </p>
                                }
                            </fieldset>

                            {/* Campus Image Link */}
                            <fieldset className='fieldset'>
                                <label className='label'>Campus Image Link:</label>
                                <input
                                    className='input w-full'
                                    placeholder='https://example.com'
                                    type="url"
                                    // onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('campus_image', {
                                        required: 'Campus Image Link is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z].*$/,
                                            message: 'Please enter a valid URL (e.g, https://example.com)'
                                        }
                                    })
                                    }
                                />
                                {
                                    errors?.campus_image &&
                                    <p className="text-red-500">
                                        {errors?.campus_image?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Total Number of students */}
                            <fieldset className='fieldset'>
                                <label className='label'>Total Number of students:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Total Number of students'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('total_students', {
                                        required: 'Total Number of students is required',
                                    })
                                    }
                                />
                                {
                                    errors?.total_students &&
                                    <p className="text-red-500">
                                        {errors?.total_students?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute Type */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution Type:</label>
                                <select
                                    {
                                    ...register('institute_type', {
                                        required: 'Institute Type is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option value='' disabled={true}>Type of institute</option>
                                    <option value='Public'>Public</option>
                                    <option value='Privet'>Privet</option>
                                </select>
                                {
                                    errors?.institute_type &&
                                    <p className="text-red-500">
                                        {errors?.institute_type?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Description */}
                            <fieldset className='fieldset sm:col-span-2'>
                                <label className='label'>Description:</label>
                                <textarea
                                    className="textarea w-full"
                                    {
                                    ...register('description', {
                                        required: 'Description is required',
                                    })
                                    }
                                    placeholder="Add a description about your Institute and Scholarship">
                                </textarea>
                                {
                                    errors?.description &&
                                    <p className="text-red-500">
                                        {errors?.description?.message}
                                    </p>
                                }
                            </fieldset>

                        </fieldset> {/* institute Details ends */}


                        {/* Scholarship Details start */}

                        <fieldset className={fieldsetStyle}>
                            <legend className="fieldset-legend">Scholarship Details</legend>

                            {/* Scholarship Name */}
                            <fieldset className='fieldset'>
                                <label className='label'>Scholarship Name:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Scholarship Name'
                                    type="text"
                                    {
                                    ...register('scholarship_name', {
                                        required: 'Scholarship Name is required',
                                    })
                                    }
                                />
                                {
                                    errors?.scholarship_name &&
                                    <p className="text-red-500">
                                        {errors?.scholarship_name?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Subject Category */}
                            <fieldset className='fieldset'>
                                <label className='label'>Subject Category:</label>
                                <select
                                    {
                                    ...register('subject', {
                                        required: 'Subject Category is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option
                                        value=''
                                        disabled={true}>Select a Subject
                                    </option>
                                    <option value='agriculture'>Agriculture</option>
                                    <option value='engineering'>Engineering</option>
                                    <option value='doctor'>Doctor</option>
                                </select>
                                {
                                    errors?.subject &&
                                    <p className="text-red-500">
                                        {errors?.subject?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Scholarship Category */}
                            <fieldset className='fieldset'>
                                <label className='label'>Scholarship Category:</label>
                                <select
                                    {
                                    ...register('scholarship_category', {
                                        required: 'Scholarship Category is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option
                                        value=''
                                        disabled={true}>Select a Scholarship Category
                                    </option>
                                    <option value='full_fund'>Full fund</option>
                                    <option value='partial_fund'>Partial fund</option>
                                    <option value='self_fund'>Self fund</option>
                                </select>
                                {
                                    errors?.scholarship_category &&
                                    <p className="text-red-500">
                                        {errors?.scholarship_category?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Scholarship Degree */}
                            <fieldset className='fieldset'>
                                <label className='label'>Scholarship Degree:</label>
                                <select
                                    {
                                    ...register('degree', {
                                        required: 'Scholarship Degree is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option
                                        value=''
                                        disabled={true}>Select a Degree
                                    </option>
                                    <option value='diploma'>Diploma</option>
                                    <option value='bachelor'>Bachelor</option>
                                    <option value='masters'>Masters</option>
                                </select>
                                {
                                    errors?.degree &&
                                    <p className="text-red-500">
                                        {errors?.degree?.message}
                                    </p>
                                }
                            </fieldset>

                        </fieldset> {/* institute Details ends */}



                        {/* Campus Info */}
                        <fieldset className="fieldset bg-base-200 grid sm:grid-cols-2 md:grid-cols-3 sm:gap-x-5 rounded-box  p-4">
                            <legend className="fieldset-legend">Campus Info</legend>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('on_campus_living_facility')}
                                />
                                On-Campus Living facility
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('on_campus_woman_center')}
                                />
                                On-Campus Woman's Center
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('security_patrol_24_hr')}
                                />
                                24-HR Security Patrol
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('campus_emergency_phones')}
                                />
                                Campus Emergency Phones
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('institute_athletics_association')}
                                />
                                Institute Athletics Association
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('divisional_sports_team')}
                                />
                                Divisional Sports Team
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('on_campus_gymnasium')}
                                />
                                On-Campus Gymnasium
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('student_loan')}
                                />
                                Students Borrowing Loans
                            </label>

                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('aid_and_grants')}
                                />
                                Aid & Grants
                            </label>
                        </fieldset>


                        {/* After Graduation */}
                        <fieldset className={fieldsetStyle}>
                            <legend className="fieldset-legend">After Graduation </legend>
                            <label className="label">
                                <input
                                    {...checkboxStyle}
                                    {...register('post_grad_job_placement')}
                                />
                                Post Grad Job Placement Teem
                            </label>

                            {/* Salary Range */}
                            <fieldset className='fieldset'>
                                <label className='label'>After Grade Average Salary:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Salary Range'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('salary_range', {
                                        required: 'Salary Range is required',
                                    })
                                    }
                                />
                                {
                                    errors?.salary_range &&
                                    <p className="text-red-500">
                                        {errors?.salary_range?.message}
                                    </p>
                                }
                            </fieldset>

                        </fieldset> {/* After Graduation End */}





                        {/* Payment Details start */}
                        <fieldset className={fieldsetStyle}>
                            <legend className="fieldset-legend">Payment and Deadline</legend>
                            {/* Tuition fees */}
                            <fieldset className='fieldset'>
                                <label className='label'>Tuition fees:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Tuition fees'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('tuition_fees', {

                                    })
                                    }
                                />
                                {
                                    errors?.tuition_fees &&
                                    <p className="text-red-500">
                                        {errors?.tuition_fees?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Application fees */}
                            <fieldset className='fieldset'>
                                <label className='label'>Application fees:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Application fees'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('application_fee', {
                                        required: 'Application fees is required',
                                    })
                                    }
                                />
                                {
                                    errors?.application_fee &&
                                    <p className="text-red-500">
                                        {errors?.application_fee?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Service charge */}
                            <fieldset className='fieldset'>
                                <label className='label'>Service charge:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Service charge'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('service_charge', {
                                        required: 'Service charge is required',
                                    })
                                    }
                                />
                                {
                                    errors?.service_charge &&
                                    <p className="text-red-500">
                                        {errors?.service_charge?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Application Deadline */}
                            <fieldset className='fieldset'>
                                <label className='label'>Application Deadline:</label>
                                <input
                                    className='input w-full'
                                    type="date"
                                    {
                                    ...register('application_deadline', {
                                        required: 'Application Deadline is required',
                                    })
                                    }
                                />
                                {
                                    errors?.application_deadline &&
                                    <p className="text-red-500">
                                        {errors?.application_deadline?.message}
                                    </p>
                                }
                            </fieldset>

                        </fieldset>  {/* Payment Details ends */}



                    </div>
                    <button
                        disabled={loading}
                        role='submit'
                        className="btn btn-primary w-full text-black mt-4">
                        Submit Scholarship
                        {
                            loading &&
                            <span className="loading text-success loading-spinner loading-md"></span>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;