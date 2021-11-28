import { Grid } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ data, date, setBookingSuccess }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Grid item xs={8} md={4}>
                <Paper elevation={1} sx={{ minWidth: 275, p: 3 }}>

                    <Typography style={{ color: 'cyan', fontWeight: '500', letterSpacing: '1px' }} variant="h5" component="div">
                        {data?.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {data?.time}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        available space {data?.space}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Price: $ {data?.price}
                    </Typography>


                    <Button onClick={handleOpen} style={{ margin: '0 auto', color: 'white', fontWeight: 'bold', padding: '5px 8px', backgroundColor: 'cyan' }} size="small">BOOK APPOINTMENT</Button>

                </Paper>
            </Grid>
            <BookingModal
                data={data}
                open={open}
                date={date}
                handleClose={handleClose}
                setBookingSuccess={setBookingSuccess}
            ></BookingModal>
        </>
    );
};

export default Booking;