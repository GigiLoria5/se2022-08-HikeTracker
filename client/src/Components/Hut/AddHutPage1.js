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
import {validateAddress} from '../../Utils/Address';
import MapLocator from '../Map/MapLocator';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';
import { Link } from "react-router-dom";
import { ResetErrors, PrintCheckErrors } from '../../Utils/PositionErrorMgmt';


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
 * location
 * formValues, setFormValues
 */
export default function AddHutPage1(props) {

    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng }); // set default position

    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        props.setLatitude(position.lat);
        props.setLongitude(position.lng);
        props.setCountry("")
        props.setAddress("");
        props.setCity("");
        props.setProvince("");
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

    const reset = async () => {
        const formValueClean =  ResetErrors(props.formValues);
        props.setFormValues(formValueClean);
    }

    const printErrors = async (res) => {
        const formValueWithErrors =  PrintCheckErrors(props.formValues,res);
        props.setFormValues(formValueWithErrors);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        const res = validateAddress(props.location, props.country, props.province, props.city, props.address);

            if( res === "true"){
                props.setStepOneDone(true)
            }else{
                printErrors(res);
                event.stopPropagation();
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
                    <Box component="form" onSubmit={handleSubmit} >
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
                                    props.setCountry(value); props.setProvince(''); props.setCity(''); props.setAddress('');
                                    reset();
                                }}
                                renderInput={(params) => <TextField required {...params} label="Country" error={props.formValues.country.error} helperText={props.formValues.country.error && props.formValues.country.errorMessage} />}
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
                                    props.setProvince(value); props.setCity(''); props.setAddress('');
                                    reset();
                                }}
                                renderInput={(params) => <TextField required {...params} label="Province" error={props.formValues.province.error} helperText={props.formValues.province.error && props.formValues.province.errorMessage} />}
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
                                    props.setCity(value); props.setAddress('');
                                    reset();
                                }}
                                renderInput={(params) => <TextField required {...params} label="City" error={props.formValues.city.error} helperText={props.formValues.city.error && props.formValues.city.errorMessage} />}
                            />
                            {/*ADDRESS FIELD*/}
                            <TextField variant="outlined" margin="normal" required label="Address" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} value={props.address} onChange={ev => props.setAddress(ev.target.value)} error={props.formValues.address.error} helperText={props.formValues.address.error && props.formValues.address.errorMessage} />

                        </Grid>



                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} component={Link} to={"/local-guide-page"} variant="outlined" color='error'>CANCEL</Button>
                            <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} type="submit" variant="contained" color='primary'>CONTINUE</Button>
                        </Stack>
                    </Box>
                </Paper>

            </Container>

        </ThemeProvider>
    );
}