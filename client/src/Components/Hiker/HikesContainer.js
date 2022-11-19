import React from 'react'

import { Container, Grid, Typography } from '@mui/material';
import HikesFilterPanel from './HikesFilterPanel';
import HikesList from './HikesList';

const HikesContainer = (props) => {
    const { isloggedIn, loggedUser } = props;

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
                <HikesList />
            </Grid>
        </Container >
    )
}

export default HikesContainer