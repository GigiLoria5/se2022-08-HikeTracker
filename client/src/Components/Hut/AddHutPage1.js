import React, { useState, useEffect } from 'react'
import { createTheme, ThemeProvider, Breadcrumbs, Divider, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';

import MapLocator from '../Map/MapLocator';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';
import { Link } from "react-router-dom";

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

    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng }); // set default position

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
        marginBottom: 1,
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
                    <Breadcrumbs separator="›" aria-label="breadcrumb" marginTop={3}>
                        [
                        <Typography key="3" color="primary">
                            Hut location
                        </Typography>,
                        <Typography key="3" color="inherit">
                            Hut details
                        </Typography>,
                        ];
                    </Breadcrumbs>

                    <Typography variant="h5" sx={thm} margin="normal" fontWeight={550} marginTop={1}>
                        <br />Specify a position<br /><br />
                    </Typography>

                    <Stack direction="row" marginBottom={2}>
                        <Typography sx={{ fontSize: 14 }} color="grey.700">
                            Click on the map or type the coordinates
                        </Typography>
                    </Stack>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: "80%" }}>
                        {/* MAP */}
                        <Box>
                            <MapLocator position={position} setPosition={setPosition} radius={null} height={'50vh'} width={'100'} initialLat={initialLat} initialLng={initialLng} zoomLevel={14} />
                        </Box>

                        {/* Geographic informations */}
                        <Grid xs={12} sx={thm}>
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                GPS COORDINATES
                            </Typography>
                        </Grid>

                        <Grid xs={12} sx={{ ...thm, mb: 2 }} >

                            {/*LATITUDE FIELD*/}
                            <TextField margin="normal" variant="outlined" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} required label="Latitude" type="number" value={props.latitude}
                                onChange={ev => { props.setLatitude(ev.target.value); setPosition({ lat: ev.target.value, lng: position.lng }) }} />

                            {/*LONGITUDE FIELD*/}
                            <TextField margin="normal" variant="outlined" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} required label="Longitude" type="number" value={props.longitude}
                                onChange={ev => { props.setLongitude(ev.target.value); setPosition({ lat: position.lat, lng: ev.target.value }) }} />

                            {/*ALTITUDE FIELD*/}
                            <TextField margin="normal" variant="outlined" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} required label="Altitude" type="number" InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} value={props.altitude} onChange={ev => props.setAltitude(ev.target.value)} />

                        </Grid>
                        <Divider variant="middle" />

                        {/* Geographic informations */}
                        <Grid xs={12} sx={thm}>
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                GEOGRAPHIC INFORMATION
                            </Typography>
                        </Grid>

                        <Grid xs={12} sx={{ ...thm, mb: 2 }} >

                            <Autocomplete
                                required
                                disablePortal
                                id="combo-box-demo"
                                options={countries}
                                sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}
                                onChange={(e, value) => {
                                    e.preventDefault();
                                    props.setCountry(value); props.setProvince(''); props.setCity('')
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
                                sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}
                                onChange={(e, value) => {
                                    e.preventDefault();
                                    props.setProvince(value); props.setCity('')
                                }}
                                renderInput={(params) => <TextField required {...params} label="Province" />}
                            />
                            <Autocomplete
                                required
                                disabled={!(props.country && props.province)}
                                disablePortal
                                id="combo-box-demo3"
                                options={cities}
                                key={[props.province, props.country]}
                                sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}
                                onChange={(e, value) => {
                                    e.preventDefault();
                                    props.setCity(value);
                                }}
                                renderInput={(params) => <TextField required {...params} label="City" />}
                            />
                            {/*ADDRESS FIELD*/}
                            <TextField variant="outlined" margin="normal" required label="Address" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} value={props.address} onChange={ev => props.setAddress(ev.target.value)} />

                        </Grid>

                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} component={Link} to={"/"} variant="outlined" color='error'>CANCEL</Button>
                            <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} type="submit" variant="contained" color='primary'>CONTINUE</Button>
                        </Stack>
                    </Box>
                </Paper>

            </Container>

        </ThemeProvider>
    );
}