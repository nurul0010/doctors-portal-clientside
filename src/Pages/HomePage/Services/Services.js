import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';

const services = [
    {
        name: 'Fluoride Treatment',
        description: 'Our highly-specialized Fluoride Master system utilizes high-grade FluoriSorb™ media and is designed to effectively filter fluoride (commonly found in city/municipal water supplies)',
        img: fluoride
    },
    {
        name: 'Cavity Filling',
        description: 'Having a cavity filled may cause some discomfort, but it should not cause pain. Anyone who experiences moderate or severe pain during or after the procedure should let their dentist know',
        img: cavity
    },
    {
        name: 'Teeth Whitening',
        description: 'A healthy mouth and good oral hygiene go hand-in-hand. Small changes in your oral care routine can make a big difference in terms of your dental health.teeth is a valuable part in our life.',
        img: whitening
    }
]
const Services = () => {
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ color: 'success.main', marginTop: '100px' }} variant="h6" component="div">
                    Our Services
                </Typography>
                <Typography sx={{ fontWeight: 600, m: 2 }} variant="h4" component="div">
                    Services We Provide
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        services.map(service => <Service
                            key={service?.name}
                            service={service}
                        ></Service>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;