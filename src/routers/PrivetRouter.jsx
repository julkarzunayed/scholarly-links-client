import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../pages/Loading/LoadingPage';

const PrivetRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingPage/>
    }

    if (!user) {
        return <Navigate to={`/login`} state={{ from: location.pathname }}></Navigate>
    }

    return children;
};

export default PrivetRouter;