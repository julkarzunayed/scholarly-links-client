import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useUserDB = () => {
    const axiosInstance = useAxios();
    const { user, loading: authLoading } = useAuth();
    const { data, isLoading, isError, isPending } = useQuery({
        queryKey: ['user_data', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${user?.email}`)
            return res.data;
        },
        enabled: !authLoading && !!user?.email,

    })
    return {
        userData: data,
        userLoading: isLoading || authLoading,
        userPending: isPending,
        userError: isError,
    };
};

export default useUserDB;