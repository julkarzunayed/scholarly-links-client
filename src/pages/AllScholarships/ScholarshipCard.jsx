import React from 'react';
import { capitalizeFirstLetter, ISoTimeToDateOnly } from '../../utils/helper';

const ScholarshipCard = ({ scholarship }) => {
    console.log(scholarship)
    return (
        <div className='rounded-2xl shadow-[0_0px_15px_10px_rgba(150,150,150,0.1),0_0px_20px_10px_rgba(50,50,50,0.06)] hover:shadow-[0_0px_15px_5px_rgba(100,200,200,0.3),0_0px_20px_8px_rgba(50,200,200,0.2)]'>
            <div
                className="h-[170px] bg-cover bg-bottom bg-no-repeat rounded-t-2xl"
                style={{
                    backgroundImage: `url(${scholarship?.campus_image})`,
                }}>

            </div>
            <div className="p-4">
                <div className="relative h-7">
                    <div
                        className=" w-16 h-16 rounded-lg bg-cover bg-center bg-no-repeat shadow-sm shadow-cyan-100 absolute left-1 -top-14"
                        style={{
                            backgroundImage: `url(${scholarship?.institute_logo})`,
                        }}>

                    </div>
                </div>
                <div className="">
                    <h2 className="text-3xl font-bold font-playfair-display">
                        {scholarship?.institute_name}
                    </h2>
                    <p className="text-gray-500 font-semibold">
                        {scholarship?.institute_city}, {scholarship?.institute_country}
                    </p>
                </div>
                <p className="flex mt-3">
                    <span className='font-semibold'>
                        {capitalizeFirstLetter(scholarship?.scholarship_category?.split('_')[0])} {scholarship?.scholarship_category?.split('_')[1]}
                    </span> <span className='border-l mx-2'></span> {scholarship?.scholarship_name}
                </p>
                <hr className='border-t border-base-300 my-2' />
                <div className="mt-4 flex justify-between">
                    <span className='font-semibold'>Application Deadline: </span>
                    <span className="border text-black border-green-200 px-3 py-1 rounded-2xl bg-lime-200">
                        {ISoTimeToDateOnly(scholarship?.application_deadline)}
                    </span>
                </div>
                <div className="divider mb-1 border-b-0">Fees</div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className='table text-center *:p-0'>
                        <tbody>
                            <tr className='*:p-1'>
                                <th>
                                    <span className='font-semibold'>Application Fees: </span>
                                </th>
                                <th>
                                    <span className='font-semibold'>Tuition Fees: </span>
                                </th>
                            </tr>
                            <tr className='*:p-0.5 text-lg font-bold '>
                                <td>
                                    {scholarship?.application_fee} $
                                </td>
                                <td>
                                    {scholarship?.tuition_fees} $
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-2">
                    <button className='w-full border border-gray-400 rounded-lg text-lx font-bold font-roboto p-2 hover:bg-gray-600 hover:text-gray-50'>
                        Will you get accepted?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipCard;