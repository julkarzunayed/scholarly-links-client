import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// https://i.ibb.co/k6St0p9V/ai-student-2.png
// https://i.ibb.co/XfRzjTXz/ai-student-3.png
// https://i.ibb.co/Qvg4xttN/ai-student-1.png
const slidersData = [
    {
        id: 1,
        image: 'https://i.ibb.co/k6St0p9V/ai-student-2.png',
        title: 'Discover the right scholarships for you'
    },
    {
        id: 2,
        image: 'https://i.ibb.co/XfRzjTXz/ai-student-3.png',
        title: 'College planning made easy.'
    },
    {
        id: 3,
        image: 'https://i.ibb.co/Qvg4xttN/ai-student-1.png',
        title: 'Scholarship Donor Management Simplified'
    },
]

const Banner = () => {
    return (
        <div className='relative p-5 overflow-hidden'>
            {/* <div className="flex ">
                <div className="">
                    <div class="w-32 h-32 bg-blue-100 border border-blue-200 rounded-tl-full"></div>
                    <div class="w-32 h-32 bg-blue-100 border border-t-0 border-blue-200 rounded-br-full"></div>
                </div>
                <div className="">
                    <div class="w-32 h-32 bg-white border border-blue-100 rounded-tr-full"></div>
                    <div class="w-32 h-32 bg-white border border-t-0 border-blue-100 rounded-bl-full"></div>
                </div>
                <div className="">
                    <div class="w-32 h-32 bg-blue-100 border border-blue-200 rounded-tl-full"></div>
                    <div class="w-32 h-32 bg-blue-100 border border-t-0 border-blue-200 rounded-br-full"></div>
                </div>
                <div className="">
                    <div class="w-32 h-32 bg-white border border-blue-100 rounded-tr-full"></div>
                    <div class="w-32 h-32 bg-white border border-t-0 border-blue-100 rounded-bl-full"></div>
                </div>
            </div> */}
            <div className=" overflow-hidden  absolute bottom-0">
                <div className="grid  grid-cols-4 
                rotate-180
                    max-w-[calc(64px*4)] 
                    sm:max-w-[calc(80px*4)] 
                    *:w-16 *:h-16
                    *:sm:w-20 *:sm:h-20"
                >
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>

                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>

                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                    <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                </div>
                <div className="flex overflow-hidden   bottom-0">
                    <div className="grid grid-cols-4 overflow-hidden
                    min-w-[calc(64px*4)] 
                    sm:min-w-[calc(80px*4)] 
                    *:w-16 *:h-16
                    *:sm:w-20 *:sm:h-20"
                    >
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>

                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>

                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                    </div>
                    <div className="grid  grid-cols-4 
                    min-w-[calc(64px*4)] 
                    sm:min-w-[calc(80px*4)] 
                    *:w-16 *:h-16
                    *:sm:w-20 *:sm:h-20 overflow-hidden"
                    >
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>

                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>

                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-0"></div>
                        <div className=" border border-blue-100 rounded-bl-full rounded-tr-full transform rotate-90"></div>
                    </div>
                </div>
            </div>
            <div className="">
                <Swiper
                    className=''
                    modules={[Autoplay, Pagination, Navigation]}
                    // spaceBetween={50}
                    // slidesPerView={1}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    loop={true}

                >
                    {
                        slidersData.map(slider => <SwiperSlide
                            className=''
                            key={slider.id}>
                            <div className="flex flex-col-reverse md:flex-row md:items-center gap-10 md:gap-4 *:flex-1">
                                <div className="">
                                    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
                                        {slider.title}
                                    </h1>
                                    <button className=" btn btn-primary mt-5">
                                        Apply Now
                                    </button>
                                </div>
                                {/* Images */}
                                <div className="relative h-[500px]">
                                    <div className="h-[400px]"></div>
                                    <div
                                        className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-bl-full bg-cover bg-center bg-no-repeat absolute z-10 top-16 right-1/4 md:right-20"
                                        style={{
                                            backgroundImage: `url(${slider.image})`,
                                        }}>

                                    </div>
                                    <div
                                        className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-tl-full bg-cover bg-center bg-no-repeat bg-yellow-300 absolute bottom-0 right-1/3 md:right-28">

                                    </div>
                                    <div
                                        className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-tr-full bg-cover bg-center bg-no-repeat bg-green-300 absolute top-0 right-1/12 md:right-3">

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;