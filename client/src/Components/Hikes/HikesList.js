import React from 'react'

import { CircularProgress, Grid, Typography } from '@mui/material';
import HikesListCard from './HikesListCard';

const HikesList = (props) => {
    const { hikes, loadingHikes } = props;

    return (
        <Grid item xs={12} lg={9} marginBottom={2}>
            {loadingHikes
                ? <CircularProgress color="success" />
                : <Grid container spacing={2} paddingTop={2} paddingLeft={2} paddingRight={2} >
                    {hikes.map((hike) => <HikesListCard key={hike.id} hike={hike} />)}
                    {hikes.length === 0
                        ? <Typography gutterBottom variant="body1" color="text.secondary" padding={4}>
                            Sorry! We couldn't find what you're looking for. Try changing something...
                        </Typography>
                        : null}
                </Grid>}
        </Grid>
    )
}

export default HikesList;
