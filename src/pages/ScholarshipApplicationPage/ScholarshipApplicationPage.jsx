import React from 'react';
import { useLocation } from 'react-router';

const ScholarshipApplicationPage = () => {
    // const { id } = useParams();
    const location = useLocation();
    const { data } = location.state;

    if (!data?.scholarshipId && !data?.institute_name) {
        return
    }

    return (
        <div className='p-1 pt-8'>
            <div className="font-bold text-2xl">
                Apply to {data.institute_name}
            </div>
        </div>
    );
};

export default ScholarshipApplicationPage;