import { Box, Slider, Typography } from '@mui/material';
import React, { useEffect } from 'react'

function BedsNumberFilter(props) {
    const { filter, setFilter, huts, setLoadingHuts, resetBedsNumber, setResetBedsNumber } = props;
    const [maxBedsNumber, setBedsNumber] = React.useState(null); // default value
    const [value, setValue] = React.useState([0, maxBedsNumber]);

    let marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: maxBedsNumber,
            label: `${maxBedsNumber}`,
        },
    ];

    // This is needed for the setup of the max value
    useEffect(() => {
        if (huts.length > 0 && maxBedsNumber === null) {
            const newMaxBedsNumber = Math.max(...huts.map(h => parseInt(h.beds_number)));
            setValue([0, newMaxBedsNumber]);
            setBedsNumber(newMaxBedsNumber);
        }
        // eslint-disable-next-line 
    }, [huts.length]);

    // This is needed in case of a new maxium length (hike added during the navigation)
    useEffect(() => {
        if (huts.length > 0) {
            const newMaxBedsNumber = Math.max(...huts.map(h => parseInt(h.beds_number)));
            if (newMaxBedsNumber > maxBedsNumber)
                setBedsNumber(newMaxBedsNumber);
        }
        // eslint-disable-next-line 
    }, [huts.length]);

    // RESET
    useEffect(() => {
        if (resetBedsNumber) {
            setValue([0, maxBedsNumber]);
            setResetBedsNumber(false);
        }
        // eslint-disable-next-line 
    }, [resetBedsNumber]);

    const valueLabelFormat = (value) => {
        return `${value}`;
    }

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (_, newValue) => {
        setValue(newValue);
        setLoadingHuts(true);
        setFilter({ ...filter, "beds_number_min": newValue[0], "beds_number_max": newValue[1] });
    };

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            {/* Title */}
            <Box component="div" sx={{ display: "inline" }}>
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                    Beds Number
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1, display: "inline" }}>
                        {`${value[0]} - ${value[1]}`}
                    </Typography>
                </Typography>
            </Box>
            {/* Beds Number Slider */}
            <Box sx={{ maxWidth: 300, paddingLeft: 1, paddingRight: 1 }}>
                {maxBedsNumber !== null ? <Slider
                    value={value}
                    min={0}
                    step={1}
                    max={maxBedsNumber}
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

export default BedsNumberFilter