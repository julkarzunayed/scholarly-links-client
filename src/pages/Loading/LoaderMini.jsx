import React from 'react';
import { TbCircleDashed } from "react-icons/tb";

const LoaderMini = () => {
    return (
        <div className=''>
            <TbCircleDashed className='animate-spin text-green-600' size={50}/>
        </div>
    );
};

export default LoaderMini;