import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MapLocator from '../Map/MapLocator';
import { floatInputSanitizer } from '../../Utils/InputSanitizer';
import { addParking } from '../../API/Parking'
import { getAddressByCoordinates } from '../../API/Points'
import { Parking } from '../../Utils/Parking';
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';
import { Address, validateAddress } from '../../Utils/Address';


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
        },
        address: {
            error: false,
            errorMessage: ""
        }
    });

    const updateWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
    });

    useEffect(() => {
        window.scrollTo(0, 0)
        getCountries().then(cn => {
            setCountries([...cn]);
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (position.lat !== "" && position.lng !== "") {
            getLocation();
        }
        // eslint-disable-next-line
    }, [position])

    const getLocation = async () => {
        const addr = await getAddressByCoordinates(position.lng, position.lat);   // Get address information starting from coordinates
        setLocation(new Address(addr));
        console.log(addr);
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

    const reset = () => {
        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }

        formFields.forEach(key => {
            newFormValues[key].error = false;
            newFormValues[key].errorMessage = "";
        });
        setFormValues(newFormValues);
    }

    const printErrors = (res,msg) => {
        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }

        if(res===""){
            const array = [country,province,city,address];
            let index = 0;
            formFields.forEach(key => {
                newFormValues[key].error = (array[index]===""||array[index]===null)? true : false;
                newFormValues[key].errorMessage = (array[index]===""||array[index]===null)? key.charAt(0).toUpperCase() + key.slice(1) + " "+msg : "";
            index++;
        });

        }else{
            formFields.forEach(key => {
                newFormValues[key].error = key===res? true : false;
                newFormValues[key].errorMessage = key===res? key.charAt(0).toUpperCase() + key.slice(1) + " "+msg : "";
        });
        }


        setFormValues(newFormValues);
    }


    const handleSubmission = async (ev) => {
        ev.preventDefault();
        if (!country || !province || !city || !address) {
            printErrors("","missing");
            //setMessage("Parking lot geographical info missing");
            return;
        } else {
            const res = validateAddress(location, country, province, city, address); // res contains: true (no errors), country, province, city or address

            if (res === true) {
                await addParking(new Parking("", city, province, country, position.lng, position.lat, address))
                    .then(_a => navigate("/local-guide-page")).catch(err => { setMessage("Server error in creating parking"); });
            } else {
                printErrors(res,"doesn't match with the location");
                ev.stopPropagation();
            }

        }


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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 600,
    };


    return (
        <div>
            <Grid container >

                <ThemeProvider theme={theme} >
                    <Grid xs={12}>
                        <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={thm} align={'center'}>
                            ADD PARKING LOT
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={2}></Grid>

                    <Grid xs={12} md={8} marginTop={3} >
                        <Paper elevation={3} sx={{ ...thm, mb: 4 }} >
                            <Box >
                                <Typography variant="h5" sx={thm} margin="normal" fontWeight={550} marginTop={1}>
                                    <br />Specify a position<br /><br />
                                </Typography>

                                <Stack direction="row" marginBottom={0} marginTop={1}>
                                    <Typography sx={{ fontSize: 14 }} color="grey.700">
                                        Click on the map to define a parking lot
                                    </Typography>
                                </Stack>
                            </Box>


                            <Grid container>

                                <Grid xs={12} md={6} sx={thm} >


                                    {/*MAP*/}
                                    <Box component="div" width={'100%'} align='center' marginTop={3}>
                                        <Box>
                                            <MapLocator position={position} setPosition={setPosition} radius={null} height={'200px'} width={'300px'} initialLat={initialLat} initialLng={initialLng} zoomLevel={zoomLevel} />
                                        </Box>
                                    </Box>

                                    <Stack direction='row' justifyContent="center" alignItems="center" marginTop={2}>
                                        <TextField required variant="outlined" color='primary' label="Latitude" sx={{ width: '13ch', m: 1, mb: { xs: 0, sm: 1 } }} value={position ? `${position.lat}` : ""} onChange={(e) => handleChangeLat(e.target.value)} disabled />
                                        <TextField required variant="outlined" color='primary' label="Longitude" sx={{ width: '13ch', m: 1, mb: { xs: 0, sm: 1 } }} value={position ? `${position.lng}` : ""} onChange={(e) => handleChangeLng(e.target.value)} disabled />
                                    </Stack>
                                </Grid>
                                <Grid xs={12} md={6} sx={thm}>

                                    {width < 900 ? <Grid></Grid> : false}

                                    < Stack direction='column' sx={{ mb: 2, m: { xs: 0, md: 2 } }} align='center'>
                                        {/*COUNTRY FIELD*/}
                                        <Autocomplete
                                            required
                                            disablePortal
                                            id="combo-box-demo"
                                            options={countries}
                                            sx={{ m: 1, width: '28ch', pt: { xs: 0, md: 1.1 } }}
                                            onChange={(e, value) => {
                                                e.preventDefault();
                                                setCountry(value); setProvince(''); setCity(''); setAddress('');
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
                                            sx={{ m: 1, width: '28ch' }}
                                            onChange={(e, value) => {
                                                e.preventDefault();
                                                setProvince(value); setCity(''); setAddress('');
                                                reset();
                                            }}
                                            renderInput={(params) => <TextField {...params} required label="Province" error={formValues.province.error} helperText={formValues.province.error && formValues.province.errorMessage} />}
                                        />
                                        {/*CITY FIELD*/}
                                        <Autocomplete
                                            required
                                            disabled={!(country && province)}
                                            disablePortal
                                            id="combo-box-demo3"
                                            options={cities}
                                            key={[province, country]}
                                            sx={{ m: 1, width: '28ch' }}
                                            onChange={(e, value) => {
                                                e.preventDefault();
                                                setCity(value); setAddress('');
                                                reset();
                                            }}
                                            renderInput={(params) => <TextField {...params} required label="City" error={formValues.city.error} helperText={formValues.city.error && formValues.city.errorMessage} />}
                                        />
                                        <TextField variant="outlined" required color='primary' label="Address" sx={{ width: '28ch', m: 1, mb: 1 }} value={address} onChange={(e) => setAddress(e.target.value)} error={formValues.address.error} helperText={formValues.address.error && formValues.address.errorMessage} />

                                    </Stack>
                                </Grid>
                            </Grid>


                            {message && <Alert sx={{ m: 1 }} severity="error" onClose={() => setMessage('')}>{message}</Alert>}

                            {/****************************************************SUBMIT BUTTONS********************************************************/}
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button sx={{ m: 1, mb: 4, mt: 4, minWidth: '80px' }} component={Link} to={"/local-guide-page"} variant="outlined" color='error'>CANCEL</Button>
                                <Button sx={{ m: 1, mb: 4, mt: 4, minWidth: '80px' }} onClick={handleSubmission} variant="contained" color='primary'>ADD PARKING LOT</Button>
                            </Stack>

                        </Paper>
                    </Grid>
                </ThemeProvider>

            </Grid >


        </div >
    );
}
export default AddParking;