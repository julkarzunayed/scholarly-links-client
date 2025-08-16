import React from 'react';
import useUserDB from '../../../hooks/useUserDB';
import LoadingPage from '../../Loading/LoadingPage';

import ForbiddenPage from '../../ForbiddenPage/ForbiddenPage';
import AdminDashboard from './AdminDashboard';
import PublisherDashboard from './PublisherDashboard';
import UserDashboard from './UserDashboard';


const DashboardHome = () => {
    const { userData, userLoading, userPending } = useUserDB();
    const role = userData?.role

    if (userLoading || userPending) {
        return <LoadingPage />
    }

    if (role === 'user'|| !role) {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'publisher') {
        return <PublisherDashboard />
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <ForbiddenPage/>
    }
};

export default DashboardHome;