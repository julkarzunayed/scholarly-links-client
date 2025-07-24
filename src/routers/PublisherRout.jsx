import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useUserDB from '../hooks/useUserDB';
import LoadingPage from '../pages/Loading/LoadingPage';

const PublisherRout = ({ children }) => {
    const { user, loading } = useAuth();
    const { userData, userLoading, userPending } = useUserDB();
    const location = useLocation();

    // console.log("from the admin", userData.role)

    if (loading || userLoading || userPending) {
        return <LoadingPage />
    }

    if (!user || userData?.role !== 'publisher') {
        return <Navigate to={`/forbidden`} state={{ from: location.pathname }}></Navigate>
    }

    return children;
};

export default PublisherRout;