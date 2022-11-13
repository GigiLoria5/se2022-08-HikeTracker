import React, { useEffect, useState } from 'react';
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


export default function AvailableHikesV2(props) {

    const [expanded, setExpanded] = React.useState(false);

    const listDifficulty = ['Tourist', ' Hiker', 'Professionnal Hiker'];
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
    }, []);

    useEffect(() => {
        if (country != '') {
            API.getProvincesByCountry(country).then(pv => {
                setProvinces([...provinces, ...pv.map(a => a.province)]);
            })
        }
    }, [country]);

    useEffect(() => {
        if (province != '') {
            API.getCitiesByProvince(province).then(c => {
                setCities([...cities, ...c.map(a => a.city)]);
            })
        }
    }, [province]);

    const resetFilters = () => {
        setDifficultyValue('');
        setLengthValue('');
        setAscentValue('');
        setTimeValue('');
        setProvince('');
        setCity('');
        setCountry('');
    };

    const timeFromState = () => {
        let val = null;
        switch (timeValue) {
            case "0 - 1 h":
                val = "0-1";
                break;
            case "1 - 3 h":
                val = "1-3";
                break;
            case "3 - 5 h":
                val = "3-5";
                break;
            case "More than 5 h":
                val = "5-more";
                break;
        }
        return val;
    }

    const ascentFromState = () => {
        let val = null;
        switch (ascentValue) {
            case "0 - 300 m":
                val = "0-300";
                break;
            case "300 - 600 m":
                val = "300-600";
                break;
            case "600 - 1000 m":
                val = "600-1000";
                break;
            case "More than 1000 m":
                val = "1000-more";
                break;
        }
        return val;
    }

    const lengthFromState = () => {
        let val = null;
        switch (lengthValue) {
            case "0 - 5 km":
                val = "0-5";
                break;
            case "5 - 15 km":
                val = "5-15";
                break;
            case "More than 15 km":
                val = "15-more";
                break;
        }
        return val;
    }

    const difficultyFromState = () => {
        let val = null;
        switch (difficultyValue) {
            case "Tourist":
                val = 1;
                break;
            case "Hiker":
                val = 2;
                break;
            case "Professionnal Hiker":
                val = 3;
                break;
        }
        return val;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        API.getHikesWithFilters(city, province, country, difficultyFromState(), lengthFromState(), ascentFromState(), timeFromState()).then(hikes => {
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
                        <MenuItem value="">
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
                        <MenuItem value="">
                            <em>Select a city</em>
                        </MenuItem>
                        {cities.map((value) => {
                            return (
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
        if (value.start_point_type === "parking_lot") {
            chipStartPoint = <Chip label={[value.start[0].city, ' ', value.start[0].province, ' ', value.start[0].country, " : ", value.start[0].address]} color="primary" variant="outlined" />
        } else if (value.start_point_type === "location") {
            chipStartPoint = <Chip label={[value.start[0].description, " : ", value.start[0].value]} color="primary" variant="outlined" />
        } else if (value.start_point_type === "hut") {
            chipStartPoint = <Chip label={[value.start[0].name, " ", value.start[0].city, ' ', value.start[0].province, ' ', value.start[0].country, " : ", value.start[0].address]} color="primary" variant="outlined" />
        }
        return chipStartPoint
    }

    const handleEndPointTypes = (value) => {
        let chipEndPoint
        if (value.end_point_type === "parking_lot") {
            chipEndPoint = <Chip label={[value.end[0].city, ' ', value.end[0].province, ' ', value.end[0].country, " : ", value.end[0].address]} color="primary" variant="outlined" />
        } else if (value.end_point_type === "location") {
            chipEndPoint = <Chip label={[value.end[0].description, " : ", value.end[0].value]} color="primary" variant="outlined" />
        } else if (value.end_point_type === "hut") {
            chipEndPoint = <Chip label={[value.end[0].name, " ", value.end[0].city, ' ', value.end[0].province, ' ', value.end[0].country, " : ", value.end[0].address]} color="primary" variant="outlined" />
        }
        return chipEndPoint
    }

    const handleRef = (value) => {
        let tab = []
        for (var i = 0; i < value.reference_points.length; i++) {
            value.reference_points[i].map((valuee) => {
                let chipsRefPoints;
                if (valuee.ref_point_type === "parking_lot") {
                    chipsRefPoints = <Chip label={[valuee.city, ' ', valuee.province, ' ', valuee.country, " : ", valuee.address]} color="primary" variant="outlined" />
                }
                else if (valuee.ref_point_type === "location") {
                    chipsRefPoints = <Chip label={[valuee.description, ' : ', valuee.value]} color="primary" variant="outlined" />
                }
                else if (valuee.ref_point_type === "hut") {
                    chipsRefPoints = <Chip label={[valuee.name, ' ', valuee.city, ' ', valuee.province, ' ', valuee.country, " : ", valuee.address]} color="primary" variant="outlined" />
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
                        <MenuItem value="">
                            <em>Select a province</em>
                        </MenuItem>
                        {provinces.map((value) => {
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

            <Grid container spacing={1}>
                <ThemeProvider theme={theme}>
                    {/* Title */}
                    <Grid item xs={12} marginLeft={2}>
                        <Typography variant="h4" marginTop={1} gutterBottom>
                            <br />AVALAIBLE HIKES
                        </Typography>
                    </Grid>

                    {/* Filter */}
                    <Grid item md={12} lg={3} marginLeft={2} marginRight={2}>
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
                                                <RadioGroup value={difficultyValue} onChange={e => setDifficultyValue(e.target.value)}>
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
                                                <RadioGroup value={lengthValue} onChange={e => setLengthValue(e.target.value)}>
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
                                                <RadioGroup value={ascentValue} onChange={e => setAscentValue(e.target.value)}>
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
                                                <RadioGroup value={timeValue} onChange={e => setTimeValue(e.target.value)}>
                                                    {listTime.map((value) => {
                                                        return (
                                                            <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                                                        );
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Grid containers marginTop={3} marginLeft={2}>
                                        <Button variant="outlined" type="submit" color='primary'>Apply filters</Button>
                                        <Button style={{ marginLeft: 10 }} variant="outlined" color='error' onClick={e => resetFilters()}>Reset filters</Button>
                                        <Typography> <br /></Typography>
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

                    </Grid>

                    {/* Hikes */}
                    <Grid item md={12} lg={8} xs={11} marginLeft={2} marginRight={2}>
                        {hikes.map((value) => {
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
                                        <Typography sx={{ color: 'text.secondary' }}>{value.city}, {value.province}, {value.country}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography component={'div'}>
                                            Length : {value.track_length} km

                                            <br /><br />
                                            Expected time : {value.expected_time} h

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
                        })}

                        <Typography variant="h5" gutterBottom>
                            <br />
                        </Typography>
                    </Grid>

                </ThemeProvider>

            </Grid>

        </div>
    )
}
