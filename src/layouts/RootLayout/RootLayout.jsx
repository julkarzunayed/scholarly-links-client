import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../pages/HomePage/shared/NavBar/NavBar';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;