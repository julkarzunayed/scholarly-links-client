import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCheckApplicationOfPublisher = () => {
    const axiosInstance = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const { data, isLoading, isError, isPending, refetch } = useQuery({
        queryKey: ['application_data_of_publisher', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/publishers/apply?email=${user?.email}&userEmail=${user?.email}`)

            if (res.status === 204) {
                return {status: 'not_applied'}; 
            }

            return res.data;
        },
        enabled: !authLoading && !!user?.email,

    });
    // console.log(data)
    // console.log(error)
    return {
        refetch,
        data: data,
        loading: authLoading || isLoading,
        error: isError,
        isPending: isPending,
    };
};

export default useCheckApplicationOfPublisher;