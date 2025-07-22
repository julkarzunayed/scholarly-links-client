import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomePage from '../pages/HomePage/HomePage/HomePage';
import AllScholarship from '../pages/AllScholarship/AllScholarship';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Login from '../pages/Authentication/LogIn/Login';
import Register from '../pages/Authentication/Register/Register';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import Error from '../pages/Error/Error';

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
    },
    {
        path: 'forbidden',
        Component: ForbiddenPage
    },
    {
        path: '*',
        Component: Error
    }
])

export default router;