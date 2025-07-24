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
import PrivetRouter from '../routers/PrivetRouter';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import MyProfile from '../pages/Dashboard/MyProfile/MyProfile';
import ApplyToAddScholarship from '../pages/Dashboard/ApplyToAddScholarship/ApplyToAddScholarship';
import EditApplyToAddScholarship from '../pages/Dashboard/EditApplyToAddScholarship/EditApplyToAddScholarship';
import PendingPublishersApplications from '../pages/Dashboard/PendingPublishersApplications/PendingPublishersApplications';
import ApprovedPublishersApplications from '../pages/Dashboard/ApprovedPublishersApplications/ApprovedPublishersApplications';
import RejectedPublishersApplications from '../pages/Dashboard/RejectedPublishersApplications/RejectedPublishersApplications';
import AdminRouters from '../routers/AdminRouters';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import PublisherRout from '../routers/PublisherRout';
import AddScholarship from '../pages/Dashboard/AddScholarship/AddScholarship';

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
        path: 'dashboard',
        element: <PrivetRouter>
            <DashboardLayout />
        </PrivetRouter>,
        children: [
            {
                index: true,
                path: 'home',
                Component: DashboardHome,
            },
            {
                path: 'myProfile',
                element: <PrivetRouter>
                    <MyProfile />
                </PrivetRouter>
            },
            {
                path: 'applyToAddScholarship',
                Component: ApplyToAddScholarship,
            },
            {
                path: 'editApplyToAddScholarship',
                Component: EditApplyToAddScholarship
            },

            // Admin Routs

            {
                path: 'pendingPublishersApplications',
                element: <AdminRouters>
                    <PendingPublishersApplications />
                </AdminRouters>
            },
            {
                path: 'approvedPublishersApplications',
                element: <AdminRouters>
                    <ApprovedPublishersApplications />
                </AdminRouters>
            },
            {
                path: 'rejectedPublishersApplications',
                element: <AdminRouters>
                    <RejectedPublishersApplications />
                </AdminRouters>
            },
            // Publisher Rout
            {
                path: 'addScholarship',
                element: <PublisherRout>
                    <AddScholarship />
                </PublisherRout>
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