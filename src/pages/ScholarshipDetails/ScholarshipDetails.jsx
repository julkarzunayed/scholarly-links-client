import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import LoadingPage from '../Loading/LoadingPage';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaMoneyBill1Wave, FaMoneyBillTransfer } from "react-icons/fa6";
import { capitalizeFirstLetter, ISoTimeToDateOnly } from '../../utils/helper';
import { MdOutlineBedroomChild } from 'react-icons/md';
import StarBorder from '../../components/StarBorder/StarBorder';
import StarRatings from '../../components/StarRAtings/StarRatings';
import useAxios from '../../hooks/useAxios';
import ReviewMarquee from './ReviewMarquee';


const textDescription = 'Sit amet consectetur adipisicing elit. Illo aperiam necessitatibus velit commodi, quidem doloribus in dolor perferendis excepturi quas vero recusandae totam accusantium illum assumenda, asperiores esse ducimus minus aspernatur. Eos enim quasi aspernatur reiciendis incidunt quo nesciunt perferendis voluptatum consequuntur libero hic esse voluptatibus est doloremque fuga molestias officiis natus illum, labore deserunt error veniam. Cum ipsa excepturi eum fugiat veritatis quia, quasi nulla est dicta vero accusamus itaque architecto sit facilis provident deserunt. Tempore error expedita totam nulla rem tempora deserunt iure voluptatibus, quos consectetur! Cupiditate eos soluta illo accusamus suscipit eligendi fugiat quasi ipsum esse reprehenderit possimus magnam voluptatibus eaque, optio inventore neque placeat beatae ducimus corrupti ut tempore deleniti enim. Rerum, aperiam nemo. Vero vitae aperiam doloribus quas placeat perferendis distinctio, deserunt culpa! Pariatur ullam aut nesciunt. At natus est saepe vero iusto, quod sit vitae iste, accusamus, deserunt quam rem debitis dolores. Sequi corporis adipisci veniam ipsum architecto, assumenda nemo sint at, libero, distinctio voluptatum praesentium vitae dolore sunt. At harum numquam fugit voluptate, culpa sed delectus laudantium, labore doloremque provident consequuntur iusto sequi velit vel a eveniet molestiae reprehenderit cupiditate debitis? '

const sectionBoxStyle = "p-7 mt-6 rounded-2xl bg-base-100 shadow-[0_0px_20px_2px_rgba(0,0,0,0.15),0_0px_7px_2px_rgba(250,250,250,0.15)]"

//[0_0px_20px_10px_rgba(150,150,150,0.05),0_0px_20px_10px_rgba(200,200,200,0.02)]
// All learge Class 
const {
    sectionTitle,
    boxTitle,
    insiderTitleOne,
} = {
    sectionTitle: "text-5xl font-black font-roboto-slab text-secondary-content  ",
    boxTitle: "font-roboto-slab font-bold text-2xl ",
    insiderTitleOne: "text-2xl mt-1 font-black font-roboto-slab text-secondary-content",
    checkBoxFields: ['aid_and_grants', 'student_loan', 'on_campus_gymnasium', 'divisional_sports_team', 'institute_athletics_association', 'campus_emergency_phones', 'security_patrol_24_hr', 'on_campus_woman_center', 'on_campus_living_facility', 'post_grad_job_placement']
}

const ScholarshipDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const [readMore, setReadMore] = useState(false);
    // console.log(id)
    const { data: scholarship, isLoading, isPending } = useQuery({
        queryKey: ['single_scholarship', id, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship/byId/${id}?userEmail=${user?.email}`);

            return res.data;
        }
    });


    const { data: reviewsData, isLoading: reviewLoading, isPending: reviewPending } = useQuery({
        queryKey: ['review_daat_with_ratings', scholarship?._id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/reviews/average_with_reviews/${scholarship?._id}`)
            return res.data;
        },
        enabled: !!scholarship?._id,
    });

    console.log(reviewsData)


    if (isLoading || isPending) {
        return <LoadingPage />
    }
    const applicationData = {
        fron: location.pathname,
        data: scholarship
    }

    const applicationButton = <div className="text-end">
        <Link
            className=''
            state={applicationData}
            to={`/scholarshipApplicationPage/${scholarship?._id}`}
        >
            <StarBorder
                as="button"
                className=""
                color="cyan"
                speed="4s"
            >
                Apply Now
            </StarBorder>
        </Link>
    </div>
    // console.log(location)
    return (
        <div className='bg-base-200 pb-4'>
            {/* Cover Photo */}
            <div
                className="h-[250px] bg-cover bg-bottom bg-no-repeat "
                style={{
                    backgroundImage: `url(${scholarship?.campus_image})`,
                }}>

            </div>
            {/* Logo */}
            <div className="relative h-7">
                <div
                    className=" w-16 h-16 rounded-lg bg-cover bg-center bg-no-repeat shadow-sm shadow-cyan-100 absolute left-5 -top-10"
                    style={{
                        backgroundImage: `url(${scholarship?.institute_logo})`,
                    }}>

                </div>
            </div>

            <div className="px-4">

                {/* InsTitute Description */}

                <div className={sectionBoxStyle + ` pt-4`}>
                    <div className="flex justify-end">
                        {/* reviewsData?.averageRating */}
                        {
                            (reviewLoading || reviewPending) ? <span className="loading text-amber-500 loading-spinner loading-md"></span> : <StarRatings rating={reviewsData?.averageRating}></StarRatings>
                        }
                    </div>
                    <h2 className={sectionTitle}>
                        {scholarship?.institute_name}
                    </h2>
                    <p className="mt-3 font-semibold text-primary-content">
                        {scholarship?.institute_city}, {scholarship?.institute_country}
                    </p>

                    <p className="mt-6">
                        Read about:
                        <span className='font-roboto font-semibold text-primary-content ml-2 text-xl'>
                            {scholarship?.scholarship_name}
                        </span>
                    </p>

                    {/* Descriptions */}
                    <p className=" text-justify text-lg text-gray-500 mt-2">
                        <span> </span>
                        {
                            readMore ? (scholarship?.description || textDescription) : (scholarship?.description || textDescription).slice('', 1000)
                        }
                        <span
                            className='cursor-pointer font-bold text-blue-600'
                            onClick={() => setReadMore(!readMore)}>
                            . . . . . .
                            {
                                readMore ? ' Read Less' : ' Read More'
                            }
                        </span>
                    </p>
                    {/* Application Button */}
                    {
                        applicationButton
                    }
                </div>

                {/* Admission */}
                <h1 className={sectionTitle + `mt-14 `}>
                    Admission
                </h1>

                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Key Scholarship Stats
                    </h2>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 *:bg-base-200 *:rounded-lg gap-2 *:p-3">
                        <div className="">
                            <p className="text-primary-content">Institute Type</p>
                            <h3 className={insiderTitleOne}>
                                {scholarship?.institute_type || 'Public'}
                            </h3>
                        </div>
                        <div className="">
                            <p className="text-primary-content">Deegree </p>
                            <h3 className={insiderTitleOne}>
                                {capitalizeFirstLetter(scholarship?.degree)}
                            </h3>
                        </div>
                        <div className="">
                            <p className="text-primary-content">Subject of Scholarship</p>
                            <h3 className={insiderTitleOne}>
                                {capitalizeFirstLetter(scholarship?.subject)}
                            </h3>
                        </div>
                        <div className="">
                            <p className="text-primary-content">Scholarship Category</p>
                            <h3 className={insiderTitleOne}>
                                {capitalizeFirstLetter(scholarship?.scholarship_category?.split('_')[0])} {capitalizeFirstLetter(scholarship?.scholarship_category?.split('_')[1])}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Important Deadlines
                    </h2>
                    <div className="mt-6">
                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className='table text-center *:p-0'>
                                <tbody>
                                    <tr className='*:'>
                                        <th>
                                            <span className='font-semibold'>
                                                Posted Date
                                            </span>
                                        </th>
                                        <th>
                                            <span className='font-semibold'>
                                                Application Deadline
                                            </span>
                                        </th>
                                        <th>
                                            <span className='font-semibold'>
                                                Reply Deadline
                                            </span>
                                        </th>
                                    </tr>
                                    <tr className='*: sm:text-lg font-medium '>
                                        <td>
                                            {ISoTimeToDateOnly(scholarship?.posted_at)}
                                        </td>
                                        <td>
                                            <span className="border text-black border-green-200 px-3 py-1 rounded-2xl bg-lime-200">
                                                {ISoTimeToDateOnly(scholarship?.application_deadline)}
                                            </span>
                                        </td>
                                        <td>
                                            {scholarship?.reply_deadline || null}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <h1 className={sectionTitle + `mt-14 `}>
                    Tution, Cost & Aid
                </h1>

                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Key Financial Stats
                    </h2>

                    <div className="mt-6 grid md:grid-cols-2 gap-3">
                        <div className="">
                            <p className="">ESTIMATED TOTAL COST</p>
                            <h1 className="text-6xl font-bold font-roboto-slab">
                                $
                                {
                                    Number(scholarship?.application_fee) + Number(scholarship?.service_charge) + Number(scholarship?.tuition_fees)
                                }
                            </h1>
                        </div>
                        <div className=" overflow-x-auto rounded-box ">
                            <table className='table *:p-0'>
                                <tbody>
                                    <tr className='*:'>
                                        <th>
                                            <span className='font-semibold'>
                                                TUTION
                                            </span>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                    <tr className=' sm:text-lg font-medium '>
                                        <td>
                                            Tution Fee
                                        </td>
                                        <td className='font-semibold font-roboto-slab'>
                                            $ {scholarship?.tuition_fees}
                                        </td>
                                    </tr>
                                    <tr className=' sm:text-lg font-medium '>
                                        <td>
                                            Application Fee
                                        </td>
                                        <td className='font-semibold font-roboto-slab'>
                                            $ {scholarship?.application_fee}
                                        </td>
                                    </tr>
                                    <tr className=' sm:text-lg font-medium '>
                                        <td>
                                            Service Charge
                                        </td>
                                        <td className='font-semibold font-roboto-slab'>
                                            $ {scholarship?.service_charge}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Aid & Grants
                    </h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-5">
                        <div className="flex gap-4 flex-col items-center justify-center">
                            <p className="">Students Receiving Gift Aid</p>
                            {
                                scholarship?.aid_and_grants ?
                                    <FaRegCheckCircle className='text-cyan-500' size={60} />
                                    :
                                    <FaRegTimesCircle color='gray' size={60} />
                            }
                        </div>
                        <div className="flex  flex-col items-center justify-center gap-4">
                            <p className="">Students Receiving Grants</p>
                            {
                                scholarship?.aid_and_grants ?
                                    <FaRegCheckCircle className='text-cyan-500' size={60} />
                                    :
                                    <FaRegTimesCircle color='gray' size={60} />
                            }
                        </div>
                    </div>
                </div>

                {/* Student Loans */}
                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Student Loans
                    </h2>
                    <hr className='border-t mt-1 border-gray-300' />
                    <div className="mt-6 grid sm:grid-cols-2 gap-5">
                        <div className="flex  flex-col items-center justify-center">
                            <FaMoneyBillTransfer size={80} />
                        </div>
                        <div className="flex  flex-col items-center justify-center gap-4">
                            <p className="">Students Borrowing Loans</p>
                            {
                                scholarship?.aid_and_grants ?
                                    <FaRegCheckCircle className='text-cyan-500' size={60} />
                                    :
                                    <FaRegTimesCircle color='gray' size={60} />
                            }
                        </div>
                    </div>
                    {/* Application Button */}
                    {
                        applicationButton
                    }
                </div>


                <h1 className={sectionTitle + `mt-14 `}>
                    Campus Life
                </h1>
                {/* Athletics */}
                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Athletics
                    </h2>
                    <div className="mt-6 grid md:grid-cols-3 gap-5">
                        <div className="flex gap-4 flex-col items-center justify-center">
                            <p className="">ON-CAMPUS GYMNASIUM</p>
                            {
                                scholarship?.on_campus_gymnasium ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                        <div className="flex  flex-col items-center justify-center gap-4">
                            <p className="">DIVISIONAL SPORTS TEAM</p>
                            {
                                scholarship?.divisional_sports_team ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                        <div className="flex  flex-col items-center justify-center gap-4">
                            <p className="">INSTITUTE ATHLETICS ASSOCIATION</p>
                            {
                                scholarship?.institute_athletics_association ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                    </div>
                </div>

                {/* Campass Safty */}
                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Campus Safety
                    </h2>
                    <div className="mt-6 grid md:grid-cols-3 gap-5">
                        <div className="flex gap-4 flex-col items-center justify-center">
                            <p className="">ON-CAMPUS WOMAN CENTER</p>
                            {
                                scholarship?.on_campus_woman_center ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                        <div className="flex  flex-col items-center justify-center gap-4">
                            <p className="">24-HR SECURITY PATROL</p>
                            {
                                scholarship?.security_patrol_24_hr ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                        <div className="flex  flex-col items-center justify-center gap-4">
                            <p className="">CAMPUS EMARGENCY PHONES</p>
                            {
                                scholarship?.campus_emergency_phones ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                    </div>
                </div>

                {/* Housing */}
                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Housing
                    </h2>
                    <div className="mt-6 grid md:grid-cols-2 gap-5">
                        <div className="flex items-center justify-center ">
                            <MdOutlineBedroomChild size={100} />
                        </div>
                        <div className="flex gap-3 flex-col items-center justify-center">
                            <p className="">ON-CAMPUS LIVING FACILITY</p>
                            {
                                scholarship?.on_campus_living_facility ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                    </div>
                </div>

                <h1 className={sectionTitle + `mt-14 `}>
                    After Graduation
                </h1>

                <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>
                        Post Grad Stats
                    </h2>
                    <div className="mt-6 grid md:grid-cols-3 gap-5">
                        <div className="flex gap-3 flex-col items-center justify-center">
                            <p className="">POST GRAD JOB PLACEMENT TEAM</p>
                            {
                                scholarship?.post_grad_job_placement ?
                                    <FaRegCheckCircle className='text-cyan-500' size={50} />
                                    :
                                    <FaRegTimesCircle color='gray' size={50} />
                            }
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center md:col-span-2">
                            <p className="">POST GRAD AVARAGE SALARY</p>
                            <span className='font-extrabold text-7xl font-roboto-slab'>
                                ${
                                    scholarship?.salary_range || '73000'
                                }
                            </span>

                        </div>
                    </div>
                    {/* Application Button */}
                    {
                        applicationButton
                    }
                </div>

                <h1 className={sectionTitle + `mt-14 `}>
                    What Students Are Saying
                </h1>

                {/* <div className={sectionBoxStyle}>
                    <h2 className={boxTitle}>

                    </h2>
                    <div className="mt-6">

                        'aid_and_grants', 'student_loan', 'on_campus_gymnasium', 'divisional_sports_team', 'institute_athletics_association',

                        'campus_emergency_phones', 'security_patrol_24_hr', 'on_campus_woman_center',

                        'on_campus_living_facility',

                        'post_grad_job_placement'
                    </div>
                </div> */}


                <div className={`p- mt-6 rounded-2xl bg-base-100`}>
                    <ReviewMarquee reviews={reviewsData?.reviews}>

                    </ReviewMarquee>

                </div>
            </div>


        </div>
    );
};

export default ScholarshipDetails;