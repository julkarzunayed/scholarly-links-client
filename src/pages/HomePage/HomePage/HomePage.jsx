import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../TopScholarships/TopScholarship';
import AdmissionBanner from '../AdmissinoBanner/AdmissionBanner';
import HowItWorks from '../HowItWorks/HowItWorks';
import StudentsReviews from '../StudentsReviews/StudentsReviews';
import SubscribeUs from '../SubscribeUs/SubscribeUs';

const HomePage = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <TopScholarship></TopScholarship>
            <AdmissionBanner />
            <StudentsReviews />
            <SubscribeUs />
        </div>
    );
};

export default HomePage;