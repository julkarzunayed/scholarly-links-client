import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../TopScholarships/TopScholarship';
import AdmissionBanner from '../AdmissinoBanner/AdmissionBanner';
import HowItWorks from '../HowItWorks/HowItWorks';
import StudentsReviews from '../StudentsReviews/StudentsReviews';
import SubscribeUs from '../SubscribeUs/SubscribeUs';
import InstitutionsCTA from './InstitutionsCTA/InstitutionsCTA';
import FeaturedAlumniSpotlights from '../FeaturedAlumniSpotlights/FeaturedAlumniSpotlights';
import FeaturedInstitutions from '../FeaturedInstitutions/FeaturedInstitutions';

const HomePage = () => {
    return (
        <div className=''>
            <div className="px-2 lg:px-3.5">
                <Banner></Banner>
                <HowItWorks></HowItWorks>
                <TopScholarship></TopScholarship>
                <FeaturedInstitutions />
                <AdmissionBanner />
            </div>
            <FeaturedAlumniSpotlights />
            <div className="px-2 lg:px-3.5">
                <InstitutionsCTA />
                <StudentsReviews />
                <SubscribeUs />
            </div>
        </div>
    );
};

export default HomePage;