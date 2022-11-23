import { Box, Slider, Typography } from '@mui/material';
import React, { useEffect } from 'react'

function AscentFilter(props) {
    const { filter, setFilter, hikes, setLoadingHikes } = props;
    const [maxAscent, setMaxAscent] = React.useState(null); // default value
    const [value, setValue] = React.useState([0, maxAscent]);

    let marks = [
        {
            value: 0,
            label: '0 m',
        },
        {
            value: maxAscent,
            label: `${maxAscent} m`,
        },
    ];

    // This is needed for the setup of the max value
    useEffect(() => {
        if (hikes.length > 0 && maxAscent === null) {
            const newMaxAscent = Math.max(...hikes.map(h => parseInt(h.ascent)));
            setValue([0, newMaxAscent]);
            setMaxAscent(newMaxAscent);
        }
        // eslint-disable-next-line 
    }, [hikes.length]);

    // This is needed in case of a new maxium ascent (hike added during the navigation)
    useEffect(() => {
        if (hikes.length > 0) {
            const newMaxAscent = Math.max(...hikes.map(h => parseInt(h.ascent)));
            if (newMaxAscent > maxAscent)
                setMaxAscent(newMaxAscent);
        }
        // eslint-disable-next-line 
    }, [hikes.length]);

    const valueLabelFormat = (value) => {
        return `${value} m`;
    }

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (_, newValue) => {
        setValue(newValue);
        setLoadingHikes(true);
        setFilter({ ...filter, "ascent_min": newValue[0], "ascent_max": newValue[1] });
    };

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            {/* Title */}
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                Total Ascent
            </Typography>
            {/* Ascent Slider */}
            <Box sx={{ maxWidth: 300, paddingLeft: 1, paddingRight: 1 }}>
                {maxAscent !== null ? <Slider
                    value={value}
                    min={0}
                    step={1}
                    max={maxAscent}
                    marks={marks}
                    getAriaValueText={valueLabelFormat}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="auto"
                /> : null}
            </Box>
        </ Box >
    )
}

export default AscentFilter