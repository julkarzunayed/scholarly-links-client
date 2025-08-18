import React from 'react';
import { Link } from 'react-router';

const ScholarlyLinkLogo = ({textColor}) => {
    return (
        <div>
            <Link
                to={'/'}
                className={`text-lg ${textColor? textColor: 'text-gray-100'} font-bold gap-0 sm:text-xl md:text-2xl py-1 transform  hover:bg-white/15 rounded-lg`}>
                Scholarly
                <span className='text-secondary font-black'>L</span>
                inks
            </Link>
        </div>
    );
};

export default ScholarlyLinkLogo;