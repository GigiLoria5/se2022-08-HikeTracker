import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Autocomplete from '@mui/material/Autocomplete';
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
import { useLocation } from 'react-router-dom'
import API from '../API';
import { Hike } from "../Utils/Hike"
import Stack from '@mui/material/Stack';
import {getCountries, getProvincesByCountry, getCitiesByProvince} from '../Utils/GeoData'
import SmootherTextField from './SmootherTextField'
import { difficultyFromState } from '../Utils/HikesFilter';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import RefPointMapLocator from './Map/RefPointMapLocator';

import { getPoints } from '../Utils/GPX';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 350,
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

    const [points, setPoints] = useState([]);
    const {ascent, length, start_point, end_point, expectedTime, selectedFile, peak_altitude} = location.state;


    const Description = () => {
        const [localDescription, setLocalDescription] = React.useState(description);
        return <TextField 
            required 
            variant="outlined" 
            label="Description"  
            multiline  rows={4} 
            margin="normal"  
            value={localDescription}  
            onBlur={ev => {setDescription(ev.target.value)} }
            onChange={ev => {setLocalDescription(ev.target.value)}}
        />
    }

    const timeToHHMM = (t) => {
        const hh = Math.floor(t);
        const mm = (t - Math.floor(t))*60;
        return hh+":"+mm.toFixed(0);
    }

    
    

    useEffect(() => {
        getCountries().then(cn => {
            setCountries([...cn]);
        });

        getPoints(selectedFile).then(a => {
            setPoints([...a]);
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

    const addRefPoints = (lat, long) => {
        if(!addingRefPoint && !editingRefPoint){
            setAddingRefPoint(true);
            setRefPoints([...refPoints, {latitude:lat, longitude:long, description:"test"}])
            setRefPointLat(lat);
            setRefPointLon(long);
            setRefPointType("gps");
            setRefPointValue("gps");
            setRefPointDescription("");
        }
        
    }

    const addReferencePoint = () => {
        if(!refPointValue){
            setRefPointMessage("Missing required fields");
            return;
        }
        if(!refPointDescription){
            setRefPointMessage("Missing description");
            return;
        }
        const refPoint = {
            latitude:refPointLat,
            longitude:refPointLon,
            type:refPointType,
            value:refPointValue,
            description:refPointDescription
        };
        const oldPoints = referencePoint;
        setReferencePoint([...referencePoint, refPoint]);
        setRefPoints([...oldPoints, refPoint]);
        setAddingRefPoint(false);
        setEditingRefPoint(false);
    }

    const deleteReferencePoint = () => {
        setRefPoints([...referencePoint]);
        setAddingRefPoint(false);
        setEditingRefPoint(false);
    }
    

    const editRefPoint = (lat, lon) => {
        if(!refPointValue){
            setRefPointMessage("Missing required fields");
            return;
        }
        if(!refPointDescription){
            setRefPointMessage("Missing description");
            return;
        }
        if(!addingRefPoint && !editingRefPoint){
            const point = referencePoint.filter(a=> (a.latitude == lat && a.longitude == lon))[0];
            const points = referencePoint.filter(a=> (a.latitude != lat && a.lon != refPointLon));
            setReferencePoint([...points]);
            setRefPointLat(point.latitude);
            setRefPointLon(point.longitude);
            setRefPointDescription(point.description);
            setRefPointValue(point.value);
            setRefPointType(point.type);
            setEditingRefPoint(true);
        }
        
    }

    const handleSubmission = async (ev) => {
        console.log(referencePoint);
        ev.preventDefault();
        if(!title){
            setMessage("Hike title missing");
            return;
        }
        if(!difficulty){
            setMessage("Hike difficulty missing");
            return;
        }
        if(!country || !province || !city){
            setMessage("Hike geographical info missing");
            return;
        }
        if(!description){
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
            expectedTime,
            difficultyFromState(difficulty),
            start_point,
            end_point,
            referencePoint,
            selectedFile
        )
        API.createHike(hike).then(a=>navigate("/local-guide-page")).catch(err=>{setMessage("Server error in creating hike");});
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
                    <Grid xs={0} md={2}></Grid>    
                    <Grid xs={12} md={9} marginTop={3} >
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
                                <SmootherTextField text={title} setText={setTitle} label="Title" required={true}/>
                            </Grid>
                            <Grid xs={12} marginTop={2} sx={thm}>
                                <Stack margin={2} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                    {/*LENGTH FIELD*/}
                                    <TextField variant="outlined" label="Length"    sx={{ width: 'fit-content', maxWidth: '28ch' }}InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment>}}  value={length.toFixed(2)} disabled />
                                    {/*TIME FIELD*/}
                                    <TextField variant="outlined" label="Expected time" sx={{ width: 'fit-content', maxWidth: '28ch' }} InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment>}} value={timeToHHMM(expectedTime)} disabled  />                      
                                    {/*ASCENT FIELD*/}
                                    <TextField variant="outlined" label="Total ascent" sx={{ width: 'fit-content', maxWidth: '28ch' }} InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment>}} value={ascent.toFixed(2)} disabled  />
                            
                                </Stack>
                            </Grid>
                            
                            

                            

                            <Grid xs={12} margin={2} sx={thm}>
                                {/*DIFFICULTY FIELD*/}
                                <FormControl sx={{ width: 'fit-content', minWidth: '21ch', maxWidth: '22ch' }} >
                                    
                                    <InputLabel>Difficulty</InputLabel>
                                    <Select
                                        value={difficulty}
                                        variant="outlined"
                                        onChange={e => setDifficulty(e.target.value)}
                                        label="Difficulty"
                                        required
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
                            <Stack direction={{ xs: 'column', sm: 'row' }} >
                                {/*COUNTRY FIELD*/}
                                
                                <Autocomplete
                                    required
                                    disablePortal
                                    id="combo-box-demo"
                                    options={countries}
                                    sx={{ m:1, width: 200 }}
                                    onChange={e => {
                                        e.preventDefault();
                                        const name = e._reactName == "onKeyDown" ? e.target.value : e.target.textContent;
                                        setCountry(name); setProvince(''); setCity('')}}
                                    //onInputChange={e => {e.preventDefault(); setCountry(e.target.value); setProvince(''); setCity('')}}
                                    renderInput={(params) => <TextField {...params}  label="Country" />}
                                />
                                <Autocomplete
                                    required
                                    disabled={!(country)}
                                    disablePortal
                                    id="combo-box-demo2"
                                    options={provinces}
                                    key={country}
                                    sx={{ m:1, width: 200 }}
                                    onChange={e => {
                                        e.preventDefault(); 
                                        const name = e._reactName == "onKeyDown" ? e.target.value : e.target.textContent;
                                        setProvince(name); setCity('')}}
                                    //onInputChange={e => {e.preventDefault(); setProvince(e.target.value); setCity('')}} 
                                    renderInput={(params) => <TextField {...params}  label="Province/Region" />}
                                />
                                <Autocomplete
                                    required
                                    disabled={!(country&&province)}
                                    disablePortal
                                    id="combo-box-demo3"
                                    options={cities}
                                    key={[province, country]}
                                    sx={{ m:1, width: 200 }}
                                    onChange={e => {
                                        e.preventDefault();
                                        const name = e._reactName == "onKeyDown" ? e.target.value : e.target.textContent;
                                        setCity(name)}} 
                                    //onInputChange={e => {e.preventDefault(); setCity(e.target.value)}} 
                                    renderInput={(params) => <TextField {...params} label="City"/>}
                                />
                            </Stack>
{/****************************************************REFERENCE POINTS***********************************************/}
{/**********************************************TO REPLACE BY CLICKABLE MAP *****************************************/}
                            
                            
                            <Typography variant="h6" sx={thm} marginBottom={1}>
                                <br />Reference points<br />
                            </Typography>
                            <Typography sx={thm} marginBottom={1}>
                                Click on the map to add reference points<br />
                            </Typography>


                            <Grid xs={12} sx={thm}>
                                <Grid item style={{width: "300px"}} alignItems="center">
                                <RefPointMapLocator 
                                    position={{lat:start_point.latitude, lng:start_point.longitude}}
                                    height={'200px'}
                                    width={'300px'}
                                    initialLat={start_point.latitude}
                                    initialLng={start_point.longitude}
                                    zoomLevel={15}
                                    points={points}
                                    addRefPoints={addRefPoints}
                                    editRefPoint={editRefPoint}
                                    refpoints={refPoints}
                                    />
                                </Grid>
                                {(addingRefPoint || editingRefPoint)? <FormControl sx={{ m:3, width: 'fit-content', minWidth: '21ch', maxWidth: '22ch' }} >
                                    
                                    <InputLabel>Location type</InputLabel>
                                    <Select
                                        value={refPointType}
                                        variant="outlined"
                                        onChange={e => {
                                            setRefPointType(e.target.value);
                                            if(e.target.value=="gps"){
                                                setRefPointValue("gps");
                                            }
                                            else{
                                                setRefPointValue("");
                                            }}}
                                        label="Location type"
                                        required
                                    >
                                        <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                                        <MenuItem value={"address"}>Address</MenuItem>
                                        <MenuItem value={"name"}>Name</MenuItem>

                                    </Select>
                                    <SmootherTextField label="Description" text={refPointDescription} setText={setRefPointDescription} required={true}/>
                                    {refPointType === "gps" ? (
                                    <>
                                        <TextField variant="outlined" color='primary' label="Latitude" margin="normal" sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={refPointLat}disabled /> 
                                        <TextField variant="outlined" color='primary' label="Longitude"   sx={{ width: 'fit-content', maxWidth: '22ch' }}  value={refPointLon} disabled/> 
                 
                                    </>
                                    ) : (
                                        <Grid></Grid>
                                    )}
                                    {refPointType === "address" ? (
                                        <SmootherTextField label="Point address" text={refPointValue} setText={setRefPointValue} required={refPointType === "address"}/>                                           
                                    ) : (
                                        <Grid></Grid>
                                    )}

                                    {refPointType === "name" ? (
                                        <SmootherTextField label="Point name" text={refPointValue} setText={setRefPointValue} required={refPointType === "name"}/>
                                    ) : (
                                        <Grid></Grid>
                                    )}
                                    {refPointMessage &&
                                        <><Alert sx={{mt:1, mx:-5}} severity="error" onClose={() => setRefPointMessage('')}>{refPointMessage}</Alert>
                                        <Grid><br/></Grid>  </> 
                                    }
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Button sx={{ m:1, minWidth: '80px'}} onClick={addReferencePoint} variant="contained" color='primary'>{addingRefPoint? "ADD":"UPDATE"}</Button>
                                        <Button sx={{ m:1, minWidth: '80px'}} onClick={deleteReferencePoint} variant="contained" color='error'>{addingRefPoint? "CANCEL":"DELETE"}</Button>
                                    </Stack>
                                    
                                    
                                    
                                </FormControl> : <></>
                                
                                }
                                
                            </Grid>

{/****************************************************DESCRIPTION********************************************************/}
       
                            <Typography variant="h6" sx={thm}>
                                <br />Description<br />
                            </Typography>
                            < Description description={description} setDescription={setDescription}/>
                            

                            <Typography>
                                <br />
                            </Typography>

                        </Paper>
                    </Grid>

                    <Grid xs={0} md={3}></Grid>

                                            
                    <Grid xs={12} sx={thm}>

                        <Grid><br /></Grid>
{/****************************************************SUBMIT OR GO BACK***********************************************/}
                        {message &&
                            <><Alert  severity="error" onClose={() => setMessage('')}>{message}</Alert>
                            <Grid><br/></Grid>  </> 
                        }        
                        <Button onClick={handleSubmission} variant="contained" color='primary'>ADD HIKE</Button>
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