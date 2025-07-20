import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomePage from '../pages/HomePage/HomePage/HomePage';
import AllScholarship from '../pages/AllScholarship/AllScholarship';

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
    }
])

export default router;