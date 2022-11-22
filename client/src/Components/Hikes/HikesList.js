import React from 'react'

import { Grid } from '@mui/material';
import HikesListCard from './HikesListCard';

const HikesList = (props) => {
    const { hikes } = props;

    return (
        <Grid item xs={12} lg={9} marginBottom={2}>
            <Grid container spacing={2} paddingTop={2} paddingLeft={2} paddingRight={2} >
                {hikes.map((hike) => <HikesListCard key={hike.id} hike={hike} />)}
            </Grid>
        </Grid>
    )
}

export default HikesList;
