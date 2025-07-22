import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="">
            <div className="flex flex-col lg:flex-row-reverse *:flex-1 justify-center items-center">
                <div className="flex justify-center items-center">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className=''>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;