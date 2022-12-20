import React, { useEffect , useState} from 'react'

import { CircularProgress, Grid, Typography } from '@mui/material';
import HikeCompletedCard from './HikeCompletedCard';

const HikesListCompleted = (props) => {
    const { hikes, loadingHikes } = props;
    const styleOnLoading = () => loadingHikes ? { textAlign: 'center', marginTop: 4 } : {};
    const [valgrid, setValgrid] = useState(12);

    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 1
    };

    useEffect(() => {
        if (hikes.length === 1) {
            setValgrid(12)
        } else if (hikes.length === 2) {
            setValgrid(6)
        } else {
            setValgrid(4)
        }
    });

    return (
        <Grid container  alignItems='center'>  
            <Grid item xs={0} sm={2.5}></Grid>
            <Grid item xs={12}sm={7} marginBottom={12} sx={styleOnLoading()}>
                {loadingHikes
                    ? <CircularProgress color="success" />
                    : <Grid container spacing={2} paddingTop={2} >  
                        {hikes.map((hike) => 
                            <Grid item xs={12} sm={valgrid} sx={{...thm}} >
                                <HikeCompletedCard key={hike.id} hike={hike} />
                            </Grid>
                        )}
                        {hikes.length === 0
                            ? <Typography gutterBottom variant="body1" color="text.secondary" padding={4}>
                                You haven't completed any hike yet.
                            </Typography>
                            : null}
                        
                    </Grid>}
            </Grid>
            <Grid item xs={0} sm={2.5}></Grid>

        </Grid>
    )
}

export default HikesListCompleted;