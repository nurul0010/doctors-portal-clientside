import React from 'react';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png'
import bg from '../../../images/appointment-bg.png'
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';


const appointmentBanner = {
    background: `url(${bg})`,
    marginTop: '150px',
    backgroundRepeat: 'no-repeat',
    backgroundPositon: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: "rgba(45,58,74,0.6)",
    backgroundBlendMode: 'darken, luminosity'
}

const AppointmentBanner = () => {
    return (
        <Container>
            <Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <img
                            style={{ width: 400, marginTop: '-100px' }}
                            src={doctor} alt="" />
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                        <Box>
                            <Typography variant='h5' sx={{ mt: 4 }} style={{ color: 'cyan', fontSize: '14' }}>
                                APPOINTMENT
                            </Typography>
                            <Typography variant='h3' style={{ color: 'white' }}>
                                Make an appointment Today
                            </Typography>
                            <Typography variant='h6' sx={{ mt: 3, mb: 3 }} style={{ color: 'white', fontSize: 14, fontWeight: 'lighter' }}>
                                Its a good habit that you make sure meet with doctor before serious
                            </Typography>
                            <Button variant='contained' style={{ backgroundColor: 'cyan' }}>learn more</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AppointmentBanner;