import { Box, Grid, Typography } from '@mui/material';
import React from 'react'

function HikeDetailsGeneral(props) {
    const { hike } = props;

    return (
        <Grid item xs={12} lg={9} marginBottom={2} sx={{ backgroundColor: "red" }}>
            <Box component="div" display="flex" className="flex-font" marginBottom={1}>
                <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                    Test Test
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" margin={0} marginLeft={"auto"}>
                    Pippo Pippo
                </Typography>
            </Box>
        </Grid>
    )
}

export default HikeDetailsGeneral