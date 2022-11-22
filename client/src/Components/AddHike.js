import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {parseGPX} from '../Utils/GPX'
import SmootherTextField from './SmootherTextField';



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
            }
        },
    });

    const changeHandler = async (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        const gpx = await parseGPX(event.target.files[0]);

        console.log(gpx);
        //TO DO: add API.__ when api available
        setStartPointGPSlat(gpx.start_point_lat)
        setStartPointGPSlon(gpx.start_point_lon)
        setEndPointGPSlat(gpx.end_point_lat)
        setEndPointGPSlon(gpx.end_point_lon)
        setAscent(gpx.ascent);
        setLength(gpx.length);
        setExpectedTime(gpx.expectedTime);
        setPeakAltitude(gpx.peak_altitude)
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
    const handleSubmission = async (ev) => { //TO DO: replace comments by right api calls
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
                expectedTime:expectedTime,
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
                            <Grid  marginTop={3}>
                                <Chip label="1" color="primary" variant="filled"/>{"   "}
                                <Chip label="2" color="primary" variant="outlined"/>
                            </Grid>
{/*****************************************************UPLOAD FILE***********************************************/}
   
                            <Typography variant="h5" sx={thm}>
                                <br />Please upload a GPX file<br /><br />
                            </Typography>
                            <Button variant="contained" component="label" onChange={changeHandler}>
                                Upload
                                <input hidden accept=".gpx" multiple type="file" />
                            </Button>
                            {isSelected ? (
                                <div>
                                    <Typography><br />Filename: {selectedFile.name}</Typography>
                                </div>
                            ) : (
                                <Typography><br />Select a file to show details</Typography>
                            )}
                            <Typography> <br/> </Typography>
                            <Grid container >
{/*****************************************************START POINT***********************************************/}
                                <Grid xs={12} md={5.5} >
                                    <Typography align='center'>START POINT</Typography>
                                    <Grid marginBottom={1}>
                                        <SmootherTextField label="Description" setText={setStartPointDescription} required={true}/>
                                    </Grid>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Location type</InputLabel>
                                        <Select value={startPointType} label="Location Type" onChange={handleChange1}>
                                            <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                                            <MenuItem value={'address'}>Address</MenuItem>
                                            <MenuItem value={'name'}>Name</MenuItem>
                                        </Select>
                                        {startPointType === "gps" ? (
                                        <>
                                            <TextField variant="outlined" color='primary' label="Latitude" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPSlat}disabled /> 
                                            <TextField variant="outlined" color='primary' label="Longitude"   sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPSlon} disabled/> 
                                        </>
                                        ) : (
                                            <Grid></Grid>
                                        )}
                                        {startPointType === "address" ? (
                                            <SmootherTextField label="Start point" setText={setStartPointValue} required={startPointType === "address"}/>                                           
                                        ) : (
                                            <Grid></Grid>
                                        )}

                                        {startPointType === "name" ? (
                                            <SmootherTextField label="Start point" setText={setStartPointValue} required={startPointType === "name"}/>
                                        ) : (
                                            <Grid></Grid>
                                        )}
                                    </FormControl>
                                    
                                </Grid>
                                <Grid md={1}></Grid>
{/*****************************************************END POINT***********************************************/}

                                <Grid xs={12} md={5.5} >
                                    <Typography align='center'>END POINT</Typography>
                                    <Grid marginBottom={1}>
                                        <SmootherTextField label="Description" setText={setEndPointDescription} required={true}/>
                                    </Grid>

                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Location type</InputLabel>
                                        <Select value={endPointType} label="Location Type 2" onChange={handleChange2}>
                                            <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                                            <MenuItem value={'address'}>Address</MenuItem>
                                            <MenuItem value={'name'}>Name</MenuItem>
                                        </Select>
                                        {endPointType === "gps" ? (
                                        <>
                                            <TextField variant="outlined" color='primary' label="Latitude" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPSlat} disabled /> 
                                            <TextField variant="outlined" color='primary' label="Longitude"   sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPSlon} disabled/> 
                                        </>
                                        ) : (
                                            <Grid></Grid>
                                        )}
                                        {endPointType === "address" ? (
                                            <SmootherTextField label="End point" setText={setEndPointValue} required={endPointType === "address"}/>
                                        ) : (
                                            <Grid></Grid>
                                        )}

                                        {endPointType === "name" ? (
                                            <SmootherTextField label="End point" setText={setEndPointValue} required={endPointType === "name"}/>
                                        ) : (
                                            <Grid></Grid>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid> 

                            <Grid><br/></Grid> 

                        </Paper>
                    </Grid>

                    <Grid xs={0} md={3}></Grid>

                    <Grid xs={0.5} ></Grid>

                    <Grid xs={11} sx={thm}>

                        <Grid><br /></Grid>
{/****************************************************SUBMIT OR GO BACK***********************************************/}
                        {message &&
                            <><Alert  severity="error" onClose={() => setMessage('')}>{message}</Alert>
                            <Grid><br/></Grid>  </> 
                        }        
                        
                        <Button onClick={handleSubmission} variant="contained" color='primary' >CONTINUE</Button>
                        <Grid><br/></Grid>
                        <Button component={Link} to={"/local-guide-page"} variant="contained" color='secondary'>CANCEL</Button>
                        <Grid><br/><br/></Grid>
                    </Grid>

                    <Grid item xs={0.5}></Grid>

                </ThemeProvider>

            </Grid>

        </div>
    );
}

export default AddHike;