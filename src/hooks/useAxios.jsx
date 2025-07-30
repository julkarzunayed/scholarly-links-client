
import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
    // baseURL: `https://scholarly-links-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;


//https://scholarly-links-server.vercel.app


// import axios from 'axios';
// import React from 'react';

// const axiosInstance = axios.create({
//     baseURL: `http://localhost:3000`
// })

// const useAxios = () => {
//     return axiosInstance;
// };

// export default useAxios;