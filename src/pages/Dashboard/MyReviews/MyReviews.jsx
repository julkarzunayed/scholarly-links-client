import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { ISoTimeToDate } from '../../../utils/helper';
import { FaRegEdit } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import { Link, useNavigate } from 'react-router';
import { TfiDropboxAlt } from 'react-icons/tfi';
import StarRatings from '../../../components/StarRAtings/StarRatings';
import Swal from 'sweetalert2';
import LoadingPage from '../../Loading/LoadingPage';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const { data: reviewsData, isLoading: reviewLoading, isPending: reviewPending } = useQuery({
        queryKey: ['user_review', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/byUserEmail?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !loading || !!user?.email,
    });


    if (reviewLoading || reviewPending) {
        return <LoadingPage />
    }

    // console.log(reviewsData)


    return (
        <div className='p-2 pt-10'>
            {
                reviewsData?.length !== 0 ?
                    <div className="">
                        <h1 className="text-center mb-3 text-4xl font-bold font-playfair-display">
                            Your Reviews
                        </h1>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra min-w-4xl">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Institute Name</th>
                                        <th>Review</th>
                                        <th>Fees</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reviewsData?.map(review => <tr
                                            key={review?._id}>
                                            <th>1</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="font-bold">
                                                            {review?.institute_name}
                                                        </div>
                                                        <div className="text-sm">
                                                            {review?.scholarship_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <StarRatings rating={review?.rating_points} size={'text-xs'} />

                                                {/* Dialog Box */}
                                                <button className="btn btn-sm btn-primary text-black mt-2" onClick={() => document.getElementById('my_modal_1').showModal()}>
                                                    View Review
                                                </button>
                                                <dialog id="my_modal_1" className="modal">
                                                    <div className="modal-box">
                                                        <div className="flex justify-between">
                                                            <h3 className="font-bold text-lg">
                                                                {review?.institute_name}
                                                            </h3>
                                                            <StarRatings rating={review?.rating_points} size={'text-xs'} />
                                                        </div>

                                                        <p className="font-semibold">
                                                            {review?.scholarship_name}
                                                        </p>
                                                        <p className="py-4 italic font-montserrat">
                                                            <span className='mr-4'> </span> "{review?.comment}"
                                                        </p>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>

                                            </td>
                                            <td>
                                                <span>
                                                    {ISoTimeToDate(review?.rating_date)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className='pt-2 p-0.5  flex justify-center items-center gap-0.5 flex-row *:border *:border-base-300 *:shadow-xs *:flex *:justify-center *:p-1.5 *:px-4 text-2xl *:rounded-sm *:hover:bg-base-300'>

                                                    {/* <button className="border" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
                                                        <FaEye color='green' />
                                                    </button> */}

                                                    <button onClick={() => {
                                                        Swal.fire({
                                                            title: "To Edit your Review Go to <strong>My Applied Scholarships</strong>",
                                                            text: "And Check Edit Review",
                                                            icon: "info",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#3085d6",
                                                            cancelButtonColor: "",
                                                            confirmButtonText: "Yes, Edit"
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                navigate('/dashboard/myAppliedScholarships')
                                                            }
                                                        });
                                                    }}>
                                                        <FaRegEdit color='' />
                                                    </button>
                                                    <button>
                                                        <ImBin className='text-orange-600' />
                                                    </button>
                                                </div>
                                                {/* <ul className="dropdown menu w-52 transform -translate-x-1/2 rounded-box bg-base-100 shadow-[0_0px_15px_10px_rgba(150,150,150,0.1),0_0px_20px_10px_rgba(50,50,50,0.06)] hover:shadow-accent "
                                                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
                                                    <li>
                                                        <Link
                                                            to={`/scholarshipDetails/${review?._id}`}
                                                        >
                                                            <PiGraduationCap size={18} />  Scholarship Details
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to={`/dashboard/manageApplications/${review?._id}`}
                                                            className=''
                                                        >
                                                            <FaFileSignature size={18} /> All applications
                                                        </Link>
                                                    </li>
                                                </ul> */}
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
                            <TfiDropboxAlt
                                className='text-4xl mb-2 animate-bounce'
                            />
                            <h1 className="text-center mb-3 text-3xl font-bold font-playfair-display">
                                No scholarship Reviewed
                            </h1>
                            <Link
                                to={'/dashboard/addScholarship'}
                                className='btn btn-primary text-black'
                            >
                                Review Your applied scholarship
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MyReviews;