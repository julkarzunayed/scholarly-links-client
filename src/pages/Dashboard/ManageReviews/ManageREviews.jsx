import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Loading/LoadingPage';
import {  ISoTimeToDateOnly } from '../../../utils/helper';
import { IoMail } from 'react-icons/io5';
import StarRatings from '../../../components/StarRAtings/StarRatings';
import NoResultFound from '../../../components/NoResultFound/NoResultFound';
import Swal from 'sweetalert2';

const ManageReviews = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()


    const { data: reviews, isLoading, isPending, refetch } = useQuery({
        queryKey: ['all_reviews_for_admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });

    if (isLoading || isPending) {
        return <LoadingPage />
    }

    const handleDeleteReview = (review) => {
        console.log(review);
        Swal.fire({
            title: "Are you sure?",
            html: `You want ot Delete <strong style="color:#d33;">${review?.user_name}'s</strong> Review!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${review?._id}?userEmail=${user?.email}`);

                console.log(res);
                if (res.data.deletedCount) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Review has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Ops!",
                        text: "There might some error occurred while deleting!",
                        icon: "error"
                    });
                }

            }
        });

    }

    // console.log(reviews)

    return (
        <div className='p-2 pt-10'>
            <h1 className="text-center font-bold text-4xl">
                All reviews
            </h1>
            {
                (!isLoading && !isPending) ?
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">

                        {/* cards */}
                        {reviews?.map(review =>
                            <div
                                key={review?._id}
                                className="rounded-xl bg-base-100/75 shadow-[0_0px_15px_10px_rgba(150,150,150,0.1),0_0px_20px_10px_rgba(50,50,50,0.06)] p-3 flex flex-col">

                                {/* ------------Avatar----------- */}
                                <div className="flex items-center *: gap-3 p-1">
                                    <div className="flex items-center">
                                        <div className="avatar mx-auto">
                                            <div
                                                title={review?.user_name}
                                                // className="hidden sm:block border-[1px] border-blue-300 rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat"
                                                style={{
                                                    backgroundImage: `url(${review?.user_photo})`,
                                                }}
                                                className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2 bg-cover bg-center bg-no-repeat">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 " >
                                        <h4 className="font-bold text-lg">
                                            {review?.user_name}
                                        </h4>
                                        <p className="text-sm flex gap-1.5 items-center">
                                            <IoMail /> {review?.user_email}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className='text-xs'>
                                                {ISoTimeToDateOnly(review?.rating_date)}
                                            </span>
                                            <StarRatings className='' rating={review?.rating_points} size='text-xs' />
                                        </div>
                                    </div>
                                </div>
                                <div className="divider m-1"></div>
                                {/* ----------Content ------------- */}
                                <div className="">
                                    <p className="text-sm font-bold">
                                        {review?.institute_name}
                                    </p>
                                    <p className="text-xs ">
                                        {review?.scholarship_name}
                                    </p>
                                </div>
                                <div className="divider m-2"></div>
                                <div className="italic text-primary-content px-1">
                                    <span className="ml-5"> </span>
                                    "{review?.comment}"
                                </div>
                                <div className="flex-1">

                                </div>
                                {/* -----------Actions Buttons--------------- */}
                                <div className="*:  *:p-2 *:hover:scale-y-105 *:font-bold *:hover:z-10 flex *:flex-1 mt-2">
                                    <button className="bg-gray-100 border-0 text-gray-800 hover:bg-gray-800 hover:text-gray-100 hadow-[0_0px_10px_10px_rgba(150,150,150,0.1),0_0px_12px_10px_rgba(50,50,50,0.06)] hover:shadow-accent "
                                        onClick={() => handleDeleteReview(review)}
                                    >
                                        Delate
                                    </button>
                                    <button className="bg-gray-100 border-0 text-gray-800 hover:bg-gray-800 hover:text-gray-100 hadow-[0_0px_10px_10px_rgba(150,150,150,0.1),0_0px_12px_10px_rgba(50,50,50,0.06)] hover:shadow-accent  ">
                                        Hide
                                    </button>
                                </div>

                            </div>)}
                    </div>
                    :

                    <NoResultFound />
            }
        </div>
    );
};

export default ManageReviews;