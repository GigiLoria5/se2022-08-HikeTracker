import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';

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
 * stepTwoDone
 * setMessage
 * message
 * reset
 * 
 */
export default function AddHutPage2(props) {

    const navigate = useNavigate();


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
        marginBottom: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            props.handleSubmission(event);
        }
    };

    return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">

                {/* Form */}
                <Paper elevation={3} sx={{ ...thm }} >
                    <Box component="form" onSubmit={handleSubmit}>

                        <Grid container marginTop={3} justifyContent="center">
                            <Stack direction={{ xs: 'row', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                <Chip label="1" color="primary" variant="outlined" />{"   "}
                                <Chip label="2" color="primary" variant="filled" />
                            </Stack>
                        </Grid>

                        {/* General informations */}
                        <Typography variant="h6" sx={thm}>
                            <br />General informations<br />
                        </Typography>

                        <Grid container justifyContent="center">
                            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                                {/*NAME FIELD*/}
                                <TextField variant="outlined" required label="Name" sx={{ width: 'fit-content' }} value={props.hutName} onChange={ev => props.setHutName(ev.target.value)} />

                                {/*TYPE FIELD*/}
                                <FormControl required sx={{ width: 'fit-content', minWidth: '25ch' }} >
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
                                <TextField variant="outlined" label="Beds number" type="number" InputProps={{ inputProps: { min: 0 }}} sx={{ width: 'fit-content' }} value={props.bedsNumber} onChange={ev => props.setBedsNumber(ev.target.value)} />

                            </Stack>
                        </Grid>

                        {/* Optional informations */}
                        <Typography variant="h6" sx={thm}>
                            <br />Optional informations<br />
                        </Typography>

                        <Grid container justifyContent="center">
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                                {/*WEBSITE FIELD*/}
                                <TextField variant="outlined" label="Website" sx={{ width: 'fit-content' }} value={props.website} onChange={ev => props.setWebsite(ev.target.value)} />

                                {/*EMAIL FIELD*/}
                                <TextField variant="outlined" label="Email Address" required={(props.email !== "")} sx={{ width: 'fit-content' }} value={props.email} name="email" autoComplete="email" type="email" onChange={ev => props.setEmail(ev.target.value)} />

                            </Stack>
                        </Grid>

                        <br></br>

                        <Grid>
                            {/*PHONE NUMBER FIELD*/}
                            <PhoneInput placeholder="Phone number" required={(props.phoneNumber !== "")} value={props.phoneNumber} defaultCountry="IT" onChange={props.setPhoneNumber} />
                        </Grid>

                        {/* Description */}
                        <Typography variant="h6" sx={thm}>
                            <br />Description<br />
                        </Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <TextField variant="outlined" label="Description" required multiline rows={4} margin="normal" value={props.description} onChange={ev => props.setDescription(ev.target.value)} />
                        </Box>

                        <Grid xs={12}>
                            {/* Error message */}
                            {
                                props.message && <Alert severity={props.message.type} onClose={() => props.setMessage('')}>{props.message.msg}</Alert>
                            }
                        </Grid>

                        {/* Buttons */}
                        <Grid container marginTop={3} justifyContent="center">
                            {
                                props.stepTwoDone ?
                                    <Stack direction={{ xs: 'column', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                        <Button onClick={() => navigate("/local-guide-page")} variant="contained" color='primary'>OK</Button>
                                    </Stack>
                                    :
                                    <Stack direction={{ xs: 'column', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                        <Button onClick={() => props.setStepOneDone(false)} variant="contained" color='secondary'>GO BACK</Button>
                                        <Button color="error" variant="outlined" onClick={() => props.reset()}>RESET</Button>
                                        <Button type="submit" variant="contained" color='primary'>ADD HUT</Button>
                                    </Stack>
                            }
                        </Grid>


                    </Box>
                </Paper>

                </Container>

            </ThemeProvider >
    );
}