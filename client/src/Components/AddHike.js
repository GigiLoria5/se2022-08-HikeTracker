import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { RadioGroup, TextField } from '@mui/material';
import { Link } from "react-router-dom";


import Chip from '@mui/material/Chip';
import API from '../API';
import { Hike } from "../Utils/Hike"

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';




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
    
    const [startPointGPSlat, setStartPointGPSlat] = useState("");
    const [startPointGPSlon, setStartPointGPSlon] = useState("");

    const [startPointADD, setStartPointADD] = useState("");
    const [startPointNAME, setStartPointNAME] = useState("");

    const [endPointGPSlat, setEndPointGPSlat] = useState("");
    const [endPointGPSlon, setEndPointGPSlon] = useState("");

    const [endPointADD, setEndPointADD] = useState("");
    const [endPointNAME, setEndPointNAME] = useState("");


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

    const handleSubmission = async (ev) => {
        ev.preventDefault(); 
        const formData = new FormData();
        formData.append('File', selectedFile);  
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
                            <Typography>
                                <br />
                            </Typography>
                            <Grid container >

                                <Grid xs={12} md={5.5} >
                                    <FormControl>
                                        <RadioGroup defaultValue="gps" >
                                            <FormControlLabel value="gps" control={<Radio />} label="GPS coordinates" onClick={e => setSelectedValue(e.target.value)}/>
                                                {selectedValue === "gps" ? (
                                                <>
                                                    <TextField variant="outlined" color='primary' label="Start point - lattitude" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPSlat}disabled /> 
                                                    <TextField variant="outlined" color='primary' label="Start point - longitude"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPSlon} disabled/> 
                                                </>
                                                ) : (
                                                    <Grid></Grid>
                                                )}
                                                

                                            <FormControlLabel value="address" control={<Radio />} label="Address" onClick={e => setSelectedValue(e.target.value)}/>
                                                {selectedValue === "address" ? (
                                                    <TextField variant="outlined" color='primary' label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointADD} onChange={ev => setStartPointADD(ev.target.value)} /> 
                                                ) : (
                                                    <Grid></Grid>
                                                )}

                                            <FormControlLabel value="name" control={<Radio />} label="Name" onClick={e => setSelectedValue(e.target.value)}/>
                                                {selectedValue === "name" ? (
                                                    <TextField variant="outlined" color='primary' label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointNAME} onChange={ev => setStartPointNAME(ev.target.value)} /> 
                                                ) : (
                                                    <Grid></Grid>
                                                )}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid md={1}></Grid>
                                <Grid xs={12} md={5.5} >
                                    <FormControl>
                                        <RadioGroup defaultValue="gps" >
                                            <FormControlLabel value="gps" control={<Radio />} label="GPS coordinates" onClick={e => setSelectedValue2(e.target.value)}/>
                                                {selectedValue2 === "gps" ? (
                                                <>
                                                    <TextField variant="outlined" color='primary' label="End point - lattitude" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPSlat}disabled /> 
                                                    <TextField variant="outlined" color='primary' label="End point - longitude"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPSlon} disabled/> 
                                                </>
                                                ) : (
                                                    <Grid></Grid>
                                                )}
                                            <FormControlLabel value="address" control={<Radio />} label="Address" onClick={e => setSelectedValue2(e.target.value)}/>
                                                {selectedValue2 === "address" ? (
                                                    <TextField variant="outlined"  color='primary' label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointADD} onChange={ev => setEndPointADD(ev.target.value)} /> 
                                                ) : (
                                                    <Grid></Grid>
                                                )}

                                            <FormControlLabel value="name" control={<Radio />} label="Name" onClick={e => setSelectedValue2(e.target.value)}/>
                                                {selectedValue2 === "name" ? (
                                                    <TextField variant="outlined" color='primary' label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointNAME} onChange={ev => setEndPointNAME(ev.target.value)} /> 
                                                ) : (
                                                    <Grid></Grid>
                                                )}
                                        </RadioGroup>
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