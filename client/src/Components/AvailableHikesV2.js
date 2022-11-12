import React, { useState } from 'react';
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

import Map from './Map';




export default function AvailableHikesV2(props) {

    const [expanded, setExpanded] = React.useState(false);

    const listDifficulty = ['Tourist', ' Hiker', 'Professionnal Hiker'];
    const listLength = ['0 - 5 km', ' 5 - 15 km', 'More than 15 km'];
    const listAscent = ['0 - 300 m', ' 300 - 600 m', '600 - 1000 m', 'More than 1000 m'];
    const listTime = ['0 - 1 h', ' 1 - 3 h', '3 - 5 h', 'More than 5 h'];

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
        //here get the list from the API, for now I created one bc i don't have the api
        const listCountries = ['Italy', 'France']
        return (
            listCountries
        )
    };

    //Get from api the list of available cities to do hikes
    const getListCities = () => {
        //here get the list from the API, for now I created one bc i don't have the api
        const listCities = ['Torino', 'Aix-en-Provence', 'Lyon']
        return (
            listCities
        )
    };

    //Get from api the list of available provinces to do hikes
    const getListProvinces = () => {
        //here get the list from the API, for now I created one bc i don't have the api
        const listProvinces = ['TO', 'AQ', 'CH', 'PE']
        return (
            listProvinces
        )
    };

    //here get the list from the API, for now I created one bc i don't have the api : when API made, make list empty


    //Get from api the list of available hikes (no filter)

    const getListHikes = () => {
        //setHikes({api.getlistOfHikes})
        setHikes([
            { title: 'City Tour', length: '12', time: '3', ascent: '100', city: 'Torino', province: 'TO', country: 'Italy', difficulty: 'Tourist', startPoint: 'location one', endPoint: 'location two', description: 'It is a city tour blabdcfejbfhjsbfhjsbchfcnfdjvbdjvbdjvbdhjvbdhjvbdjbvdhjf', refPoints: ['hut1', 'hut2', 'hut3'] },
            { title: 'City Tour2', length: '16', time: '4', ascent: '100', city: 'Torino', province: 'TO', country: 'Italy', difficulty: 'Tourist', startPoint: 'location one bis', endPoint: 'location two bis', description: 'It is a city tour2 blabdcfejbfhjsbfhjsbchfcnfdjvbdjvbdjvbdhjvbdhjvbdjbvdhjf', refPoints: ['hut1', 'hut2', 'hut3', 'hut4', 'hut5'] }
        ])
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        //post form
        const formResult = { difficultyValue, lengthValue, ascentValue, timeValue, country, province, city }
        console.log(formResult)
        //api.postForm(formResult)

        //get hikes from api and put it in the "hikes" table
        //setHikes({api.getHikesFiltered})

    }



    const cityDisabled = (province, country) => {
        let citySelect
        if (province || country) {
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
                        {getListCities().map((value) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>;
        } else {
            citySelect =
                <FormControl sx={{ m: 1, minWidth: 200 }} >
                    <InputLabel>City</InputLabel>
                    <Select
                        value={city}
                        label="City"
                        onChange={e => setCity(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Select a city</em>
                        </MenuItem>
                        {getListCities().map((value) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
        }

        return citySelect

    }

    const countryDisabled = (province, city) => {
        let countrySelect
        if (province || city) {
            countrySelect =
                <FormControl sx={{ m: 1, minWidth: 200 }} disabled>
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
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

        } else {
            countrySelect =
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
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

        }
        return countrySelect
    }

    const provinceDisabled = (country, city) => {
        let provinceSelect
        if (country || city) {
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
                        {getListProvinces().map((value) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>


        } else {
            provinceSelect =
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel>Province</InputLabel>
                    <Select
                        value={province}
                        label="Province"
                        onChange={e => setProvince(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Select a province</em>
                        </MenuItem>
                        {getListProvinces().map((value) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

        }
        return provinceSelect
    }


    return (
        <div>

            <Grid container>
                <ThemeProvider theme={theme}>


                    <Grid item xs={0.5}>
                    </Grid>
                    <Grid item xs={11} marginTop={2}>
                        <Typography variant="h4" marginTop={1} gutterBottom>
                            <br />AVALAIBLE HIKES
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
                                            {countryDisabled(province, city)}
                                            {provinceDisabled(country, city)}
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
                                                        return (
                                                            <FormControlLabel value={value} control={<Radio />} label={value} />
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
                                                        return (
                                                            <FormControlLabel value={value} control={<Radio />} label={value} />
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
                                                        return (
                                                            <FormControlLabel value={value} control={<Radio />} label={value} />
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
                                                        return (
                                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                                        );
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Grid container marginTop={3}>
                                        <Button variant="outlined" type="submit" color='primary'>Apply filters</Button>
                                        <Typography> <br /></Typography>
                                        <Button variant="text" color='primary' onClick={e => getListHikes()}>See all hikes</Button>
                                    </Grid>
                                </form>
                                <Grid containers>
                                    <br />
                                </Grid>

                            </Paper>
                        </Grid>
                        <Grid containers marginTop={3}>
                            <br />
                        </Grid>


                        {hikes.map((value) => {
                            return (
                                <Accordion expanded={expanded === `panel-${value.title}`} onChange={handleChange(`panel-${value.title}`)}>
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
                                            Length : {value.length} km

                                            <br /><br />
                                            Expected time : {value.time} h

                                            <br /><br />
                                            Total ascent : {value.ascent} m

                                            <br /><br />
                                            Geographic area :
                                            {" "}<Chip label={value.city} color="primary" variant="outlined" />
                                            {" "}<Chip label={value.province} color="primary" variant="outlined" />
                                            {" "}<Chip label={value.country} color="primary" variant="outlined" />

                                            <br /><br />
                                            Difficulty :
                                            {" "}<Chip label={value.difficulty} color="primary" variant="outlined" />

                                            <br /><br />
                                            Start point :
                                            {" "}<Chip label={value.startPoint} color="primary" variant="outlined" />
                                            <br /><br />
                                            End point :
                                            {" "}<Chip label={value.endPoint} color="primary" variant="outlined" />

                                            <br /><br />
                                            Reference points :
                                            {" "}
                                            {value.refPoints.map((valuee) => {
                                                return (
                                                    <Chip label={valuee} color="primary" variant="outlined" />

                                                );
                                            })}

                                            <br /><br />

                                            Description : <br />{value.description}

                                        <Grid>
                                            {props.loggedUser.role === "hiker" ? <><br /><br /><Map gpx={"A gpx-parsed object from backend"}/></> : false}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}






                        <Typography variant="h5" gutterBottom>
                            <br />
                        </Typography>

                    </Grid>
                    <Grid item xs={0.5}></Grid>
                </ThemeProvider>

            </Grid>

        </div>
    )
}
