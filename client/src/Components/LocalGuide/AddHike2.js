import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Divider, TextField } from '@mui/material';
import { Link } from "react-router-dom";

import InputAdornment from '@mui/material/InputAdornment';
import { useLocation } from 'react-router-dom'
import API from '../../API';
import { Hike } from "../../Utils/Hike"
import Stack from '@mui/material/Stack';
import { getCountries, getProvincesByCountry, getCitiesByProvince } from '../../Utils/GeoData'
import SmootherTextField from '../SmootherTextField'
import { difficultyFromState } from '../../Utils/HikesFilter';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { getPoints } from '../../Utils/GPX';
import RefPointAdd from './AddHike/RefPointAdd';
import RefPointTable from './AddHike/RefPointTable';
import DifficultySelector from './AddHike/DifficultySelector';
import { timeToHHMM } from '../../Utils/TimeFormat';


function AddHike2() {
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [referencePoint, setReferencePoint] = React.useState([]);
    const [refPoints, setRefPoints] = React.useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");

    const location = useLocation();
    const [message, setMessage] = useState("");
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
    const [expectedTime, setExpectedTime] = useState(0);
    const [hh, setHH] = useState(0);
    const [mm, setMM] = useState(0);

    const [points, setPoints] = useState([]);
    const { ascent, length, start_point, end_point, computedExpectedTime, selectedFile, peak_altitude } = location.state;


    const Description = () => {
        const [localDescription, setLocalDescription] = React.useState(description);
        return <TextField
            required
            variant="outlined"
            label="Description"
            multiline rows={4}
            margin="normal"
            sx={{ width: "75%", maxWidth: "40ch" }}
            value={localDescription}
            onBlur={ev => { setDescription(ev.target.value) }}
            onChange={ev => { setLocalDescription(ev.target.value) }}
        />
    }


    useEffect(() => {
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

    const addRefPoints = (lat, long) => {
        if (!addingRefPoint && !editingRefPoint) {
            setAddingRefPoint(true);
            setRefPoints([...refPoints, { latitude: lat, longitude: long, description: "test" }])
            setRefPointLat(lat);
            setRefPointLon(long);
            setRefPointType("gps");
            setRefPointValue("gps");
            setRefPointDescription("");
            setRefPointMessage("");
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
        setReferencePoint([...referencePoint, refPoint]);
        setRefPoints([...oldPoints, refPoint]);
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
        if (!refPointValue) {
            setRefPointMessage("Missing required fields");
            return;
        }
        if (!refPointDescription) {
            setRefPointMessage("Missing description");
            return;
        }
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
        if (!title) {
            setMessage("Hike title missing");
            return;
        }
        if (!difficulty) {
            setMessage("Hike difficulty missing");
            return;
        }
        if (!country || !province || !city) {
            setMessage("Hike geographical info missing");
            return;
        }
        if (!description) {
            setMessage("Hike description missing");
            return;
        }
        const hike = new Hike(
            title,
            peak_altitude,
            city,
            province,
            country,
            description,
            ascent,
            length,
            computedExpectedTime > 0 ? computedExpectedTime : expectedTime,
            difficultyFromState(difficulty),
            start_point,
            end_point,
            referencePoint,
            selectedFile
        )
        API.createHike(hike).then(_a => navigate("/local-guide-page")).catch(err => { setMessage("Server error in creating hike"); });
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
                        <Typography variant="h4" marginTop={1} gutterBottom sx={thm}>
                            <br />ADD A HIKE
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={2}></Grid>
                    <Grid xs={12} md={8} marginTop={3} >
                        <Paper elevation={3} sx={{ ...thm, mb: 4 }} >
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
                            <Typography variant="h5" sx={thm}>
                                <br />Please describle the hike<br />
                            </Typography>
                            <Divider style={{ width: '100%' }} />

                            {/****************************************************GENERAL INFO***********************************************/}

                            <Typography variant="h6" sx={thm} margin={1}>
                                General information
                            </Typography>

                            {/*GENERAL INFO*/}
                            <Grid xs={12} sx={{ ...thm, mb: 2 }} >
                                {/*TITLE FIELD*/}
                                <SmootherTextField maxWidth='30ch' text={title} setText={setTitle} label="Title" required={true} />

                                {/*LENGTH FIELD*/}
                                <TextField margin="normal" variant="outlined" label="Length" sx={{ width: '30ch', maxWidth: '30ch' }} InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }} value={length.toFixed(2)} disabled />

                                {/*TIME FIELD*/}
                                {computedExpectedTime > 0 ?
                                    <TextField margin="normal" variant="outlined" label="Expected time" sx={{ width: '30ch', maxWidth: '30ch' }} InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }} value={timeToHHMM(computedExpectedTime)} disabled />
                                    :
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <TextField
                                            value={hh}
                                            onChange={(e) => {
                                                const regex = /^[0-9\b]+$/;
                                                if (regex.test(e.target.value)) {
                                                    if (e.target.value < 0) setHH(0);
                                                    else setHH(e.target.value);
                                                }
                                            }} margin="normal" type="number" InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment>, inputProps: { min: 0, step: 1, type: "number" } }} sx={{ width: '12ch', maxWidth: '13ch', m: 1 }} />
                                        <TextField
                                            value={mm}
                                            onChange={(e) => {
                                                const regex = /^[0-9\b]+$/;
                                                if (regex.test(e.target.value)) {
                                                    if (e.target.value > 59) setMM(59);
                                                    else if (e.target.value < 0) setMM(0);
                                                    else setMM(e.target.value);
                                                }
                                            }} margin="normal" type="number" InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment>, inputProps: { min: 0, max: 59, step: 1, type: "number" } }} sx={{ width: '13ch', maxWidth: '13ch', m: 1 }} step="1" />
                                    </Stack>
                                }

                                {/*ASCENT FIELD*/}
                                <TextField margin="normal" variant="outlined" label="Total ascent" sx={{ width: '30ch', maxWidth: '30ch' }} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} value={ascent.toFixed(2)} disabled />

                                {/*DIFFICULTY FIELD*/}
                                <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
                            </Grid>

                            <Divider style={{ width: '90%' }} />
                            {/******************************************GEOGRAPHICAL AREA***********************************************/}

                            <Typography variant="h6" sx={thm} margin={1}>
                                Geographical area
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'column' }} margin={1} marginBottom={2}>
                                {/*COUNTRY FIELD*/}

                                <Autocomplete
                                    required
                                    disablePortal
                                    id="combo-box-demo"
                                    options={countries}
                                    sx={{ m: 1, width: '28ch' }}
                                    onChange={e => {
                                        e.preventDefault();
                                        const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                        setCountry(name); setProvince(''); setCity('')
                                    }}
                                    renderInput={(params) => <TextField required {...params} label="Country" />}
                                />
                                <Autocomplete
                                    required
                                    disabled={!(country)}
                                    disablePortal
                                    id="combo-box-demo2"
                                    options={provinces}
                                    key={country}
                                    sx={{ m: 1, width: '28ch' }}
                                    onChange={e => {
                                        e.preventDefault();
                                        const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                        setProvince(name); setCity('')
                                    }}
                                    renderInput={(params) => <TextField required {...params} label="Province/Region" />}
                                />
                                <Autocomplete
                                    required
                                    disabled={!(country && province)}
                                    disablePortal
                                    id="combo-box-demo3"
                                    options={cities}
                                    key={[province, country]}
                                    sx={{ m: 1, width: '28ch' }}
                                    onChange={e => {
                                        e.preventDefault();
                                        const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                        setCity(name)
                                    }}
                                    renderInput={(params) => <TextField required {...params} label="City" />}
                                />
                            </Stack>

                            <Divider style={{ width: '90%' }} />

                            <Typography variant="h6" sx={thm} margin={1}>
                                Reference points
                            </Typography>
                            <Typography sx={thm} marginBottom={1}>
                                Click on the map to add reference points<br />
                            </Typography>


                            <Grid xs={12} sx={thm} margin={1}>
                                <RefPointAdd
                                    start_point={start_point}
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
                                <RefPointTable points={referencePoint} deletePoint={deleteRefPointCoord} canDelete={!addingRefPoint && !editingRefPoint} />
                            </Grid>

                            {/****************************************************DESCRIPTION********************************************************/}
                            <Divider style={{ width: '90%' }} />
                            <Typography variant="h6" sx={thm} margin={1}>
                                Description
                            </Typography>
                            < Description description={description} setDescription={setDescription} />


                            {message && <Alert sx={{ m: 1 }} severity="error" onClose={() => setMessage('')}>{message}</Alert>}

                            {/****************************************************SUBMIT BUTTONS********************************************************/}
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} onClick={handleSubmission} variant="contained" color='primary'>ADD HIKE</Button>
                                <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} component={Link} to={"/local-guide-add-hikes1"} variant="contained" color='secondary'>GO BACK</Button>
                            </Stack>

                        </Paper>
                    </Grid>
                </ThemeProvider>

            </Grid>


        </div>
    );
}
export default AddHike2;