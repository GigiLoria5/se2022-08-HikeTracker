import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import Chip from '@mui/material/Chip';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from "../API";




export default function AvailableHikesV2() {

    const [expanded, setExpanded] = React.useState(false);

    const listDifficulty = ['Tourist',' Hiker', 'Professionnal Hiker'];
    const listLength = ['0 - 5 km',' 5 - 15 km', 'More than 15 km'];
    const listAscent = ['0 - 300 m',' 300 - 600 m', '600 - 1000 m', 'More than 1000 m'];
    const listTime = ['0 - 1 h',' 1 - 3 h', '3 - 5 h', 'More than 5 h'];

    const [difficultyValue, setDificultyValue] = useState('');
    const [lengthValue, setLengthValue] = useState('');
    const [ascentValue, setAscentValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [hikes, setHikes] = useState([]);

    const theme = createTheme({
        palette: {
          primary: {
            main: '#008037',
          },
          secondary: {
            main: '#b0b0b0',
          },
        },
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    //Get from api the list of available countries to do hikes
    const getListCountries = () => {
        const listCountries = API.getCountries()
        //const listCountries = ['TO', 'AQ', 'CH', 'PE']

        return (
            listCountries
        )
    };
    
    //Get from api the list of available cities to do hikes
    const getListCities = (province) => {
        const listCities = API.getCitiesByProvince(province)
        //const listCities = ['TO', 'AQ', 'CH', 'PE']
        return (
            listCities
        )
    };

    //Get from api the list of available provinces to do hikes
    const getListProvinces = (country) => {
        //const listProvinces = ['TO', 'AQ', 'CH', 'PE']
        const listProvinces = API.getProvincesByCountry(country)
        return (
            listProvinces
        )
    };
    

    //Get from api the list of available hikes (no filter)
    const getListHikes = () => {
        /*
        setHikes([
            {
                id: 7,
                title: "Ring for Monte Calvo",
                peak_altitude: 1357,
                city: "Carignano",
                province: "Torino",
                country: "Italy",
                description: "It runs between ...",
                ascent: 320,
                track_length: 6.2,
                expected_time: 3.3,
                difficulty: "Tourist",
                start_point_type: "parking_lot",
                start_point_id: 3,
                end_point_type: "location",
                end_point_id: 18,
                start: [
                    {
                        id: 3,
                        city: "Carignano",
                        province: "Torino",
                        country: "Italy",
                        address: "SP138, 10041"
                    }
                ],
                end: [
                    {
                        id: 18,
                        value_type: "gps",
                        value: "45.462770631936834, 7.693279470138337",
                        description: "Mountain peak"
                    }
                ],
                reference_points: [
                    [
                        {
                        id: 17,
                        ref_point_type: "parking_lot",
                        city: "Carignano",
                        province: "Torino",
                        country: "Italy",
                        address: "SP138, 10041"
                        }
                    ],
                    [
                        {
                        id: 18,
                        ref_point_type: "location",
                        value_type: "address",
                        value: "SP138, 10041",
                        description: "Location description"
                        }
                    ],
                    [
                        {
                        id: 19,
                        ref_point_type: "hut",
                        name: "test hut", 
                        city: "Carignano",
                        province: "Torino",
                        country: "Italy",
                        address: "SP138, 10041",
                        phone_number: "0666450221", 
                        altitude: 100, 
                        description: "hut description", 
                        beds_number: 12, 
                        opening_period: "september - may"
                        }
                    ]
                ]
            },
            {
                id: 8,
                title: "Ring for Monte Calvo",
                peak_altitude: 1357,
                city: "Carignano",
                province: "Torino",
                country: "Italy",
                description: "It runs between ...",
                ascent: 320,
                track_length: 6.2,
                expected_time: 3.3,
                difficulty: "Tourist",
                start_point_type: "parking_lot",
                start_point_id: 3,
                end_point_type: "location",
                end_point_id: 18,
                start: [
                    {
                        id: 3,
                        city: "Carignano",
                        province: "Torino",
                        country: "Italy",
                        address: "SP138, 10041"
                    }
                ],
                end: [
                    {
                        id: 11,
                        value_type: "gps",
                        value: "45.462770631936834, 7.693279470138337",
                        description: "Mountain peak"
                    }
                ],
                reference_points: [
                    [
                        {
                        id: 17,
                        ref_point_type: "parking_lot",
                        city: "Carignano",
                        province: "Torino",
                        country: "Italy",
                        address: "SP138, 10041"
                        }
                    ],
                    [
                        {
                        id: 18,
                        ref_point_type: "location",
                        value_type: "address",
                        value: "SP138, 10041",
                        description: "Location description"
                        }
                    ],
                    [
                        {
                        id: 19,
                        ref_point_type: "hut",
                        name: "test hut", 
                        city: "Carignano",
                        province: "Torino",
                        country: "Italy",
                        address: "SP138, 10041",
                        phone_number: "0666450221", 
                        altitude: 100, 
                        description: "hut description", 
                        beds_number: 12, 
                        opening_period: "september - may"
                        }
                    ]
                ]
            }
        ])
        */

        setHikes(API.getHikesWithFilters(null, null, null, null, null, null, null))

    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setHikes(API.getHikesWithFilters(city, province, country, difficultyValue, lengthValue, ascentValue, timeValue))
        
    } 

    

    const cityDisabled = (province, country) => {
        let citySelect
        if (province && country ) {
            citySelect = 
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel>City</InputLabel>
                <Select
                    value={city}
                    label="City"
                    onChange={e => setCity(e.target.value)}
                >
                    <MenuItem value="">
                        <em>Select a city</em>
                    </MenuItem>
                    {getListCities(province).map((value) => { 
                        return(
                            <MenuItem value={value}>{value}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>;
        } else {
            citySelect = 
            <FormControl sx={{ m: 1, minWidth: 200 }} disabled>
                <InputLabel>City</InputLabel>
                <Select
                    value={city}
                    label="City"
                    onChange={e => setCity(e.target.value)}
                >
                    <MenuItem value="">
                        <em>Select a city</em>
                    </MenuItem>
                    {getListCities(province).map((value) => { 
                        return(
                            <MenuItem value={value}>{value}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        }
        
        return citySelect

    }

    const handleStartPointTypes = (value) => {
        let chipStartPoint
        if (value.start_point_type === "parking_lot"){
            chipStartPoint = <Chip label={[value.start[0].city, ' ', value.start[0].province, ' ',value.start[0].country, " : ", value.start[0].address]} color="primary" variant="outlined" />
        } else if (value.start_point_type === "location") {
            chipStartPoint = <Chip label={[value.start[0].description, " : ", value.start[0].value]} color="primary" variant="outlined" />        
        } else if (value.start_point_type === "hut") {
            chipStartPoint = <Chip label={[value.start[0].name, " ",value.start[0].city, ' ', value.start[0].province, ' ',value.start[0].country, " : ", value.start[0].address]} color="primary" variant="outlined" />
        }

        return chipStartPoint
    }

    const handleEndPointTypes = (value) => {
        let chipEndPoint
        if (value.end_point_type === "parking_lot"){
            chipEndPoint = <Chip label={[value.end[0].city, ' ', value.end[0].province, ' ',value.end[0].country, " : ", value.end[0].address]} color="primary" variant="outlined" />
        } else if (value.end_point_type === "location") {
            chipEndPoint = <Chip label={[value.end[0].description, " : ", value.end[0].value]} color="primary" variant="outlined" />        
        } else if (value.end_point_type === "hut") {
            chipEndPoint = <Chip label={[value.end[0].name, " ",value.end[0].city, ' ', value.end[0].province, ' ',value.end[0].country, " : ", value.end[0].address]} color="primary" variant="outlined" />
        }

        return chipEndPoint
    }

    const handleRef = (value) => {
        let tab = []
        for (var i = 0 ; i<value.reference_points.length; i++) {
            value.reference_points[i].map((valuee) => {
                let chipsRefPoints 
                console.log(valuee)
                //console.log(value.reference_points)
                if (valuee.ref_point_type === "parking_lot"){
                    chipsRefPoints = <Chip label={[valuee.city, ' ', valuee.province, ' ',valuee.country, " : ", valuee.address]} color="primary" variant="outlined" /> 
                } 
                else if (valuee.ref_point_type === "location") {
                    chipsRefPoints = <Chip label={[valuee.description, ' : ', valuee.value]} color="primary" variant="outlined" />
                }
                else if (valuee.ref_point_type === "hut") {
                    chipsRefPoints = <Chip label={[valuee.name, ' ',valuee.city, ' ', valuee.province, ' ',valuee.country, " : ", valuee.address]} color="primary" variant="outlined" />
                }
                return tab.push(chipsRefPoints)
            })
        }
        return tab
    }


    const provinceDisabled = (country) => {
        let provinceSelect
        if (country) {
            provinceSelect =
            <FormControl sx={{ m: 1, minWidth: 200 }} >
                <InputLabel>Province</InputLabel>
                <Select
                    value={province}
                    label="Province"
                    onChange={e => setProvince(e.target.value)}
                >
                    <MenuItem value="">
                        <em>Select a province</em>
                    </MenuItem>
                    {getListProvinces(country).map((value) => { 
                            return(
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                    })}
                </Select>
            </FormControl>
            

        } else {
            provinceSelect =
            <FormControl sx={{ m: 1, minWidth: 200 }} disabled>
                <InputLabel>Province</InputLabel>
                <Select
                    value={province}
                    label="Province"
                    onChange={e => setProvince(e.target.value)}
                >
                    <MenuItem value="">
                        <em>Select a province</em>
                    </MenuItem>
                    {getListProvinces(country).map((value) => { 
                            return(
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                    })}
                </Select>
            </FormControl>

        }
        return provinceSelect
    }
    

    return(
        <div>

            <Grid container>
                <ThemeProvider theme={theme}>


                    <Grid item xs={0.5}>
                    </Grid>
                    <Grid item xs={11} marginTop={2}>
                        <Typography variant="h4" marginTop={1} gutterBottom>
                            <br/>AVALAIBLE HIKES
                        </Typography>
                        <Grid containers item sm >

                            <Paper elevation={3}>
                                <form onSubmit={handleSubmit}>

                                <Accordion expanded={expanded === 'panel'} onChange={handleChange('panel')}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '102%', flexShrink: 0 }}>
                                        Geographical area
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormControl sx={{ m: 1, minWidth: 200 }} >
                                            <InputLabel>Country</InputLabel>
                                            <Select
                                                value={country}
                                                label="Country"
                                                onChange={e => setCountry(e.target.value)}
                                            >
                                                <MenuItem value="">
                                                    <em>Select a country</em>
                                                </MenuItem>
                                                {getListCountries().map((value) => { 
                                                    return(
                                                        <MenuItem value={value}>{value}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                        {provinceDisabled(country)}
                                        {cityDisabled(province, country)}
                                        
                                
                                    </AccordionDetails>
                                </Accordion>



                                <Accordion expanded={expanded === 'panelA'} onChange={handleChange('panelA')}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '102%', flexShrink: 0 }}>
                                        Difficulty
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <FormControl>
                                            <RadioGroup value={difficultyValue} onChange={e => setDificultyValue(e.target.value)}>
                                                {listDifficulty.map((value) => { 
                                                        return(
                                                            <FormControlLabel value={value} control={<Radio />} label={value}/>
                                                        );
                                                })}
                                            </RadioGroup>
                                        </FormControl>

                                    </AccordionDetails>
                                </Accordion>
                            
                                <Accordion expanded={expanded === 'panelB'} onChange={handleChange('panelB')}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '102%', flexShrink: 0 }} >
                                        Length
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormControl>
                                            <RadioGroup value={lengthValue} onChange={e => setLengthValue(e.target.value)}>
                                                {listLength.map((value) => { 
                                                        return(
                                                            <FormControlLabel value={value} control={<Radio />} label={value}/>
                                                        );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                        
                                        
                                    </AccordionDetails>
                                </Accordion>
                                
                                <Accordion expanded={expanded === 'panelC'} onChange={handleChange('panelC')}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '102%', flexShrink: 0 }} >
                                        Total ascent
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormControl>
                                            <RadioGroup value={ascentValue} onChange={e => setAscentValue(e.target.value)}>
                                                {listAscent.map((value) => { 
                                                        return(
                                                            <FormControlLabel value={value} control={<Radio />} label={value}/>
                                                        );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion>


                                <Accordion expanded={expanded === 'panelD'} onChange={handleChange('panelD')}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '102%', flexShrink: 0 }} >
                                        Expected time
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormControl>
                                            <RadioGroup value={timeValue} onChange={e => setTimeValue(e.target.value)}>
                                                {listTime.map((value) => { 
                                                        return(
                                                            <FormControlLabel value={value} control={<Radio />} label={value}/>
                                                        );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion>

                                <Grid containers marginTop={3}>
                                    <Button variant="outlined" type="submit" color='primary'>Apply filters</Button>
                                    <Typography> <br/></Typography>
                                    <Button variant="text" color='primary' onClick={e => getListHikes()}>See all hikes</Button>
                                </Grid>
                                </form>
                                <Grid containers>
                                    <br/>
                                </Grid>

                            </Paper>
                        </Grid>
                        <Grid containers marginTop={3}>
                            <br/>
                        </Grid>
                            

                        {hikes.map((value) => { 
                            return(
                                    <Accordion expanded={expanded === `panel-${value.id}`} onChange={handleChange(`panel-${value.id}`)}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            {value.title}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>{value.city}, {value.province}, {value.country}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography component={'div'}>
                                                Length : {value.track_length} km

                                                <br/><br/>
                                                Expected time : {value.expected_time} h

                                                <br/><br/>
                                                Total ascent : {value.ascent} m

                                                <br/><br/>
                                                Geographic area : 
                                                {" "}<Chip label={value.city} color="primary" variant="outlined" />
                                                {" "}<Chip label={value.province} color="primary" variant="outlined" />
                                                {" "}<Chip label={value.country} color="primary" variant="outlined" />
                        
                                                <br/><br/>
                                                Difficulty :  
                                                {" "}<Chip label={value.difficulty} color="primary" variant="outlined" />

                                                <br/><br/>
                                                Start point : 
                                                {" "}
                                                {handleStartPointTypes(value)}
                                                <br/><br/>
                                                End point : 
                                                {" "}
                                                {handleEndPointTypes(value)}                  
                                                <br/><br/>
                                                Reference points :         
                                                {" "}
                                                {handleRef(value).map((value) => { 
                                                    return value
                                                })}
                                                
                                                
                                                <br/><br/>

                                                Description : <br/>{value.description}
                                            
                                            
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                            );
                        })}
                        
                        <Typography variant="h5" gutterBottom>
                            <br/>
                        </Typography>

                    </Grid>
                    <Grid item xs={0.5}></Grid>
                </ThemeProvider>

            </Grid>

        </div>
    )
}
