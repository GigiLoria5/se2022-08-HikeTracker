import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MapLocator from '../Map/MapLocator';
import { floatInputSanitizer } from '../../Utils/InputSanitizer';
import { addParking } from '../../API/Parking'
import { Parking } from '../../Utils/Parking';
import { useNavigate } from "react-router-dom";
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';


const zoomLevel = 15;

function AddParking() {
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });

    const [message, setMessage] = useState("");
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [address, setAddress] = useState("");
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


    const handleSubmission = async (ev) => {
        ev.preventDefault();
        if (!country || !province || !city || !address) {
            setMessage("Parking lot geographical info missing");
            return;
        }
        if (!capacity) {
            setMessage("Parking lot capacity info missing");
            return;
        }
        //add capacity of parking here
        await addParking(new Parking("", city, province, country, position.lng, position.lat, address))
            .then(_a => navigate("/local-guide-page")).catch(err => { setMessage("Server error in creating parking"); });

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
                        <Typography variant="h5" marginTop={2}  sx={thm} align={'center'}>
                            ADD PARKING LOT
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={2}></Grid>

                    <Grid xs={12} md={8} marginTop={3} >
                        <Paper elevation={3} sx={{ mb: 4 }} >
                            
                                <Typography variant="h5" sx={thm} margin="normal" fontWeight={550}  marginBottom={2}>
                                    Specify a position
                                </Typography>

                                
                                <Typography variant="h6" sx={{ fontSize: 14, ...thm }} color="grey.700">
                                    Click on the map to define a parking lot
                                </Typography>
                                


                            <Grid container>
                                {/*MAP*/}
                                <Box component="div" width={"100%"} align='center' marginTop={1}>
                                    <Box>
                                        <MapLocator position={position} setPosition={setPosition} radius={null} height={'200px'} width={'500px'} initialLat={initialLat} initialLng={initialLng} zoomLevel={zoomLevel} />
                                    </Box>
                                </Box>

                                <Grid xs={12} sx={thm} >
                                    <Stack direction='row' justifyContent="center" alignItems="center" marginTop={2}>
                                        <TextField required variant="outlined" color='primary' label="Latitude" sx={{ width: '13ch', m: 1, mb: { xs: 0, sm: 1 } }} value={position ? `${position.lat}` : ""} onChange={(e) => handleChangeLat(e.target.value)}  />
                                        <TextField required variant="outlined" color='primary' label="Longitude" sx={{ width: '13ch', m: 1, mb: { xs: 0, sm: 1 } }} value={position ? `${position.lng}` : ""} onChange={(e) => handleChangeLng(e.target.value)}  />
                                    </Stack>

                                    < Stack direction='column'  align='center'>
                                        {/*COUNTRY FIELD*/}
                                        <Autocomplete
                                            required
                                            disablePortal
                                            id="combo-box-demo"
                                            options={countries}
                                            sx={{ m: 1, width: '28ch' }}
                                            onChange={(e, value) => {
                                                e.preventDefault();
                                                setCountry(value); setProvince(''); setCity('')
                                            }}
                                            renderInput={(params) => <TextField required {...params} label="Country" />}
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
                                                setProvince(value); setCity('')
                                            }}
                                            renderInput={(params) => <TextField {...params} required label="Province" />}
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
                                                setCity(value);
                                            }}
                                            renderInput={(params) => <TextField {...params} required label="City" />}
                                        />
                                        <TextField variant="outlined" required color='primary' label="Address" sx={{ width: '28ch', m: 1, mb: 1 }} value={address} onChange={(e) => setAddress(e.target.value)} />
                                        <TextField variant="outlined" required color='primary'  InputProps={{ inputProps: { min: "0", step: "1" } }} label="Capacity" sx={{ width: '28ch', m: 1, mb: 1 }} type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />

                                    </Stack>
                                    {message && <Alert sx={{ m: 1, width: 'fit-content', align: 'center'}} severity="error" onClose={() => setMessage('')}>{message}</Alert>}

                                </Grid>
                            </Grid>



                            {/****************************************************SUBMIT BUTTONS********************************************************/}
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button sx={{ m: 1, mb: 4, mt: 2, minWidth: '80px' }} component={Link} to={"/local-guide-page"} variant="outlined" color='error'>CANCEL</Button>
                                <Button sx={{ m: 1, mb: 4, mt: 2, minWidth: '80px' }} onClick={handleSubmission} variant="contained" color='primary'>ADD PARKING LOT</Button>
                            </Stack>

                        </Paper>
                    </Grid>
                </ThemeProvider>

            </Grid >


        </div >
    );
}
export default AddParking;