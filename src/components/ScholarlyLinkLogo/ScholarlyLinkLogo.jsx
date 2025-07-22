import React from 'react';
import { Link } from 'react-router';

const ScholarlyLinkLogo = () => {
    return (
        <div>
            <Link
                to={'/'}
                className="text-lg font-bold gap-0 sm:text-xl md:text-2xl btn btn-sm btn-ghost">
                Scholarly
                <span className='text-blue-600 font-black'>L</span>
                inks
            </Link>
        </div>
    );
};

export default ScholarlyLinkLogo;