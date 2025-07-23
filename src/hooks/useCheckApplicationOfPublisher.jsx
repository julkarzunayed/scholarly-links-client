import React from 'react';
import useAxios from './useAxios';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useCheckApplicationOfPublisher = () => {
    const axiosInstance = useAxios();
    const { user, loading: authLoading } = useAuth();
    const { data, isLoading, isError, isPending } = useQuery({
        queryKey: ['application_data_of_publisher', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/publishers/apply?email=${user?.email}`)

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
        data: data,
        loading: authLoading || isLoading,
        error: isError,
        isPending: isPending,
    };
};

export default useCheckApplicationOfPublisher;