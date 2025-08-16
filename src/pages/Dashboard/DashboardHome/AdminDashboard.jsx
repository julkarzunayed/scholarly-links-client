import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingPage from '../../Loading/LoadingPage';
import { FaFileContract, FaFileSignature, FaGraduationCap, FaStar } from 'react-icons/fa';
import { GiMoneyStack } from "react-icons/gi";
import { IoSchoolSharp } from 'react-icons/io5';
import { GrFormAdd, GrTransaction } from 'react-icons/gr';
import { FaFaceGrinStars, FaMoneyBill1Wave } from 'react-icons/fa6';

const AdminDashboard = () => {
    ///users/admin
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: adminData, isLoading, isPending } = useQuery({
        queryKey: ['amin_dashboard_data', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin?userEmail=${user?.email}`);
            return res.data;
        },

        enabled: !!user || !authLoading
    })

    if (isLoading || isPending) {
        return <LoadingPage />
    }

    console.log(adminData)
    const adminPanelData = [
        {
            id: 1,
            title: 'Total Scholarships',
            data: adminData?.total_scholarships,
            icon: <FaGraduationCap />
        },
        {
            id: 2,
            title: 'Total Applications',
            data: adminData?.total_applications,
            icon: <FaFileContract />
        },
        {
            id: 3,
            title: 'Total Payments',
            data: adminData?.total_payment_history,
            icon: <GiMoneyStack />
        },
        {
            id: 4,
            title: 'Total Reviews',
            data: adminData?.total_reviews,
            icon: <FaStar />
        },
        {
            id: 5,
            title: 'My Added Scholarships',
            data: adminData?.user_added_scholarships,
            icon: <span className="relative">
                <IoSchoolSharp className="inline-block mr-2 text-5xl" />
                <GrFormAdd size={36} className='absolute -bottom-4 -right-3 text-orange-500' />
            </span>
        },
        {
            id: 6,
            title: 'My applied Scholarships',
            data: adminData?.user_applications,
            icon: <FaFileSignature />
        },
        {
            id: 7,
            title: 'My Reviews',
            data: adminData?.user_reviews,
            icon: <FaFaceGrinStars />
        },
        {
            id: 8,
            title: 'My Payed Amount',
            data: adminData?.payment_amount?.totalAmount,
            icon: <FaMoneyBill1Wave />
        },
        {
            id: 9,
            title: 'My Total Transactions',
            data: adminData?.payment_amount?.totalTransactions,
            icon: <GrTransaction />
        },
    ]

    return (
        <div className='p-4 pt-10'>
            <h1 className="text-center font-bold text-3xl ">Admin Panel</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 text-center gap-4 ">
                {
                    adminPanelData?.map(data =>
                        <div
                            key={data?.id}
                            className="border p-3 border-base-300 rounded-2xl bg-base-200">
                            <h1 className="font-bold text-7xl flex gap-2.5 items-center justify-center">
                               <span className='text-5xl'>{data?.icon}</span> {data?.data}
                            </h1>
                            <h4 className="font-bold text-lg">
                                {data?.title}
                            </h4>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AdminDashboard;