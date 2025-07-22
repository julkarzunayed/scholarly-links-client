import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../pages/HomePage/shared/NavBar/NavBar';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-2'>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;