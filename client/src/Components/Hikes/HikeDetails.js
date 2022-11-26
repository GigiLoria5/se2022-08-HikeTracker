import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../API';
import { customDifficultyIcons } from '../../Utils/DifficultyMapping';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HikeDetailsGeneral from './HikeDetailsGeneral';
import HikeDetailsGeo from './HikeDetailsGeo';

function HikeDetails(props) {
    const { isloggedIn, loggedUser } = props;
    const { hikeId } = useParams();
    const [hike, setHike] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const customIcons = customDifficultyIcons;

    const clickHandle = event => {
        event.preventDefault();
        navigate("/hikes");
    }

    useEffect(() => {
        // fetch /api/hike/:id
        if (hikeId) {
            API.getHikeById(parseInt(hikeId))
                .then((h) => {
                    setTimeout(() => {
                        setHike(h);
                    }, 300);
                })
                .catch(_ => { setError("The page you requested cannot be found") })
        }
    }, [hikeId]);

    return (
        <Container className='container-full-page'>
            <Grid container >
                {/* Title or Error message */}
                < Grid item xs={12} >
                    {hike === null && error === ""
                        ? <CircularProgress color="success" />
                        : < Typography variant="h5" className={"hide-scrollbar"} marginLeft={1} marginRight={1} marginTop={4} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '4vw', sm: "1.4rem", lg: '1.5rem' }, whiteSpace: "nowrap", overflow: "scroll", textOverflow: "ellipsis" }}>
                            {hike === null ? error : `${hike.title} | ${hike.peak_altitude} m asl`}
                        </Typography>
                    }
                </Grid>

                {/* Difficulty+Geographic Area */}
                {< Grid item xs={12} >
                    {hike === null
                        ? null
                        : <Box component="div" sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }} marginBottom={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", marginRight: { xs: '125px', lg: '150px' }, paddingLeft: 1 }} className="div-subtitle">
                                {customIcons[hike.difficulty].icon}
                                <Box sx={{ ml: 2 }}>{customIcons[hike.difficulty].label}</Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", whiteSpace: "nowrap", overflow: "scroll", textOverflow: "ellipsis" }} paddingRight={1} className="div-subtitle hide-scrollbar">
                                <Typography gutterBottom variant="body1" color="text.primary" display={"inline"} margin={0}>
                                    {`${hike.city}, ${hike.province}, ${hike.country}`}
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Grid>}

                {/* General Information */}
                {hike === null ? null : <HikeDetailsGeneral hike={hike} />}

                {/* Geographic Information */}
                {hike === null ? null : <HikeDetailsGeo hike={hike} isloggedIn={isloggedIn} loggedUser={loggedUser} />}

                {/* Go Back Button */}
                < Grid item xs={12} >
                    <Box component="div" sx={{ marginTop: 2, marginBottom: 2, padding: 4, paddingTop: 0, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
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