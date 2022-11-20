import React, { useEffect, useState } from 'react'

import { Autocomplete, Box, TextField, Typography } from '@mui/material';

function GeographicFilter(props) {
    const { filter, setFilter, countryList, getProvinceList } = props;
    const [isLoading, setLoading] = useState(true); // Loading state
    const [isLoadingProvince, setLoadingProvince] = useState(false);
    const [isLoadingCity, setLoadingCity] = useState(false);
    const [countryActive, setCountryActive] = useState(null);
    const [provinceList, setProvinceList] = useState(["Loading..."]);
    const [provinceActive, setProvinceActive] = useState(null);

    useEffect(() => {
        if (isLoading && countryList && countryList.length > 0)
            setLoading(false);
        // eslint-disable-next-line 
    }, [countryList.length]);

    useEffect(() => {
        const getProvList = async () => {
            const provinceList = await getProvinceList(countryActive);
            setProvinceList(provinceList);
            setLoadingProvince(false);
        }
        if (countryActive)
            getProvList();
        // eslint-disable-next-line 
    }, [countryActive]);

    const handleChangeCountry = (newCountry) => {
        if (countryActive === newCountry)
            return;
        setFilter({ ...filter, country: newCountry });
        setLoadingProvince(true);
        setCountryActive(newCountry);
    };

    const handleChangeProvince = (newProvince) => {
        if (provinceActive === newProvince)
            return;
        setFilter({ ...filter, province: newProvince });
        setLoadingCity(true);
        setProvinceActive(newProvince);
    };

    return (
        <Box component="div" sx={{ marginTop: { xs: 4, lg: 3 }, padding: 4, paddingTop: 0 }}>
            {/* Title */}
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                Geographic Area
            </Typography>
            {/* Country */}
            <Autocomplete
                disablePortal
                id="combo-box-country"
                loading={isLoading}
                loadingText="Loading..."
                options={countryList}
                sx={{ maxWidth: 300 }}
                renderInput={(params) => <TextField {...params} id="country" label="Country" />}
                onChange={(_, value) => handleChangeCountry(value)}
            />
            {/* Province */}
            <Autocomplete
                disablePortal
                id="combo-box-province"
                disabled={countryActive ? false : true}
                loading={isLoadingProvince}
                loadingText="Loading..."
                options={isLoadingProvince ? [{ label: "Loading...", id: 0 }] : provinceList}
                sx={{ maxWidth: 300, marginTop: 2 }}
                renderInput={(params) => <TextField {...params} id="province" label="Province" />}
                onChange={(_, value) => handleChangeProvince(value)}
            />
        </Box>
    )
}

export default GeographicFilter