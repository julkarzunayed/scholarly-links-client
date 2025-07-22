import React from 'react';
import { Outlet } from 'react-router';
import ScholarlyLinkLogo from '../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';
import Lottie from 'lottie-react';

import lottieData from '../../assets/lottie_json/login.json';

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen">
            <div className="my-10 ml-4">
                <ScholarlyLinkLogo />
            </div>
            <div className="flex flex-col lg:flex-row-reverse min-h-[90vh] *:flex-1 justify-center items-center gap-5">
                <figure className="flex  justify-center items-center">
                    <Lottie
                        animationData={lottieData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '70%', height: '100%' }}
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