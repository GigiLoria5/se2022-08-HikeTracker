import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import API from '../../API';
import { Hut, validateHut } from '../../Utils/Hut';
import { Address, translateProvince } from '../../Utils/Address';
import AddHutPage1 from './AddHutPage1';
import AddHutPage2 from './AddHutPage2';
import { useNavigate } from 'react-router-dom';

export default function AddHut() {
    const [message, setMessage] = useState("");
    const [hutName, setHutName] = useState("");
    const [type, setType] = useState("");
    const [bedsNumber, setBedsNumber] = useState(0);
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [altitude, setAltitude] = useState(0.0);
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [stepOneDone, setStepOneDone] = useState(false);
    const [formValues, setFormValues] = useState({
        country: {
            error: false,
            errorMessage: ""
        },
        province: {
            error: false,
            errorMessage: ""
        },
        city: {
            error: false,
            errorMessage: ""
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        setMessage('');
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (latitude !== "" && longitude !== "") {
            getLocation();
        }
        // eslint-disable-next-line
    }, [latitude, longitude])

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

    const getLocation = async () => {
        const addr = await API.getAddressByCoordinates(longitude, latitude);   // Get address information starting from coordinates
        setLocation(new Address(addr));
        autoFill(addr);
    }
    const handleSubmission = async (ev) => {
        ev.preventDefault();
        console.log(selectedImgFile);

        const hut = new Hut({
            id: undefined, //id - assigned by backend
            name: hutName,
            city: city,
            province: province,
            country: country,
            address: address,
            altitude: altitude,
            description: description,
            beds_number: bedsNumber,
            opening_period: undefined, //opening period - non static information
            longitude: longitude.toString(),
            latitude: latitude.toString(),
            phone_number: phoneNumber,
            email: email,
            website: website,
            type: type,
            picture: selectedImgFile
        }
        );

        if (!validateHut(hut)) {
            setMessage({ msg: `Please, complete all the requested fields: you can leave blank only the "Optional informations"`, type: 'error' });
            return;
        }

        const response = await API.addHut(hut).catch(e => {
            const obj = JSON.parse(e);
            setMessage({ msg: `${obj.error}!`, type: 'error' });
        })

        if (response === true) {
            setMessage({ msg: `Hut correctly created` });
            navigate('/huts');
        }
    }

    const autoFill = (loc) => {

        setCountry(loc.country);

        if (loc.country === "Italy") {
            setProvince(translateProvince(loc.county));
        } else {
            setProvince(loc.state);
        }

        setCity(loc.city);

    }

    const handleGoBack = () => {
        //Deletes informations on second page when the user goes back
        setHutName("");
        setType("");
        setBedsNumber(0);
        setWebsite("");
        setEmail("");
        setPhoneNumber("");
        setDescription("");
        setStepOneDone(false);
    }


    return (
        <Grid container>
            <ThemeProvider theme={theme}>


                {/* Title */}
                <Grid xs={12}>
                    <Typography variant="h5" marginTop={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
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
                                setMessage={setMessage}
                                location={location}
                                formValues={formValues}
                                setFormValues={setFormValues}
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
                                setStepOneDone={handleGoBack}
                                selectedImgFile={selectedImgFile}
                                setSelectedImgFile={setSelectedImgFile}
                                message={message}
                                setMessage={setMessage}
                            />
                    }

                </Grid>

                <Grid xs={0} md={3}></Grid>

            </ThemeProvider>
        </Grid>
    );
}