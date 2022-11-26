import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import { decimalHoursToTime } from '../../Utils/TimeUtils';

function HikeDetailsGeneral(props) {
    const { hike } = props;

    return (
        <Grid item xs={12} lg={7} border={"1px solid #BBBBBB"} sx={{ marginRight: { xs: "8vw", lg: 0 }, marginLeft: { xs: "6vw", lg: "12vw" }, marginTop: { xs: "3vh", lg: 0 }, padding: 4, paddingBottom: 0 }}>
            <Box component="div" className={"hide-scrollbar"} display="flex" marginBottom={1}>
                {/* Length */}
                <Box component="div" marginRight={"5vw"}>
                    <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        Round Trip Length
                    </Typography>
                    <Typography gutterBottom variant="h6" color="text.primary" sx={{ fontWeight: 550 }} margin={0}>
                        {`${hike.track_length} km`}
                    </Typography>
                </Box>
                {/* Ascent */}
                <Box component="div" marginRight={"5vw"}>
                    <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        Ascent
                    </Typography>
                    <Typography gutterBottom variant="h6" color="text.primary" sx={{ fontWeight: 550 }} margin={0}>
                        {`${hike.ascent} m`}
                    </Typography>
                </Box>
                {/* Length */}
                <Box component="div">
                    <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        Expected Time
                    </Typography>
                    <Typography gutterBottom variant="h6" color="text.primary" sx={{ fontWeight: 550 }} margin={0}>
                        {`${decimalHoursToTime(hike.expected_time)} h`}
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
                        {hike.description}
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
                        {hike.author}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default HikeDetailsGeneral