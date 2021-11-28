import { Alert, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import loginImg from '../../../images/login.png';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import { useHistory, useLocation } from "react-router";

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { AuthError, isLoading, signInUser, signInWithGoogle } = useAuth();


    const location = useLocation();
    const history = useHistory();
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        signInUser(loginData?.email, loginData?.password, location, history)
        e.preventDefault();
    }
    const handleGoogleSignin = () => {
        signInWithGoogle(location, history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 3, mt: 9 }} variant="body1" gutterBottom>
                        Login
                    </Typography>

                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            name="email"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }} type="text" id="standard-basic" label="Email" variant="standard" />
                        <TextField
                            name="password"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }} type="password" id="standard-basic" label="Password" variant="standard" />

                        <Button variant='contained' sx={{ width: '75%', m: 1 }} type="submit">Login</Button>

                        <NavLink style={{ textDecoration: 'none' }} to='/register'>
                            <Button variant="text">new user? register hare</Button>
                        </NavLink>
                    </form>
                    <Typography sx={{ mb: 3, mt: 9 }} variant="body1" gutterBottom>
                        wanna try google log in?
                    </Typography>
                    <Button onClick={handleGoogleSignin} variant='contained' sx={{ width: '75%', m: 1 }} type="submit">Google Signup</Button>
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

export default Login;