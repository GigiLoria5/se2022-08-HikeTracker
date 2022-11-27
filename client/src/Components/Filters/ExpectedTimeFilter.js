import { Box, Slider, Typography } from '@mui/material';
import React, { useEffect } from 'react'

function ExpectedTimeFilter(props) {
    const { filter, setFilter, hikes, setLoadingHikes, resetExpectedTime, setResetExpectedTime } = props;
    const [maxExpectedTime, setMaxExpectedTime] = React.useState(null); // default value
    const [value, setValue] = React.useState([0, maxExpectedTime]);

    let marks = [
        {
            value: 0,
            label: '0 h',
        },
        {
            value: maxExpectedTime,
            label: `${maxExpectedTime} h`,
        },
    ];

    // This is needed for the setup of the max value
    useEffect(() => {
        if (hikes.length > 0 && maxExpectedTime === null) {
            const newMaxExpectedTime = Math.max(...hikes.map(h => parseFloat(h.expected_time)));
            setValue([0, newMaxExpectedTime]);
            setMaxExpectedTime(newMaxExpectedTime);
        }
        // eslint-disable-next-line 
    }, [hikes.length]);

    // This is needed in case of a new maxium expected_time (hike added during the navigation)
    useEffect(() => {
        if (hikes.length > 0) {
            const newMaxExpectedTime = Math.max(...hikes.map(h => parseFloat(h.expected_time)));
            if (newMaxExpectedTime > maxExpectedTime)
                setMaxExpectedTime(newMaxExpectedTime);
        }
        // eslint-disable-next-line 
    }, [hikes.length]);

    // RESET
    useEffect(() => {
        if (resetExpectedTime) {
            setValue([0, maxExpectedTime]);
            setResetExpectedTime(false);
        }
        // eslint-disable-next-line 
    }, [resetExpectedTime]);

    const valueLabelFormat = (value) => {
        return `${value} h`;
    }

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (_, newValue) => {
        setValue(newValue);
        setLoadingHikes(true);
        setFilter({ ...filter, "expected_time_min": newValue[0], "expected_time_max": newValue[1] });
    };

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 1 }}>
            {/* Title */}
            <Box component="div" sx={{ display: "inline" }}>
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                    Expected Time
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1, display: "inline" }}>
                        {`${value[0]} - ${value[1]} h`}
                    </Typography>
                </Typography>
            </Box>
            {/* ExpectedTime Slider */}
            <Box sx={{ maxWidth: 300, paddingLeft: 1, paddingRight: 1 }}>
                {maxExpectedTime !== null ? <Slider
                    value={value}
                    min={0}
                    step={0.1}
                    max={maxExpectedTime}
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

export default ExpectedTimeFilter