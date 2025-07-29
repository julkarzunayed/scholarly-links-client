import React from 'react';
import { useForm } from 'react-hook-form';
import { capitalizeFirstLetter } from '../../utils/helper';

const Check = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const data = {
        name: 'Atahar ali',
        age: 18,
        address: 'dhaka, Bangladesh'
    }

    const keys = Object.keys(data)
    // console.log(data['name'])

    const onSubmit = (data) => {
        // When the form is submitted, 'data.food' will be an array
        // containing the 'value' of all checked checkboxes.
        console.log("Form Data:", data);
        console.log("Selected Foods:", data.food);
        // Example output if Apple and Mango are checked:
        // Selected Foods: ["Apple", "mango"]
    };

    return (
        <div>
            <div className="p-14">
                <form action="">
                    {
                        keys.map(key => <>
                            <fieldset className='fieldset'>
                                <label className="label">
                                    {capitalizeFirstLetter(key)}
                                </label>
                                <input className='input' name='key' value={data[key]} type="text" />
                            </fieldset>
                        </>)
                    }
                </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Choose your foods:
                    </label>

                    {/* Checkbox Group */}
                    <div className="space-y-3"> {/* Tailwind for vertical spacing */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                value="Apple"
                                {...register('food', {
                                    required: 'Please select at least one food' // Optional: Add required validation
                                })}
                                className="checkbox checkbox-sm mr-2 rounded-md border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            />
                            <label htmlFor="food-apple" className="text-gray-700">Apple</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                value="Orange"
                                {...register('food')}
                                className="checkbox checkbox-md mr-2 rounded-md border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            />
                            <label htmlFor="food-orange" className="text-gray-700">Orange</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                value="mango"
                                {...register('food')}
                                className="checkbox checkbox-lg mr-2 rounded-md border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            />
                            <label htmlFor="food-mango" className="text-gray-700">Mango</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                value="Banana"
                                {...register('food')}
                                className="checkbox checkbox-lg text-green-500 rounded-md"
                            />
                            <label className="text-gray-700">Banana</label>
                        </div>
                    </div>

                    {/* Error message for the checkbox group */}
                    {errors.food && (
                        <p className="text-red-500 text-xs mt-2">{errors.food.message}</p>
                    )}
                </div>
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                    <legend className="fieldset-legend">Login options</legend>
                    <label className="label">
                        <input
                            type="checkbox"
                            
                            {...register('Remember')}
                            defaultChecked
                            className="checkbox" />
                        Remember me
                    </label>
                    <label className="label">
                        <input
                            type="checkbox"
                            {...register('Remember_me')}
                            defaultChecked
                            className="checkbox" />
                        Auto login
                    </label>
                </fieldset>

                <button

                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Check;




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