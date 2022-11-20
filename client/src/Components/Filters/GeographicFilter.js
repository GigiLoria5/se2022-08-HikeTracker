import React, { useEffect, useState } from 'react'

import { Autocomplete, Box, CircularProgress, TextField, Typography } from '@mui/material';

function GeographicFilter(props) {
    const { filter, setFilter, countryList } = props;
    const [isLoading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (isLoading && countryList && countryList.length > 0)
            setLoading(false);
        // eslint-disable-next-line 
    }, [countryList.length]);

    return (
        <Box component="div" sx={{ marginTop: { xs: 7, lg: 3 }, padding: 4, paddingTop: 0 }}>
            {/* Title */}
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                Geographic Area
            </Typography>
            {/* Loading Progress */}
            {isLoading && <CircularProgress color="success" />}
            {/* Country */}
            {!isLoading && <Autocomplete
                disablePortal
                id="combo-box-country"
                options={countryList}
                sx={{ maxWidth: 300 }}
                renderInput={(params) => <TextField {...params} id="country" label="Country" />}
                onChange={(_, value) => setFilter({ ...filter, country: value })}
            />}
        </Box>
    )
}

export default GeographicFilter