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

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Map from './Map';

export default function AvailableHikesV2(props) {

    const [expanded, setExpanded] = React.useState(false);
    const [checked, setChecked] = React.useState([]);



    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);

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
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                Geographical area
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
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

                                        </AccordionDetails>
                                    </Accordion>



                                    <Accordion expanded={expanded === 'panelA'} onChange={handleChange('panelA')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                Difficulty
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>

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
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panelB'} onChange={handleChange('panelB')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }} >
                                                Length
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panelC'} onChange={handleChange('panelC')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }} >
                                                Total ascent
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                        </AccordionDetails>
                                    </Accordion>


                                    <Accordion expanded={expanded === 'panelD'} onChange={handleChange('panelD')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }} >
                                                Expected time
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>


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
                                        </AccordionDetails>
                                    </Accordion>

                                    <Grid containers marginTop={3}>
                                        <Button variant="outlined" type="submit" color='primary'>Apply filters</Button>
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



                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Hike 1
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Torino, TO, Italy</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Length : 12 km

                                    <br /><br />
                                    Expected time : 3 h

                                    <br /><br />
                                    Total ascent : 100 m

                                    <br /><br />
                                    Geographic area :
                                    {" "}<Chip label="Torino" color="primary" variant="outlined" />
                                    {" "}<Chip label="TO" color="primary" variant="outlined" />
                                    {" "}<Chip label="Italy" color="primary" variant="outlined" />

                                    <br /><br />
                                    Difficulty :
                                    {" "}<Chip label="Tourist" color="primary" variant="outlined" />

                                    <br /><br />
                                    Start point :
                                    {" "}<Chip label="location one" color="primary" variant="outlined" />
                                    <br /><br />
                                    End point :
                                    {" "}<Chip label="location two" color="primary" variant="outlined" />

                                    <br /><br />
                                    Reference points :
                                    {" "}<Chip label="hut 1" color="primary" variant="outlined" />{" "}
                                    <Chip label="hut 2" color="primary" variant="outlined" />{" "}
                                    <Chip label="hut 3" color="primary" variant="outlined" />

                                    <br /><br />

                                    Description : <br />

                                    It's a city tour. blablabalbalablabla
                                    blablabalbalablabla
                                    <Grid>
                                        {props.loggedUser.role === "hiker" ? <Map></Map> : false}
                                    </Grid>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>





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
