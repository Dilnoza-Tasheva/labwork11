import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useAppDispatch} from "../../app/hooks.ts";
import {login} from "./usersThunks.ts";
import {useNavigate} from "react-router-dom";
import { LoginMutation } from '../../types';


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
      try {
        await dispatch(login(state)).unwrap();
        navigate('/');
      } catch (error) {
        console.log("Login error", error);
      }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container direction={'column'} size={12} spacing={2}>
                        <Grid size={12}>
                            <TextField
                              label="Username"
                              name="username"
                              fullWidth
                              autoComplete="current-username"
                              value={state.username}
                              onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                              fullWidth
                              label="Password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              value={state.password}
                              onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;