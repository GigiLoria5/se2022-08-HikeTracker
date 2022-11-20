import React, { useEffect, useState } from 'react'

import { Autocomplete, Box, TextField, Typography } from '@mui/material';

function GeographicFilter(props) {
    const { filter, setFilter, countryList, getProvinceList, getCityList } = props;
    const [isLoading, setLoading] = useState(true); // Loading state
    const [isLoadingProvince, setLoadingProvince] = useState(false);
    const [isLoadingCity, setLoadingCity] = useState(false);
    const [countryActive, setCountryActive] = useState(null);
    const [provinceList, setProvinceList] = useState([]);
    const [provinceActive, setProvinceActive] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [cityActive, setCityActive] = useState(null);

    // If there are new countries refresh
    useEffect(() => {
        if (isLoading && countryList && countryList.length > 0)
            setLoading(false);
        // eslint-disable-next-line 
    }, [countryList.length]);

    // Refresh province list when the active country changes
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

    // Refresh city/municipality list when the active province changes
    useEffect(() => {
        const getCitList = async () => {
            const cityList = await getCityList(provinceActive);
            setCityList(cityList);
            setLoadingCity(false);
        }
        if (provinceActive)
            getCitList();
        // eslint-disable-next-line 
    }, [provinceActive]);

    const handleChangeCountry = (newCountry) => {
        if (countryActive === newCountry)
            return;
        let newFilter = { ...filter, country: newCountry };
        // Update to new country
        setLoadingProvince(true);
        setCountryActive(newCountry);

        // Reset province if active
        if (provinceActive) {
            setProvinceList([]);
            setProvinceActive(null);
            newFilter.province = null;
        }

        // Reset City if active
        if (cityActive) {
            setCityList([]);
            setCityActive(null);
            newFilter.city = null;
        }

        // Finally update filter
        setFilter({ ...newFilter });
    };

    const handleChangeProvince = (newProvince) => {
        if (provinceActive === newProvince)
            return;
        let newFilter = { ...filter, province: newProvince };
        // Update to new province
        setLoadingCity(true);
        setProvinceActive(newProvince);

        // Reset City if active
        if (cityActive) {
            setCityList([]);
            setCityActive(null);
            newFilter.city = null;
        }

        // Finally update filter
        setFilter({ ...newFilter });
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
                value={countryActive}
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
                value={provinceActive}
                sx={{ maxWidth: 300, marginTop: 2 }}
                renderInput={(params) => <TextField {...params} id="province" label="Province" />}
                onChange={(_, value) => handleChangeProvince(value)}
            />
            {/* Municipality */}
            <Autocomplete
                disablePortal
                id="combo-box-municipality"
                disabled={provinceActive ? false : true}
                loading={isLoadingCity}
                loadingText="Loading..."
                options={isLoadingCity ? [{ label: "Loading...", id: 0 }] : cityList}
                value={cityActive}
                sx={{ maxWidth: 300, marginTop: 2 }}
                renderInput={(params) => <TextField {...params} id="municipality" label="Municipality" />}
                onChange={(_, value) => { setFilter({ ...filter, city: value }); setCityActive(value); }}
            />
        </Box>
    )
}

export default GeographicFilter