import React from 'react';
import { TfiMenu } from 'react-icons/tfi';
import { NavLink } from 'react-router';
import ScholarlyLinkLogo from '../../../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';

const links = <>
    <li><NavLink to={'/'}>Home</NavLink></li>
    <li><NavLink to={'/allScholarship'}>All Scholarships</NavLink></li>
    <li><NavLink to={''}>About</NavLink></li>
</>

const NavBar = () => {

    return (
        <div className='px-2 py-2 border border-base-300 shadow-sm sm:py-3 flex justify-between items-center'>
            <ScholarlyLinkLogo></ScholarlyLinkLogo>
            <div className="hidden lg:flex gap-1 ">
                <ul className='flex gap-3'>
                    {links}
                </ul>
            </div>
            <div className="flex items-center">
                <div
                    className="border-[1px] border-blue-300 rounded-full h-12 w-12 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://i.ibb.co/k6St0p9V/ai-student-2.png)`,
                    }}>

                </div>
                <label htmlFor="my-drawer-4" className="btn btn-sm btn-ghost ">
                    <TfiMenu size={30} />
                </label>
            </div>
        </div>
    );
};

export default NavBar;