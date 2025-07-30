import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingPage from '../../Loading/LoadingPage';

const AllReviews = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()


    const { data: reviews, isLoading, isPending } = useQuery({
        queryKey: ['all_reviews_for_admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });

    if (isLoading || isPending) {
        return <LoadingPage />
    }

    console.log(reviews)

    return (
        <div>
            
        </div>
    );
};

export default AllReviews;