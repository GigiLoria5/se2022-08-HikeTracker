import React, { useEffect } from 'react'

import { Box, Button, ClickAwayListener, Divider, Drawer, Grid, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GeographicFilter from '../Filters/GeographicFilter';
import API from '../../API';
import DifficultyFilter from '../Filters/DifficultyFilter';
import LengthFilter from '../Filters/LengthFilter';
import AscentFilter from '../Filters/AscentFilter';
import ExpectedTimeFilter from '../Filters/ExpectedTimeFilter';

const HikesFilterPanel = (props) => {
    const { filter, setFilter, setLoadingHikes, hikes, position, setPosition, radius, setRadius } = props;
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = React.useState(false);
    const [countryList, setCountryList] = React.useState([]);

    useEffect(() => {
        API.getCountries().then(countries => {
            const countryListLabel = countries.map(c => c.country);
            setCountryList(countryListLabel);
        });
    }, [hikes.length]); // dependence required for the countries of any new hikes added

    /* To hide/show the filter panel for small screen */
    const toggleFilterPanelDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceFilterPanelOpen(state);
    };

    const getProvinceList = async (country) => {
        return await API.getProvincesByCountry(country).then(provinces => {
            const provinceList = provinces.map(p => p.province);
            return provinceList;
        });
    };

    const getCityList = async (province) => {
        return await API.getCitiesByProvince(province).then(cities => {
            const cityList = cities.map(c => c.city);
            return cityList;
        });
    };

    // Filter Components
    const filterComponents = (
        <>
            {/* Geographic Area Filter */}
            <GeographicFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes}
                countryList={countryList} getProvinceList={getProvinceList} getCityList={getCityList}
                position={position} setPosition={setPosition} radius={radius} setRadius={setRadius}
            />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Difficulty Filter */}
            <DifficultyFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Length Filter */}
            <LengthFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} hikes={hikes} />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Ascent Filter */}
            <AscentFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} hikes={hikes} />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Expected Time Filter */}
            <ExpectedTimeFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} hikes={hikes} />
        </>
    );

    /* Filter panel for small screen */
    const filterHiddenPanel = (<Box
        sx={{ width: '100%', display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
        role="presentation"
    >
        <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
            Filters
        </Typography>
        {filterComponents}
    </Box>);

    return (
        <>
            {/* Filter Panel - Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} lg={3} >
                {filterComponents}
            </Grid>

            {/* Panel Button - Only on Small Screen */}
            <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                <Button variant="outlined" color="inherit" startIcon={<FilterListIcon />} onClick={toggleFilterPanelDrawer(true)}> Filter </Button>
            </Grid>

            {/* Filter Panel - Small Screen */}
            {deviceFilterPanelOpen &&
                <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                    <React.Fragment key={"filter-left-panel"} >
                        <ClickAwayListener onClickAway={toggleFilterPanelDrawer(false)}>
                            <Drawer
                                anchor={"left"}
                                open={deviceFilterPanelOpen}
                                onClose={toggleFilterPanelDrawer(false)}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' } }}
                            >
                                {filterHiddenPanel}
                            </Drawer>
                        </ClickAwayListener>
                    </React.Fragment>
                </Grid>
            }
        </>
    )
};

export default HikesFilterPanel;