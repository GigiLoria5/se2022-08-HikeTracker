import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


import Map from './Map';

/**
 * 
 * PROPS:
 * latitude, setLatitude,
 * longitude, setLongitude,
 * altitude, setAltitude,
 * country, setCountry,
 * province, setProvince,
 * city, setCity,
 * setStepOneDone
 * setMessage
 * reset
 * 
 */
export default function AddHutPage1(props) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#008037',
            },
            secondary: {
                main: '#e3e3e3',
            },
            third: {
                main: "#ffffff"
            }
        },
    });

    const thm = {
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            props.setStepOneDone(true)
        }
    };

    return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="m">

                {/* Form */}
                <Paper elevation={3} sx={{ ...thm }} >
                    <Box component="form" onSubmit={handleSubmit} >
                        <Grid container marginTop={3} justifyContent="center">
                            <Stack direction={{ xs: 'row', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                <Chip label="1" color="primary" variant="filled" />{"   "}
                                <Chip label="2" color="primary" variant="outlined" />
                            </Stack>
                        </Grid>

                        {/* MAP */}
                        <Box>
                            <Map latitude={props.latitude} longitude={props.longitude} />
                        </Box>

                        {/* Geographic informations */}
                        <Typography variant="h6" sx={thm}>
                            <br />GPS coordinates<br />
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                            {/*LATITUDE FIELD*/}
                            <TextField variant="outlined" required label="Latitude" type="number" sx={{ width: 'fit-content'}} value={props.latitude} onChange={ev => props.setLatitude(ev.target.value)} />

                            {/*LONGITUDE FIELD*/}
                            <TextField variant="outlined" required label="Longitude" type="number" sx={{ width: 'fit-content'}} value={props.longitude} onChange={ev => props.setLongitude(ev.target.value)} />

                            {/*ALTITUDE FIELD*/}
                            <TextField variant="outlined" required label="Altitude" type="number" sx={{ width: 'fit-content'}} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} value={props.altitude} onChange={ev => props.setAltitude(ev.target.value)} />

                        </Stack>

                        {/* Geographic informations */}
                        <Typography variant="h6" sx={thm}>
                            <br />Geographic information<br />
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                            {/*COUNTRY FIELD*/}
                            <TextField variant="outlined" required label="Country" sx={{ width: 'fit-content'}} value={props.country} onChange={ev => props.setCountry(ev.target.value)} />

                            {/*PROVINCE FIELD*/}
                            <TextField variant="outlined" required label="Province" sx={{ width: 'fit-content'}} value={props.province} onChange={ev => props.setProvince(ev.target.value)} />

                            {/*CITY FIELD*/}
                            <TextField variant="outlined" required label="City" sx={{ width: 'fit-content'}} value={props.city} onChange={ev => props.setCity(ev.target.value)} />

                        </Stack>

                        {/*ADDRESS FIELD*/}
                        <Box display="flex" justifyContent="center" alignItems="center" marginTop={3} marginBottom={3}>
                            <TextField variant="outlined" required label="Address" sx={{ width: 'fit-content'}} value={props.address} onChange={ev => props.setAddress(ev.target.value)} />
                        </Box>

                        <Grid container marginTop={3} justifyContent="center">
                            <Stack direction={{ xs: 'column', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                <Button variant="contained" color='secondary' onClick={() => props.reset()}>RESET</Button>
                                <Button type="submit" variant="contained" color='primary'>CONTINUE</Button>
                            </Stack>
                        </Grid>
                    </Box>
                </Paper>

                </Container>

            </ThemeProvider>
    );
}