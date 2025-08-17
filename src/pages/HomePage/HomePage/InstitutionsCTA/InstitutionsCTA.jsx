import { Icon } from '@iconify-icon/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router';

// This is a complete React component for the "Institutions Call to Action" section.
// It uses Tailwind CSS and DaisyUI for styling.
// To use it, simply import it and place it on your homepage component.

const InstitutionsCTA = () => {
    return (
        // Section container with responsive padding, margin, and a shadow card effect.
        <section className="max-w-[1536px] mx-auto p-8 lg:p-16 bg-gradient-to-r from-primary from-50%  to-teal-500 to-90% rounded-3xl shadow-lg  border-gray-200 bg-[#999]">
            {/* Flex container for content, allowing for a vertical layout on mobile and horizontal on desktop. */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 ">

                {/* Left side: Text content and button. */}
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[#003366] mb-4 leading-tight">
                        Are You an Institution or Donor?
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mb-6">
                        Join our network and connect with thousands of qualified students seeking financial aid. Streamline your scholarship management and maximize your impact with our easy-to-use platform.
                    </p>

                    {/* Call to Action Button with specified styles and a link. */}
                    <div className=" flex">
                        <Link
                            to={`dashboard/applyToAddScholarship`}
                            className='w-full lg:max-w-sm rounded-full hover:scale-y-105 bg-secondary transition-all duration-1000 py-2 flex items-center justify-center gap-2 font-bold text-lg text-accent bg-size-[500%_100%] bg-gradient-to-r from-secondary from-50%  to-accent to-50% hover:bg-right hover:text-white hover:bg-white shadow-xl'
                            style={{
                                boxShadow: 'inset 4px 4px 6px #00000050,inset -4px -4px 5px #ffffff85'
                            }}
                        >
                            <span className="">Post a Scholarship </span>
                            <span className=' flex items-center justify-center'><Icon icon="majesticons:arrow-right-line" width="24" height="24" /></span>
                        </Link>
                    </div>
                </div>

                {/* Right side: SVG Icon, hidden on small screens. */}
                <div className="hidden lg:flex justify-center text-9xl">
                    {/* SVG icon using currentColor to inherit text color from parent. */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 text-[#FF4500]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z" />
                    </svg> */}
                    <Icon icon="akar-icons:question" style={{ color: "#ff6a00" }} />
                </div>
            </div>
        </section>
    );
};

export default InstitutionsCTA;
