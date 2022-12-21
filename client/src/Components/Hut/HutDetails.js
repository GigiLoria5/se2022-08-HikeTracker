import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { hutTypeLabel } from '../../Utils/Hut';
import InfoIcon from '@mui/icons-material/Info';
import HutDetailsGeneral from './HutDetailsGeneral';
import HutDetailsAdditional from './HutDetailsAdditional';
import { fromImageDataToBase64String } from '../../Utils/File';

function HutDetails() {
    const { hutId } = useParams();
    const [hut, setHut] = useState(null);
    const [hutImage, setHutImage] = useState(null);
    const [error, setError] = useState("");
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch /api/huts/:id
        if (hutId) {
            API.getHutById(parseInt(hutId))
                .then(h => {
                    setTimeout(() => {
                        // Get Hut
                        setHut(h);
                        // Parse and Save Image as Base64String
                        setHutImage(fromImageDataToBase64String(h.picture_file.data));
                    }, 300);
                })
                .catch(_ => { setError("The page you requested cannot be found") })
        }
    }, [hutId]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.outerWidth > 1200)   // 1200 is the "lg" breakpoint
                setDeviceFilterPanelOpen(false); // this is needed to fix a bug in which if you widen the screen while the drawer is open, the page remains locked
        });
    }, []);

    const clickHandle = event => {
        event.preventDefault();
        navigate("/huts");
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
                {/* Name or Error message */}
                < Grid item xs={12} >
                    {(hut === null || hutImage === null) && error === ""
                        ? <CircularProgress color="success" />
                        : < Typography variant="h5" className={"hide-scrollbar"} marginTop={4} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '4vw', sm: "1.4rem", lg: '1.5rem' }, paddingLeft: 2, paddingRight: 2, textAlign: "center" }}>
                            {hut === null ? error : `${hut.name} | ${hut.altitude} m asl`}
                        </Typography>
                    }
                </Grid>

                {/* Hut Type + Geographic Area */}
                {< Grid item xs={12} >
                    {hut === null
                        ? null
                        : <Box component="div" sx={{ display: { xs: "block", sm: "flex" }, flexDirection: "row", justifyContent: "center" }} marginBottom={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", marginLeft: { xs: "auto", sm: 0 }, marginRight: { xs: 'auto', sm: 0, lg: '150px' }, paddingLeft: 1 }} className="div-subtitle">
                                <Typography gutterBottom variant="body1" color="text.primary" display={"inline"} margin={0}>
                                    {`${hutTypeLabel[hut.type]}`}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", marginLeft: { xs: "auto", sm: 0 }, marginRight: { xs: "auto", sm: 0 } }} paddingRight={1} className="div-subtitle hide-scrollbar">
                                <Typography gutterBottom variant="body1" color="text.primary" display={"inline"} margin={0}>
                                    {`${hut.city}, ${hut.province}, ${hut.country}`}
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Grid>}

                {/* Panel Button - Only on Small Screen */}
                <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                    <Button variant="outlined" color="inherit" startIcon={<InfoIcon />} onClick={toggleFilterPanelDrawer(true)}> More Details </Button>
                </Grid>

                {/* General Information */}
                {hut === null || hutImage === null ? null : <HutDetailsGeneral hut={hut} hutImage={hutImage} />}

                {/* Additional Information */}
                {hut === null || hutImage === null ? null : <HutDetailsAdditional hut={hut} deviceFilterPanelOpen={deviceFilterPanelOpen} toggleFilterPanelDrawer={toggleFilterPanelDrawer} />}

                {/* Go Back Button */}
                < Grid item xs={12} >
                    <Box component="div" sx={{ marginTop: 2, marginBottom: 2, padding: 4, paddingTop: 0, paddingBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                        <Button variant="outlined" className="back-outlined-btn" onClick={clickHandle} >
                            Return huts List
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container >
    )
}

export default HutDetails