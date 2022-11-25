import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UiLink from '@mui/material/Link'

import Alert from '@mui/material/Alert';
import {checkValidGPX, parseGPX} from '../../Utils/GPX'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import PointsInput from './AddHike/PointsInput';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function AddHike() {
    const [startPointDescription, setStartPointDescription] = useState("");
    const [endPointDescription, setEndPointDescription] = useState("");


    const [startPointGPSlat, setStartPointGPSlat] = useState("");
    const [startPointGPSlon, setStartPointGPSlon] = useState("");

    const [endPointGPSlat, setEndPointGPSlat] = useState("");
    const [endPointGPSlon, setEndPointGPSlon] = useState("");

    const [startPointType, setStartPointType] = useState("gps"); //for start point
    const [endPointType, setEndPointType] = useState("gps");// for end point

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const [startPointValue, setStartPointValue] = useState("gps");
    const [endPointValue, setEndPointValue] = useState("gps");

    const [ascent, setAscent] = useState(0);
    const [length, setLength] = useState(0);
    const [message, setMessage] = useState("");
    const [expectedTime, setExpectedTime] = useState(0.0);
    const [peakAltitude, setPeakAltitude] = useState(0);
    


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

    const changeHandler = async (event) => {
        event.preventDefault();
        if(checkValidGPX(await event.target.files[0].text())){
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
        else{
            setSelectedFile(null);
            setIsSelected(false);
            setMessage("Invalid GPX file")
        }
        
    };


    const handleChange1 = (e) => {
        setStartPointType(e.target.value)
        if(e.target.value == "gps"){
            setStartPointValue("gps")
        }
        else{
            setStartPointValue("")
        }
    }
    const handleChange2 = (e) => {
        setEndPointType(e.target.value)
        if(e.target.value == "gps"){
            setEndPointValue("gps")
        }
        else{
            setEndPointValue("")
        }
    }

    const navigate = useNavigate();
    const checkForm = () =>{
        if(selectedFile == null){
            setMessage("GPX file not uploaded");
            return false;
        }
        if(!startPointDescription || !endPointDescription){
            setMessage("Missing point description(s)");
            return false;
        }
        if(!startPointValue || !endPointValue){
            setMessage("Missing point attribute(s)");
            return false;
        }
        return true;
    }
    const handleSubmission = async (ev) => { 
        ev.preventDefault();
        if(checkForm()){
            navigate("/local-guide-add-hikes2", {
            state : {
                ascent:ascent, 
                length:length, 
                start_point:{
                    latitude:startPointGPSlat,
                    longitude:startPointGPSlon,
                    description:startPointDescription,
                    type:startPointType,
                    value:startPointValue
                    }, 
                end_point:{
                    latitude:endPointGPSlat,
                    longitude:endPointGPSlon,
                    description:endPointDescription,
                    type:endPointType,
                    value:endPointValue
                    },
                computedExpectedTime:expectedTime,
                peak_altitude:peakAltitude,
                selectedFile:selectedFile
            }
            })
        }
        else{

        }
        
    }


    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };




    return (
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12}>
                        <Typography variant="h4" marginTop={1} gutterBottom sx={thm}>
                            <br />ADD A HIKE
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={3}></Grid>    
                    <Grid xs={12} md={6} marginTop={3} >
                        <Paper elevation={3} sx={{  ...thm }} >
                        <Breadcrumbs separator="›" aria-label="breadcrumb" marginTop={3}>
                            [
                                <Typography key="3" color="primary"> Upload a GPX file </Typography>,
                                <Typography key="3" color="inherit"> Hike Details </Typography>,
                            ];
                        </Breadcrumbs>
{/*****************************************************UPLOAD FILE***********************************************/}
   
                            <Typography variant="h5" sx={thm} margin="normal">
                                <br />Please upload a GPX file<br /><br />
                            </Typography>
                            <Stack direction="row">
                                <Typography sx={{ fontSize: 14 }} href="https://www.gpxgenerator.com" color="error">
                                    Don't have one? You can create it on 
                                    <UiLink sx={{ml:.5}}underline="always" color="error" target="_blank" rel="noopener" href="https://www.gpxgenerator.com">
                                    gpxparser
                                    </UiLink>
                                </Typography>
                            </Stack>
                            <Divider style={{width:'100%'}} />
                            <Button sx={{mt:3}} variant="contained" component="label" onChange={changeHandler}>
                                Upload
                                <input hidden accept=".gpx" multiple type="file" />
                            </Button>
                            {isSelected ? (
                                <div>
                                    <Typography sx={thm} margin={2}>Filename: {selectedFile.name}</Typography>
                                    <Divider variant="middle" />
                                    <Grid container >
 {/*****************************************************START POINT***********************************************/}

                                        <Grid xs={12} sx={thm}>
                                            <Typography align='center' margin={2}>START POINT</Typography>
                                            <PointsInput 
                                                pointType={startPointType}
                                                pointValue={startPointValue}
                                                pointGPSlat={startPointGPSlat}
                                                pointGPSlon={startPointGPSlon} 
                                                handleChange={handleChange1}
                                                setPointValue={setStartPointValue}
                                                setPointDescription={setStartPointDescription}/>
                                        </Grid>
        {/*****************************************************END POINT***********************************************/}

                                        <Grid xs={12} sx={thm}>
                                            <Typography align='center' margin={2}>END POINT</Typography>
                                            <PointsInput 
                                                pointType={endPointType}
                                                pointValue={endPointValue}
                                                pointGPSlat={endPointGPSlat}
                                                pointGPSlon={endPointGPSlon} 
                                                handleChange={handleChange2}
                                                setPointValue={setEndPointValue}
                                                setPointDescription={setEndPointDescription}/>
                                        </Grid>
                                    </Grid> 
                                </div>
                            ) : (
                                <Typography sx={{mb:2, mt:1}}>Select a file to show details</Typography>
                            )}
                            
                            {/****************************************************SUBMIT OR GO BACK***********************************************/}

                            {message && <Alert sx={{mb:1}} severity="error" onClose={() => setMessage('')}>{message}</Alert>}        

                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button sx={{ m:1, mb:2, minWidth: '80px'}} onClick={handleSubmission} variant="contained" color='primary' disabled={!isSelected}>CONTINUE</Button>
                                <Button sx={{ m:1, mb:2, minWidth: '80px'}} component={Link} to={"/local-guide-page"} variant="contained" color='secondary'>CANCEL</Button>
                            </Stack>
                            <Grid><br/><br/></Grid>
                        </Paper>
                    </Grid>
                    <Grid xs={11} sx={thm}>

                        <Grid><br /></Grid>

                    </Grid>
                </ThemeProvider>

            </Grid>

        </div>
    );
}

export default AddHike;