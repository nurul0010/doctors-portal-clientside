import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheackoutForm from './CheackoutForm';


const stripePromise = loadStripe('pk_test_51JxP6BKOMrbggM3ffUpsBsRr74wYunh4Nn12pEUvPiNVwdBbJgh9u75bSguoa7ZGYAYXpWYgVJ1iJbQyDOtIgVcv00OfhOOTfg');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState();

    useEffect(() => {
        fetch(`http://localhost:7000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])
    return (
        <div>
            <h3>this is payment section for {appointmentId}</h3>
            Pay ${appointment?.price};

            {appointment?.price && <Elements stripe={stripePromise}>
                <CheackoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;