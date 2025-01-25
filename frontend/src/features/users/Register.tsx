import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { register } from './usersThunks.ts';
import { RegisterMutation } from '../../types';

const Register = () => {
    const dispatch = useAppDispatch();
    const registerError = useAppSelector(selectRegisterError);
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterMutation>({
      username: "",
      password: "",
      displayName:"",
      phone: "",
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(register(form)).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return registerError?.errors[fieldName].message;
        } catch {
            return undefined;
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                    <Grid container direction={'column'} size={12} spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('username'))}
                                helperText={getFieldError('username')}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={form.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                      <Grid size={12}>
                        <TextField
                          required
                          fullWidth
                          name="display name"
                          label="Display name"
                          type="display name"
                          id="displayName"
                          value={form.displayName}
                          onChange={inputChangeHandler}
                          error={Boolean(getFieldError('displayName'))}
                          helperText={getFieldError('displayName')}
                        />
                      </Grid>
                      <Grid size={12}>
                        <TextField
                          required
                          fullWidth
                          name="phone number"
                          label="Phone number"
                          type="tel"
                          id="phone"
                          value={form.phone}
                          onChange={inputChangeHandler}
                          error={Boolean(getFieldError('phone'))}
                          helperText={getFieldError('phone')}
                        />
                      </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;