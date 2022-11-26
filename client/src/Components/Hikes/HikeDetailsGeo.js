import React, { useEffect, useState } from 'react'
import { Box, Button, ClickAwayListener, Divider, Drawer, Grid, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapViewer from '../Map/MapViewer';
import HikeDetailsGeoPoint from './HikeDetailsGeoPoint';
import { getColorByDifficulty } from '../../Utils/DifficultyMapping';

function HikeDetailsGeo(props) {
    const { hike, isloggedIn, loggedUser } = props;
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = useState(false);
    const usersRoleMapPermission = ['hiker', 'local_guide'];
    console.log(hike);

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
        <Box component="div" sx={{ margin: 2, marginTop: { xs: 2, lg: 3 }, height: "100vh" }}>
            {/* Map */}
            <Box component="div" sx={{ width: "100%", height: "40%", marginTop: 2 }}>
                {isloggedIn && usersRoleMapPermission.includes(loggedUser.role)
                    ? < MapViewer gpxFileContent={hike.gpx_content} height={'100%'} width={'100%'} startPoint={hike.start} endPoint={hike.end} refPoints={hike.reference_points} trailColor={getColorByDifficulty(hike.difficulty)} />
                    : <h1>Log in as Hiker or Local Guide to see the map</h1>
                }
            </Box>
            {/* Start Point */}
            <Box component="div" sx={{ marginTop: { xs: 2, lg: 3 } }}>
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    Start Point
                </Typography>
                {/* Point Description */}
                <HikeDetailsGeoPoint pointType={hike.start_point_type} point={hike.start} />
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

            {/* End Point */}
            <Box component="div" >
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    End Point
                </Typography>
                {/* Point Description */}
                <HikeDetailsGeoPoint pointType={hike.end_point_type} point={hike.end} />
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

            {/* Reference Points */}
            <Box component="div" >
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    Reference Points
                </Typography>
                {/* Point Description */}
                {hike.reference_points.length === 0
                    ? <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        No reference points are available for this hike
                    </Typography>
                    : hike.reference_points.map(rp => { return <HikeDetailsGeoPoint key={`rp-${rp.id}`} pointType={rp.ref_point_type} point={rp} /> })
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
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }, border: "1px solid red" }} lg={3} >
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