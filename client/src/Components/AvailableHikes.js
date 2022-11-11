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

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import Chip from '@mui/material/Chip';

import Map from './Map';





export default function AvailableHikes() {

    const [expanded, setExpanded] = React.useState(false);
    const [checked, setChecked] = React.useState([]);



    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
        <>
            <Grid container>
                <Grid item xs={0.333}>
                </Grid>
                <Grid item xs={3} marginTop={2}>
                    <Paper elevation={3}>

                        <Grid container item sm >
                            <form onSubmit={handleSubmit}>
                                <Grid item xs={1} marginTop={5}>
                                    <br />
                                </Grid>

                                <Typography variant="h6" gutterBottom>
                                    Geographical area
                                </Typography>

                                <Grid container item sm>
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
                                            <MenuItem value={"Torino"}>Torino</MenuItem>
                                            <MenuItem value={"toto"}>toto</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container item sm>
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
                                            <MenuItem value={"Torino"}>Torino</MenuItem>
                                            <MenuItem value={"Genova"}>genova</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container item sm>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel>Country</InputLabel>
                                        <Select
                                            value={country}
                                            label="Country"
                                            onChange={e => setCountry(e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>Select a country</em>
                                            </MenuItem>
                                            <MenuItem value={"Italy"}>Italy</MenuItem>
                                            <MenuItem value={"France"}>France</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Typography variant="h6" gutterBottom>
                                    Difficulty
                                </Typography>

                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(0)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(0) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`Tourist`} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(1)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(1) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`Hiker`} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(2)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(2) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`Professionnal Hiker`} />
                                        </ListItemButton>
                                    </ListItem>

                                </List>


                                <Typography variant="h6" gutterBottom>
                                    Length
                                </Typography>

                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(3)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(3) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`0 - 5 km`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(4)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(4) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`5 - 15 km`} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(5)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(5) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`More than 15 km`} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>


                                <Typography variant="h6" gutterBottom>
                                    Total ascent
                                </Typography>

                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(6)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(6) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`0 - 300 m`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(7)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(7) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`300 - 600 m`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(8)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(8) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`600 - 1000 m`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(9)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(9) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`More than 1000 m`} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>


                                <Typography variant="h6" gutterBottom>
                                    Expected time
                                </Typography>

                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(10)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(10) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`0 - 1 h`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(11)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(11) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`1 - 3 h`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(12)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(12) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`3 - 5 h`} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding >
                                        <ListItemButton role={undefined} onClick={handleToggle(13)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(13) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`More than 5 h`} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>




                                <Grid container marginTop={3}>
                                    <Button variant="outlined" color='success' type="submit">Apply filters</Button>
                                </Grid>
                            </form>
                        </Grid>


                        <Typography variant="h5" gutterBottom>
                            <br />
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={0.333}>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4" marginTop={1} gutterBottom>
                        <br />AVALAIBLE HIKES
                    </Typography>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Hike 1
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Torino</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Length : 12 km

                                <br /><br />
                                Expected time : 3 h

                                <br /><br />
                                Total ascent : 100 m

                                <br /><br />

{/*

                                Geographic area :
                                {" "}<Chip label="Torino" color="success" variant="outlined" />

                                <br /><br />
                                Difficulty :
                                {" "}<Chip label="Tourist" color="success" variant="outlined" />

                                <br /><br />
                                Start point :
                                {" "}<Chip label="location one" color="success" variant="outlined" />
                                <br /><br />
                                End point :
                                {" "}<Chip label="location two" color="success" variant="outlined" />

                                <br /><br />
                                Reference points :
                                {" "}<Chip label="hut 1" color="success" variant="outlined" />{" "}
                                <Chip label="hut 2" color="success" variant="outlined" />{" "}
                                <Chip label="hut 3" color="success" variant="outlined" />

                                <br /><br />

*/}

                                Description : <br />

                                It's a city tour. blablabalbalablabla
                                blablabalbalablabla

                                <br /><br />


                            </Typography>
                            <Grid>
                                <Map></Map>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>


                    <Typography variant="h5" gutterBottom>
                        <br />
                    </Typography>

                </Grid>
                <Grid item xs={0.333}>
                </Grid>
            </Grid>

        </>
    )
}
