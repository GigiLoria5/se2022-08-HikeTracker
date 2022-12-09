import { Box, Slider, Typography } from '@mui/material';
import React, { useEffect } from 'react'

function AltitudeFilter(props) {
    const { filter, setFilter, huts, setLoadingHuts, resetAltitude, setResetAltitude } = props;
    const [maxAltitude, setMaxAltitude] = React.useState(null); // default value
    const [value, setValue] = React.useState([0, maxAltitude]);

    let marks = [
        {
            value: 0,
            label: '0 m',
        },
        {
            value: maxAltitude,
            label: `${maxAltitude} m`,
        },
    ];

    // This is needed for the setup of the max value
    useEffect(() => {
        if (huts.length > 0 && maxAltitude === null) {
            const newMaxAltitude = Math.max(...huts.map(h => parseInt(h.altitude)));
            setValue([0, newMaxAltitude]);
            setMaxAltitude(newMaxAltitude);
        }
        // eslint-disable-next-line 
    }, [huts.length]);

    // This is needed in case of a new maxium length (hut added during the navigation)
    useEffect(() => {
        if (huts.length > 0) {
            const newMaxAltitude = Math.max(...huts.map(h => parseInt(h.altitude)));
            if (newMaxAltitude > maxAltitude)
                setMaxAltitude(newMaxAltitude);
        }
        // eslint-disable-next-line 
    }, [huts.length]);

    // RESET
    useEffect(() => {
        if (resetAltitude) {
            setValue([0, maxAltitude]);
            setResetAltitude(false);
        }
        // eslint-disable-next-line 
    }, [resetAltitude]);

    const valueLabelFormat = (value) => {
        return `${value} m`;
    }

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (_, newValue) => {
        setValue(newValue);
        setLoadingHuts(true);
        setFilter({ ...filter, "altitude_min": newValue[0], "altitude_max": newValue[1] });
    };

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            {/* Title */}
            <Box component="div" sx={{ display: "inline" }}>
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                    Altitude
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1, display: "inline" }}>
                        {`${value[0]} - ${value[1]} m`}
                    </Typography>
                </Typography>
            </Box>
            {/* Altitude Slider */}
            <Box sx={{ maxWidth: 300, paddingLeft: 1, paddingRight: 1 }}>
                {maxAltitude !== null ? <Slider
                    value={value}
                    min={0}
                    step={1}
                    max={maxAltitude}
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

export default AltitudeFilter