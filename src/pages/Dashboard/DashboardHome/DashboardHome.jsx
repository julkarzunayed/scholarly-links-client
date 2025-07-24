import React from 'react';
import useUserDB from '../../../hooks/useUserDB';
import LoadingPage from '../../Loading/LoadingPage';

const DashboardHome = () => {
    const { userData, userLoading, userPending } = useUserDB();


    if(userLoading || userPending) {
        return <LoadingPage/>
    }

    return (
        <div>
            DashBoard Home For {userData?.role}
        </div>
    );
};

export default DashboardHome;