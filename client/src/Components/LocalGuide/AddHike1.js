import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import UiLink from '@mui/material/Link'

import Alert from '@mui/material/Alert';
import { checkValidGPX, parseGPX } from '../../Utils/GPX'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import PointsInput from './AddHike/PointsInput';



function AddHike1(props) {
    const [message, setMessage] = useState("");

    const setStepOneDone=props.setStepOneDone

    const setExpectedTime=props.setExpectedTime
    const setAscent=props.setAscent
    const setLength=props.setLength

    const selectedFile=props.selectedFile
    const setSelectedFile=props.setSelectedFile
    const setPeakAltitude=props.setPeakAltitude
    const newHike = props.newHike

    const [isSelected, setIsSelected] = useState(false);

    const startPointDescription=props.startPointDescription
    const setStartPointDescription=props.setStartPointDescription
    const endPointDescription=props.endPointDescription
    const setEndPointDescription=props.setEndPointDescription

    const startPointGPSlat=props.startPointGPSlat
    const setStartPointGPSlat=props.setStartPointGPSlat
    const startPointGPSlon=props.startPointGPSlon
    const setStartPointGPSlon=props.setStartPointGPSlon

    const endPointGPSlat=props.endPointGPSlat
    const setEndPointGPSlat=props.setEndPointGPSlat
    const endPointGPSlon=props.endPointGPSlon
    const setEndPointGPSlon=props.setEndPointGPSlon

    const startPointType=props.startPointType
    const setStartPointType=props.setStartPointType
    const endPointType=props.endPointType
    const setEndPointType=props.setEndPointType

    const startPointValue=props.startPointValue
    const setStartPointValue=props.setStartPointValue
    const endPointValue=props.endPointValue
    const setEndPointValue=props.setEndPointValue


    const prevStartPoint = {
        latitude: startPointGPSlat,
        longitude: startPointGPSlon,
        description: startPointDescription,
        type: startPointType,
        value: startPointValue
    };

    const prevEndPoint = {
        latitude: endPointGPSlat,
        longitude: endPointGPSlon,
        description: endPointDescription,
        type: endPointType,
        value: endPointValue
    };



    useEffect(() => {
        window.scrollTo(0, 0)
        if (newHike === false) {
            setSelectedFile(selectedFile);
            setIsSelected(true);
            setStartPointDescription(prevStartPoint.description);
            setStartPointGPSlat(prevStartPoint.latitude);
            setStartPointGPSlon(prevStartPoint.longitude);
            setStartPointType(prevStartPoint.type);
            setStartPointValue(prevStartPoint.value);
            setEndPointDescription(prevEndPoint.description)
            setEndPointGPSlat(prevEndPoint.latitude);
            setEndPointGPSlon(prevEndPoint.longitude);
            setEndPointType(prevEndPoint.type);
            setEndPointValue(prevEndPoint.value);
            parseGPX(selectedFile).then(
                gpx => {
                    setAscent(gpx.ascent);
                    setLength(gpx.length);
                    setExpectedTime(gpx.expectedTime);
                    setPeakAltitude(gpx.peak_altitude)
                }
            );
        }
        // eslint-disable-next-line
    }, [newHike]);

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
            },
            fourth: {
                main: "#701f1f"
            }
        },
    });


    /* Function called on Upload press */
    const changeHandler = async (event) => {
        event.preventDefault();
        if (checkValidGPX(await event.target.files[0].text())) {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
            const gpx = await parseGPX(event.target.files[0]);
            setStartPointGPSlat(gpx.start_point_lat)
            setStartPointGPSlon(gpx.start_point_lon)
            setEndPointGPSlat(gpx.end_point_lat)
            setEndPointGPSlon(gpx.end_point_lon)
            setAscent(gpx.ascent);
            setLength(gpx.length);
            setExpectedTime(gpx.expectedTime);
            setPeakAltitude(gpx.peak_altitude)
            setMessage("")
        }
        else {
            setSelectedFile(null);
            setIsSelected(false);
            setMessage("Invalid GPX file")
        }

    };

    /* Function called on start point input click (PointsInput component) */
    const handleChange1 = (e) => {
        setStartPointType(e.target.value)
        if (e.target.value === "gps") {
            setStartPointValue("gps")
        }
        else {
            setStartPointValue("")
        }
    }

    /* Function called on end point input click (PointsInput component) */
    const handleChange2 = (e) => {
        setEndPointType(e.target.value)
        if (e.target.value === "gps") {
            setEndPointValue("gps")
        }
        else {
            setEndPointValue("")
        }
    }

    const handleSubmission = async (ev) => {
        ev.preventDefault();

        if (checkForm()) {
            setStepOneDone(true)
        }
    }
    /* Functions called on form submit */
    const checkForm = () => {
        if (selectedFile == null) {
            setMessage("GPX file not uploaded");
            return false;
        }
        if (!startPointDescription || !endPointDescription) {
            setMessage("Missing point description(s)");
            return false;
        }
        if (!startPointValue || !endPointValue) {
            setMessage("Missing point attribute(s)");
            return false;
        }
        return true;
    }
   
    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 1
    };

    return (
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12}>
                        <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                            Add Hike
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={3}></Grid>
                    <Grid xs={12} md={6} marginTop={3} >
                        <Paper elevation={3} sx={{ ...thm }} >
                            <Breadcrumbs separator="›" aria-label="breadcrumb" marginTop={3}>
                                [
                                <Typography key="3" color="primary"> Upload a GPX file </Typography>,
                                <Typography key="3" color="inherit"> Hike Details </Typography>,
                                ];
                            </Breadcrumbs>
                            {/*****************************************************UPLOAD FILE***********************************************/}

                            <Typography variant="h5" sx={thm} margin="normal" fontWeight={550} marginTop={1}>
                                <br />Upload a GPX file<br /><br />
                            </Typography>

                            <Stack direction="row" marginBottom={2}>
                                <Typography sx={{ fontSize: 14 }} href="https://www.gpxgenerator.com" color="grey.700">
                                    Don't have one? You can create it on
                                    <UiLink sx={{ ml: .5 }} underline="always" color="grey.700" target="_blank" rel="noopener" href="https://www.gpxgenerator.com">
                                        GPX Generator
                                    </UiLink>
                                </Typography>
                            </Stack>
                            <Divider style={{ width: '70%' }} />
                            <Button sx={{ mt: 2 }} variant="contained" component="label" onChange={changeHandler}>
                                Choose a file...
                                <input hidden accept=".gpx" multiple type="file" />
                            </Button>
                            {isSelected ? (
                                <div>
                                    <Typography sx={thm} margin={2}>Filename: {selectedFile && selectedFile.name}</Typography>
                                    <Divider variant="middle" />
                                    <Grid container >
                                        {/*****************************************************START POINT***********************************************/}

                                        <Grid xs={12} sx={thm}>
                                            <Typography align='center' variant="h6" fontWeight={520} margin={2}>START POINT</Typography>
                                            <PointsInput
                                                pointType={startPointType}
                                                pointValue={startPointValue}
                                                pointGPSlat={startPointGPSlat}
                                                pointGPSlon={startPointGPSlon}
                                                description={startPointDescription}
                                                handleChange={handleChange1}
                                                setPointValue={setStartPointValue}
                                                setPointDescription={setStartPointDescription} />
                                        </Grid>
                                        {/*****************************************************END POINT***********************************************/}

                                        <Grid xs={12} sx={thm}>
                                            <Typography align='center' variant="h6" fontWeight={520} margin={2}>END POINT</Typography>
                                            <PointsInput
                                                pointType={endPointType}
                                                pointValue={endPointValue}
                                                pointGPSlat={endPointGPSlat}
                                                pointGPSlon={endPointGPSlon}
                                                description={endPointDescription}
                                                handleChange={handleChange2}
                                                setPointValue={setEndPointValue}
                                                setPointDescription={setEndPointDescription} />
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : (
                                <Typography sx={{ mb: 2, mt: 1 }}>Select a file to continue</Typography>
                            )}

                            {/****************************************************SUBMIT OR GO BACK***********************************************/}

                            {message && <Alert sx={{ mb: 1 }} severity="error" onClose={() => setMessage('')}>{message}</Alert>}

                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} component={Link} to={"/"} variant="outlined" color='error'>CANCEL</Button>
                                <Button sx={{ m: 1, mb: 2, minWidth: '80px' }} onClick={handleSubmission} variant="contained" color='primary' disabled={!isSelected}>CONTINUE</Button>
                            </Stack>
                        </Paper>
                    </Grid>

                </ThemeProvider>

            </Grid>

        </div>
    );
}

export default AddHike1;