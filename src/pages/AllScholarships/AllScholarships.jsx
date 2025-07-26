import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import LoadingPage from '../Loading/LoadingPage';
import ScholarshipCard from './ScholarshipCard';
import NoResultFound from '../../components/NoResultFound/NoResultFound';


const AllScholarships = () => {
    const axiosPublic = useAxios();
    const [searchTerm, setSearchTerm] = useState('');
    const [degree, setDegree] = useState('');

    const { data: scholarships, isLoading, isPending } = useQuery({
        queryKey: ['all_scholarships', searchTerm, degree],
        queryFn: async () => {
            const res = await axiosPublic.get(`/scholarship/all?searchTerm=${searchTerm}&degree=${degree}`)

            return res.data;
        }
    });


    console.log(scholarships);
    return (
        <div>
            <div className="p-2  flex flex-col sm:flex-row gap-2 justify-between items-center mt-2">
                <h2 className="text-xl sm:text-3xl font-bold">
                    All Scholarships
                </h2>
                <div className="join  min-w-xs">
                    <div>
                        <label className="input join-item">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                                type="text"
                                placeholder="Scholarship or University name"
                                required />
                        </label>
                        <div className="-hint hidden">Enter valid email address</div>
                    </div>
                    <select
                        onChange={(e) => { setDegree(e.target.value) }}
                        defaultValue=""
                        className="border border-gray-300 join-item max-w-[100px] px-0.5 select me-0 ">
                        <option value='' disabled={true}>Degree</option>
                        <option value='diploma'>Diploma</option>
                        <option value='bachelor'>Bachelor</option>
                        <option value='masters'>Masters</option>
                    </select>
                </div>
            </div>
            <div className="">
                {
                    (isLoading || isPending) ?
                        <div className="">
                            <LoadingPage />
                        </div>
                        :
                        <>
                            {
                                scholarships?.length !== 0 ?
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {
                                            scholarships?.map(scholarship => (
                                                <ScholarshipCard
                                                    scholarship={scholarship}
                                                    key={scholarship?._id} />
                                            ))
                                        }
                                    </div>
                                    :
                                    // Empty animation
                                    <NoResultFound/>
                            }
                        </>
                }

            </div>
        </div>
    );
};

export default AllScholarships;