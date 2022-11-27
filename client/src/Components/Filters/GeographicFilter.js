import React, { useEffect, useState } from 'react'

import { Autocomplete, Box, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import MapLocator from '../Map/MapLocator';
import { floatInputSanitizer, positiveIntegerSanitizer } from '../../Utils/InputSanitizer';
import { splitCoordinates } from '../../Utils/GeoUtils';

const zoomLevel = 15;

function GeographicFilter(props) {
    const { filter, setFilter, hikes, setLoadingHikes, countryList, getProvinceList, getCityList, position, setPosition, radius, setRadius, resetGeographic, setResetGeographic } = props;
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

    // RESET
    useEffect(() => {
        if (resetGeographic) {
            setCountryActive(null);
            setProvinceActive(null);
            setCityActive(null);
            setRadius(null);
            setResetGeographic(false);
        }
        // eslint-disable-next-line 
    }, [resetGeographic]);

    const handleChangeCountry = (newCountry) => {
        if (countryActive === newCountry)
            return;
        let newFilter = { ...filter, country: newCountry };
        // Update to new country
        setLoadingHikes(true);
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
        setLoadingHikes(true);
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

    const handleChangeLng = (newLng) => {
        const newLngSanitized = floatInputSanitizer(newLng);
        setLoadingHikes(true);
        setPosition({ ...position, lng: isNaN(newLngSanitized) ? "0" : newLngSanitized });
    }

    const handleChangeLat = (newLat) => {
        const newLatSanitized = floatInputSanitizer(newLat);
        setLoadingHikes(true);
        setPosition({ ...position, lat: isNaN(newLatSanitized) ? "0" : newLatSanitized });
    }

    const handleChangeRadius = (newRadius) => {
        const newRadiusSanitized = positiveIntegerSanitizer(newRadius);
        setLoadingHikes(true);
        setRadius(newRadiusSanitized);
    }

    return (
        <Box component="div" sx={{ marginTop: { xs: 2, lg: 3 }, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
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
                onChange={(_, value) => { setLoadingHikes(true); setFilter({ ...filter, city: value }); setCityActive(value); }}
            />
            <Divider sx={{ maxWidth: 300, marginTop: 2 }} />
            {/* Radius around a point */}
            <Box component="div" sx={{ maxWidth: "300px", marginTop: 2 }}>
                <Box component="div" sx={{ display: "flex", marginBottom: 2 }} >
                    {/* Latitude */}
                    <TextField id="coordinates" label="latitude" variant="outlined" sx={{
                        paddingRight: 1, "& .MuiInputBase-input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }
                    }} value={position ? `${position.lat}` : ""} onChange={(e) => handleChangeLat(e.target.value)} />
                    {/* Longitude */}
                    <TextField id="coordinates" label="longitude" variant="outlined" sx={{
                        "& .MuiInputBase-input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }
                    }} value={position ? `${position.lng}` : ""} onChange={(e) => handleChangeLng(e.target.value)} />
                </Box>
                <Box component="div" sx={{ display: "flex", marginBottom: 2 }} >
                    {/* Radius */}
                    <TextField id="outlined-number" label="Radius" fullWidth InputLabelProps={{ shrink: true, }} InputProps={{ inputProps: { min: 1 }, endAdornment: <InputAdornment position="end">km</InputAdornment> }} value={radius !== null ? radius : ""} onChange={(e) => handleChangeRadius(e.target.value)} />
                    {/* Reset Radius Button */}
                    <IconButton color="error" aria-label="reset radius" component="label" onClick={() => setRadius(null)}>
                        <CancelIcon />
                    </IconButton>
                </Box>
                {/* Map (coordinate picker) */}
                <MapLocator position={position} setPosition={setPosition} radius={radius} height={'200px'} width={'300px'} initialLat={position.lat} initialLng={position.lng} zoomLevel={zoomLevel} waypoints={hikes.map(h => { return { label: h.title, lat: splitCoordinates(h.start.coordinates)[0], lng: splitCoordinates(h.start.coordinates)[1] } })} />
            </Box>
        </Box>
    )

}

export default GeographicFilter