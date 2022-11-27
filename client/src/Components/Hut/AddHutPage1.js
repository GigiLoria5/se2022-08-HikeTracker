import React, { useState, useEffect } from 'react'
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
import Autocomplete from '@mui/material/Autocomplete';

import MapLocator from '../Map/MapLocator';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'

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

    const [position, setPosition] = useState({ lat: 45.06968, lng: 7.70493 }); // set default position

    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        props.setLatitude(position.lat);
        props.setLongitude(position.lng);
        // eslint-disable-next-line
    }, [position]);

    useEffect(() => {
        getCountries().then(cn => {
            setCountries([...cn]);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (props.country !== '') {
            getProvincesByCountry(props.country).then(pv => {
                setProvinces([...pv]);
            })
        }
        if (props.province !== '') {
            getCitiesByProvince(props.country, props.province).then(c => {
                setCities([...c]);
            })
        }

        // eslint-disable-next-line
    }, [props.country, props.province]);

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
        marginBottom: 3,
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
                            <MapLocator position={position} setPosition={setPosition} radius={0} height={'50vh'} width={'100'} initialLat={props.latitude} initialLng={props.longitude} zoomLevel={11} />
                        </Box>

                        {/* Geographic informations */}
                        <Typography variant="h6" sx={thm}>
                            <br />GPS coordinates<br />
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} alignItems={'center'}>

                            {/*LATITUDE FIELD*/}
                            <TextField variant="outlined" required label="Latitude" type="number" sx={{ width: 'fit-content' }} value={props.latitude}
                                onChange={ev => { props.setLatitude(ev.target.value); setPosition({ lat: ev.target.value, lng: position.lng }) }} />

                            {/*LONGITUDE FIELD*/}
                            <TextField variant="outlined" required label="Longitude" type="number" sx={{ width: 'fit-content' }} value={props.longitude}
                                onChange={ev => { props.setLongitude(ev.target.value); setPosition({ lat: position.lat, lng: ev.target.value }) }} />

                            {/*ALTITUDE FIELD*/}
                            <TextField variant="outlined" required label="Altitude" type="number" sx={{ width: 'fit-content' }} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} value={props.altitude} onChange={ev => props.setAltitude(ev.target.value)} />

                        </Stack>

                        {/* Geographic informations */}
                        <Typography variant="h6" sx={thm}>
                            <br />Geographic information<br />
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'column' }} margin={1} alignItems={'center'}>

                            <Autocomplete
                                required
                                disablePortal
                                id="combo-box-demo"
                                options={countries}
                                sx={{ m: 1, width: 'fit-content', minWidth: '28ch' }}
                                onChange={e => {
                                    e.preventDefault();
                                    const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                    props.setCountry(name); props.setProvince(''); props.setCity('')
                                }}
                                renderInput={(params) => <TextField required {...params} label="Country" />}
                            />
                            <Autocomplete
                                required
                                disabled={!(props.country)}
                                disablePortal
                                id="combo-box-demo2"
                                options={provinces}
                                key={props.country}
                                sx={{ m: 1, width: 'fit-content', minWidth: '28ch' }}
                                onChange={e => {
                                    e.preventDefault();
                                    const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                    props.setProvince(name); props.setCity('')
                                }}
                                renderInput={(params) => <TextField required {...params} label="Province/Region" />}
                            />
                            <Autocomplete
                                required
                                disabled={!(props.country && props.province)}
                                disablePortal
                                id="combo-box-demo3"
                                options={cities}
                                key={[props.province, props.country]}
                                sx={{ m: 1, width: 'fit-content', minWidth: '28ch' }}
                                onChange={e => {
                                    e.preventDefault();
                                    const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                    props.setCity(name)
                                }}
                                renderInput={(params) => <TextField required {...params} label="City" />}
                            />
                            {/*ADDRESS FIELD*/}
                            <Box display="flex" justifyContent="center" alignItems="center" marginTop={3} marginBottom={3}>
                                <TextField variant="outlined" required label="Address" sx={{ width: 'fit-content', minWidth: '28ch' }} value={props.address} onChange={ev => props.setAddress(ev.target.value)} />
                            </Box>

                        </Stack>



                        <Grid container marginTop={3} justifyContent="center">
                            <Stack direction={{ xs: 'column', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                <Button color="error" variant="outlined" onClick={() => props.reset()}>RESET</Button>
                                <Button type="submit" variant="contained" color='primary'>CONTINUE</Button>
                            </Stack>
                        </Grid>
                    </Box>
                </Paper>

            </Container>

        </ThemeProvider>
    );
}