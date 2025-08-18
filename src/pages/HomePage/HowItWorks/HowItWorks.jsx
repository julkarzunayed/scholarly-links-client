import React from 'react';
import HomeSectionTitle from '../../../components/HomeSectionTitle/HomeSectionTitle';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

const howItWorksData = [
    {
        title: 'Find Scholarships',
        icon: 'lineicons:graduation-cap-1',
        color: 'bg-secondary'
    },
    {
        title: 'Choose a Scholarship',
        icon: 'iconoir:one-finger-select-hand-gesture',
        color: 'bg-secondary'
    },
    {
        title: 'Make Payment',
        icon: 'hugeicons:payment-02',
        color: 'bg-secondary'
    },
    {
        title: 'Join the Institute',
        icon: 'hugeicons:student',
        color: 'bg-primary'
    },

]

const HowItWorks = () => {
    return (
        <div className='max-w-[1536px] mx-auto'>
            <HomeSectionTitle
                text1={'How It '}
                text2={'Works'}
                paragraph={'Know how we work for students'}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {
                    howItWorksData?.map((data, index) =>
                        <div key={index} className="flex flex-col items-center gap-5 p-5 bg-base-100 rounded-2xl group shadow hover:shadow-xl">
                            <div className={`${data.color} p-6 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300`}>
                                <Icon icon={data?.icon} width="48" height="48" style={{ color: "#ffffff" }} />
                            </div>
                            <div className="">
                                <h5 className="text-xl font-bold text-base-content">
                                    {
                                        data?.title
                                    }
                                </h5>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* <Icon icon="lineicons:graduation-cap-1" width="48" height="48"  style={{color: "#ff6a00"}} />
            <Icon icon="pepicons-pencil:handshake" width="48" height="48"  style={{color: "#ff6a00"}} />
            <Icon icon="iconoir:one-finger-select-hand-gesture" width="48" height="48"  style={{color: "#ff6a00"}} />
            <Icon icon="hugeicons:payment-02" width="48" height="48"  style={{color: "#ff6a00"}} />
            <Icon icon="hugeicons:student" width="48" height="48"  style={{color: "#ff6a00"}} /> */}
        </div>
    );
};

export default HowItWorks;