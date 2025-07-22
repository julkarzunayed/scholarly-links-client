import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000/`
})

const useAxiosSecure = () => {
    // axiosSecure.interceptors.request.use((config) => {
    //     config.headers.Authorization =
    // })
    return axiosSecure;
};

export default useAxiosSecure;