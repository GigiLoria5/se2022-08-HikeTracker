import { Box, IconButton, Typography } from '@mui/material';
import React from 'react'
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { getPointShortDescription } from '../../Utils/Point';

function HikeDetailsGeoPoint(props) {
    const { pointType, point } = props;

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box component="div" display="flex" marginBottom={1.5}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: "100%"
            }}>
                {/* Point Description */}
                <Typography gutterBottom variant="body2" color="text.secondary" margin={0} paddingRight={2}>
                    {getPointShortDescription(pointType, point)}
                </Typography>
                {/* Point Link to Google Maps */}
                <IconButton color="warning" aria-label="reset radius" component="label" sx={{ marginLeft: "auto", padding: 0 }} onClick={() => openInNewTab(`https://maps.google.com/maps?q=${point.coordinates}`)}>
                    <AssistantDirectionIcon />
                </IconButton>
            </Box>
        </Box >
    )
}

export default HikeDetailsGeoPoint