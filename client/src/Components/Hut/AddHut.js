import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
//import { useNavigate } from 'react-router-dom';
import API from '../../API';
import { Hut, validateHut } from '../../Utils/Hut';
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
    const [stepTwoDone, setStepTwoDone] = useState(false);


    useEffect(() => {
        props.setMessage('');
    }, [])

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
        textTransform: 'uppercase', 
        fontWeight: 600 
    };

    const handleSubmission = async (ev) => {
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
            longitude.toString(),
            latitude.toString(),
            phoneNumber,
            email,
            website,
            type
        );

        if (!validateHut(hut)) {
            props.setMessage({ msg: `Please, complete all the requested fields: you can leave blank only the "Optional informations"`, type: 'error' });
            return;
        }

        const response = await API.addHut(hut).catch(e => {
            const obj = JSON.parse(e);
            props.setMessage({ msg: `${obj.error}!`, type: 'error' });
        })

        if (response === true) {
            props.setMessage({ msg: `Hut correctly created`});
            setStepTwoDone(true);
        }
    }

    const handleReset = () => {
        setHutName("");
        setType("");
        setBedsNumber(0);
        setCountry("");
        setProvince("");
        setCity("");
        setAddress("");
        setLatitude("");
        setLongitude("");
        setAltitude(0.0);
        setWebsite("");
        setEmail("");
        setPhoneNumber("");
        setDescription("");
        setStepOneDone(false);
        setStepTwoDone(false);
    }

    return (
        <Grid container>
            <ThemeProvider theme={theme}>


                {/* Title */}
                <Grid xs={12}>
                    <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={thm}>
                        Add Hut
                    </Typography>
                </Grid>

                <Grid xs={0} md={3}></Grid>

                <Grid xs={12} md={6} marginTop={3} >

                    {/* Form in 2 pages */}
                    {
                        stepOneDone === false ?
                            <AddHutPage1
                                latitude={latitude} setLatitude={setLatitude}
                                longitude={longitude} setLongitude={setLongitude}
                                altitude={altitude} setAltitude={setAltitude}
                                country={country} setCountry={setCountry}
                                province={province} setProvince={setProvince}
                                city={city} setCity={setCity}
                                address={address} setAddress={setAddress}
                                setStepOneDone={setStepOneDone}
                                setMessage={props.setMessage}
                                reset={handleReset}
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
                                stepTwoDone={stepTwoDone}
                                message={props.message} setMessage={props.setMessage}
                                reset={handleReset}
                            />
                    }

                </Grid>

                <Grid xs={0} md={3}></Grid>

            </ThemeProvider>
        </Grid>
    );
}