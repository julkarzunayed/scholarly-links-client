import React from 'react';
import { Outlet } from 'react-router';
import ScholarlyLinkLogo from '../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen">
            <ScholarlyLinkLogo />
            <div className="flex flex-col lg:flex-row-reverse min-h-[90vh] *:flex-1 justify-center items-center gap-5">
                <figure className="flex  justify-center items-center">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </figure>
                <div className=' w-full'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>

    );
};

export default AuthLayout;