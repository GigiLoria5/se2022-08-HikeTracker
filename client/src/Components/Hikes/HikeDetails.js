import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../../API';
import MapViewer from '../Map/MapViewer';

function HikeDetails(props) {
    const { isloggedIn, loggedUser } = props;
    const { hikeId } = useParams();
    const [hike, setHike] = useState(null);

    useEffect(() => {
        // fetch /api/hike/:id
        if (hikeId) {
            API.getHikeById(parseInt(hikeId))
                .then((h) => { setHike(h); })
                .catch(err => { console.log(err); })
        }
    }, [hikeId]);

    return (
        <Container className='container-full-page'>
            {hike ? <Grid container >
                {/* Title */}
                <Grid item xs={12} >
                    <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                        {`${hike.title}`}
                    </Typography>
                </Grid>

                {/* Hikes List */}
                <Grid item xs={12} >
                    <Box component="div" sx={{ marginTop: 2, padding: 4, paddingTop: 0 }}>
                        {!isloggedIn
                            ? <h1>Log in to see the map</h1>
                            : < MapViewer gpxFileContent={hike.gpx_content} height={'600px'} width={'800px'} startPoint={hike.start} endPoint={hike.end} refPoints={hike.reference_points} />
                        }</Box>
                </Grid>
            </Grid>
                : false}
        </Container >
    )
}

export default HikeDetails