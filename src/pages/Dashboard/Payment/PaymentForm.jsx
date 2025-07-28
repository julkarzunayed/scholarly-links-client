import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../Loading/LoadingPage';
import Error from '../../Error/Error';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { scholarshipId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [cardError, setCardError] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);

    const location = useLocation();
    const application = location.state?.application;
    console.log(location)

    const { data: scholarship = [], isLoading, isError } = useQuery({
        queryKey: ['scholarship_to_pay', scholarshipId, user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship/byId/${scholarshipId}?userEmail=${user?.email}`);
            return res.data;
        },
        enabled: !loading && !!user?.email,
    })

    if (isError) {
        return <Error />
    }

    if (isLoading) {
        return <LoadingPage />
    }

    const amount = scholarship?.application_fee;
    const amountInCents = parseInt(amount) * 100;

    const handlePaymentSubmit = async (e) => {
        setPaymentLoading(true);
        e.preventDefault();
        if (!stripe || !elements) {
            setPaymentLoading(false);
            return;
        }

        if (!application) {
            setPaymentLoading(false);
            return
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            setPaymentLoading(false);
            return;
        }

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            setCardError(paymentError.message);
            console.log('Error', paymentError)
            setPaymentLoading(false);
            return;
        } else {
            setCardError('');
            console.log('paymentMethod', paymentMethod);
        }

        // step -- 02 
        const paymentRes = await axiosSecure.post(`/create-checkout-session`, {
            amountInCents,
            scholarshipId,
        });

        console.log(paymentRes.data);
        const clientSecret = await paymentRes.data?.clientSecret;
        // step -- 03
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                }
            }
        });

        console.log(result);

        if (result.error) {
            console.log(result.error.message);
            setPaymentLoading(false);

        } else {
            if (result.paymentIntent.status === 'succeeded') {
                // console.log('payment succeeded');
                // console.log()

                const paymentData = {
                    scholarship_id: scholarshipId,
                    email: user.email,
                    amount,
                    application_id: application._id,
                    transaction_id: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    payed_at: new Date().toISOString(),
                }

                console.log('Payment data', paymentData)

                // Payment succeeded All data update here

                const dbResult = await axiosSecure.post(`/payments`, paymentData);

                console.log(dbResult)

                if (dbResult.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Succeeded",
                        html: `
                        Transaction ID: <b>${result.paymentIntent.id}</b>
                        
                        `,
                        text: dbResult.data.message,
                        showConfirmButton: true,
                    });
                    setPaymentLoading(false);
                    navigate('/dashboard/myAppliedScholarships')
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Some error occurred in payment",
                        html: `
                        Transaction ID: <b>${result.paymentIntent.id}</b>
                        <br/>
                        Contact our  <b>Teem </b>
                        `,
                        // text: paymentRes.data.message,
                        showConfirmButton: true,
                    });
                    setPaymentLoading(false);
                }

            }
        }

    }

    // console.log(amount, amountInCents)
    return (
        <div>
            <form
                onSubmit={handlePaymentSubmit}
                className='space-y-4 mt-6 bg-base-300 p-6 rounded-xl shadow-accent shadow-md w-full max-w-md mx-auto '
            >
                <CardElement />
                <p className="text-red-500">{cardError}</p>
                <button
                    role='submit'
                    disabled={paymentLoading}
                    className="btn btn-primary text-base-content w-full">
                    Pay ${amount} {paymentLoading && <span className="loading text-primary loading-spinner loading-sm"></span>}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;