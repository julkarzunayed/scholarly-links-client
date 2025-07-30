import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomePage from '../pages/HomePage/HomePage/HomePage';
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
import MyAddedScholarships from '../pages/Dashboard/MyAddedScholarships/MyAddedScholarships';
import AllScholarships from '../pages/AllScholarships/AllScholarships';
import ScholarshipDetails from '../pages/ScholarshipDetails/ScholarshipDetails';
import Check from '../components/Check/Check';
import ScholarshipApplicationPage from '../pages/ScholarshipApplicationPage/ScholarshipApplicationPage';
import MyAppliedScholarships from '../pages/Dashboard/MyAppliedScholarships/MyAppliedScholarships';
import Payment from '../pages/Dashboard/Payment/Payment';
import ManageApplications from '../pages/Dashboard/ManageApplications/ManageApplications';
import MyReviews from '../pages/Dashboard/MyReviews/MyReviews';
import ManageReviews from '../pages/Dashboard/ManageReviews/ManageReviews';



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
                path: 'allScholarship',
                Component: AllScholarships,
            },
            {
                path: 'scholarshipDetails/:id',
                element: <PrivetRouter>
                    <ScholarshipDetails />
                </PrivetRouter>
            },
            {
                path: 'scholarshipApplicationPage/:id',
                element: <PrivetRouter>
                    <ScholarshipApplicationPage />
                </PrivetRouter>
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
            {
                path: 'myAppliedScholarships',
                Component: MyAppliedScholarships
            },
            {
                path: 'payment/:scholarshipId',
                Component: Payment,
            },
            {
                path: 'manageApplications/:id',
                Component: ManageApplications
            },
            {
                path: 'myReviews',
                Component: MyReviews,
            },
            {
                path: 'manageReviews',
                element: <AdminRouters>
                    <ManageReviews />
                </AdminRouters>
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
            },
            {
                path: 'myAddedScholarships',
                element: <PublisherRout>
                    <MyAddedScholarships />
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
    },
    {
        path: 'check',
        Component: Check
    }
])

export default router;