import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

/**
 * 
 * PROPS:
 * hutName, setHutName,
 * type, setType,
 * bedsNumber, setBedsNumber,
 * website, setWebsite,
 * email, setEmail,
 * phoneNumber, setPhoneNumber,
 * description, setDescription
 * handleSubmission
 * setStepOneDone
 * setMessage
 * 
 */
export default function AddHutPage2(props) {

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

    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <Grid container>
            <ThemeProvider theme={theme}>

                {/* Form */}
                <Paper elevation={3} sx={{ ...thm }} >

                    <Grid marginTop={3}>
                        <Chip label="1" color="primary" variant="outlined" />{"   "}
                        <Chip label="2" color="primary" variant="filled" />
                    </Grid>

                    {/* General informations */}
                    <Typography variant="h6" sx={thm}>
                        <br />General informations<br />
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                        {/*NAME FIELD*/}
                        <TextField variant="outlined" label="Name" sx={{ width: 'fit-content', maxWidth: '66ch' }} value={props.hutName} onChange={ev => props.setHutName(ev.target.value)} />

                        {/*TYPE FIELD*/}
                        <FormControl sx={{ width: 'fit-content', maxWidth: '22ch', minWidth: '10ch' }} >
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={props.type}
                                variant="outlined"
                                onChange={e => props.setType(e.target.value)}
                                label="Type"
                            >
                                <MenuItem value="">
                                    <em>Select a type</em>
                                </MenuItem>
                                <MenuItem value={"alpine_hut"}>Alpine Hut</MenuItem>
                                <MenuItem value={"fixed_bivouac"}>Fixed Bivouac</MenuItem>
                                <MenuItem value={"unmanaged_hut"}>Unmanaged Hut</MenuItem>
                                <MenuItem value={"hiking_hut"}>Hiking Hut</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>

                            </Select>
                        </FormControl>

                        {/*BEDS NUMBER FIELD*/}
                        <TextField variant="outlined" label="Beds number" type="number" sx={{ width: 'fit-content', maxWidth: '11ch' }} value={props.bedsNumber} onChange={ev => props.setBedsNumber(ev.target.value)} />

                    </Stack>

                    {/* Optional informations */}
                    <Typography variant="h6" sx={thm}>
                        <br />Optional informations<br />
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                        {/*WEBSITE FIELD*/}
                        <TextField variant="outlined" label="Website" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.website} onChange={ev => props.setWebsite(ev.target.value)} />

                        {/*EMAIL FIELD*/}
                        <TextField variant="outlined" label="Email Address" sx={{ width: 'fit-content', maxWidth: '22ch' }} value={props.email} name="email" autoComplete="email" type="email" onChange={ev => props.setEmail(ev.target.value)} />

                    </Stack>

                    <br></br>

                    <Grid>
                        {/*PHONE NUMBER FIELD*/}
                        <PhoneInput placeholder="Phone number" value={props.phoneNumber} defaultCountry="IT" onChange={ev => props.setPhoneNumber(ev.target.value)} />
                    </Grid>

                    {/* Description */}
                    <Typography variant="h6" sx={thm}>
                        <br />Description<br />
                    </Typography>
                    <TextField variant="outlined" label="Description" multiline rows={4} margin="normal" value={props.description} onChange={ev => props.setDescription(ev.target.value)} />

                    <Typography>
                        <br />
                    </Typography>


                </Paper>



                {/* Buttons SUBMIT or GO BACK */}
                <Grid xs={0} md={3}></Grid>

                <Grid xs={12} sx={thm}>

                    <Grid><br /></Grid>

                    <Button onClick={ev => props.handleSubmission(ev)} variant="contained" color='primary'>ADD HUT</Button>
                    <Grid><br /></Grid>
                    <Button onClick={() => props.setStepOneDone(false)} variant="contained" color='secondary'>GO BACK</Button>
                    <Grid><br /><br /></Grid>
                </Grid>

            </ThemeProvider >
        </Grid >
    );
}