import React, { useEffect, useState } from 'react'
import { Box, Button, ClickAwayListener, Drawer, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapViewer from '../Map/MapViewer';

function HikeDetailsGeo(props) {
    const { hike, isloggedIn, loggedUser } = props;
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.outerWidth > 1200)   // 1200 is the "lg" breakpoint
                setDeviceFilterPanelOpen(false); // this is needed to fix a bug in which if you widen the screen while the drawer is open, the page remains locked
        });
    }, []);

    /* To hide/show the filter panel for small screen */
    const toggleFilterPanelDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceFilterPanelOpen(state);
    };

    const geoDetailsComponents = (
        <Box component="div" sx={{ marginTop: { xs: 2, lg: 3 }, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            <Box component="div" sx={{ width: "50vw", marginTop: 2 }}>
                {!isloggedIn
                    ? <h1>Log in to see the map</h1>
                    : < MapViewer gpxFileContent={hike.gpx_content} height={'50vh'} width={'50vw'} startPoint={hike.start} endPoint={hike.end} refPoints={hike.reference_points} />
                }
            </Box>
        </Box>
    );

    /* Hike Geo Details panel for SMALL SCREENs */
    const geoDetailsHiddenPanel = (
        <Box
            sx={{ width: '100%', display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
            role="presentation"
        >
            {geoDetailsComponents}
        </Box >
    );

    return (
        <>
            {/* Hike Geo Details Panel - Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }, backgroundColor: "blue" }} lg={3} >
                {geoDetailsComponents}
            </Grid>

            {/* Panel Button - Only on Small Screen */}
            <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                <Button variant="outlined" color="inherit" startIcon={<LocationOnIcon />} onClick={toggleFilterPanelDrawer(true)}> Map </Button>
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
                                {geoDetailsHiddenPanel}
                            </Drawer>
                        </ClickAwayListener>
                    </React.Fragment>
                </Grid>
            }
        </>
    )
}

export default HikeDetailsGeo