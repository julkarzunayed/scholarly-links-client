import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../Loading/LoadingPage';
import { TfiDropboxAlt } from "react-icons/tfi";
import { Link } from 'react-router';
import { capitalizeFirstLetter } from '../../../utils/helper';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { ImBin } from "react-icons/im";

const MyAddedScholarships = () => {
    const axiosInstance = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: scholarships, isLoading } = useQuery({
        queryKey: ['scholarship_data', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/scholarship?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });

    if (isLoading) {
        return <LoadingPage />
    }

    console.log(scholarships)
    return (
        <div className='p-2 pt-10'>
            {
                scholarships?.length !== 0 ?
                    <div className="">
                        <h1 className="text-center mb-3 text-4xl font-bold font-playfair-display">
                            Your added Scholarships
                        </h1>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra min-w-4xl">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Institute Name</th>
                                        <th>Scholarship</th>
                                        <th>Fees</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        scholarships?.map(scholarship => <tr
                                            key={scholarship?._id}>
                                            <th>1</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={scholarship?.institute_logo}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            {scholarship?.institute_name}
                                                        </div>
                                                        <div className="text-sm opacity-50">
                                                            {scholarship?.institute_country},  {scholarship?.institute_city}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {scholarship?.scholarship_name}
                                                <br />
                                                <span className='font-bold'>Subj: </span>
                                                {capitalizeFirstLetter(scholarship?.subject)} ; <span> </span>
                                                <span className='font-bold'>Degree: </span> <span> </span>
                                                {capitalizeFirstLetter(scholarship?.degree)}

                                            </td>
                                            <td>
                                                <span className='font-bold'>Tuition Fees: </span>
                                                {scholarship?.tuition_fees}
                                                <br />
                                                <span className='font-bold'>Application Fee: </span>
                                                {scholarship?.application_fee}
                                                <br />
                                                {/* <span className='font-bold'>Service Charge: </span>
                                                {scholarship?.service_charge} */}
                                            </td>
                                            <td className='pt-2 p-0.5  flex justify-center items-center gap-0.5 flex-row *:border *:border-base-300 *:shadow-xs *:flex *:justify-center *:p-1.5 *:px-4 text-2xl *:rounded-sm *:hover:bg-base-300'>
                                                <button>
                                                    <FaEye color='green'/>
                                                </button>
                                                <button>
                                                    <FaRegEdit color=''/>
                                                </button>
                                                <button>
                                                    <ImBin className='text-orange-600'/>
                                                </button>
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
                                No Scholarship added
                            </h1>
                            <Link
                                to={'/dashboard/addScholarship'}
                                className='btn btn-primary text-black'
                            >
                                Add a Scholarship
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MyAddedScholarships;