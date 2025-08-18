import React from 'react';

import graduateGirl from '../../../assets/graduate_girl.png'
import { Link } from 'react-router';
import StarBorder from '../../../components/StarBorder/StarBorder';
import HomeSectionTitle from '../../../components/HomeSectionTitle/HomeSectionTitle';

const AdmissionBanner = () => {
    return (
        <div className='pt-10 max-w-[1536px] mx-auto' >
            <div className="flex flex-col sm:flex-row *:flex-1 gap-5">

                {/* ------Content Box--------- */}

                <div className="flex items-center text-center sm:text-left">
                    <div className="space-y-4">
                        <HomeSectionTitle
                            text1={'Choose A Right Scholarship'}
                            text2={" For You"}
                            // color={ }
                            textSize={'text-5xl'}
                            mb={'mb-2'}
                            mt={'mt-1'}
                        />
                        <p className="text-gray-500/90 max-w-lg">
                            Complete your profile and receive real admission offers to multiple schools, many with scholarships attached. Having schools compete for you this way takes the uncertainty out of the traditional application process.
                        </p>
                        <Link
                            to={`/allScholarship`}
                        >
                            <StarBorder
                                as="button"
                                className=""
                                color="cyan"
                                speed="4s"
                            >
                                Find Scholarships
                            </StarBorder>
                        </Link>
                    </div>
                </div>

                {/* ------------Graduate Girl ------------- */}

                <div className="">
                    <figure>
                        <img src={graduateGirl} alt="" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default AdmissionBanner;