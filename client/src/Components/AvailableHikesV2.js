import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';

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

import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from "../API";
import { timeFromState, ascentFromState, lengthFromState, difficultyFromState } from "../Utils/HikesFilter";
import { handleStartPointTypes, handleEndPointTypes, handleRef } from "../Utils/HikesList";

/////////////////////////////////////////////////////////////////////
//////           THIS COMPONENT WILL BE DELETED                //////
/////////////////////////////////////////////////////////////////////

export default function AvailableHikesV2(props) {

    const [expanded, setExpanded] = React.useState(false);

    const listDifficulty = ['Tourist', 'Hiker', 'Professionnal Hiker'];
    const listLength = ['0 - 5 km', '5 - 15 km', 'More than 15 km'];
    const listAscent = ['0 - 300 m', '300 - 600 m', '600 - 1000 m', 'More than 1000 m'];
    const listTime = ['0 - 1 h', '1 - 3 h', '3 - 5 h', 'More than 5 h'];

    const [difficultyValue, setDifficultyValue] = useState('');
    const [lengthValue, setLengthValue] = useState('');
    const [ascentValue, setAscentValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

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

    useEffect(() => {
        API.getCountries().then(cn => {
            setCountries([...country, ...cn.map(a => a.country)]);
        });

        API.getHikesWithFilters(null, null, null, null, null, null, null).then(hikes => {
            hikes.forEach(a => a.difficulty = listDifficulty[a.difficulty - 1]);
            setHikes(hikes);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (country !== '') {
            API.getProvincesByCountry(country).then(pv => {
                setProvinces([...pv.map(a => a.province)]);
            })
        }
        if (province !== '') {
            API.getCitiesByProvince(province).then(c => {
                setCities([...c.map(a => a.city)]);
            })
        }
        // eslint-disable-next-line
    }, [country, province]);

    const resetFilters = () => {
        setDifficultyValue('');
        setLengthValue('');
        setAscentValue('');
        setTimeValue('');
        setProvince('');
        setCity('');
        setCountry('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.getHikesWithFilters(city, province, country, difficultyFromState(difficultyValue), lengthFromState(lengthValue), ascentFromState(ascentValue), timeFromState(timeValue))
            .then(hikes => {
                hikes.forEach(a => a.difficulty = listDifficulty[a.difficulty - 1]);
                setHikes(hikes);
            })
    }

    const cityDisabled = (province, country) => {
        let citySelect
        if (province && country) {
            citySelect =
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel>City</InputLabel>
                    <Select
                        value={city}
                        label="City"
                        onChange={e => setCity(e.target.value)}
                    >
                        <MenuItem value="" key={"menu"}>
                            <em>Select a city</em>
                        </MenuItem>
                        {cities.map((value) => {
                            return (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
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
                        <MenuItem value="" key={"menu-city2"}>
                            <em>Select a city</em>
                        </MenuItem>
                        {cities.map((value) => {
                            return (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
        }
        return citySelect
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
                        onChange={e => { setProvince(e.target.value); setCity(''); }}
                    >
                        <MenuItem value="" key={"menu-province"}>
                            <em>Select a province</em>
                        </MenuItem>
                        {provinces.map((value) => {
                            return (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
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
                        <MenuItem value="" key={"menu-province2"}>
                            <em>Select a province</em>
                        </MenuItem>
                        {provinces.map((value) => {
                            return (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
        }
        return provinceSelect
    }

    return (
        <Grid container spacing={1}>
            <ThemeProvider theme={theme}>
                {/* Title */}
                <Grid item xs={12} marginLeft={2}>
                    <Typography variant="h4" marginTop={2} gutterBottom sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <br />Find your next trail
                    </Typography>
                </Grid>

                {/* Filter */}
                <Grid item md={12} lg={3} marginLeft={2} marginRight={2}>
                    <Grid container item sm >
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
                                                onChange={e => { setCountry(e.target.value); setProvince(''); setCity(''); }}
                                            >
                                                <MenuItem value="" key="menu-country">
                                                    <em>Select a country</em>
                                                </MenuItem>
                                                {countries.map((value) => {
                                                    return (
                                                        <MenuItem key={value} value={value}>{value}</MenuItem>
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
                                            <RadioGroup value={difficultyValue} onClick={e => setDifficultyValue(e.target.value === difficultyValue ? "" : e.target.value)}>
                                                {listDifficulty.map((value) => {
                                                    return (
                                                        <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
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
                                            <RadioGroup value={lengthValue} onClick={e => setLengthValue(e.target.value === lengthValue ? "" : e.target.value)}>
                                                {listLength.map((value) => {
                                                    return (
                                                        <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
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
                                            <RadioGroup value={ascentValue} onClick={e => setAscentValue(e.target.value === ascentValue ? "" : e.target.value)}>
                                                {listAscent.map((value) => {
                                                    return (
                                                        <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
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
                                            <RadioGroup value={timeValue} onClick={e => setTimeValue(e.target.value === timeValue ? "" : e.target.value)}>
                                                {listTime.map((value) => {
                                                    return (
                                                        <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                                                    );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion>

                                <Grid container margin={1} spacing={2}>
                                    <Grid xs={6}>
                                        <Button variant="outlined" type="submit" color='primary'>Apply filters</Button>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Button variant="outlined" color='error' onClick={e => resetFilters()}>Reset filters</Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid container>
                                <br />
                            </Grid>

                        </Paper>
                    </Grid>
                    <Grid container marginTop={3}>
                        <br />
                    </Grid>

                </Grid>

                {/* Hikes */}
                <Grid item md={12} lg={8} xs={11} marginLeft={2} marginRight={2}>
                    {!hikes.length ? <Typography variant="h5" gutterBottom>
                        Unfortunately, there is no track with these filters. Try changing something...
                    </Typography> : (hikes.map((value) => {
                        return (
                            <Accordion expanded={expanded === `panel-${value.id}`} onChange={handleChange(`panel-${value.id}`)} key={value.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {value.title}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {value.city}, {value.province}, {value.country}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        Author: {value.author}

                                        <br /><br />
                                        Length : {value.track_length} km

                                        <br /><br />
                                        Expected time : {value.expected_time} h

                                        <br /><br />
                                        Total ascent : {value.ascent} m

                                        <br /><br />
                                        Peak altitude : {value.peak_altitude} m

                                        <br /><br />
                                        Difficulty :
                                        {" "}<Chip label={value.difficulty} color="primary" variant="outlined" />

                                        <br /><br />
                                        Start point :
                                        {" "}
                                        {handleStartPointTypes(value)}
                                        <br /><br />
                                        End point :
                                        {" "}
                                        {handleEndPointTypes(value)}
                                        <br /><br />
                                        Reference points :
                                        {" "}
                                        {handleRef(value).map((value) => {
                                            return value
                                        })}

                                        <br /><br />
                                        Description : <br />{value.description}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    }))}

                    <Typography variant="h5" gutterBottom>
                        <br />
                    </Typography>
                </Grid>

            </ThemeProvider>
        </Grid>
    )
}
