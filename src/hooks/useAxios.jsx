
import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    // baseURL: `http://localhost:3000/`
    baseURL: `http://localhost:3000/`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;



// import axios from 'axios';
// import React from 'react';

// const axiosInstance = axios.create({
//     baseURL: `http://localhost:3000`
// })

// const useAxios = () => {
//     return axiosInstance;
// };

// export default useAxios;