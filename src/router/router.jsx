import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomePage from '../pages/HomePage/HomePage/HomePage';
import AllScholarship from '../pages/AllScholarship/AllScholarship';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Login from '../pages/Authentication/LogIn/Login';
import Register from '../pages/Authentication/Register/Register';

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: '/allScholarship',
                Component: AllScholarship,
            }
        ]
    },
    {
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    }
])

export default router;