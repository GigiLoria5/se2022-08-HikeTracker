import React, {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import {Link} from "react-router-dom";


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import API from '../API';



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

function AddHike() {

    const [title, setTitle] = useState("");
    const [length, setLength] = useState(0.0);
    const [expectedTime, setExpectedTime] = useState(0.0);
    const [totalAscent, setTotalAscent] = useState(0);
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [referencePoint, setReferencePoint] = React.useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);


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


    const changeLength = (l) => {
        if(l<0) l=0;
        setLength(l);
    }

    const changeExpectedTime = (t) => {
        if(t<0) t=0;
        setExpectedTime(t);
    }

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const handleSubmission = async (ev) => {
        ev.preventDefault();

        await API.createHike(
            new API.Hike(
                title,
                0, //peak altitude is not requested in the form
                city,
                province,
                country,
                description,
                totalAscent,
                length,
                expectedTime,
                difficulty,
                "location", //start point and end point are not handled in terms of type + id (and needs APis to know the available ones)
                1,
                "location",
                2,
                referencePoint.map(r => r.position) //reference points must be translated in an array of numbers. Of course not in this way
            )
        )

		const formData = new FormData();

		formData.append('File', selectedFile);

        API.uploadFile(formData); //let's move the logic on API.js

/*
		fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',//find an api to host gpx files bc this one only hosts images
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
*/
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
        <Grid container>
            <ThemeProvider theme={theme}>
                <Grid xs={12}>
                    <Typography variant="h4" marginTop={1} gutterBottom>
                        <br/>ADD A HIKE
                    </Typography>
                </Grid>
                

                <Grid xs={0} md={3}></Grid>
                    
                <Grid  xs={12} md={6} marginTop={3}>
                        <Paper elevation={3}  sx = {{backgroundColor : theme.palette.secondary.main}} >
                            <Typography variant="h5">
                                <br/>Please complete the following information:<br/>
                            </Typography>

                            <Grid item xs={12}>
                                <TextField 
                                    variant="outlined" 
                                    label="Title/label"
                                    margin="normal"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    value={title}
                                    onChange={ev => setTitle(ev.target.value)}

                                />{" "}

                            </Grid>

                                <TextField 
                                    variant="outlined" 
                                    label="Length"
                                    margin="normal"
                                    type="number"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                    }}
                                    value={length}
                                    onChange={ev => changeLength(ev.target.value)}


                                />{" "}
                        
                                <TextField 
                                    variant="outlined" 
                                    label="Expected time"
                                    margin="normal"
                                    type="number"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                                    }}
                                    value={expectedTime}
                                    onChange={ev => changeExpectedTime(ev.target.value)}
                                />{" "}
                            
                                <TextField 
                                    variant="outlined" 
                                    label="Total ascent"
                                    margin="normal"
                                    type="number"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">m</InputAdornment>,
                                    }}
                                    value={totalAscent}
                                    onChange={ev => setTotalAscent(ev.target.value)}
                                />{" "}
                    
                                <TextField 
                                    variant="outlined" 
                                    label="Country"
                                    margin="normal"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    value={country}
                                    onChange={ev => setCountry(ev.target.value)}

                                />{" "}
                            
                                <TextField 
                                    variant="outlined" 
                                    label="Province"
                                    margin="normal"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    value={province}
                                    onChange={ev => setProvince(ev.target.value)}

                                />{" "}
                           
                                <TextField 
                                    variant="outlined" 
                                    label="City"
                                    margin="normal"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    value={city}
                                    onChange={ev => setCity(ev.target.value)}

                                />{" "}
                        
                                <TextField 
                                    variant="outlined" 
                                    label="Start point"
                                    margin="normal"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    value={startPoint}
                                    onChange={ev => setStartPoint(ev.target.value)}

                                />{" "}

                                <TextField 
                                    variant="outlined" 
                                    label="End point"
                                    margin="normal"
                                    sx={{ width: 'fit-content', maxWidth: '25ch' }}
                                    value={endPoint}
                                    onChange={ev => setEndPoint(ev.target.value)}

                                />{" "}

                                <Grid xs={12}>
                                    <FormControl sx={{ width: 'fit-content', minWidth:'21ch', maxWidth: '25ch' }}>
                                        <InputLabel>Reference Points</InputLabel>
                                        <Select
                                        multiple
                                        value={referencePoint}
                                        onChange={handleChangeRefPoints}
                                        input={<OutlinedInput  label="Reference Points" />}
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

                                <Grid  xs={12} marginTop={1} > 
                                    <FormControl sx={{width: 'fit-content' , minWidth:'21ch', maxWidth: '25ch'}} >
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

                                <TextField 
                                    variant="outlined" 
                                    label="Description"
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    sx={{width: 'fit-content', maxWidth: '25ch' }}
                                    value={description}
                                    onChange={ev => setDescription(ev.target.value)}
                                />{" "}

                                <Typography>
                                    <br/>
                                </Typography>

                        </Paper>
                </Grid>
                <Grid xs={0} md={3}></Grid>


                <Grid  xs={0} md={3} ></Grid>
                <Grid  xs={12} md={6} marginTop={3}>
                    <Paper elevation={3}  sx = {{backgroundColor : theme.palette.secondary.main}} >
                        <Typography variant="h5">
                            <br/>Upload a GPX file<br/><br/>
                        </Typography>
                        <Button variant="contained" component="label" onChange={changeHandler} >
                             Upload
                            <input hidden accept=".gpx" multiple type="file" />  
                        </Button>
                        {isSelected ? (
                            <div>
                                <Typography><br/>Filename: {selectedFile.name}</Typography>
                                <Typography>Size in bytes: {selectedFile.size}</Typography>
                                <Typography>
                                    Last Modified Date:{' '}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </Typography>
                            </div>
                        ) : (
                            <Typography><br/>Select a file to show details</Typography>
                        )}
                        <Typography>
                            <br/>
                        </Typography>
                            
                    </Paper>
                </Grid>
                <Grid  xs={0} md={3}></Grid>

                <Grid  xs={0.5}></Grid>
                <Grid  xs={11}>
                    <Grid><br/></Grid>
                    <Button onClick={handleSubmission} variant="contained" color='primary'>ADD A HIKE</Button>
                    <Grid><br/></Grid>
                    <Button component={Link} to={"/local-guide-page"} variant="contained" color='secondary'>CANCEL</Button>
                    <Typography>
                        <br/><br/>
                    </Typography>
                </Grid>
                <Grid item xs={0.5}></Grid>

            </ThemeProvider>


        </Grid>
        
    </div>
    );
}

export default AddHike;