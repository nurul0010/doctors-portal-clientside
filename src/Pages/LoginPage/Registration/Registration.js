import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginImg from '../../../images/login.png';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router";

const Registration = () => {
    const [loginData, setLoginData] = useState({});
    const history = useHistory();

    const { registerUser, isLoading, AuthError } = useAuth();
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleRegSubmit = e => {
        if (loginData?.password !== loginData?.retypePassword) {
            alert('your password didnot match');
            return;
        }
        registerUser(loginData?.email, loginData?.password, loginData?.username, history);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 3, mt: 9 }} variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {!isLoading && <form onSubmit={handleRegSubmit}>
                        <TextField
                            name="username"
                            onBlur={handleOnBlur}
                            sx={{ width: '75%', m: 1 }} type="text" id="standard-basic" label="Name" variant="standard" />
                        <TextField
                            name="email"
                            onBlur={handleOnBlur}
                            sx={{ width: '75%', m: 1 }} type="email" id="standard-basic" label="Email" variant="standard" />
                        <TextField
                            name="password"
                            onBlur={handleOnBlur}
                            sx={{ width: '75%', m: 1 }} type="password" id="standard-basic" label="Set password" variant="standard" />
                        <TextField
                            name="retypePassword"
                            onBlur={handleOnBlur}
                            sx={{ width: '75%', m: 1 }} type="password" id="standard-basic" label="Retype password" variant="standard" />

                        <Button variant='contained' sx={{ width: '75%', m: 1 }} type="submit">Register</Button>

                        <NavLink style={{ textDecoration: 'none' }} to='/login'>
                            <Button variant="text">already registerd? login hare</Button>
                        </NavLink>
                    </form>}
                    {isLoading && <CircularProgress />}

                    {AuthError && <Alert severity="error">{AuthError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "87%" }} src={loginImg} alt=''></img>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Registration;