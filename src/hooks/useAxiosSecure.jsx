import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { getIdToken } from 'firebase/auth';

const axiosSecure = axios.create({
    // baseURL: `http://localhost:3000/`
    baseURL: `https://scholarly-links-server-pink.vercel.app`
})

const useAxiosSecure = () => {
    const { user, userLogout } = useAuth();
    const navigate = useNavigate();

    
axiosSecure.interceptors.request.use(async (config) => {
    const token = user && await getIdToken(user);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, error => {
        console.log('Error in the Interceptor', error);
        if (error.status === 403) {
            navigate('/forbidden')
        }
        if (error.status === 401) {
            userLogout()
                .then(() => {
                    navigate('/login')
                })
                .catch(error => { console.log(error) })
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;




// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';

// const axiosSecure = axios.create({
//     baseURL: `http://localhost:3000`
// })

// const useAxiosSecure = () => {
//     const { user, userLogout } = useAuth();
//     const navigate = useNavigate();

//     axiosSecure.interceptors.request.use((config) => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     });

//     axiosSecure.interceptors.response.use((response) => {
//         return response;
//     }, error => {
//         console.log('Error in the Interceptor', error);
//         if (error.status === 403) {
//             navigate('/forbidden')
//         }
//         if (error.status === 401) {
//             userLogout()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(error => { console.log(error) })
//         }
//         return Promise.reject(error);
//     })
//     return axiosSecure;
// };

// export default useAxiosSecure;