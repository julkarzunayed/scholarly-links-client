import React from 'react';
import { TfiMenu } from 'react-icons/tfi';
import { Link, NavLink } from 'react-router';
import ScholarlyLinkLogo from '../../../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';
import useAuth from '../../../../hooks/useAuth';
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import ThemeController from '../../../../components/ThemeController/ThemeController';

const links = <>
    <li><NavLink to={'/'}>Home</NavLink></li>
    <li><NavLink to={'/allScholarship'}>All Scholarships</NavLink></li>
    <li><NavLink to={'/dashboard/home'}>Dashboard</NavLink></li>
</>

const NavBar = () => {
    const { user, userLogout } = useAuth();

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
        <div className="h-10">
            <div className="fixed w-full   bg-gradient-to-r from-primary from-50%  to-teal-500 to-90% top-0 z-50">
                <div className='max-w-[1536px] mx-auto px-2 py-2  sm:py-3 flex justify-between items-center'>
                    <ScholarlyLinkLogo></ScholarlyLinkLogo>
                    <div className="hidden lg:flex gap-1 ">
                        <ul className='flex flex-row text-white font-bold *:hover:text-secondary  menu gap-3'>
                            {links}
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Theme Controller */}
                        <span title='Theme' className='hidden sm:block'>
                            <ThemeController />
                        </span>
                        {
                            user ?
                                <button className="" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
                                    <div
                                        title={user?.displayName}
                                        className="hidden sm:block border-[1px] border-blue-300 rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat"
                                        style={{
                                            backgroundImage: `url(${user?.photoURL})`,
                                        }}>

                                    </div>
                                </button>
                                :
                                <Link
                                    to={'/login'}
                                    className='btn btn-sm btn-primary text-gray-700'>
                                    Log In
                                </Link>
                        }

                        <label htmlFor="my-drawer-4" className="btn btn-sm btn-ghost lg:hidden">
                            <TfiMenu size={30} />
                        </label>

                    </div>



                    <ul className="dropdown menu w-52 transform -translate-x-1/2 rounded-box bg-base-300 shadow-sm"
                        popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
                        <li>
                            <NavLink
                                className='flex items-center gap-2'
                                to={'/dashboard/myProfile'}
                            >
                                <CgProfile size={20} /> Profile Page
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center">
                                <RiLogoutCircleRLine size={20} />  Log Out
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

    );
};

export default NavBar;