import React, { useEffect } from 'react'

import { Box, Button, ClickAwayListener, Divider, Drawer, Grid, List, ListItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GeographicFilter from '../Filters/GeographicFilter';
import API from '../../API';

const HikesFilterPanel = (props) => {
    const { filter, setFilter, hikes } = props;
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

    // Filter Components
    const geographicFilterComponent = (<GeographicFilter filter={filter} setFilter={setFilter} countryList={countryList} />);

    /* Filter panel for small screen */
    const filterHiddenPanel = (<Box
        sx={{ width: "auto", display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
        role="presentation"
        onKeyDown={toggleFilterPanelDrawer(false)}
    >
        {geographicFilterComponent}
    </Box>);

    return (
        <>
            {/* Filter Panel - Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} lg={3} >
                {geographicFilterComponent}
            </Grid>

            {/* Panel Button - Only on Small Screen */}
            <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                <Button variant="outlined" color="inherit" startIcon={<FilterListIcon />} onClick={toggleFilterPanelDrawer(true)}> Filter </Button>
            </Grid>

            {/* Filter Panel - Small Screen */}
            {deviceFilterPanelOpen &&
                <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                    <React.Fragment key={"filter-left-panel"}>
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
