import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import API from '../API';
import { Hike } from "../Utils/Hike"
import Stack from '@mui/material/Stack';




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



//TO DO: REPLACE BY MAP
const refPoints = [
    'hut1',
    'hut2',
    'hut3',
    'hut4',
    'hut5',
    'hut6',
    'parking lot 1',
    'parking lot 2',
    'parking lot 3',
];


function getStyles(refPoints, referencePoint, theme) {

    return {
        fontWeight:
            referencePoint.indexOf(refPoints) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function AddHike2() {

    const [title, setTitle] = useState("");
    const [expectedTime, setExpectedTime] = useState(0.0);
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [referencePoint, setReferencePoint] = React.useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");

    const [selectedFile, setSelectedFile] = useState();

    //TO DO: When API available, exchange the comments
    //const length = API.length;
    const length = "15";

    //const totalAscent = API.ascent
    const totalAscent = "100"


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


    const changeExpectedTime = (t) => {
        if (t < 0) t = 0;
        setExpectedTime(t);
    }


    const handleSubmission = async (ev) => {
        ev.preventDefault();

    };


    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleChangeRefPoints = (event) => {
        const {
            target: { value },
        } = event;
        setReferencePoint(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
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
                                <Chip label="1" color="primary" variant="outlined"/>{"   "}
                                <Chip label="2" color="primary" variant="filled"/>
                            </Grid>
                            <Typography variant="h5" sx={thm}>
                                <br />Please describle the hike<br />
                            </Typography>
{/****************************************************GENERAL INFO***********************************************/}

                            <Typography variant="h6" sx={thm}>
                                <br />General information<br />
                            </Typography>

                            <Grid xs={12} sx={thm} marginBottom={1}>
                                {/*TITLE FIELD*/}
                                <TextField variant="outlined"  label="Title/label"  margin="normal"  sx={{ width: 'fit-content', maxWidth: '22ch' }} value={title} onChange={ev => setTitle(ev.target.value)} />
                            </Grid>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                {/*LENGTH FIELD*/}
                                <TextField variant="outlined" label="Length"  type="number"  sx={{ width: 'fit-content', maxWidth: '22ch' }}InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }}  value={length} disabled />
                                {/*TIME FIELD*/}
                                <TextField  variant="outlined" label="Expected time"  type="number" sx={{ width: 'fit-content', maxWidth: '22ch' }}  InputProps={{ endAdornment: <InputAdornment position="end">hours</InputAdornment>}}  value={expectedTime}  onChange={ev => changeExpectedTime(ev.target.value)}/>
                                {/*ASCENT FIELD*/}
                                <TextField variant="outlined" label="Total ascent"  type="number" sx={{ width: 'fit-content', maxWidth: '22ch' }} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment>}} value={totalAscent} disabled  />
                           
                            </Stack>
                            

                            <Grid xs={12} marginTop={2} sx={thm}>
                                {/*DIFFICULTY FIELD*/}
                                <FormControl sx={{ width: 'fit-content', minWidth: '21ch', maxWidth: '22ch' }} >
                                    <InputLabel>Difficulty</InputLabel>
                                    <Select
                                        value={difficulty}
                                        variant="outlined"
                                        onChange={e => setDifficulty(e.target.value)}
                                        label="Difficulty"
                                    >
                                        <MenuItem value="">
                                            <em>Select a difficulty</em>
                                        </MenuItem>
                                        <MenuItem value={"Tourist"}>Tourist</MenuItem>
                                        <MenuItem value={"Hiker"}>Hiker</MenuItem>
                                        <MenuItem value={"Professionnal Hiker"}>Professionnal Hiker</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                                    
{/******************************************GEOGRAPHICAL AREA***********************************************/}

                            <Typography variant="h6" sx={thm} marginBottom={1}>
                                <br />Geographical area<br />
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                {/*COUNTRY FIELD*/}
                                <TextField variant="outlined" label="Country"  sx={{ width: 'fit-content', maxWidth: '22ch' }} value={country} onChange={ev => setCountry(ev.target.value)}  />
                                {/*PROVINCE FIELD*/}
                                <TextField variant="outlined" label="Province"   sx={{ width: 'fit-content', maxWidth: '22ch' }} value={province}  onChange={ev => setProvince(ev.target.value)}  />
                                {/*CITY FIELD*/}
                                <TextField variant="outlined" label="City"  sx={{ width: 'fit-content', maxWidth: '22ch' }} value={city}  onChange={ev => setCity(ev.target.value)} />

                            </Stack>
{/****************************************************REFERENCE POINTS***********************************************/}
{/**********************************************TO REPLACE BY CLICKABLE MAP *****************************************/}
                            <Typography variant="h6" sx={thm} marginBottom={1}>
                                <br />Reference points<br />
                            </Typography>
                            <Grid xs={12} sx={thm}>
                                <FormControl sx={{ width: 'fit-content', minWidth: '21ch', maxWidth: '22ch' }}>
                                    <InputLabel>Reference Points</InputLabel>
                                    <Select
                                        multiple
                                        value={referencePoint}
                                        onChange={handleChangeRefPoints}
                                        input={<OutlinedInput label="Reference Points" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {refPoints.map((refPoints) => (
                                            <MenuItem
                                                key={refPoints}
                                                value={refPoints}
                                                style={getStyles(refPoints, referencePoint, theme)}
                                            >
                                                {refPoints}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

{/****************************************************DESCRIPTION********************************************************/}
       
                            <Typography variant="h6" sx={thm}>
                                <br />Description<br />
                            </Typography>
                            <TextField variant="outlined" label="Description"  multiline  rows={4}  margin="normal"  value={description}  onChange={ev => setDescription(ev.target.value)}  />

                            <Typography>
                                <br />
                            </Typography>

                        </Paper>
                    </Grid>

                    <Grid xs={0} md={3}></Grid>


                    <Grid xs={12} sx={thm}>

                        <Grid><br /></Grid>
{/****************************************************SUBMIT OR GO BACK***********************************************/}

                        <Button component={Link} to={"/local-guide-page"} onClick={handleSubmission} variant="contained" color='primary'>ADD HIKE</Button>
                        <Grid><br/></Grid>
                        <Button component={Link} to={"/local-guide-add-hikes1"} variant="contained" color='secondary'>GO BACK</Button>
                        <Grid><br/><br/></Grid>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    );
}
export default AddHike2;