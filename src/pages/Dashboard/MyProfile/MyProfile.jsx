import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useUserDB from '../../../hooks/useUserDB';
import LoadingPage from '../../Loading/LoadingPage';
import { MdEditDocument, MdEmail } from 'react-icons/md';
import { IoSchoolSharp } from "react-icons/io5";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import useCheckApplicationOfPublisher from '../../../hooks/useCheckApplicationOfPublisher';
import { GrSettingsOption } from "react-icons/gr";
import { capitalizeFirstLetter, ISoTimeToDate } from '../../../utils/helper';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaPhone, FaUniversity, FaUserTie } from 'react-icons/fa';
import { FcApproval } from "react-icons/fc";

const MyProfile = () => {
    const { user, loading: authLoading, userLogout } = useAuth();
    const { userData, userLoading } = useUserDB();
    const navigate = useNavigate();
    const axiosInstance = useAxiosSecure();
    const { data: applyData, loading: applyStatusLoading, refetch } = useCheckApplicationOfPublisher();


    const joined = ISoTimeToDate(userData?.created_at);

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

    const handleCancelScholarshipApply = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wan to cancel application!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No, Don't Cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await axiosInstance.delete(`/publishers/apply?email=${user?.email}`)
                console.log(result);
                if (result.data.deletedCount) {
                    refetch()
                    Swal.fire({
                        title: "Canceled!",
                        text: "Your application Canceled successfully.",
                        icon: "success"
                    });
                }

            }
        });
    }

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to log Out!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                userLogout()
                    .then(() => {
                        Swal.fire({
                            title: "Logged Out!",
                            text: "You have successfully logged out.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });

    }
    
    return (
        <div className='p-5 '>
            {/* Profile section Starts */}
            <div className="relative   min-h-[308px] shadow-lg pb-5 rounded-2xl">
                <div className="h-[150px] md:h-44 overflow-hidden bg-primary bg-gradient-to-r from-primary from-50%  to-teal-500 to-90% absolute rounded-t-3xl w-full">
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
                                className="mask mx-auto mask-squircle w-44 bg-center bg-cover">
                            </div>
                        </div>
                    </div>

                    <div className="  flex flex-col  items-center md:items-start space-y-2">
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
                <div className="flex items-center justify-between px-5 gap-2 *:max-w-[250px] *:flex-1 text-center">

                    <button className="flex btn btn- bg-gray-400 justify-center items-center gap-1.5">
                        <GrSettingsOption size={22} /> Profile Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex btn btn-warning justify-center items-center gap-1.5">
                        <RiLogoutCircleRLine size={22} />  Log Out
                    </button>
                </div>

            </div> {/* Profile section end here */}


            <div className="mt-6 rounded-2xl p-3 shadow-[0_0px_15px_5px_rgba(0,0,0,0.05),0_0px_20px_2px_rgba(0,0,0,0.05)]">

                {/* Apply to add scholarship Button */}
                {
                    (!applyStatusLoading && applyData?.status === 'not_applied' && userData?.role !== 'admin') && (
                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mt-3">
                            <p className="text-lg font-montserrat italic ml-2">
                                Wanna publish your Scholarships?
                            </p>
                            {/* Apply button  */}
                            <div className="text-end p-2 ">
                                <button
                                    onClick={handleApplyFoScholarship}
                                    className='btn  btn-primary text-gray-700 relative'>
                                    <span className=' absolute h-3 w-3 rounded-full bg-green-500 animate-ping -top-2 -left-2'></span>
                                    <span className=' absolute h-3 w-3 rounded-full bg-green-500  -top-2 -left-2'></span>
                                    Apply to add Scholarships
                                </button>
                            </div>
                        </div>
                    )
                }
                {
                    !applyStatusLoading && (
                        (applyData?.status === 'pending' || applyData?.status === 'rejected') &&

                        <div className="">
                            <p className=" mt-3 mb-1 ">
                                Your application for scholarship :
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-y border-gray-400">
                                <p className="text-lg font-montserrat italic ml-2">
                                    Application status
                                </p>
                                {/* Apply button  */}
                                <div className="text-end p-2 flex items-center gap-4">
                                    <span className='py-1  px-4 rounded-2xl bg-orange-400 '>
                                        {capitalizeFirstLetter(applyData?.status)}
                                    </span>
                                    <Link
                                        to={'/dashboard/editApplyToAddScholarship'}
                                        title='Edit Application'
                                        className='btn btn-sm  btn-primary text-gray-700 relative'>
                                        <MdEditDocument size={25} />
                                    </Link>
                                    <button
                                        title='Cancel Application'
                                        onClick={handleCancelScholarshipApply}
                                        className={`btn btn-sm btn-warning ${applyData?.status === 'rejected' && 'hidden'}`}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    userData?.role === 'publisher' &&
                    <div className="">
                        <h2 className='text-center font-roboto font-bold text-2xl'>
                            Your Publisher Profile
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-between *:flex-1 p-2 mt-4 gap-4">
                            <div
                                className="flex flex-col 
                            justify-center items-center 
                            space-y-2 py-5 rounded-2xl 
                            bg-base-300 shadow-sm">
                                <p className="flex items-center 
                                gap-2 font-bold text-lg">
                                    <FaUniversity /> {applyData?.institute_name}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaPhone /> {applyData?.phone_number}
                                </p>
                            </div>
                            <div
                                className="flex flex-col justify-center items-center space-y-2 py-5 
                            rounded-2xl bg-base-300 shadow-sm">
                                <p className="flex items-center 
                                gap-2 font-bold text-lg">
                                    <FaUserTie /> {capitalizeFirstLetter(userData?.role)}
                                </p>
                                <p className="flex items-center 
                                gap-2">
                                    <FcApproval size={18} /> {ISoTimeToDate(applyData?.applied_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                }
                {
                    userData?.role === 'admin' && <div className="">
                        <h3 className="text-center">Admin Profile</h3>
                    </div>
                }

            </div>
        </div>
    );
};

export default MyProfile;