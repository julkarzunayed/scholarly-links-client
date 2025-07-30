import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../Loading/LoadingPage';
import { FiBookOpen } from "react-icons/fi";
import { Link } from 'react-router';
import { capitalFirstLatterAllWord, capitalizeFirstLetter } from '../../../utils/helper';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { ImBin } from "react-icons/im";
import StarBorder from '../../../components/StarBorder/StarBorder';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const MyAppliedScholarships = () => {
    const axiosInstance = useAxiosSecure();
    const { user, loading } = useAuth();
    const [reviewLoading, setReviewLoading] = useState(false);
    const [editReviewLoading, setEditReviewLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: applications, isLoading, refetch } = useQuery({
        queryKey: ['user_applications_data', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/application?email=${user?.email}&userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });

    if (isLoading) {
        return <LoadingPage />
    }

    // console.log(applications)

    const handleReviewSubmit = (e, scholarship) => {
        e.preventDefault();
        setReviewLoading(true)
        const ratingPoints = Number(e.target.rating_points.value)

        const reviewData = {
            rating_points: ratingPoints,
            comment: e.target.comment.value,
            rating_date: new Date().toISOString(),
            scholarship_name: scholarship?.scholarship_name,
            institute_name: scholarship?.institute_name,
            scholarship_id: scholarship?.scholarship_id,
            user_name: user?.displayName,
            user_photo: user?.photoURL,
            user_email: user?.email,
        }
        document.getElementById('my_modal_2').close();
        Swal.fire({
            title: "You Want to Review?",
            text: "Your review will be shown in scholarship review section!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.post(`/reviews`, reviewData);
                // console.log(res.data)
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        title: "Reviewed!",
                        text: "Your review successfully posted.",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Some error occurred in review posting.",
                        icon: "error"
                    });
                }
                setReviewLoading(false)

            } else {
                setReviewLoading(false)
            }
        });
    }

    const handelEditReview = (e, scholarship) => {
        e.preventDefault();
        setEditReviewLoading(true)
        const ratingPoints = Number(e.target.rating_points.value);
        const comment = e.target.comment.value;

        const updateData = {
            rating_points: ratingPoints,
            comment: comment,
        }

        document.getElementById('my_modal_2').close();

        Swal.fire({
            title: "Update Review?",
            text: "Do You want to update review",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.patch(`/reviews/scholarshipId/${scholarship?.scholarship_id}?userEmail=${user?.email}`, updateData);
                console.log(res.data)
                if (res.data.modifiedCount) {
                    queryClient.invalidateQueries([
                        'user_applications_data',
                    ])
                    refetch();
                    Swal.fire({
                        title: "Reviewed Modified!",
                        text: "Your review successfully Modified.",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Some error occurred in review posting.",
                        icon: "error"
                    });
                }
                setEditReviewLoading(false)

            } else {
                setEditReviewLoading(false)
            }
        });


    }


    return (
        <div className='p-2 pt-10'>
            {
                applications?.length !== 0 ?
                    <div className="">
                        <h1 className="text-center mb-3 text-4xl font-bold font-playfair-display">
                            Your applied Scholarships
                        </h1>
                        <div className="overflow-x-auto border border-base-content/5">
                            <table className="table table-zebra min-w-4xl">
                                {/* head */}
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Institute Name</th>
                                        <th>Scholarship</th>
                                        <th>Fees</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        applications?.map(application => <tr
                                            className='*: *:px-1 *:py-3 *:'
                                            key={application?._id}>
                                            {/* <th>1</th> */}
                                            <td className=''>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={application?.institute_logo}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            {application?.institute_name}
                                                        </div>
                                                        <div className="text-sm opacity-50">
                                                            {application?.institute_country}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    title='Scholarship Details'
                                                    to={`/scholarshipDetails/${application?.scholarship_id
                                                        }`}
                                                    className='btn btn-sm w-full'>
                                                    Scholarship Details. . .
                                                </Link>
                                            </td>
                                            <td>
                                                {/* {application?.scholarship_name} */}
                                                {/* <br /> */}
                                                <span className='font-bold'>Subj: </span>
                                                {capitalizeFirstLetter(application?.applied_subject)} ; <br />
                                                <span className='font-bold'>Degree: </span> <span> </span>
                                                {capitalizeFirstLetter(application?.applying_degree)}

                                            </td>
                                            <td>
                                                <span className='font-bold'>Application Fee: $</span>
                                                {application?.application_fee}
                                                <br />
                                                <span className='font-bold'>Tuition Fees: $</span>
                                                {application?.tuition_fees}
                                                <br />
                                                <span className='font-bold'>Service Charge: $</span>
                                                {application?.service_charge}
                                            </td>

                                            {/* Status and Review */}
                                            <td className='*:'>
                                                <span className='font-bold'>Payment: </span>
                                                <span
                                                    className={
                                                        `badge  ${application?.payment_status === 'not_paid' ? 'badge-warning' : 'badge-info'}`
                                                    }>
                                                    {capitalFirstLatterAllWord(application?.payment_status || 'not_paid')}
                                                </span>
                                                <div className="m-1">
                                                    {
                                                        application?.payment_status === 'not_paid' &&
                                                        <Link
                                                            state={{ application: application }}
                                                            to={`/dashboard/payment/${application?.scholarship_id}`}
                                                            className="flex items-center justify-center btn gap-2 p-1 badge badge-warning rounded-sm font-semibold  w-full ">
                                                            <FaMoneyCheckDollar size={20} />
                                                            Pay Now
                                                        </Link>
                                                    }

                                                </div>

                                                <span className='font-bold'>Approval: </span>
                                                <span className={
                                                    `badge  ${application?.status === 'approved' ? 'badge-success' : (
                                                        application?.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                                    )}`
                                                }>
                                                    {capitalFirstLatterAllWord(application?.status || 'Pending')}
                                                </span>
                                                <br />
                                                {
                                                    application?.payment_status === 'paid' &&
                                                    <>
                                                        <div onClick={() => document.getElementById('my_modal_2').showModal()} role='button' title='Review The Scholarship' className={`btn ${application?.review_status === 'reviewed' ? 'btn-warning' : 'btn-primary'}  text-black btn-sm mt-1 w-full`}>
                                                            {
                                                                application?.review_status === 'reviewed' ? 'Edit Review'
                                                                    : 'Review Scholarship'}
                                                        </div>
                                                        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle  z-20">
                                                            <div className="modal-box bg-base-300 shadow-[0_0px_15px_10px_rgba(150,150,150,0.1),0_0px_20px_10px_rgba(50,50,50,0.06)] hover:shadow-accent">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle h-12 w-12">
                                                                            <img
                                                                                src={application?.institute_logo}
                                                                                alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="">
                                                                        <h3 className="font-bold text-lg">
                                                                            {application?.institute_name}
                                                                        </h3>
                                                                        <p className="">
                                                                            {application?.scholarship_name}
                                                                        </p>
                                                                    </div>

                                                                </div>

                                                                {/* Review Form */}

                                                                {
                                                                    application?.review_status !== 'reviewed' &&
                                                                    <form className='' onSubmit={(e) => handleReviewSubmit(e, application)}>
                                                                        <fieldset className='fieldset mt-2 bg-base-200 rounded-box  p-4'>
                                                                            <legend className="fieldset-legend">Review Scholarship</legend>

                                                                            <div className="w-full ">
                                                                                <label className="label">Ratings</label>
                                                                                <input
                                                                                    required
                                                                                    name='rating_points'
                                                                                    type="range" min={1} max="5"
                                                                                    defaultValue="3"
                                                                                    className="range range-warning w-full"
                                                                                    step="1"
                                                                                />

                                                                                <div className="flex justify-between px-2.5 mt-2 text-xs">
                                                                                    <span>1</span>
                                                                                    <span>2</span>
                                                                                    <span>3</span>
                                                                                    <span>4</span>
                                                                                    <span>5</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* Comment */}
                                                                            <div className="fieldset">
                                                                                <label className="label">Comment :</label>
                                                                                <textarea
                                                                                    name='comment'
                                                                                    required
                                                                                    placeholder="Add your comment"
                                                                                    className="textarea  textarea-warning w-full">

                                                                                </textarea>
                                                                            </div>

                                                                            <button
                                                                                disabled={reviewLoading}
                                                                                type="submit"
                                                                                value="submit"
                                                                                className='btn btn-sm w-full btn-warning'
                                                                            >
                                                                                Submit
                                                                                {
                                                                                    reviewLoading && <span className="loading loading-spinner text-warning loading-md"></span>
                                                                                }
                                                                            </button>


                                                                        </fieldset>

                                                                    </form>

                                                                }

                                                                {/* Edit Review form */}

                                                                {
                                                                    application?.review_status === 'reviewed' &&
                                                                    <form className='' onSubmit={(e) => handelEditReview(e, application)}>
                                                                        <fieldset className='fieldset mt-2 bg-base-100 rounded-box  p-4'>
                                                                            <legend className="fieldset-legend">Edit Your Review</legend>

                                                                            <div className="w-full ">
                                                                                <label className="label">Ratings</label>
                                                                                <input
                                                                                    required
                                                                                    name='rating_points'
                                                                                    type="range" min={1} max="5"
                                                                                    defaultValue={application?.rating_points}
                                                                                    className="range range-warning w-full"
                                                                                    step="1"
                                                                                />

                                                                                <div className="flex justify-between px-2.5 mt-2 text-xs">
                                                                                    <span>1</span>
                                                                                    <span>2</span>
                                                                                    <span>3</span>
                                                                                    <span>4</span>
                                                                                    <span>5</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* Comment */}
                                                                            <div className="fieldset">
                                                                                <label className="label">Comment :</label>
                                                                                <textarea
                                                                                    name='comment'
                                                                                    required
                                                                                    defaultValue={application?.comment}
                                                                                    placeholder="Type your Review"
                                                                                    className="textarea  textarea-warning w-full">

                                                                                </textarea>
                                                                            </div>

                                                                            <button
                                                                                disabled={editReviewLoading}
                                                                                type="submit"
                                                                                value="submit"
                                                                                className='btn btn-sm w-full btn-warning'
                                                                            >
                                                                                Submit
                                                                                {
                                                                                    editReviewLoading && <span className="loading loading-spinner text-warning loading-md"></span>
                                                                                }
                                                                            </button>


                                                                        </fieldset>

                                                                    </form>
                                                                }



                                                                {/* Review form end */}

                                                                <div className="modal-action">
                                                                    <form method="dialog">
                                                                        {/* if there is a button in form, it will close the modal */}
                                                                        <button className="btn">Cancel</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <form method="dialog" className="modal-backdrop">
                                                                <button>close</button>
                                                            </form>
                                                        </dialog>
                                                    </>

                                                }
                                            </td>
                                            <td className='p-0'>
                                                <div className="pt- h-full p-0.5  flex justify-center items-center gap-0.5 flex-col *:border *:border-base-300 *:shadow-xs *:flex *:justify-center *:p-0.5 *:px-4 *:w-full text-xl *:rounded-sm *:hover:bg-base-300">
                                                    <Link
                                                        title='View Details'
                                                        to={`/scholarshipDetails/${application?.scholarship_id
                                                            }`}
                                                    >
                                                        <FaEye color='green' />
                                                    </Link>
                                                    <button title='Edit application'>
                                                        <FaRegEdit color='' />
                                                    </button>
                                                    <button title='Cancel Application' className=''>
                                                        <MdOutlineCancelPresentation className='text-orange-600' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="flex items-center justify-center flex-col">
                            <FiBookOpen
                                className='text-4xl mb-2 animate-bounce'
                            />
                            <h1 className="text-center mb-3 text-3xl font-bold font-playfair-display">
                                Not applied to any Scholarship
                            </h1>
                            <Link
                                to={'/allScholarship'}
                                className=''
                            >
                                <StarBorder
                                    as="button"
                                    className=""
                                    color="cyan"
                                    speed="4s"
                                >
                                    Apply Now
                                </StarBorder>
                            </Link>
                        </div>
                    </div>
            }

        </div>
    );
};

export default MyAppliedScholarships;

