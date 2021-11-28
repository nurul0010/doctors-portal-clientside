import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Button, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const bannerBg = {
    background: `url(${bg})`,
    marginTop: '150px',
    backgroundRepeat: 'no-repeat',
    backgroundPositon: 'center'
};

const verticalCenter = {
    display: 'flex',
    width: 450,
    alignItems: 'center'
}

const Banner = () => {
    return (
        <Container style={bannerBg}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item style={{ ...verticalCenter, textAlign: 'left' }} xs={12} md={6}>
                        <Box>
                            <Typography variant='h3'>
                                Your New Smile <br />
                                Starts Hare
                            </Typography>
                            <Typography variant='h6' sx={{ my: 4, fontSize: 14, fontWeight: 300, color: 'gray' }}>
                                Healthy teeth is a part of healthy life !
                            </Typography>
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/appointment'>
                                <Button style={{ backgroundColor: 'cyan' }} variant='contained'>GET APPOINTMENT</Button>
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} style={verticalCenter}>
                        <img style={{ width: 400 }} src={chair} alt="" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Banner;