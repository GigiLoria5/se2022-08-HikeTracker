import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, Divider, TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MapLocator from '../Map/MapLocator';
import { floatInputSanitizer } from '../../Utils/InputSanitizer';
import { addParking } from '../../API/Parking'
import { getAddressByCoordinates } from '../../API/Points'
import { Parking } from '../../Utils/Parking';
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';
import { Address, validateAddress, translateProvince, getCity } from '../../Utils/Address';
import { ResetErrors, PrintCheckErrors } from '../../Utils/PositionErrorMgmt';

const zoomLevel = 15;

function AddParking() {
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [address, setAddress] = useState("");
    const [width, setWidth] = React.useState(window.innerWidth);
    const [formValues, setFormValues] = useState({
        country: {
            error: false,
            errorMessage: ""
        },
        province: {
            error: false,
            errorMessage: ""
        },
        city: {
            error: false,
            errorMessage: ""
        }
    });
    const [capacity, setCapacity] = useState("");


    useEffect(() => {
        if (capacity < 0) {
            setCapacity(0)
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
        getCountries().then(cn => {
            setCountries([...cn]);
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        if (position.lat != "" && position.lng != "") {
            getLocation();
            ResetErrors(formValues);
        }
        // eslint-disable-next-line
    }, [position])

    const getLocation = async () => {
        const addr = await getAddressByCoordinates(position.lng, position.lat);   // Get address information starting from coordinates
        setLocation(new Address(addr));
        autoFill(addr);
    }

    const autoFill = (loc) =>{

        setCountry(loc.country);

        if(loc.country === "Italy"){
            setProvince(translateProvince(loc.county));
        }else{
            setProvince(loc.state);
        }

        setCity(getCity(loc));
    }

    useEffect(() => {
        if (country !== '') {
            getProvincesByCountry(country).then(pv => {
                setProvinces([...pv]);
            })
        }
        if (province !== '') {
            getCitiesByProvince(country, province).then(c => {
                setCities([...c]);
            })
        }

        // eslint-disable-next-line
    }, [country, province]);

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

    const navigate = useNavigate();

    const reset = async () => {
        const formValueClean =  ResetErrors(formValues);
        setFormValues(formValueClean);
    }

    const printErrors = async (res) => {
        const formValueWithErrors =  PrintCheckErrors(formValues,res);
        setFormValues(formValueWithErrors);
    }


    const handleSubmission = async (ev) => {
        ev.preventDefault();
        
        const res = validateAddress(location, country, province, city); // res contains strings: "true" (no errors), "country", "province", "city" or "address"

        if (res === "true") {
                await addParking(new Parking("", city, province, country, position.lng, position.lat, address))
                    .then(_a => navigate("/")).catch(err => { setMessage("Server error in creating parking"); });
        } else {
                printErrors(res);
                ev.stopPropagation();
        }

        if (!capacity) {
            setMessage("Parking lot capacity info missing");
            return;
        }
        if (!capacity) {
            setMessage("Parking lot capacity info missing");
            return;
        }
        //add capacity of parking here
        await addParking(new Parking("", city, province, country, position.lng, position.lat, address, capacity))
            .then(_a => navigate("/")).catch(err => { setMessage("Server error in creating parking"); });

    };

    const handleChangeLng = (newLng) => {
        const newLngSanitized = floatInputSanitizer(newLng);
        setPosition({ ...position, lng: isNaN(newLngSanitized) ? "0" : newLngSanitized });
    }

    const handleChangeLat = (newLat) => {
        const newLatSanitized = floatInputSanitizer(newLat);
        setPosition({ ...position, lat: isNaN(newLatSanitized) ? "0" : newLatSanitized });
    }


    const thm = {
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };


    return (
        <div>
            <Grid container >

                <ThemeProvider theme={theme} >

                    <Grid xs={12}>
                        <Typography variant="h5" marginTop={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                            Add Parking Lot
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={3}></Grid>
                    <Grid xs={12} md={6} marginTop={3} >
                        <Container component="main" maxWidth="m">
                            <Paper elevation={3} sx={{ ...thm }} >

                                <Typography variant="h5" sx={thm} margin="normal" fontWeight={550} marginTop={1}>
                                    Specify a position
                                </Typography>

                                <Stack direction="row" marginBottom={2}>
                                    <Typography sx={{ fontSize: 14 }} color="grey.700">
                                        Click on the map or type the coordinates
                                    </Typography>
                                </Stack>

                                {/* MAP */}
                                <Grid xs={0} sm={1}></Grid>
                                <Grid xs={12} sm={10} >
                                    <MapLocator position={position} setPosition={setPosition} radius={null} height={'50vh'} width={'100'} initialLat={initialLat} initialLng={initialLng} zoomLevel={zoomLevel} />
                                </Grid>
                                <Grid xs={0} sm={1}></Grid>

                                <Grid container>

                                    {/* coordinates */}
                                    <Grid xs={12} sx={thm}>
                                        <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                            COORDINATES
                                        </Typography>
                                    </Grid>

                                    <Grid xs={12} sx={{ ...thm, mb: 2 }} >

                                        {/*LATITUDE FIELD*/}
                                        <TextField margin="normal" variant="outlined" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} required label="Latitude" type="number" value={position ? `${position.lat}` : ""} onChange={(e) => handleChangeLat(e.target.value)} />

                                        {/*LONGITUDE FIELD*/}
                                        <TextField margin="normal" variant="outlined" sx={{ width: '30ch', maxWidth: '30ch', marginTop: 1 }} required label="Longitude" type="number" value={position ? `${position.lng}` : ""} onChange={(e) => handleChangeLng(e.target.value)} />

                                    </Grid>

                                    <Divider variant="middle" sx={{ width: "100%", maxWidth: "544px", marginLeft: "auto", marginRight: "auto" }} />

                                    <Grid xs={12} sx={thm}>
                                        <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                            GEOGRAPHIC INFORMATION
                                        </Typography>
                                    </Grid>

                                    <Grid xs={12} sx={thm} >

                                        < Stack direction='column' align='center'>
                                            {/*COUNTRY FIELD*/}
                                            <Autocomplete
                                                required
                                                disablePortal
                                                id="combo-box-demo"
                                                options={countries}
                                                value={country !== "" ? country : null}
                                                sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}
                                                onChange={(e, value) => {
                                                    e.preventDefault();
                                                    setCountry(value); setProvince(''); setCity('')
                                                    reset();
                                                }}
                                                renderInput={(params) => <TextField required {...params} label="Country" error={formValues.country.error} helperText={formValues.country.error && formValues.country.errorMessage} />}
                                            />
                                            {/*PROVINCE FIELD*/}
                                            <Autocomplete
                                                required
                                                disabled={!(country)}
                                                disablePortal
                                                id="combo-box-demo2"
                                                options={provinces}
                                                key={country}
                                                value={province !== "" ? province : null}
                                                sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}
                                                onChange={(e, value) => {
                                                    e.preventDefault();
                                                    setProvince(value); setCity('')
                                                    reset();
                                                }}
                                                renderInput={(params) => <TextField required {...params} label="Province" error={formValues.province.error} helperText={formValues.province.error && formValues.province.errorMessage} />}
                                            />
                                            {/*CITY FIELD*/}
                                            <Autocomplete
                                                required
                                                disabled={!(country && province)}
                                                disablePortal
                                                id="combo-box-demo3"
                                                options={cities}
                                                key={[province, country]}
                                                value={city !== "" ? city : null}
                                                sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}
                                                onChange={(e, value) => {
                                                    e.preventDefault();
                                                    setCity(value);
                                                    reset();
                                                }}
                                                renderInput={(params) => <TextField required {...params} label="City" error={formValues.city.error} helperText={formValues.city.error && formValues.city.errorMessage} />}
                                            />
                                            <TextField variant="outlined" required color='primary' label="Address" sx={{ width: '30ch', maxWidth: '30ch', m: 1 }} value={address} onChange={(e) => setAddress(e.target.value)} />

                                        </Stack>

                                        <Divider variant="middle" sx={{ width: "100%", maxWidth: "544px", marginLeft: "auto", marginRight: "auto", marginTop: 2 }} />

                                        <Grid xs={12} sx={thm}>
                                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                                PARKING LOT INFORMATION
                                            </Typography>
                                        </Grid>

                                        <TextField variant="outlined" required color='primary' InputProps={{ inputProps: { min: "0", step: "1" } }} label="Capacity" sx={{ width: '30ch', maxWidth: '30ch', m: 1 }} type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />

                                        {message && <Alert sx={{ m: 1, width: 'fit-content', align: 'center' }} severity="error" onClose={() => setMessage('')}>{message}</Alert>}

                                    </Grid>
                                </Grid>



                                {/****************************************************SUBMIT BUTTONS********************************************************/}
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <Button sx={{ m: 1, mb: 2, mt: 2, minWidth: '80px' }} component={Link} to={"/"} variant="outlined" color='error'>CANCEL</Button>
                                    <Button sx={{ m: 1, mb: 2, mt: 2, minWidth: '80px' }} onClick={handleSubmission} variant="contained" color='primary'>ADD PARKING LOT</Button>
                                </Stack>

                            </Paper>

                        </Container>
                    </Grid>
                    <Grid xs={0} md={3}></Grid>
                </ThemeProvider>

            </Grid >


        </div >
    );
}
export default AddParking;