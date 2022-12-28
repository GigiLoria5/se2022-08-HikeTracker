import { useState } from 'react';

import { createTheme, ThemeProvider, Breadcrumbs, Divider, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../../Styles/Phone.css'

import { isValidImage } from '../../Utils/File';

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
 * 
 */
export default function AddHutPage2(props) {
    const [fileMessage, setFileMessage] = useState("");
    const selectedImgFile = props.selectedImgFile;
    const setSelectedImgFile = props.setSelectedImgFile;
    const [isImgSelected, setIsImgSelected] = useState(false);

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
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    /* Function called on Upload press */
    const changeHandler = async (event) => {
        event.preventDefault();

        const imageCheck = isValidImage(event.target.files[0]);
        if (imageCheck === true) {
            setSelectedImgFile(event.target.files[0]);
            setIsImgSelected(true);
            setFileMessage("");
        } else {
            setSelectedImgFile(null);
            setIsImgSelected(false);
            setFileMessage(imageCheck);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (selectedImgFile === null) {
            props.setMessage("Image not uploaded");
            return false;
        }

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

                    <Breadcrumbs separator="›" aria-label="breadcrumb" marginTop={3}>
                        [
                        <Typography key="3" color="inherit">
                            Hut location
                        </Typography>,
                        <Typography key="3" color="primary">
                            Hut details
                        </Typography>,
                        ];
                    </Breadcrumbs>

                    <Box component="form" onSubmit={handleSubmit}>
                        {/* Upload Image */}
                        <Grid xs={12} sx={thm}>
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} >
                                UPLOAD AN IMAGE
                            </Typography>
                            <Button variant="contained" margin={2} component="label" onChange={changeHandler}>
                                Choose a file...
                                <input hidden accept=".jpg, .png" type="file" />
                            </Button>
                            {fileMessage !== ""
                                ? <Alert sx={{ m: 2 }} severity="error" onClose={() => setFileMessage('')}>{fileMessage}</Alert>
                                : <Typography sx={thm} margin={2}>{isImgSelected ? `Filename : ${selectedImgFile.name}` : null}</Typography>
                            }
                        </Grid>
                        <Divider variant="middle" />

                        {/* General information */}
                        <Grid xs={12} sx={thm}>
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                GENERAL INFORMATION
                            </Typography>
                        </Grid>

                        <Grid container justifyContent="center" xs={12} sx={{ ...thm, mb: 2 }} >
                            <Stack direction={{ xs: 'column', sm: 'column' }} >

                                {/*NAME FIELD*/}
                                <TextField margin="normal" variant="outlined" required label="Name" sx={{ width: '30ch', maxWidth: '30ch', m: 1 }} value={props.hutName} onChange={ev => props.setHutName(ev.target.value)} />

                                {/*TYPE FIELD*/}
                                <FormControl margin="normal" variant="outlined" required sx={{ width: '30ch', maxWidth: '30ch', m: 1 }}>
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
                                <TextField variant="outlined" label="Beds number" type="number" InputProps={{ inputProps: { min: 0 } }} sx={{ width: '30ch', maxWidth: '30ch', m: 1 }} value={props.bedsNumber} onChange={ev => props.setBedsNumber(ev.target.value)} />

                            </Stack>
                        </Grid>

                        <Divider variant="middle" />

                        {/* Optional informations */}
                        <Grid xs={12} sx={thm}>
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                CONTACT INFORMATIONS
                            </Typography>
                        </Grid>

                        <Grid container justifyContent="center" xs={12} sx={{ ...thm, mb: 2 }} >
                            <Stack direction={{ xs: 'column', sm: 'column' }}>

                                {/*WEBSITE FIELD*/}
                                <TextField margin="normal" variant="outlined" label="Website" sx={{ width: '30ch', maxWidth: '30ch' }} value={props.website} onChange={ev => props.setWebsite(ev.target.value)} />

                                {/*EMAIL FIELD*/}
                                <TextField margin="normal" variant="outlined" label="Email Address" required sx={{ width: '30ch', maxWidth: '30ch' }} value={props.email} name="email" autoComplete="email" type="email" onChange={ev => props.setEmail(ev.target.value)} />

                                {/*PHONE NUMBER FIELD*/}
                                <Grid item sx={{ width: '30ch', maxWidth: '30ch', mt: 2, mb: 1}}>
                                <PhoneInput id="phone-id" placeholder="Phone number *" inputstyle={{width: '30 ch', maxWidth: '30ch ', mt: 3 , mb: 2}} required value={props.phoneNumber} defaultCountry="IT" onChange={props.setPhoneNumber}/>
                                </Grid>

                            </Stack>
                        </Grid>

                        <Divider variant="middle" />

                        {/* Description */}
                        <Grid xs={12} sx={thm}>
                            <Typography align='center' variant="h6" fontWeight={520} margin={2} marginBottom={0}>
                                DESCRIPTION
                            </Typography>
                        </Grid>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            {/* <TextField variant="outlined" label="Description" required multiline rows={4} margin="normal" value={props.description} onChange={ev => props.setDescription(ev.target.value)} /> */}
                            <TextField variant="outlined" required multiline label="Description" rows={4} margin="normal" sx={{ width: '30ch', maxWidth: '30ch' }} value={props.description} onChange={ev => props.setDescription(ev.target.value)} />
                        </Box>

                        {/* Error Message */}
                        <Grid xs={12}>
                            {props.message && <Alert sx={{ mt: 2 }} severity="error" onClose={() => props.setMessage('')}>{props.message}</Alert>}
                        </Grid>

                        {/* Buttons */}
                        <Grid container marginTop={3} justifyContent="center">
                            <Stack direction={{ xs: 'column', sm: 'row' }} marginBottom={1} spacing={{ xs: 1, sm: 2, md: 4 }} >
                                <Button onClick={() => props.setStepOneDone(false)} variant="contained" color='secondary'>GO BACK</Button>
                                <Button type="submit" variant="contained" color='primary'>ADD HUT</Button>
                            </Stack>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider >
    );
}