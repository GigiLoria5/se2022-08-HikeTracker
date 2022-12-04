import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';



const theme = createTheme({
    palette: {
        primary: {
            main: '#008037',
            contrastText: '#CCE2EF',
        },
    },
});

export default function SignUp(props) {
    const [type, setType] = useState(1);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone_number, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const [formValues, setFormValues] = useState({
        passwd: {
            error: false,
            errorMessage: ""
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        props.setMessage('');
        // eslint-disable-next-line
    }, [])

    const reset = async () => {
        let newFormValues = { ...formValues }
        newFormValues["passwd"].error = false;
        newFormValues["passwd"].errorMessage = "";
        setFormValues(newFormValues);
    }

    const printErrors = async () => {
        let newFormValues = { ...formValues }
        newFormValues["passwd"].error = true;
        newFormValues["passwd"].errorMessage = "Confirmation does not match";
        setFormValues(newFormValues);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        if (confirmPassword !== password) {
            event.stopPropagation();
            printErrors();
            return;
        }

        let role = '';

        switch (type) {
            case 1: role = "hiker"; break;
            case 2: role = "hut_worker"; break;
            case 3: role = "local_guide"; break;
            case 4: role = "emergency_operator"; break;
            default: break;
        }
        const credentials = { role, name, surname, phone_number, email, password };         // define object having username and password as elements 
        props.signUp(credentials);                           // call login function in App.js

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} >
                                <TypeSelector setType={setType} type={type}></TypeSelector>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required={type !== 1 && type !== 4 ? true : false}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={ev => setName(ev.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required={type !== 1 && type !== 4 ? true : false}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={ev => setSurname(ev.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <PhoneInput
                                    required={type !== 1 && type !== 4 ? true : false}
                                    placeholder="Enter phone number"
                                    value={phone_number}
                                    defaultCountry="IT"
                                    onChange={setPhone} />

                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="new-password"
                                    inputProps={{ minLength: 8 }}
                                    onChange={ev => { setPassword(ev.target.value); reset(); }}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmpassword"
                                    autoComplete="new-password"
                                    inputProps={{ minLength: 8 }}
                                    error={formValues.passwd.error}
                                    helperText={formValues.passwd.error && formValues.passwd.errorMessage}
                                    onChange={ev => { setConfirmPassword(ev.target.value); reset(); }}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                >
                                                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {props.message &&
                            <Alert severity={props.message.type} onClose={() => props.setMessage('')}>{props.message.msg}</Alert>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link onClick={() => { navigate('/login') }} variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

function TypeSelector(props) {

    return <>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.type}
                label="User type"
                onChange={ev => props.setType(ev.target.value)}
            >
                <MenuItem value={1}>Hiker</MenuItem>
                <MenuItem value={2}>Hut worker</MenuItem>
                <MenuItem value={3}>Local guide</MenuItem>
                <MenuItem value={4}>Emergency operator</MenuItem>
            </Select>
        </FormControl>
    </>
}
