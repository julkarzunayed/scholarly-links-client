import React from 'react';
import Lottie from 'lottie-react';
import errorAnimationData from '../../assets/lottie_json/error.json';
import { Link } from 'react-router';

const Error = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
            <div className="max-w-md w-full bg-base-300 rounded-lg shadow-xl p-8 text-center">
                <div className="w-64 h-64 mx-auto mb-6">
                    {/* Lottie animation component */}
                    <Lottie
                        animationData={defaultOptions.animationData}
                        loop={defaultOptions.loop}
                        autoplay={defaultOptions.autoplay}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>

                <h1 className="text-4xl font-extrabold text-base-content text-shadow-lg text-shadow-cyan-600 mb-4">
                    Oops! Something Went Wrong.
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    to={'/'}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default Error;
