import React, { useEffect, useState } from 'react'

import { Container, Grid, Typography } from '@mui/material';
import HikesFilterPanel from './HikesFilterPanel';
import HikesList from './HikesList';
import API from '../../API';

const HikesContainer = (props) => {
    const [hikes, setHikes] = useState([]);
    const [filter, setFilter] = useState({ "country": null, "province": null, "city": null, "difficulty": null, "track_length": null, "ascent": null, "expected_time": null });

    useEffect(() => {
        API.getHikesWithFilters(filter)
            .then(hikes => {
                setHikes(hikes);
                console.log(hikes);
            });
        // eslint-disable-next-line 
    }, [filter.country, filter.province, filter.city, filter.difficulty, filter.track_length, filter.ascent, filter.ascent]);

    return (
        <Container className='container-full-page'>
            <Grid container >
                {/* Title */}
                <Grid item xs={12} >
                    <Typography variant="h5" marginTop={1} marginBottom={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                        Find your next hike
                    </Typography>
                </Grid>

                {/* Filter */}
                <HikesFilterPanel />

                {/* Hikes List */}
                <HikesList hikes={hikes} />
            </Grid>
        </Container >
    )
}

export default HikesContainer