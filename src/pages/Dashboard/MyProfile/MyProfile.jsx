import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useUserDB from '../../../hooks/useUserDB';
import LoadingPage from '../../Loading/LoadingPage';
import { MdEmail } from 'react-icons/md';
import { format } from 'date-fns';
import { IoSchoolSharp } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useCheckApplicationOfPublisher from '../../../hooks/useCheckApplicationOfPublisher';

const MyProfile = () => {
    const { user, loading: authLoading } = useAuth();
    const { userData, userLoading } = useUserDB();
    const navigate = useNavigate();
    const { data: applyData, loading: applyStatusLoading } = useCheckApplicationOfPublisher();
    console.log(applyData)

    const joined = format(new Date(userData?.created_at || '1999-07-22T07:25:33.835Z'), 'dd MMMM yyyy');
    if (authLoading && userLoading) {
        return <LoadingPage />
    }

    const handleApplyFoScholarship = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            html: `
            You want to apply To Publish your Institute Scholarship!
            <br/>
            <br/>
            <hr />
            <br/>
            Your application will be <b>Verified</b> by <strong>Authority</strong>,
            and may be contact you to conform.
            `,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Go to apply page!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/dashboard/applyToAddScholarship')
            }
        });
    }
    return (
        <div className='p-5 '>
            {/* Profile section Starts */}
            <div className="relative   min-h-[308px] shadow-lg pb-5 rounded-2xl">
                <div className="h-[150px] overflow-hidden bg-secondary absolute rounded-t-3xl w-full">
                    <div className="h-32 w-32 bg-orange-400 opacity shadow- rounded-full absolute right-0 transform translate-x-1/2">

                    </div>

                    <div className="h-32 w-32 bg-yellow-400 opacity-  rounded-full absolute -bottom-10 transform -translate-x-1/2"></div>

                    <div className="h-32 w-32 bg-pink-400 absolute -top-1/2 transform rotate-45 right-1/2"></div>

                    <div className="h-32 w-32 bg-green-600 absolute -bottom-1/2 transform rotate right-1/5 text-center">
                        <IoSchoolSharp size={49} className='mx-auto' />
                    </div>
                </div>
                <div className="h-[75px]">

                </div>
                <div className="flex flex-col pb-2 md:flex-row  md:items-end gap-4">
                    {/* Profile avatar */}
                    <div className="avatar relative mx-auto md:mx-0 md:ml-14">
                        <div
                            className="mask avatar shadow-xl mask-squircle w-48 h-48 bg-white flex items-center justify-center bg-center bg-contain">
                            <div
                                style={{
                                    backgroundImage: `url(${user?.photoURL})`
                                }}
                                className="mask mx-auto mask-squircle w-44 bg-center bg-contain ">
                            </div>
                        </div>
                    </div>

                    <div className=" z-10 flex flex-col  items-center md:items-start space-y-2">
                        <h3 className="font-eb-garamond font-bold text-3xl">
                            {user?.displayName}
                        </h3>
                        <p className="flex gap-2 items-center">
                            <span>
                                <MdEmail size={20} color='green' />
                            </span> {user?.email}
                        </p>
                        <p className="font-medium">
                            Joined:
                            <span className='font-normal text-sm p-1 px-3 ml-4 border rounded-2xl bg-green-200 border-blue-400'>
                                {
                                    joined
                                }
                            </span>
                        </p>
                    </div>
                </div>

            </div> {/* Profile section end here */}


            <div className="mt-6 rounded-2xl p-2 shadow-[0_0px_15px_5px_rgba(0,0,0,0.05),0_0px_20px_2px_rgba(0,0,0,0.05)]">

                {/* Apply to add scholarship Button */}
                {
                    !applyStatusLoading && (
                        applyData?.status === 'not_applied' &&

                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mt-3">
                            <p className="text-lg font-montserrat italic ml-2">
                                Wanna publish your Scholarships?
                            </p>
                            {/* Apply button  */}
                            <div className="text-end p-2 ">
                                <button
                                    onClick={handleApplyFoScholarship}
                                    className='btn  btn-primary text-gray-700 animate-bounc relative'>
                                    <span className=' absolute h-3 w-3 rounded-full bg-green-500 animate-ping -top-2 -left-2'></span>
                                    <span className=' absolute h-3 w-3 rounded-full bg-green-500  -top-2 -left-2'></span>
                                    Apply to add Scholarships
                                </button>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    );
};

export default MyProfile;