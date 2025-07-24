import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ScholarlyLinkLogo from '../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';
import useUserDB from '../../hooks/useUserDB';
import {
    FaHome,
    FaFileAlt,
    FaPlusSquare,
    FaStar,
    FaHourglassHalf,
    FaCheckCircle,
    FaTimesCircle,
    FaUser,
    FaPlusCircle,
} from 'react-icons/fa';
import { IoSchoolSharp } from 'react-icons/io5';
import { BsCheck } from "react-icons/bs";
import { GrFormAdd } from 'react-icons/gr';

const DashboardLayout = () => {
    const { userData, userLoading, userPending } = useUserDB();
    const role = userData?.role || 'user'
    console.log(role)
    return (
        <div className="drawer lg:drawer-open max-w-[1500px] mx-auto">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* NavBar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* PageContent */}
                <div className="">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4">
                    {/* Sidebar content here */}
                    {
                        (!userLoading || !userPending) &&
                        <>
                            <li><ScholarlyLinkLogo /></li>
                            <li>
                                <NavLink to={'/dashboard/home'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                    <FaHome className="inline-block mr-2 text-lg" />
                                    Home
                                </NavLink>
                            </li>
                            {
                                role === 'user' &&
                                <>
                                    <li>
                                        <NavLink to={'/myApplications'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <FaFileAlt className="inline-block mr-2 text-lg" />
                                            My Applications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/myReviews'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <FaStar className="inline-block mr-2 text-lg" />
                                            My Reviews
                                        </NavLink>
                                    </li>
                                </>
                            }

                            {
                                role === 'publisher' &&
                                <>

                                    <li>
                                        <NavLink to={'/myAddedScholarships'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <span className="relative">
                                                <IoSchoolSharp className="inline-block mr-2 text-xl" />
                                                <BsCheck size={22} className='absolute -bottom-2 -right-1 text-green-500' />
                                            </span>
                                            My Added Scholarships
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/addScholarship'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <span className="relative">
                                                <IoSchoolSharp className="inline-block mr-2 text-xl" />
                                                <GrFormAdd size={22} className='absolute -bottom-2 -right-1 text-orange-500' />
                                            </span>
                                            Add Scholarship
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {
                                role === 'admin' &&
                                <>
                                    <li>
                                        <NavLink to={'/dashboard/pendingPublishersApplications'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <FaHourglassHalf className="inline-block mr-2 text-lg text-orange-500 animate-spin" />
                                            Pending Publisher Applications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/approvedPublishersApplications'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <FaCheckCircle className="inline-block mr-2 text-lg text-green-600" />
                                            Approved Publisher Applications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/rejectedPublishersApplications'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                            <FaTimesCircle className="inline-block mr-2 text-lg text-orange-700" />
                                            Rejected Publisher Applications
                                        </NavLink>
                                    </li>
                                </>
                            }
                            <li>
                                <NavLink to={'/dashboard/myProfile'} className="flex items-center p-2 text-gray-700 hover:bg-base-300 rounded-md">
                                    <FaUser className="inline-block mr-2 text-lg" />
                                    My Profile
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>


            </div>
        </div >
    );
};

export default DashboardLayout;