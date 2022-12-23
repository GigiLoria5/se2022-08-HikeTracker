import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API';
import { customDifficultyIcons } from '../../Utils/DifficultyMapping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HikeDetailsGeneral from './HikeDetailsGeneral';
import HikeDetailsGeo from './HikeDetailsGeo';
import { fromImageDataToBase64String } from '../../Utils/File';
import { Buffer } from 'buffer'

function HikeDetails(props) {
    const { isloggedIn, loggedUser } = props;
    const { hikeId } = useParams();
    const [hike, setHike] = useState(null);
    const [hikeImage, setHikeImage] = useState(null);
    const [error, setError] = useState("");
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = useState(false);
    const navigate = useNavigate();
    const customIcons = customDifficultyIcons;

    useEffect(() => {
        // fetch /api/hike/:id
        if (hikeId) {
            API.getHikeById(parseInt(hikeId))
                .then((h) => {
                    setTimeout(() => {
                        // Get Hike
                        setHike(h);
                        // Parse Image
                        setHikeImage(Buffer(h.picture_file).toString("base64"));
                    }, 300);
                })
                .catch(_ => { setError("The page you requested cannot be found") })
        }
    }, [hikeId]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.outerWidth > 1200)   // 1200 is the "lg" breakpoint
                setDeviceFilterPanelOpen(false); // this is needed to fix a bug in which if you widen the screen while the drawer is open, the page remains locked
        });
    }, []);

    const clickHandle = event => {
        event.preventDefault();
        navigate("/hikes");
    }

    /* To hide/show the filter panel for small screen */
    const toggleFilterPanelDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceFilterPanelOpen(state);
    };

    return (
        <Container className='container-full-page'>
            <Grid container >
                {/* Title or Error message */}
                < Grid item xs={12} >
                    {(hike === null || hikeImage === null) && error === ""
                        ? <CircularProgress color="success" />
                        : < Typography variant="h5" className={"hide-scrollbar"} marginTop={4} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '4vw', sm: "1.4rem", lg: '1.5rem' }, paddingLeft: 2, paddingRight: 2, textAlign: "center" }}>
                            {hike === null ? error : `${hike.title} | ${hike.peak_altitude} m asl`}
                        </Typography>
                    }
                </Grid>

                {/* Difficulty+Geographic Area */}
                {< Grid item xs={12} >
                    {hike === null
                        ? null
                        : <Box component="div" sx={{ display: { xs: "block", sm: "flex" }, flexDirection: "row", justifyContent: "center" }} marginBottom={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", marginLeft: { xs: "auto", sm: 0 }, marginRight: { xs: 'auto', sm: 0, lg: '150px' }, paddingLeft: 1 }} className="div-subtitle">
                                {customIcons[hike.difficulty].icon}
                                <Box sx={{ ml: 2 }}>{customIcons[hike.difficulty].label}</Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", marginLeft: { xs: "auto", sm: 0 }, marginRight: { xs: "auto", sm: 0 } }} paddingRight={1} className="div-subtitle hide-scrollbar">
                                <Typography gutterBottom variant="body1" color="text.primary" display={"inline"} margin={0}>
                                    {`${hike.city}, ${hike.province}, ${hike.country}`}
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Grid>}

                {/* Panel Button - Only on Small Screen */}
                <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                    <Button variant="outlined" color="inherit" startIcon={<LocationOnIcon />} onClick={toggleFilterPanelDrawer(true)}> Map </Button>
                </Grid>

                {/* General Information */}
                {hike === null || hikeImage === null ? null : <HikeDetailsGeneral hike={hike} hikeImage={hikeImage} />}

                {/* Geographic Information */}
                {hike === null || hikeImage === null ? null : <HikeDetailsGeo hike={hike} isloggedIn={isloggedIn} loggedUser={loggedUser} deviceFilterPanelOpen={deviceFilterPanelOpen} toggleFilterPanelDrawer={toggleFilterPanelDrawer} />}

                {/* Go Back Button */}
                < Grid item xs={12} >
                    <Box component="div" sx={{ marginTop: 2, marginBottom: 2, padding: 4, paddingTop: 0, paddingBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                        <Button variant="outlined" className="back-outlined-btn" onClick={clickHandle} >
                            Return Hikes List
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container >
    )
}

export default HikeDetails