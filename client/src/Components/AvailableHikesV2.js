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











export default function AvailableHikesV2() {

    const [expanded, setExpanded] = React.useState(false);

    const listDifficulty = ['Tourist',' Hiker', 'Professionnal Hiker'];
    const listLength = ['0 - 5 km',' 5 - 15 km', 'More than 15 km'];
    const listAscent = ['0 - 300 m',' 300 - 600 m', '600 - 1000 m', 'More than 1000 m'];
    const listTime = ['0 - 1 h',' 1 - 3 h', '3 - 5 h', 'More than 5 h'];

    const [difficultyValue, setDificultyValue] = useState();
    const [lengthValue, setLengthValue] = useState();
    const [ascentValue, setAscentValue] = useState();
    const [timeValue, setTimeValue] = useState();
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
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} >
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
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} >
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
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} >
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

                            <br/><br/>
                            Expected time : 3 h

                            <br/><br/>
                            Total ascent : 100 m

                            <br/><br/>
                            Geographic area : 
                            {" "}<Chip label="Torino" color="primary" variant="outlined" />
                            {" "}<Chip label="TO" color="primary" variant="outlined" />
                            {" "}<Chip label="Italy" color="primary" variant="outlined" />
    
                            <br/><br/>
                            Difficulty :  
                            {" "}<Chip label="Tourist" color="primary" variant="outlined" />

                            <br/><br/>
                            Start point :  
                            {" "}<Chip label="location one" color="primary" variant="outlined" />
                            <br/><br/>
                            End point : 
                            {" "}<Chip label="location two" color="primary" variant="outlined" />
    
                            <br/><br/>
                            Reference points :         
                            {" "}<Chip label="hut 1" color="primary" variant="outlined"/>{" "}
                            <Chip label="hut 2" color="primary" variant="outlined"/>{" "}
                            <Chip label="hut 3" color="primary" variant="outlined"/>

                            <br/><br/>

                            Description : <br/>
                            
                            It's a city tour. blablabalbalablabla
                            blablabalbalablabla
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        


                        
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
