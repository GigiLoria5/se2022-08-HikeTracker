import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../../API';
import { getAddressByCoordinates } from '../../API/Points.js'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Divider, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import SmootherTextField from '../SmootherTextField';

import RefPointAdd from './AddHike/RefPointAdd';
import RefPointTable from './AddHike/RefPointTable';
import DifficultySelector from './AddHike/DifficultySelector';

import { Hike } from "../../Utils/Hike";
import { Address, validateAddress, translateProvince } from '../../Utils/Address';
import { ResetErrors, PrintCheckErrors } from '../../Utils/PositionErrorMgmt';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData';
import { difficultyFromState } from '../../Utils/DifficultyMapping';
import { getPoints } from '../../Utils/GPX';
import { timeToHHMM } from '../../Utils/TimeUtils';
import { isValidImage } from '../../Utils/File';

const Description = (props) => {
    const [localDescription, setLocalDescription] = React.useState(props.description);
    return <TextField
        required
        variant="outlined"
        label="Description"
        multiline rows={4}
        margin="normal"
        sx={{ width: "75%", maxWidth: "40ch" }}
        value={localDescription}
        onBlur={ev => { props.setDescription(ev.target.value) }}
        onChange={ev => { setLocalDescription(ev.target.value) }}
    />
}

function AddHike2(props) {
    const [message, setMessage] = useState("");
    const [fileMessage, setFileMessage] = useState("");
    const setStepOneDone = props.setStepOneDone
    const computedExpectedTime = props.expectedTime
    const selectedImgFile = props.selectedImgFile;
    const setSelectedImgFile = props.setSelectedImgFile;
    const [isImgSelected, setIsImgSelected] = useState(false);

    const ascent = props.ascent
    const length = props.length

    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [referencePoint, setReferencePoint] = React.useState([]);
    const [refPoints, setRefPoints] = React.useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [expectedTime, setExpectedTime] = useState(0.0);
    const [location, setLocation] = useState("");
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

    const selectedFile = props.selectedFile
    const peak_altitude = props.peakAltitude
    const setNewHike = props.setNewHike

    const [refPointMessage, setRefPointMessage] = useState("");
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [refPointType, setRefPointType] = useState("gps");
    const [refPointValue, setRefPointValue] = useState("gps");
    const [refPointDescription, setRefPointDescription] = useState("");
    const [refPointLat, setRefPointLat] = useState(0);
    const [refPointLon, setRefPointLon] = useState(0);
    const [addingRefPoint, setAddingRefPoint] = useState(false);
    const [editingRefPoint, setEditingRefPoint] = useState(false);
    const [hh, setHH] = useState(0);
    const [mm, setMM] = useState(0);

    const [points, setPoints] = useState([]);

    const startPointDescription = props.startPointDescription
    const endPointDescription = props.endPointDescription

    const startPointGPSlat = props.startPointGPSlat
    const startPointGPSlon = props.startPointGPSlon

    const endPointGPSlat = props.endPointGPSlat
    const endPointGPSlon = props.endPointGPSlon

    const startPointType = props.startPointType
    const endPointType = props.endPointType

    const startPointValue = props.startPointValue
    const endPointValue = props.endPointValue

    useEffect(() => {
        getLocation();
        window.scrollTo(0, 0)
        getCountries().then(cn => {
            setCountries([...cn]);
        });

        getPoints(selectedFile).then(a => {
            setPoints([...a]);
        });

        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        const time = Number(hh) + (Number(mm) / 60)
        setExpectedTime(time)
    }, [hh, mm]);

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

    const getLocation = async () => {
        const addr = await getAddressByCoordinates(startPointGPSlon, startPointGPSlat);   // Get address information starting from coordinates
        setLocation(new Address(addr));
        autoFill(addr);
    }

    const autoFill = (loc) => {

        setCountry(loc.country);

        if (loc.country === "Italy") {
            setProvince(translateProvince(loc.county));
        } else {
            setProvince(loc.state);
        }

        setCity(loc.city);

    }

    const reset = async () => {
        const formValueClean = ResetErrors(formValues);
        setFormValues(formValueClean);
    }

    const printErrors = async (res) => {
        const formValueWithErrors = PrintCheckErrors(formValues, res);
        setFormValues(formValueWithErrors);
    }

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

    const start_point = {
        latitude: startPointGPSlat,
        longitude: startPointGPSlon,
        description: startPointDescription,
        type: startPointType,
        value: startPointValue
    };
    const end_point = {
        latitude: endPointGPSlat,
        longitude: endPointGPSlon,
        description: endPointDescription,
        type: endPointType,
        value: endPointValue
    };

    const addRefPoints = (lat, long) => {
        if (refPoints.filter(p => (p.latitude === lat && p.longitude === long)).length > 0) return;
        if (!addingRefPoint && !editingRefPoint) {
            setAddingRefPoint(true);
            setRefPoints([{ latitude: lat, longitude: long, description: "test" }, ...refPoints])
            setRefPointLat(lat);
            setRefPointLon(long);
            setRefPointType("gps");
            setRefPointValue("gps");
            setRefPointDescription("");
            setRefPointMessage("");
        }
        else {

            setRefPoints([{
                latitude: lat,
                longitude: long,
                description: refPointDescription,
                type: refPointType,
                value: refPointValue
            }, ...refPoints.slice(1)])
            setRefPointLat(lat);
            setRefPointLon(long);
        }
    }

    const deleteRefPointCoord = (lat, lon) => {
        const points = referencePoint.filter(a => (a.latitude !== lat && a.longitude !== lon));
        setReferencePoint([...points]);
        setRefPoints([...points])
    }

    const addReferencePoint = () => {
        if (!refPointValue) {
            setRefPointMessage("Missing required fields");
            return;
        }
        if (!refPointDescription) {
            setRefPointMessage("Missing description");
            return;
        }
        const refPoint = {
            latitude: refPointLat,
            longitude: refPointLon,
            type: refPointType,
            value: refPointValue,
            description: refPointDescription
        };
        const oldPoints = referencePoint;
        setReferencePoint([refPoint, ...referencePoint]);
        setRefPoints([refPoint, ...oldPoints]);
        setAddingRefPoint(false);
        setEditingRefPoint(false);
        setRefPointMessage("");
    }

    const deleteReferencePoint = () => {
        setRefPoints([...referencePoint]);
        setAddingRefPoint(false);
        setEditingRefPoint(false);
        setRefPointMessage("");
    }

    const editRefPoint = (lat, lon) => {
        if (!addingRefPoint && !editingRefPoint) {
            const point = referencePoint.filter(a => (a.latitude === lat && a.longitude === lon))[0];
            const points = referencePoint.filter(a => (a.latitude !== lat && a.longitude !== lon));
            setReferencePoint([...points]);
            setRefPointLat(point.latitude);
            setRefPointLon(point.longitude);
            setRefPointDescription(point.description);
            setRefPointValue(point.value);
            setRefPointType(point.type);
            setEditingRefPoint(true);
            setRefPointMessage("");
        }
    }

    const handleSubmission = async (ev) => {
        ev.preventDefault();

        if (selectedImgFile === null) {
            setMessage("Image not uploaded");
            return false;
        }

        const res = validateAddress(location, country, province, city); // res contains strings: "true" (no errors), "country", "province", "city" or "address"

        if (res === "true") {
            const hike = new Hike({
                title: title,
                peak_altitude: peak_altitude,
                city: city,
                province: province,
                country: country,
                description: description,
                ascent: ascent,
                track_length: length,
                expected_time: computedExpectedTime > 0 ? computedExpectedTime : expectedTime,
                difficulty: difficultyFromState(difficulty),
                start_point: start_point,
                end_point: end_point,
                reference_points: referencePoint,
                gpx: selectedFile,
                picture: selectedImgFile
            }
            )
            API.createHike(hike).then(_a => navigate("/hikes")).catch(err => { setMessage("Server error in creating hike"); });
        } else {
            printErrors(res);
            ev.stopPropagation();
        }
    };

    /* Function called on Upload press */
    const changeHandler = async (event) => {
        event.preventDefault();

        const imageCheck = isValidImage(event.target.files[0]);
        if (imageCheck === true) {
            setSelectedImgFile(event.target.files[0]);
            setIsImgSelected(true);
            setFileMessage("");
        } else {
            setSelectedImgFile(null);
            setIsImgSelected(false);
            setFileMessage(imageCheck);
        }
    };

    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <div>
            <Grid container >
                <ThemeProvider theme={theme} >
                    <Grid xs={12}>
                        <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                            Add Hike
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={2}></Grid>
                    <Grid xs={12} md={8} marginTop={3} >
                        <Paper elevation={3} sx={{ ...thm, mb: 4 }} component="form" onSubmit={handleSubmission} >
                            {/*****************************************************Bread Crumbs***********************************************/}
                            <Breadcrumbs separator="›" aria-label="breadcrumb" marginTop={3}>
                                [
                                <Typography key="3" color="inherit">
                                    Upload a GPX file
                                </Typography>,
                                <Typography key="3" color="primary">
                                    Hike Details
                                </Typography>,
                                ];
                            </Breadcrumbs>
                            {/*****************************************************INTRO***********************************************/}
                            <Typography variant="h5" sx={thm} margin="normal" fontWeight={550} marginTop={1}>
                                <br />Describe the Hike<br /><br />
                            </Typography>
                            <Stack direction="row" marginBottom={2} marginTop={1}>
                                <Typography sx={{ fontSize: 14 }} color="grey.700">
                                    Suggest an hike that does not already exist on HikeTracker.
                                </Typography>
                            </Stack>
                            <Divider style={{ width: '70%' }} />
                            {/*****************************************************UPLOAD IMAGE***********************************************/}
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} >
                                UPLOAD AN IMAGE
                            </Typography>
                            <Button variant="contained" margin={2} component="label" onChange={changeHandler}>
                                Choose a file...
                                <input hidden accept=".jpg, .png" type="file" />
                            </Button>
                            {fileMessage !== ""
                                ? <Alert sx={{ m: 2 }} severity="error" onClose={() => setFileMessage('')}>{fileMessage}</Alert>
                                : <Typography sx={thm} margin={2}>{isImgSelected ? `Filename : ${selectedImgFile.name}` : null}</Typography>
                            }
                            <Divider style={{ width: '70%' }} />
                            {/****************************************************GENERAL INFO***********************************************/}
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                GENERAL INFORMATION
                            </Typography>

                            {/*GENERAL INFO*/}
                            <Grid xs={12} sx={{ ...thm, mb: 2 }} >
                                {/*TITLE FIELD*/}
                                <SmootherTextField maxWidth='30ch' text={title} setText={setTitle} label="Title" required={true} />

                                {/*DIFFICULTY FIELD*/}
                                <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />

                                {/*LENGTH FIELD*/}
                                <TextField margin="normal" variant="outlined" label="Length" sx={{ width: '30ch', maxWidth: '30ch' }} InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }} value={length.toFixed(2)} disabled />

                                {/*TIME FIELD*/}
                                {computedExpectedTime > 0 ?
                                    <TextField margin="normal" variant="outlined" label="Expected time" sx={{ width: '30ch', maxWidth: '30ch' }} InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }} value={timeToHHMM(computedExpectedTime)} disabled />
                                    :
                                    <Stack direction="row" sx={{ width: '30ch' }} justifyContent='space-between'>
                                        <TextField
                                            label="Expected time h"
                                            value={hh}
                                            onChange={(e) => {
                                                const regex = /^[0-9\b]+$/;
                                                if (regex.test(e.target.value)) {
                                                    if (e.target.value < 0) setHH(0);
                                                    else setHH(e.target.value);
                                                }
                                            }} type="number" InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment>, inputProps: { min: 0, step: 1, type: "number" } }} sx={{ width: '14ch', maxWidth: '14ch', m: 1, ml: 0, verticalAlign: 'middle', display: 'inline-flex' }} />
                                        <TextField
                                            label="Expected time min"
                                            align="right"
                                            value={mm}
                                            onChange={(e) => {
                                                const regex = /^[0-9\b]+$/;
                                                if (regex.test(e.target.value)) {
                                                    if (e.target.value > 59) setMM(59);
                                                    else if (e.target.value < 0) setMM(0);
                                                    else setMM(e.target.value);
                                                }
                                            }} type="number" InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment>, inputProps: { min: 0, max: 59, step: 1, type: "number" } }} sx={{ width: '14ch', maxWidth: '14ch', m: 1, mr: 0, verticalAlign: 'middle', display: 'inline-flex' }} step="1" />
                                    </Stack>
                                }

                                {/*ASCENT FIELD*/}
                                <TextField margin="normal" variant="outlined" label="Total ascent" sx={{ width: '30ch', maxWidth: '30ch' }} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} value={ascent.toFixed(2)} disabled />

                            </Grid>

                            <Divider style={{ width: '70%' }} />
                            {/******************************************GEOGRAPHICAL AREA***********************************************/}

                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                GEOGRAPHICAL AREA
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'column' }} margin={1} marginBottom={2}>
                                {/*COUNTRY FIELD*/}

                                <Autocomplete
                                    required
                                    disablePortal
                                    id="combo-box-demo"
                                    options={countries}
                                    value={country !== "" ? country : null}
                                    sx={{ m: 1, width: '28ch' }}
                                    onChange={(e, value) => {
                                        e.preventDefault();
                                        setCountry(value); setProvince(''); setCity('');
                                        reset();
                                    }}
                                    renderInput={(params) => <TextField required {...params} label="Country" error={formValues.country.error} helperText={formValues.country.error && formValues.country.errorMessage} />}
                                />
                                <Autocomplete
                                    required
                                    disabled={!(country)}
                                    disablePortal
                                    id="combo-box-demo2"
                                    options={provinces}
                                    key={country}
                                    value={province !== "" ? province : null}
                                    sx={{ m: 1, width: '28ch' }}
                                    onChange={(e, value) => {
                                        e.preventDefault();
                                        setProvince(value); setCity('');
                                        reset();
                                    }}
                                    renderInput={(params) => <TextField required {...params} label="Province" error={formValues.province.error} helperText={formValues.province.error && formValues.province.errorMessage} />}
                                />
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
                                        reset();
                                    }}
                                    value={city !== "" ? city : null}
                                    renderInput={(params) => <TextField required {...params} label="City" error={formValues.city.error} helperText={formValues.city.error && formValues.city.errorMessage} />}
                                />
                            </Stack>

                            <Divider style={{ width: '70%' }} />

                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                REFERENCE POINTS
                            </Typography>
                            <Typography sx={thm} marginBottom={0} align="center">
                                Click on the map to add reference points on the track<br />
                                Click on a reference point to edit it
                            </Typography>

                            <Grid xs={12} sx={thm} margin={1}>
                                <RefPointAdd
                                    start_point={start_point}
                                    end_point={end_point}
                                    points={points}
                                    addRefPoints={addRefPoints}
                                    editRefPoint={editRefPoint}
                                    refPoints={refPoints}
                                    refPointType={refPointType}
                                    refPointValue={refPointValue}
                                    addingRefPoint={addingRefPoint}
                                    editingRefPoint={editingRefPoint}
                                    setRefPointValue={setRefPointValue}
                                    refPointMessage={refPointMessage}
                                    setRefPointType={setRefPointType}
                                    refPointDescription={refPointDescription}
                                    setRefPointMessage={setRefPointMessage}
                                    setRefPointDescription={setRefPointDescription}
                                    refPointLat={refPointLat}
                                    refPointLon={refPointLon}
                                    addReferencePoint={addReferencePoint}
                                    deleteReferencePoint={deleteReferencePoint}
                                />
                                <RefPointTable points={referencePoint} deletePoint={deleteRefPointCoord} editPoint={editRefPoint} canDelete={!addingRefPoint && !editingRefPoint} />
                            </Grid>

                            {/****************************************************DESCRIPTION********************************************************/}
                            <Divider style={{ width: '70%' }} />
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                DESCRIPTION
                            </Typography>
                            < Description description={description} setDescription={setDescription} />


                            {message && <Alert sx={{ m: 1 }} severity="error" onClose={() => setMessage('')}>{message}</Alert>}

                            {/****************************************************SUBMIT BUTTONS********************************************************/}
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} onClick={() => { setStepOneDone(false); setNewHike(false) }} variant="contained" color='secondary'>GO BACK</Button>
                                <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} type="submit" variant="contained" color='primary'>ADD HIKE</Button>
                            </Stack>

                        </Paper>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    );
}
export default AddHike2;