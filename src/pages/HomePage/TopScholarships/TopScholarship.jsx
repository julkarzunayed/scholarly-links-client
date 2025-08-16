import React, { } from 'react';
import LoadingPage from '../../Loading/LoadingPage';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ScholarshipCard from '../../AllScholarships/ScholarshipCard';
import NoResultFound from '../../../components/NoResultFound/NoResultFound';
import { Link } from 'react-router';
import StarBorder from '../../../components/StarBorder/StarBorder';
import HomeSectionTitle from '../../../components/HomeSectionTitle/HomeSectionTitle';
import TopScholarshipCards from './TopScholarshipCards';


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

    const filteredScholarships = scholarships?.filter((scholarship, i) => i < 4)

    // console.log(filteredScholarships)

    return (
        <div>
            <div className="max-w-[1536px] mx-auto">
                <div className="p-2  flex flex-col sm:flex-row gap-2 justify-between items-center mt-2">
                    {/* ----------title */}
                    <HomeSectionTitle
                        text1={'Top '}
                        text2={'Scholarships'}
                    />
                </div>
                <div className="">
                    {
                        filteredScholarships?.length !== 0 ?
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {
                                    filteredScholarships?.map(scholarship => (
                                        <TopScholarshipCards
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

        </div>
    );
};

export default TopScholarship;