import { useQuery } from '@tanstack/react-query';
import React from 'react';
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

const MyAppliedScholarships = () => {
    const axiosInstance = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: applications, isLoading } = useQuery({
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
    return (
        <div className='p-2 pt-10'>
            {
                applications?.length !== 0 ?
                    <div className="">
                        <h1 className="text-center mb-3 text-4xl font-bold font-playfair-display">
                            Your added applications
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

                                            {/* Status */}
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
                                                        application?.status !== 'rejected' ? 'badge-error' : 'badge-warning'
                                                    )}`
                                                }>
                                                    {capitalFirstLatterAllWord(application?.status || 'Pending')}
                                                </span>
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

