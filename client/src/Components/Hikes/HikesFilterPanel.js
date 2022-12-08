import React, { useEffect } from 'react'
import { Box, Button, ClickAwayListener, createTheme, Divider, Drawer, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import API from '../../API';
import NameFilter from '../Filters/NameFilter';
import GeographicFilter from '../Filters/GeographicFilter';
import DifficultyFilter from '../Filters/DifficultyFilter';
import LengthFilter from '../Filters/LengthFilter';
import AscentFilter from '../Filters/AscentFilter';
import ExpectedTimeFilter from '../Filters/ExpectedTimeFilter';
import { emptyFilter } from '../../Utils/Hike';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#546070',
        },
    },
});

const HikesFilterPanel = (props) => {
    const { filter, setFilter, setLoadingHikes, hikes, position, setPosition, radius, setRadius, setSearch } = props;
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = React.useState(false);
    const [countryList, setCountryList] = React.useState([]);

    const [resetSearch, setResetSearch] = React.useState(false);
    const [resetGeographic, setResetGeographic] = React.useState(false);
    const [resetDifficulty, setResetDifficulty] = React.useState(false);
    const [resetLength, setResetLength] = React.useState(false);
    const [resetAscent, setResetAscent] = React.useState(false);
    const [resetExpectedTime, setResetExpectedTime] = React.useState(false);

    useEffect(() => {
        API.getCountries().then(countries => {
            const countryListLabel = countries.map(c => c.country);
            setCountryList(countryListLabel);
        });
    }, [hikes.length]); // dependence required for the countries of any new hikes added

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.outerWidth > 1200)   // 1200 is the "lg" breakpoint
                setDeviceFilterPanelOpen(false); // this is needed to fix a bug in which if you widen the screen while the drawer is open, the page remains locked
        });
    }, []);

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

    /* To hide/show the filter panel for small screen */
    const toggleFilterPanelDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceFilterPanelOpen(state);
    };

    const handleResetFilters = () => {
        setResetSearch(true);
        setResetGeographic(true);
        setResetDifficulty(true);
        setResetLength(true);
        setResetAscent(true);
        setResetExpectedTime(true);
        setFilter(emptyFilter)
    };

    // Filter Components
    const filterComponents = (
        <>
            {/* Search By Name */}
            <NameFilter setSearch={setSearch} setLoadingHikes={setLoadingHikes} resetSearch={resetSearch} setResetSearch={setResetSearch} label="Search by hike title..." />
            {/* Geographic Area Filter */}
            <GeographicFilter filter={filter} setFilter={setFilter} hikes={hikes} setLoadingHikes={setLoadingHikes}
                resetGeographic={resetGeographic} setResetGeographic={setResetGeographic}
                countryList={countryList} getProvinceList={getProvinceList} getCityList={getCityList}
                position={position} setPosition={setPosition} radius={radius} setRadius={setRadius}
            />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Difficulty Filter */}
            <DifficultyFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} resetDifficulty={resetDifficulty} setResetDifficulty={setResetDifficulty} />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Length Filter */}
            <LengthFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} hikes={hikes} resetLength={resetLength} setResetLength={setResetLength} />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Ascent Filter */}
            <AscentFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} hikes={hikes} resetAscent={resetAscent} setResetAscent={setResetAscent} />
            <Divider sx={{ maxWidth: 300, marginTop: 2, marginLeft: 4 }} />
            {/* Expected Time Filter */}
            <ExpectedTimeFilter filter={filter} setFilter={setFilter} setLoadingHikes={setLoadingHikes} hikes={hikes} resetExpectedTime={resetExpectedTime} setResetExpectedTime={setResetExpectedTime} />
        </>
    );

    /* Filter panel for SMALL SCREENs */
    const filterHiddenPanel = (
        <Box
            sx={{ width: '100%', display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
            role="presentation"
        >
            <ThemeProvider theme={theme}>
                <Box component="div" sx={{ display: "flex", marginBottom: 2, marginTop: 2, paddingLeft: 2, paddingRight: 2, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between" }} >
                    {/* Reset Button */}
                    <Button color="error" variant="outlined" onClick={() => handleResetFilters()}>
                        Reset
                    </Button>
                    {/* Filters Title */}
                    <Typography variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600, paddingRight: 2 }}>
                        Filters
                    </Typography>
                    {/* Close Drawer */}
                    <IconButton color="neutral" aria-label="reset radius" component="label" onClick={toggleFilterPanelDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </ThemeProvider >
            {filterComponents}
            {/* Show Hikes Button */}
            <Box component="div" sx={{ marginTop: 2, marginBottom: 2, padding: 4, paddingTop: 0, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                <Button color="success" variant="contained" onClick={toggleFilterPanelDrawer(false)} >
                    {`Show ${hikes.length} hikes`}
                </Button>
            </Box>
        </Box >
    );

    return (
        <>
            {/* Filter Panel - Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} lg={3} >
                {filterComponents}
                <Divider sx={{ maxWidth: 300, marginTop: 1, marginLeft: 4 }} />
                {/* Reset Button */}
                <Box component="div" sx={{ display: "flex", marginBottom: 2, marginTop: 2, paddingLeft: 2, paddingRight: 2, flexDirection: "row", flexWrap: "nowrap", justifyContent: "center" }} >
                    {/* Reset Button */}
                    <Button color="error" variant="outlined" onClick={() => handleResetFilters()}>
                        Reset Filters
                    </Button>
                </Box>
            </Grid>

            {/* Panel Button - Only on Small Screen */}
            <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                <Button variant="outlined" color="inherit" startIcon={<FilterListIcon />} onClick={toggleFilterPanelDrawer(true)}> Filter </Button>
            </Grid>

            {/* Filter Panel - Small Screen */}
            {deviceFilterPanelOpen &&
                <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                    <React.Fragment key={"filter-left-panel-hikes"} >
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