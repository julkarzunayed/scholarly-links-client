import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../TopScholarships/TopScholarship';
import AdmissionBanner from '../AdmissinoBanner/AdmissionBanner';
import HowItWorks from '../HowItWorks/HowItWorks';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <TopScholarship></TopScholarship>
            <AdmissionBanner />
        </div>
    );
};

export default HomePage;