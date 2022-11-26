import { Box, Grid, Typography } from '@mui/material';
import React from 'react'

function HikeDetailsGeneral(props) {
    const { hike } = props;

    return (
        <Grid item xs={12} lg={7} border={"1px solid blue"} marginLeft={"8vw"} sx={{ marginRight: { xs: "8vw", lg: 0 } }}>
            <Box component="div" display="flex" className="flex-font" marginBottom={1}>
                <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                    Left
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" margin={0} marginLeft={"auto"}>
                    Right
                </Typography>
            </Box>
        </Grid>
    )
}

export default HikeDetailsGeneral