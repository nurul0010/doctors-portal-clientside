import React, { useState } from 'react';
import Booking from '../Booking/Booking';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AvailableAppointment = ({ date }) => {

    const [bookingSuccess, setBookingSuccess] = useState(false);

    const bookings = [
        {
            id: 1,
            name: 'Teeth Orthodonics',
            time: '08.00 AM - 09.00 AM',
            space: 10,
            price: 62
        },
        {
            id: 2,
            name: 'Cosmetic Dentistry',
            time: '09.00 AM - 10.00 AM',
            space: 8,
            price: 80
        },
        {
            id: 3,
            name: 'Teeth Cleaning',
            time: '10.00 AM - 11.00 AM',
            space: 9,
            price: 28
        },
        {
            id: 4,
            name: 'Cavity Protection',
            time: '11.00 AM - 12.00 PM',
            space: 5,
            price: 45
        },
        {
            id: 5,
            name: 'Pediatric Dental',
            time: '06.00 PM - 07.00 PM',
            space: 10,
            price: 34
        },
        {
            id: 6,
            name: 'Oral Surgery',
            time: '07.00 PM - 08.00 PM',
            space: 10,
            price: 100
        },
    ];


    return (
        <Container>
            <Typography variant='h4' style={{ color: 'cyan', margin: '20px 0' }}>Available Appointment on {date.toDateString()}</Typography>
            {bookingSuccess && <Alert severity="success">
                <AlertTitle>Booking Successfull !</AlertTitle>
                successfully placed your booking — <strong>check it out!</strong>
            </Alert>}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        bookings.map(section => <Booking key={section.id}
                            data={section}
                            date={date}
                            setBookingSuccess={setBookingSuccess}
                        ></Booking>)
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default AvailableAppointment;