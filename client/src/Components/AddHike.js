import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";


import Chip from '@mui/material/Chip';
import API from '../API';
import { Hike } from "../Utils/Hike"


import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



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

    const [startPointADD, setStartPointADD] = useState("");
    const [startPointNAME, setStartPointNAME] = useState("");

    const [endPointGPSlat, setEndPointGPSlat] = useState("");
    const [endPointGPSlon, setEndPointGPSlon] = useState("");

    const [endPointADD, setEndPointADD] = useState("");
    const [endPointNAME, setEndPointNAME] = useState("");

    const [locationType, setLocationType] = useState("gps"); //for start point
    const [locationType2, setLocationType2] = useState("gps");// for end point


    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const [selectedValue, setSelectedValue] = useState("gps");
    const [selectedValue2, setSelectedValue2] = useState("gps");

    //to delete when api call available
    const start_point_lat = "12.3123123"
    const start_point_lon = "12.3123123"
    const end_point_lat = "12.3123123"
    const end_point_lon = "12.3123123"


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

    const changeHandler = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        //add API.__ when api available
        setStartPointGPSlat(start_point_lat)
        setStartPointGPSlon(start_point_lon)
        setEndPointGPSlat(end_point_lat)
        setEndPointGPSlon(end_point_lon)

    };

    const handleChange1 = (e) => {
        setSelectedValue(e.target.value)
        setLocationType(e.target.value)
    }
    const handleChange2 = (e) => {
        setSelectedValue2(e.target.value)
        setLocationType2(e.target.value)
    }

    const handleSubmission = async (ev) => {
        ev.preventDefault(); 
        
    };


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
                                        <TextField variant="outlined" margin='normal' color='primary' label="Description" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointDescription} onChange={ev => setStartPointDescription(ev.target.value)}/> 
                                    </Grid>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Location type</InputLabel>
                                        <Select value={locationType} label="Location Type" onChange={handleChange1}>
                                            <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                                            <MenuItem value={'address'}>Address</MenuItem>
                                            <MenuItem value={'name'}>Name</MenuItem>
                                        </Select>
                                        {selectedValue === "gps" ? (
                                        <>
                                            <TextField variant="outlined" color='primary' label="Start point - lattitude" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPSlat}disabled /> 
                                            <TextField variant="outlined" color='primary' label="Start point - longitude"   sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPSlon} disabled/> 
                                        </>
                                        ) : (
                                            <Grid></Grid>
                                        )}
                                        {selectedValue === "address" ? (
                                            <TextField variant="outlined" color='primary' label="Start point" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointADD} onChange={ev => setStartPointADD(ev.target.value)} /> 
                                        ) : (
                                            <Grid></Grid>
                                        )}

                                        {selectedValue === "name" ? (
                                            <TextField variant="outlined" color='primary' label="Start point" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointNAME} onChange={ev => setStartPointNAME(ev.target.value)} /> 
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
                                        <TextField variant="outlined" color='primary' margin='normal' label="Description" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointDescription} onChange={ev => setEndPointDescription(ev.target.value)}/> 
                                    </Grid>

                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Location type</InputLabel>
                                        <Select value={locationType2} label="Location Type 2" onChange={handleChange2}>
                                            <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                                            <MenuItem value={'address'}>Address</MenuItem>
                                            <MenuItem value={'name'}>Name</MenuItem>
                                        </Select>
                                        {selectedValue2 === "gps" ? (
                                        <>
                                            <TextField variant="outlined" color='primary' label="End point - lattitude" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPSlat}disabled /> 
                                            <TextField variant="outlined" color='primary' label="End point - longitude"   sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPSlon} disabled/> 
                                        </>
                                        ) : (
                                            <Grid></Grid>
                                        )}
                                        {selectedValue2 === "address" ? (
                                            <TextField variant="outlined" color='primary' label="End point" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointADD} onChange={ev => setEndPointADD(ev.target.value)} /> 
                                        ) : (
                                            <Grid></Grid>
                                        )}

                                        {selectedValue2 === "name" ? (
                                            <TextField variant="outlined" color='primary' label="End point" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointNAME} onChange={ev => setEndPointNAME(ev.target.value)} /> 
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

                    <Grid xs={0.5}></Grid>

                    <Grid xs={11} sx={thm}>

                        <Grid><br /></Grid>
{/****************************************************SUBMIT OR GO BACK***********************************************/}

                        <Button component={Link} to={"/local-guide-add-hikes2"} onClick={handleSubmission} variant="contained" color='primary' >CONTINUE</Button>
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