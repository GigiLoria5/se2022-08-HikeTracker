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
    
    const [startPointGPS, setStartPointGPS] = useState("");
    const [startPointADD, setStartPointADD] = useState("");
    const [startPointNAME, setStartPointNAME] = useState("");

    const [endPointGPS, setEndPointGPS] = useState("");
    const [endPointADD, setEndPointADD] = useState("");
    const [endPointNAME, setEndPointNAME] = useState("");


    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [selectedValue, setSelectedValue] = useState("gps");
    const [selectedValue2, setSelectedValue2] = useState("gps");




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
    };

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
                                    <Typography>Size in bytes: {selectedFile.size}</Typography>
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
                                                    <TextField variant="outlined" color='primary' label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPS} onChange={ev => setStartPointGPS(ev.target.value)} /> 
                                                ) : (
                                                    <TextField variant="outlined"  label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointGPS} onChange={ev => setStartPointGPS(ev.target.value)} disabled/>
                                                )}

                                            <FormControlLabel value="address" control={<Radio />} label="Address" onClick={e => setSelectedValue(e.target.value)}/>
                                                {selectedValue === "address" ? (
                                                    <TextField variant="outlined" color='primary' label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointADD} onChange={ev => setStartPointADD(ev.target.value)} /> 
                                                ) : (
                                                    <TextField variant="outlined"  label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointADD} onChange={ev => setStartPointADD(ev.target.value)} disabled/>
                                                )}

                                            <FormControlLabel value="name" control={<Radio />} label="Name" onClick={e => setSelectedValue(e.target.value)}/>
                                                {selectedValue === "name" ? (
                                                    <TextField variant="outlined" color='primary' label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointNAME} onChange={ev => setStartPointNAME(ev.target.value)} /> 
                                                ) : (
                                                    <TextField variant="outlined"  label="Start point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={startPointNAME} onChange={ev => setStartPointNAME(ev.target.value)} disabled/>
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
                                                    <TextField variant="outlined" color='primary'  label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPS} onChange={ev => setEndPointGPS(ev.target.value)} /> 
                                                ) : (
                                                    <TextField variant="outlined"  label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointGPS} onChange={ev => setEndPointGPS(ev.target.value)} disabled/>
                                                )}

                                            <FormControlLabel value="address" control={<Radio />} label="Address" onClick={e => setSelectedValue2(e.target.value)}/>
                                                {selectedValue2 === "address" ? (
                                                    <TextField variant="outlined"  color='primary' label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointADD} onChange={ev => setEndPointADD(ev.target.value)} /> 
                                                ) : (
                                                    <TextField variant="outlined"  label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointADD} onChange={ev => setEndPointADD(ev.target.value)} disabled/>
                                                )}

                                            <FormControlLabel value="name" control={<Radio />} label="Name" onClick={e => setSelectedValue2(e.target.value)}/>
                                                {selectedValue2 === "name" ? (
                                                    <TextField variant="outlined" color='primary' label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointNAME} onChange={ev => setEndPointNAME(ev.target.value)} /> 
                                                ) : (
                                                    <TextField variant="outlined"  label="End point"  margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={endPointNAME} onChange={ev => setEndPointNAME(ev.target.value)} disabled/>
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