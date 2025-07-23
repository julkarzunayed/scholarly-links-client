import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ScholarlyLinkLogo from '../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';
// import useUserDB from '../../hooks/useUserDB';

const DashboardLayout = () => {
    // const user = useUserDB();

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
                    <li><ScholarlyLinkLogo/></li>
                    <li><NavLink to={'/dashboard'}>Home</NavLink></li>
                    <li><NavLink to={'/myApplications'}>My Applications</NavLink></li>
                    <li><NavLink to={'/myReviews'}>My Reviews</NavLink></li>
                    <li><NavLink to={'/dashboard/pendingPublishersApplications'}>Pending Publisher Applications</NavLink></li>
                    <li><NavLink to={'/dashboard/approvedPublishersApplications'}>Approved Publisher Applications</NavLink></li>
                    <li><NavLink to={'/dashboard/rejectedPublishersApplications'}>Rejected Publisher Applications</NavLink></li>
                    <li><NavLink to={'/dashboard/myProfile'}>My Profile</NavLink></li>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;