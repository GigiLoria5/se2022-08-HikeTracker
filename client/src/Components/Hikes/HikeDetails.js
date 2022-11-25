import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import API from '../../API';
import { customDifficultyIcons } from '../../Utils/CustomDifficultyIcons';
import HikeDetailsGeneral from './HikeDetailsGeneral';
import HikeDetailsGeo from './HikeDetailsGeo';

function HikeDetails(props) {
    const { isloggedIn, loggedUser } = props;
    const { hikeId } = useParams();
    const [hike, setHike] = useState(null);
    const [error, setError] = useState("");
    const customIcons = customDifficultyIcons;

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
                        : < Typography variant="h5" marginLeft={1} marginRight={1} marginTop={4} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600, fontSize: { xs: '4vw', sm: "1.4rem", lg: '1.5rem' }, whiteSpace: "nowrap", overflow: "scroll", textOverflow: "ellipsis" }}>
                            {hike === null ? error : `${hike.title} | ${hike.peak_altitude} m asl`}
                        </Typography>
                    }
                </Grid>

                {/* Error Message Body */}
                {< Grid item xs={12} >
                    {error === ""
                        ? null
                        : < Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                            Return to our <Link to="/" >homepage</ Link>
                        </Typography>
                    }
                </Grid>}

                {/* Difficulty+Geographic Area */}
                {< Grid item xs={12} >
                    {hike === null
                        ? null
                        : <Box component="div" sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }} marginBottom={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", marginRight: { xs: '125px', lg: '150px' }, paddingLeft: 1 }} className="div-subtitle">
                                {customIcons[hike.difficulty].icon}
                                <Box sx={{ ml: 2 }}>{customIcons[hike.difficulty].label}</Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: "25px", width: "fit-content", whiteSpace: "nowrap", overflow: "scroll", textOverflow: "ellipsis" }} paddingRight={1} className="div-subtitle">
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
            </Grid>
        </Container >
    )
}

export default HikeDetails