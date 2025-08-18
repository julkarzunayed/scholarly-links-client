import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';

import graduate01 from "../../../assets/graduates/graduate_student_male.jpg";
import graduate02 from "../../../assets/graduates/graduate_student_male_01.jpg";
import graduate03 from "../../../assets/graduates/graduate_student_male_02.jpg";
import graduateGirl from "../../../assets/graduates/happy-student-with-graduation-hat-diploma-grey.jpg";
import background from "../../../assets/graduates/graduate_students_many.jpg"
import { Link } from 'react-router';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import HomeSectionTitle from '../../../components/HomeSectionTitle/HomeSectionTitle';

const alumniSpotlights = [
    {
        "id": "1",
        "name": "Sarah Chen",
        "university": "MIT",
        "field_of_study": "Computer Science",
        "scholarship_name": "Tech Innovators Scholarship",
        "quote": "This platform made finding the perfect scholarship so easy. It changed my life as expected!",
        "photo": graduate01
    },
    {
        "id": "2",
        "name": "Alex Rodriguez",
        "university": "Stanford University",
        "field_of_study": "Mechanical Engineering",
        "scholarship_name": "Stanford Merit Award",
        "quote": "I found a scholarship I didn't even know existed. It's an invaluable resource for students.",
        "photo": graduate02
    },
    {
        "id": "3",
        "name": "Chloe Davis",
        "university": "University of Cambridge",
        "field_of_study": "Literature",
        "scholarship_name": "Cambridge Global Excellence Scholarship",
        "quote": "The guidance and resources provided here were key to my successful application. Thank you!",
        "photo": graduate03
    },
    {
        "id": "4",
        "name": "Omar Khan",
        "university": "University of Toronto",
        "field_of_study": "Public Policy",
        "scholarship_name": "Toronto Scholars Program",
        "quote": "Without this website, my dream of studying abroad would not have been possible. Absolutely fantastic!",
        "photo": graduateGirl
    },
    {
        "id": "5",
        "name": "Isabella Rossi",
        "university": "ETH Zurich",
        "field_of_study": "Robotics",
        "scholarship_name": "ETH Zurich Excellence Scholarship",
        "quote": "The platform is incredibly user-friendly and helped me filter down to scholarships that truly matched my profile.",
        "photo": "https://placehold.co/100x100/B2EBF2/000000?text=IR"
    },
]

const FeaturedAlumniSpotlights = () => {
    return (
        <div
            className='pt-20 pb-14 px-2  bg-center bg-fixed mb-14 lg:bg-size-[150%_150%] hover:bg-size-[200%_200%] transition-all  duration-1000 '
            style={{
                backgroundImage: `linear-gradient(to bottom, #155DFC90, #14b8a640), url(${background}) `
            }}>
            <div className="max-w-[1548px] mx-auto ">
                <HomeSectionTitle
                    text1={'Featured Alumni '}
                    text2={'Spotlights'}
                    color={'text-white'}
                    mb={'mb-3'}
                    mt={'mt-0'}
                />
                <Swiper
                    breakpoints={{
                        // When window width is >= 320px, display 1 slide per view
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        // When window width is >= 640px (md breakpoint in Tailwind), display 2 slides
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // When window width is >= 768px (lg breakpoint), display 3 slides
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        // When window width is >= 1024px, display 4 slides
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                    }}
                    // slidesPerView={4}
                    // spaceBetween={15}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper bg-transparent"
                >
                    {
                        alumniSpotlights?.map((story) =>
                            <SwiperSlide key={story?.id} className='bg-transparent px-1 py-3'>
                                <div key={story.id} className="break-inside-avoid-column">
                                    <div className="card bg-white shadow-lg overflow-hidden group rounded-3xl ">
                                        <div className="avatar w-full transition-transform transform group-hover:scale-110">
                                            <div className="w-full ">
                                                <img
                                                    src={story.photo}
                                                    alt={`${story.name}'s photo`}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex p-6 flex-col items-center text-center">
                                            {/* Photo with a colored border from your color scheme */}

                                            {/* <div className="h- overflow-hidden border-4 border-[#FF4500]">
                                                <img
                                                    src={story.photo}
                                                    alt={`${story.name}'s photo`}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div> */}

                                            {/* Quote */}
                                            <p className="text-base italic text-gray-800 font-medium leading-relaxed">
                                                "{story.quote}"
                                            </p>

                                            {/* Alumni Details */}
                                            <div className="mt-4">
                                                <h3 className="text-lg font-bold text-[#003366]">
                                                    {story.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {story.university} · {story.field_of_study}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Recipient of the: <span className="font-semibold">{story.scholarship_name}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }

                </Swiper>
                <div className="mt-3 flex">
                    <Link
                        to={`/alumniSpotlights`}
                        className='w-full lg:max-w-sm rounded-full hover:scale-y-105 bg-secondary transition-all duration-1000 py-2 flex items-center justify-center gap-2 font-bold text-lg text-accent bg-size-[500%_100%] bg-gradient-to-r from-secondary from-50%  to-accent to-50% hover:bg-right hover:text-white hover:bg-white shadow-xl'
                        style={{
                            boxShadow: 'inset 4px 4px 6px #00000050,inset -4px -4px 5px #ffffff85',

                        }}
                    >
                        <span className="">Explore our Spotlight </span>
                        <span className=' flex items-center justify-center'><Icon icon="majesticons:arrow-right-line" width="24" height="24" /></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAlumniSpotlights;