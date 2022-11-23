import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <Grid container>
            <ThemeProvider theme={theme}>

                {/* Form */}
                <Paper elevation={3} sx={{ ...thm }} >

                    <Grid marginTop={3}>
                        <Chip label="1" color="primary" variant="filled" />{"   "}
                        <Chip label="2" color="primary" variant="outlined" />
                    </Grid>

                    {/* MAP */}
                    <Grid>
                        <Map />
                    </Grid>

                    {/* Geographic informations */}
                    <Typography variant="h6" sx={thm}>
                        <br />GPS coordinates<br />
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                        {/*LATITUDE FIELD*/}
                        <TextField variant="outlined" label="Latitude" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.latitude} onChange={ev => props.setLatitude(ev.target.value)} />

                        {/*LONGITUDE FIELD*/}
                        <TextField variant="outlined" label="Longitude" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.longitude} onChange={ev => props.setLongitude(ev.target.value)} />

                        {/*ALTITUDE FIELD*/}
                        <TextField variant="outlined" label="Altitude" type="number" sx={{ width: 'fit-content', maxWidth: '22ch' }} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} value={props.altitude} onChange={ev => props.setAltitude(ev.target.value)} />

                    </Stack>

                    {/* Geographic informations */}
                    <Typography variant="h6" sx={thm}>
                        <br />Geographic informations<br />
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                        {/*COUNTRY FIELD*/}
                        <TextField variant="outlined" label="Country" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.country} onChange={ev => props.setCountry(ev.target.value)} />

                        {/*PROVINCE FIELD*/}
                        <TextField variant="outlined" label="Province" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.province} onChange={ev => props.setProvince(ev.target.value)} />

                        {/*CITY FIELD*/}
                        <TextField variant="outlined" label="City" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.city} onChange={ev => props.setCity(ev.target.value)} />

                    </Stack>

                    {/*ADDRESS FIELD*/}
                    <TextField variant="outlined" label="Address" margin="normal" sx={{ width: 'fit-content' }} value={props.address} onChange={ev => props.setAddress(ev.target.value)} />

                </Paper>

                {/* Buttons CONTINUE*/}

                <Grid xs={12} sx={thm}>

                    <Grid><br /></Grid>

                    <Button onClick={() => props.setStepOneDone(true)} variant="contained" color='primary'>CONTINUE</Button>
                    <Grid><br /></Grid>
                </Grid>


            </ThemeProvider>
        </Grid>
    );
}