import React from 'react'

import { CircularProgress, Grid, Typography } from '@mui/material';
import HutsListCard from './HutsListCard';

function HutsList(props) {
    const { huts, loadingHuts } = props;
    const styleOnLoading = () => loadingHuts ? { textAlign: 'center', marginTop: 4 } : {};

    return (
        <Grid item xs={12} lg={9} marginBottom={12} sx={styleOnLoading()}>
            {loadingHuts
                ? <CircularProgress color="success" />
                : <Grid container spacing={2} paddingTop={2} paddingLeft={2} paddingRight={2} >
                    {huts.map((hut) => <HutsListCard key={hut.id} hut={hut} />)}
                    {huts.length === 0
                        ? <Typography gutterBottom variant="body1" color="text.secondary" padding={4}>
                            Sorry! We couldn't find what you're looking for. Try changing something...
                        </Typography>
                        : null}
                </Grid>}
        </Grid>
    );
}

export default HutsList