import React, {  } from 'react';
import LoadingPage from '../../Loading/LoadingPage';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ScholarshipCard from '../../AllScholarships/ScholarshipCard';
import NoResultFound from '../../../components/NoResultFound/NoResultFound';
import { Link } from 'react-router';
import StarBorder from '../../../components/StarBorder/StarBorder';


const TopScholarship = () => {
    const axiosPublic = useAxios();

    const { data: scholarships, isLoading, isPending } = useQuery({
        queryKey: ['top_scholarships',],
        queryFn: async () => {
            const res = await axiosPublic.get(`/scholarship/categorized`)

            return res.data;
        }
    });


    // console.log(scholarships);
    if (isLoading || isPending) {
        return <LoadingPage></LoadingPage>
    }

    const filteredScholarships = scholarships?.filter((scholarship, i) => i < 6)

    // console.log(filteredScholarships)

    return (
        <div>
            <div className="p-2  flex flex-col sm:flex-row gap-2 justify-between items-center mt-2">
                <h2 className="text-xl sm:text-3xl font-bold">
                    Top Scholarships
                </h2>
            </div>
            <div className="">
                {
                    filteredScholarships?.length !== 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                filteredScholarships?.map(scholarship => (
                                    <ScholarshipCard
                                        scholarship={scholarship}
                                        key={scholarship?._id} />
                                ))
                            }
                        </div>
                        :
                        // Empty animation
                        <NoResultFound />
                }
            </div>
            <div className="mt-5 flex justify-end ">
                <Link
                to={`/allScholarship`}
                >
                    <StarBorder
                        as="button"
                        className=""
                        color="cyan"
                        speed="4s"
                    >
                        Find More Scholarships
                    </StarBorder>
                </Link>
            </div>
        </div>
    );
};

export default TopScholarship;