import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../Loading/LoadingPage';
import { TiPhoneOutline } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { ISoTimeToDate } from '../../../utils/helper';
import Swal from 'sweetalert2';
import { GiEmptyMetalBucketHandle, GiEmptyWoodBucketHandle } from "react-icons/gi";

const PendingPublishersApplications = () => {
    const axiosInstance = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const queryClient = useQueryClient()

    const { data: publishersData, isLoading, isPending } = useQuery({
        queryKey: ['pending_publishers_application', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/publishers/application_check?userEmail=${user?.email}&status=pending`)

            if (res.status === 204) {
                return [];
            }

            return res.data;
        },
        enabled: !authLoading && !!user?.email,

    });

    const { mutateAsync: updatePublisherApplication } = useMutation({
        mutationFn: async ({ email, status }) => {
            const res = await axiosInstance.patch(`/publishers/apply?email=${email}`, {
                status: status,
            });

            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries([
                'pending_publishers_application',
                'approved_publishers_application',
                'rejected_publishers_application'
            ])
        }
    })

    const handleTakeAction = (email) => {
        console.log(email)
        Swal.fire({
            icon: 'question',
            title: "Do you want to <strong>approve</strong> apply <br/> or <strong>Reject</strong> ?",
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'X',
            confirmButtonText: "Approve",
            denyButtonText: `Reject`
        }).then(async (result) => {
            // check chosen option
            if (result.isConfirmed) {
                const result = await updatePublisherApplication(
                    { email, status: 'approved' }
                )
                console.log('Approved', result)
                if (result.modifiedCount) {
                    const res = await axiosInstance.patch(`/users?email=${email}`, {
                        role: 'publisher',
                    })
                    console.log(res.data);
                    if (res.data.modifiedCount) {
                        Swal.fire({
                            title: "Approved!",
                            text: "Application Approved successfully!",
                            icon: "info"
                        });
                    }

                }
            } else if (result.isDenied) {
                const result = await updatePublisherApplication(
                    { email, status: 'rejected' }
                )
                console.log(result)
                if (result.modifiedCount) {
                    Swal.fire({
                        title: "Rejected!",
                        text: "Application Rejected successfully!",
                        icon: "warning"
                    });
                }
            }
        });
    }

    if (isLoading || isPending) {
        return <LoadingPage />
    }


    return (
        <div className="overflow-x-auto pt-10 p-1 ">
            <h1 className="text-center mb-3 text-4xl font-bold font-playfair-display">
                Publisher Applications
            </h1>
            {
                publishersData?.length !== 0 ?
                    <div className="overflow-x-auto">
                        <table className="table min-w-4xl">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Name</th>
                                    <th>Institute</th>
                                    <th>Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    publishersData?.map((publisher, index) => <tr className={`${index % 2 === 0 || 'bg-base-300'}`}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={publisher?.photo_url
                                                            }
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {publisher?.name}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        <span className='font-semibold'>Status: </span>
                                                        <span className="border border-blue-300 text-gray-800 font-semibold bg-blue-200 py-0.5 px-3 rounded-2xl">
                                                            {publisher?.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {publisher?.institute_name}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">
                                                Created at: {ISoTimeToDate(publisher?.applied_at)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className='flex items-center gap-1.5'>
                                                <HiOutlineMail /> {publisher?.email}
                                            </span>
                                            <span className="badge badge-ghost badge-sm">
                                                <TiPhoneOutline /> {publisher?.phone_number}
                                            </span>
                                        </td>
                                        <th>
                                            <button
                                                onClick={() => handleTakeAction(publisher?.email)}
                                                className="btn btn-primary btn-sm text-lg">
                                                Action
                                            </button>
                                        </th>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="h-[50vh] flex items-center justify-center">
                        <div className="text-center flex justify-center items-center flex-col">
                            <GiEmptyWoodBucketHandle className='animate-bounce text-orange-700 mb-2' size={55} />
                            <h2 className="text-2xl  font-roboto text-green-700">
                                No Publisher Application Pending
                            </h2>
                            {/* <button className="btn btn-primary">
                                Back to Home
                            </button> */}
                        </div>

                    </div>
            }
        </div>
    );
};

export default PendingPublishersApplications;