import { Box, Slider, Typography } from '@mui/material';
import React, { useEffect } from 'react'

function LengthFilter(props) {
    const { filter, setFilter, hikes, setLoadingHikes } = props;
    const [maxLength, setMaxLength] = React.useState(null); // default value
    const [value, setValue] = React.useState([0, maxLength]);

    let marks = [
        {
            value: 0,
            label: '0 km',
        },
        {
            value: maxLength,
            label: `${maxLength} km`,
        },
    ];

    // This is needed for the setup of the max value
    useEffect(() => {
        if (hikes.length > 0 && maxLength === null) {
            const newMaxLength = Math.max(...hikes.map(h => parseFloat(h.track_length)));
            setValue([0, newMaxLength]);
            setMaxLength(newMaxLength);
        }
        // eslint-disable-next-line 
    }, [hikes.length]);

    // This is needed in case of a new maxium length (hike added during the navigation)
    useEffect(() => {
        if (hikes.length > 0) {
            const newMaxLength = Math.max(...hikes.map(h => parseFloat(h.track_length)));
            if (newMaxLength > maxLength)
                setMaxLength(newMaxLength);
        }
        // eslint-disable-next-line 
    }, [hikes.length]);

    const valueLabelFormat = (value) => {
        return `${value} km`;
    }

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (_, newValue) => {
        setValue(newValue);
        setLoadingHikes(true);
        setFilter({ ...filter, "track_length_min": newValue[0], "track_length_max": newValue[1] });
    };

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            {/* Title */}
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                Length
            </Typography>
            {/* Length Slider */}
            <Box sx={{ maxWidth: 300, paddingLeft: 1, paddingRight: 1 }}>
                {maxLength !== null ? <Slider
                    value={value}
                    min={0}
                    step={0.1}
                    max={maxLength}
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

export default LengthFilter