import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'

function HutDetailsGeneral(props) {
    const { hut } = props;

    return (
        <Grid item xs={12} lg={7} border={"1px solid #BBBBBB"} sx={{ marginRight: { xs: "8vw", lg: 0 }, marginLeft: { xs: "6vw", lg: "12vw" }, marginTop: { xs: "3vh", lg: 0 }, padding: 4, paddingBottom: 0 }}>
            <Box component="div" className={"hide-scrollbar"} display="flex" marginBottom={1}>
                {/* Beds Number */}
                <Box component="div" marginRight={"5vw"}>
                    <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        Beds Number
                    </Typography>
                    <Typography gutterBottom variant="h6" color="text.primary" sx={{ fontWeight: 550 }} margin={0}>
                        {`${hut.beds_number}`}
                    </Typography>
                </Box>
            </Box>

            {/* Description */}
            <Box component="div" display="block" marginBottom={1}>
                {/* Title */}
                <Box component="div" marginRight={"5vw"} marginBottom={1}>
                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 550 }} color="text.primary" margin={0}>
                        Description
                    </Typography>
                </Box>
                <Divider width={"100%"} />
                {/* Body */}
                <Box component="div" marginTop={2} marginRight={"2vw"}>
                    <Typography gutterBottom variant="body2" color="grey.800" margin={0}>
                        {hut.description}
                    </Typography>
                </Box>
            </Box>

            {/* Author */}
            <Box component="div" display="block" marginBottom={1} marginTop={2} paddingBottom={2}>
                <Divider width={"100%"} />
                {/* Author Text */}
                <Box component="div" display={"inline-flex"} marginTop={"3vh"} marginRight={"2vw"}>
                    <Typography gutterBottom variant="body1" fontWeight={600} color="grey.800" margin={0}>
                        Author: &nbsp;
                    </Typography>
                    <Typography gutterBottom variant="body1" color="grey.800" margin={0}>
                        {hut.author}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default HutDetailsGeneral