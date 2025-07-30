import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link, useParams } from 'react-router';
import LoadingPage from '../../Loading/LoadingPage';
import { capitalFirstLatterAllWord, capitalizeFirstLetter, ISoTimeToDate } from '../../../utils/helper';
import { IoMail } from 'react-icons/io5';
import { FaEye, FaPhoneFlip } from 'react-icons/fa6';
import { TbGenderBigender } from "react-icons/tb";
import { FaFemale, FaMale, FaRegEdit } from 'react-icons/fa';
import NoResultFound from '../../../components/NoResultFound/NoResultFound';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FcApproval } from 'react-icons/fc';

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [degree, setDegree] = useState('');
    // console.log(id)

    searchTerm
    degree

    const { data: applications, isLoading, isPending, refetch } = useQuery({
        queryKey: ['application_of_scholarship', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/byScholarship/${id}?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });


    if (isLoading || isPending) {
        return <LoadingPage />
    }

    const handelViewDetails = (application) => {
        // Construct the HTML content for the SweetAlert2 modal
        const htmlContent = `
        <div class="rounded-xl  p-3 pt-6">
            <div class="flex items-center">
                <div class="avatar mx-auto">
                    <div
                        title="${application?.name || ''}"
                        style="background-image: url(${application?.photo || 'https://placehold.co/100x100/cccccc/333333?text=No+Image'});"
                        class="ring-primary ring-offset-base-100 w-28 rounded-full ring-2 ring-offset-2 bg-cover bg-center bg-no-repeat">
                    </div>
                </div>
            </div>
            <div class="text-center mt-6 flex flex-col items-center justify-center gap-0.5" >
                <h4 class="font-bold text-2xl">
                    ${application?.name || 'N/A'}
                </h4>
                <p class="flex items-center justify-center gap-3">
                    <strong> Email: </strong> ${application?.email || 'N/A'}
                </p>
                <p class="flex items-center justify-center gap-3">
                   <strong> Phone: </strong> ${application?.phone_number || 'N/A'}
                </p>
            </div>
            <div class="divider m-3">Application</div>
            <div class="flex justify-between items-center px-2">
                <span>
                    ${ISoTimeToDate(application?.applying_date)}
                </span>
                <span class="badge ${application?.payment_status === 'not_paid' ? 'badge-warning' : 'badge-success'} flex items-center">
                    ${capitalizeFirstLetter(application?.payment_status || 'N/A')}
                </span>
            </div>
            <div class="divider m-2">Result</div>
            <div class="flex justify-between px-6 items-center">
                <div>
                    <span class='font-bold mr-2'>SSC:</span>
                    <span>
                        ${application?.ssc_result || 'N/A'}
                    </span>
                </div>
                <div>
                    <span class='font-bold mr-2'>HSC:</span>
                    <span>
                        ${application?.hsc_result || 'N/A'}
                    </span>
                </div>
            </div>
            <div class="divider m-2">Additional Info</div>
            <div class="grid grid-cols-2 items-center justify-between">
                <div class="flex gap-0.5 items-center text-xl">
                   <strong> Gender: </strong> 
                    <span class=''>
                        ${application?.gender === 'female' ? 'Female' : 'Male'}
                    </span>
                </div>
                <div class="text-center">
                    Applied Degree:
                    <br />
                    <span class="font-bold text-lg">
                        ${capitalizeFirstLetter(application?.applying_degree || 'N/A')}
                    </span>
                </div>
            </div>
            <div class="divider m-2"></div>
            <div class="">
                ${application?.address || 'N/A'}, ${application?.country || 'N/A'}
            </div>
        </div>
    `;

        Swal.fire({
            title: 'Application Details',
            html: htmlContent,
            showConfirmButton: true,
            confirmButtonText: 'Close',
            customClass: {
                container: 'my-swal-container',
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                htmlContainer: 'my-swal-html-container',
            },
            width: 'auto',
        });
    };


    //status

    const handleFeedback = (application, status) => {
        // console.log(application)
        Swal.fire({
            title: `${status === 'approved' ? 'Approve' : 'Reject'} ${application?.name}`,
            // showDenyButton: true,
            showCancelButton: true,
            icon: `${status === 'approved' ? 'info' : 'warning'}`,
            confirmButtonText: `${status === 'approved' ? 'Approve' : 'Reject'}`,
            confirmButtonColor: `${status === 'approved' ? 'green' : 'red'}`,
            cancelButtonText: 'X',
            // denyButtonText: `Don't save`,
            input: "textarea",
            inputLabel: `Feedback`,
            inputPlaceholder: "Type Your Feedback here...",
            inputAttributes: {
                "aria-label": "Type Your Feedback here"
            },
            inputValidator: (value) => {
                if (!value) {
                    return "You need to Add a feedback!";
                }
            }
        }).then(async (result) => {
            // console.log(result)
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/application/byId/${application?._id}?userEmail=${user?.email}`,
                    {
                        status: status,
                        feedback: result?.value,
                        status_updated_at: new Date().toISOString(),
                    }
                )

                console.log(res);

                if (res.data?.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${status === 'approved' ? 'Approve' : 'Reject'}`,
                        text: "Your Request completed success fully",
                        icon: "success"
                    });
                }
                // Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }


    // console.log(searchTerm, degree)

    return (
        <div className='p-2'>
            <div className="p-2  flex flex-col sm:flex-row gap-2 justify-between items-center mt-2">
                <h1 className=""></h1>
                <h2 className="text-xl sm:text-3xl font-bold">
                    All applications
                </h2>
                <div className="join  min-w-xs">
                    <div>
                        <label className="input join-item">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                                type="text"
                                placeholder="Scholarship or University name"
                                required />
                        </label>
                        <div className="-hint hidden">Enter valid email address</div>
                    </div>
                    <select
                        onChange={(e) => { setDegree(e.target.value) }}
                        defaultValue=""
                        className="border border-gray-300 join-item max-w-[100px] px-0.5 select me-0 ">
                        <option value='' disabled={true}>Status</option>
                        <option value=''>All</option>
                        <option value='diploma'>Rejected</option>
                        <option value='bachelor'>Approved</option>
                    </select>
                </div>

            </div>

            {
                (!isLoading && !isPending)
                    ?
                    <div className="">
                        {
                            applications?.length !== 0 ?
                                <div className="">
                                    <div className="overflow-x-auto border border-base-content/5">
                                        <table className="table table-zebra min-w-4xl">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    {/* <th>#</th> */}
                                                    <th>Applicant Name</th>
                                                    <th>Scholarship</th>
                                                    <th>Results</th>
                                                    <th>Feedback</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    applications?.map(application => <tr
                                                        className='*: *:px-1 *:py-3 *:'
                                                        key={application?._id}>
                                                        {/* <th>1</th> */}
                                                        <td className='flex items-center gap-4'>
                                                            <div className="flex items-center">
                                                                <div className="avatar mx-auto">
                                                                    <div
                                                                        title={application?.name}
                                                                        // className="hidden sm:block border-[1px] border-blue-300 rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat"
                                                                        style={{
                                                                            backgroundImage: `url(${application?.photo})`,
                                                                        }}
                                                                        className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2 bg-cover bg-center bg-no-repeat">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center *:flex *:items-center *:justify-start *:gap-2 space-y-0.5" >
                                                                <h4 className="font-bold ">
                                                                    {application?.name}
                                                                </h4>
                                                                <p className="">
                                                                    <IoMail /> {application?.email}
                                                                </p>
                                                                <p className="">
                                                                    <FaPhoneFlip /> {application?.phone_number}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className='font-bold'>Payment: </span>
                                                            <span
                                                                className={
                                                                    `badge  ${application?.payment_status === 'not_paid' ? 'badge-warning' : 'badge-info'}`
                                                                }>
                                                                {capitalFirstLatterAllWord(application?.payment_status || 'not_paid')}
                                                            </span>
                                                            {capitalizeFirstLetter(application?.applied_subject)} ; <br />
                                                            <span className='font-bold'>Degree: </span> <span> </span>
                                                            {capitalizeFirstLetter(application?.applying_degree)}
                                                            <br />
                                                            <Link
                                                                to={`/scholarshipDetails/${application?.scholarship_id
                                                                    }`}
                                                                className="link">
                                                                More about Scholarship
                                                            </Link>
                                                        </td>
                                                        {/* ---------Result---------------- */}
                                                        <td>

                                                            <div className="">
                                                                <span className='font-bold mr-2'>SSC:</span>
                                                                <span className="">
                                                                    {application?.ssc_result}
                                                                </span>
                                                            </div>
                                                            <div className="">
                                                                <span className='font-bold mr-2'>HSC:</span>
                                                                <span className="">
                                                                    {application?.hsc_result}
                                                                </span>
                                                            </div>

                                                        </td>
                                                        {/* ---------Feedback----------------- */}
                                                        <td>
                                                            {
                                                                application?.feedback ?
                                                                    <div className="">
                                                                        <p className="text-xs max-w-[250px] ">
                                                                            {application?.feedback}
                                                                        </p>
                                                                    </div>
                                                                    :
                                                                    <div className="">
                                                                        No Feedback added
                                                                    </div>
                                                            }



                                                        </td>
                                                        {/* --------Action buttons -------------- */}
                                                        <td className='p-0'>
                                                            <div className="pt- h-full p-0.5  flex flex-col justify-center items-center gap-0.5  *:border *:border-base-300 *:shadow-xs *:flex *:justify-center *:gap-2 *:p-0.5 *:px-4 *:w-full text-xl *:rounded-sm *:hover:bg-base-300">
                                                                <button
                                                                    className=''
                                                                    onClick={() => handelViewDetails(application)}
                                                                >
                                                                    <FaEye color='green' />
                                                                </button>
                                                                {
                                                                    application?.status === 'approved' ||
                                                                    <button onClick={() => handleFeedback(application, 'approved')} className='' title='Edit application'>
                                                                        <FcApproval className='text-orange-600' />
                                                                        <span className="text-[17px]">
                                                                            Approve
                                                                        </span>

                                                                    </button>
                                                                }

                                                                {
                                                                    application?.status === 'rejected' ||
                                                                    <button onClick={() => handleFeedback(application, 'rejected')} title='Reject Application' className='text-orange-600'>
                                                                        <MdOutlineCancelPresentation />
                                                                        <span className="text-[17px]">
                                                                            Reject
                                                                        </span>
                                                                    </button>
                                                                }

                                                            </div>
                                                        </td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <NoResultFound />
                        }
                    </div>
                    :

                    <NoResultFound />
            }
            {
                // (!isLoading && !isPending) ?
                //     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">

                //         {/* cards */}
                //         {applications?.map(application =>
                //             <div
                //                 key={application?._id}
                //                 className="rounded-xl shadow-[0_0px_15px_10px_rgba(150,150,150,0.1),0_0px_20px_10px_rgba(50,50,50,0.06)] p-3 pt-6">
                //                 <div className="flex items-center">
                //                     <div className="avatar mx-auto">
                //                         <div
                //                             title={user?.displayName}
                //                             // className="hidden sm:block border-[1px] border-blue-300 rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat"
                //                             style={{
                //                                 backgroundImage: `url(${application?.photo})`,
                //                             }}
                //                             className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 bg-cover bg-center bg-no-repeat">

                //                         </div>
                //                     </div>
                //                 </div>
                //                 <div className="text-center mt-6 *:flex *:items-center *:justify-center *:gap-3 space-y-0.5" >
                //                     <h4 className="font-bold text-2xl">
                //                         {application?.name}
                //                     </h4>
                //                     <p className="">
                //                         <IoMail /> {application?.email}
                //                     </p>
                //                     <p className="">
                //                         <FaPhoneFlip /> {application?.phone_number}
                //                     </p>
                //                 </div>
                //                 <div className="divider  m-3">Application</div>
                //                 <div className="flex justify-between items-center px-2">
                //                     <span>
                //                         {ISoTimeToDate(application?.applying_date)}
                //                     </span>
                //                     <span className={
                //                         `badge  ${application?.payment_status === 'not_paid' ? 'badge-warning' : 'badge-success'} flex items-center`
                //                     }>
                //                         {capitalizeFirstLetter(application?.payment_status)}
                //                     </span>
                //                 </div>
                //                 <div className="divider m-2">Result</div>
                //                 <div className="flex justify-between px-6 items-center">
                //                     <div className="">
                //                         <span className='font-bold mr-2'>SSC:</span>
                //                         <span className="">
                //                             {application?.ssc_result}
                //                         </span>
                //                     </div>
                //                     <div className="">
                //                         <span className='font-bold mr-2'>HSC:</span>
                //                         <span className="">
                //                             {application?.hsc_result}
                //                         </span>
                //                     </div>
                //                 </div>
                //                 <div className="divider m-2">Additional Info</div>
                //                 <div className=" grid grid-cols-2  items-center justify-between">
                //                     <div className="flex gap-0.5 items-center text-3xl">
                //                         <TbGenderBigender /> :
                //                         <span className=''>
                //                             {application?.gender === 'female' ? <FaFemale /> : <FaMale />}
                //                         </span>
                //                     </div>
                //                     <div className="text-center">
                //                         Applied Degree:
                //                         <br />
                //                         <span className="font-bold text-lg">
                //                             {capitalizeFirstLetter(application?.applying_degree)}
                //                         </span>
                //                     </div>
                //                 </div>
                //                 <div className="divider m-2"></div>
                //                 <div className="">
                //                     {application?.address}, {application?.country}
                //                 </div>
                //                 <div className="">

                //                 </div>
                //             </div>)}
                //     </div>
                //     :

                //     <NoResultFound />
            }

        </div>
    );
};

export default ManageApplications;