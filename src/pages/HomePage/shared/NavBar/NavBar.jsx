import React from 'react';
import { TfiMenu } from 'react-icons/tfi';
import { NavLink } from 'react-router';
import ScholarlyLinkLogo from '../../../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';
import useAuth from '../../../../hooks/useAuth';

const links = <>
    <li><NavLink to={'/'}>Home</NavLink></li>
    <li><NavLink to={'/allScholarship'}>All Scholarships</NavLink></li>
    <li><NavLink to={''}>About</NavLink></li>
</>

const NavBar = () => {
    const { user } = useAuth();
    return (
        <div className='px-2 py-2 border border-base-300 shadow-sm sm:py-3 flex justify-between items-center'>
            <ScholarlyLinkLogo></ScholarlyLinkLogo>
            <div className="hidden lg:flex gap-1 ">
                <ul className='flex gap-3'>
                    {links}
                </ul>
            </div>
            <div className="flex items-center">
                {
                    user ?
                        <div
                            title={user?.displayName}
                            className="hidden sm:block border-[1px] border-blue-300 rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${user?.photoURL})`,
                            }}>

                        </div>
                        :
                        <button className='btn btn-sm btn-secondary'>
                            Log In
                        </button>
                }

                <label htmlFor="my-drawer-4" className="btn btn-sm btn-ghost lg:hidden">
                    <TfiMenu size={30} />
                </label>
                
            </div>
            
        </div>
    );
};

export default NavBar;