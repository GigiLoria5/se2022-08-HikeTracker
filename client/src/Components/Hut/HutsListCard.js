import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import React from 'react'
import { useNavigate } from 'react-router-dom';

function HutsListCard(props) {
    const { hut } = props;
    const navigate = useNavigate();
    const { id, city, province, country, type, name, altitude, description, author } = hut;
    const typeLabel = {
        'alpine_hut': 'Alpine Hut',
        'fixed_bivouac': 'Fixed Bivouac',
        'unmanaged_hut': 'Unmanaged Hut',
        'hiking_hut': 'Hiking Hut',
        'other': 'Uncategorized Hut'
    };

    function handleNavigation() {
        return (event) => { event.preventDefault(); navigate(`/huts/${id}`); };
    }

    return (
        <Grid item xs={12} sm={6} lg={4} >
            <Card width="100%" className='card'>
                <CardActionArea onClick={handleNavigation()} >
                    <CardContent sx={{ paddingBottom: 2 }}>
                        {/* Location & Type */}
                        <Box component="div" display="flex" className="flex-font" marginBottom={1}>
                            <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                                {city}, {province}, {country} &nbsp;
                            </Typography>
                            <Typography gutterBottom variant="body2" color="text.secondary" margin={0} marginLeft={"auto"}>
                                {typeLabel[type]}
                            </Typography>
                        </Box>
                        {/* Name & Altitude */}
                        <Box component="div" className="flex-font" marginBottom={0.2}>
                            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '3.90vw', sm: '2.25vw', md: '2vw', lg: '1vw' }, }} margin={0}>
                                {name} | {altitude} m asl
                            </Typography>
                        </Box>
                        {/* Description */}
                        <Box component="div" className="hike-card-description-wrap" marginBottom={0.2}>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                {/* Author & Read More */}
                <Box component="div" className="no-exceed" paddingLeft={2} paddingRight={2} marginBottom={0.5}>
                    <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        by {author}
                    </Typography>
                    <CardActions sx={{ padding: 0, marginLeft: "auto" }} >
                        <Button size="small" sx={{ padding: 0 }} onClick={handleNavigation()} endIcon={<ArrowForwardIcon />}>Read More</Button>
                    </CardActions>
                </Box>
            </Card>
        </Grid >
    );
}

export default HutsListCard