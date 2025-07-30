import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../TopScholarships/TopScholarship';
import AdmissionBanner from '../AdmissinoBanner/AdmissionBanner';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarship></TopScholarship>
            <AdmissionBanner />
        </div>
    );
};

export default HomePage;