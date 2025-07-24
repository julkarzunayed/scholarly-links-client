import React from 'react';
import useUserDB from '../../../hooks/useUserDB';

const DashboardHome = () => {
    const { userData, userLoading, userPending } = useUserDB();
    return (
        <div>
            DashBoard Home
        </div>
    );
};

export default DashboardHome;