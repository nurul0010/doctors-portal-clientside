import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ open, handleClose, data, date, setBookingSuccess }) => {
    const { user } = useAuth();
    const initialValue = { patientName: user?.displayName, email: user?.email };
    const [booking, setBooking] = useState(initialValue);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newBooking = { ...booking };
        newBooking[field] = value;
        setBooking(newBooking);
    }

    const handleModalSubmit = e => {
        e.preventDefault();
        // collect data
        const appointment = {
            ...booking,
            serviceName: data.name,
            time: data.time,
            price: data.price,
            date: date.toLocaleDateString()
        }
        // pass to backend 
        fetch('http://localhost:7000/appointments', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingSuccess(true);
                    handleClose();
                }
            })
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {data?.name}
                        </Typography>
                        <form onSubmit={handleModalSubmit}>
                            <TextField
                                sx={{ width: '85%', m: 1 }}
                                disabled
                                id="outlined-size-small"
                                defaultValue={data?.time}
                                size="small"
                            />
                            <TextField
                                sx={{ width: '85%', m: 1 }}
                                id="outlined-size-small"
                                name='patientName'
                                onBlur={handleOnBlur}
                                defaultValue={user?.displayName}
                                size="small"
                            />
                            <TextField
                                sx={{ width: '85%', m: 1 }}
                                id="outlined-size-small"
                                name='email'
                                onBlur={handleOnBlur}
                                defaultValue={user?.email}
                                size="small"
                            />
                            <TextField
                                sx={{ width: '85%', m: 1 }}
                                id="outlined-size-small"
                                name='phone'
                                onBlur={handleOnBlur}
                                defaultValue="Phone Number"
                                size="small"
                            />
                            <TextField
                                disabled
                                sx={{ width: '85%', m: 1 }}
                                id="outlined-size-small"
                                defaultValue={date.toDateString()}
                                size="small"
                            />
                            <Button type='submit' variant='contained' style={{ width: '25%' }}>Confirm</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
};

export default BookingModal;