import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useState } from 'react';
import Typography from "@mui/material/Typography";

import API from '../API';
import { Hut } from '../Utils/Hut';
import AddHutPage1 from './AddHutPage1';
import AddHutPage2 from './AddHutPage2';


export default function AddHut(props) {
    const [hutName, setHutName] = useState("");
    const [type, setType] = useState("");
    const [bedsNumber, setBedsNumber] = useState(0);
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [altitude, setAltitude] = useState(0.0);
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [stepOneDone, setStepOneDone] = useState(false);

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

    const handleSubmission = (ev) => {
        ev.preventDefault();

        const hut = new Hut(
            undefined, //id - assigned by backend
            hutName,
            city,
            province,
            country,
            address,
            altitude,
            description,
            bedsNumber,
            undefined, //opening period - non static information
            longitude,
            latitude,
            phoneNumber,
            email,
            website,
            type
        );

        //TODO: call post api...
    }

    return (
        <Grid container>
            <ThemeProvider theme={theme}>


                {/* Title */}
                <Grid xs={12}>
                    <Typography variant="h4" marginTop={1} gutterBottom sx={thm}>
                        <br />ADD A HIKE
                    </Typography>
                </Grid>
                <Grid xs={0} md={3}></Grid>

                    
                {/* Form in 2 pages */}
                {
                    stepOneDone===false ?
                        <AddHutPage1
                            latitude={latitude} setLatitude={setLatitude}
                            longitude={longitude} setLongitude={setLongitude}
                            altitude={altitude} setAltitude={setAltitude}
                            country={country} setCountry={setCountry}
                            province={province} setProvince={setProvince}
                            city={city} setCity={setCity}
                            setStepOneDone={setStepOneDone}
                        />
                        :
                        <AddHutPage2
                            hutName={hutName} setHutName={setHutName}
                            type={type} setType={setType}
                            bedsNumber={bedsNumber} setBedsNumber={setBedsNumber}
                            website={website} setWebsite={setWebsite}
                            email={email} setEmail={setEmail}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleSubmission={handleSubmission}
                            setStepOneDone={setStepOneDone}
                        />
                }

            </ThemeProvider>
        </Grid>
    );
}