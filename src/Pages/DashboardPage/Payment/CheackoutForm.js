import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import { CircularProgress } from '@mui/material';

const CheackoutForm = ({ appointment }) => {

    const { user } = useAuth();

    const [error, setError] = useState('');
    const [clientSecrect, setClientSecrect] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        console.log(appointment?.price)
        fetch('http://localhost:7000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment?.price)
        })
            .then(res => res.json())
            .then(data => setClientSecrect(data.clientSecrect))
    }, [appointment?.price]);

    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        setProcessing(true);
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
            setSuccess('');
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // payment intent 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecrect,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name,
                        email: user?.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('your payment procceed successfully')
            console.log(paymentIntent);
            setProcessing(false);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                {processing ? <CircularProgress /> : <button type="submit" disabled={!stripe}>
                    Pay ${appointment?.price}
                </button>}
            </form>
        </div>
    );
};

export default CheackoutForm;