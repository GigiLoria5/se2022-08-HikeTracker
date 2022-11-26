import React from 'react'
import { Box, ClickAwayListener, createTheme, Divider, Drawer, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import MapViewer from '../Map/MapViewer';
import HikeDetailsGeoPoint from './HikeDetailsGeoPoint';
import CloseIcon from '@mui/icons-material/Close';
import { getColorByDifficulty } from '../../Utils/DifficultyMapping';
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#546070',
        },
    },
});

function HikeDetailsGeo(props) {
    const { hike, isloggedIn, loggedUser, deviceFilterPanelOpen, toggleFilterPanelDrawer } = props;
    const usersRoleMapPermission = ['hiker', 'local_guide'];

    const geoDetailsComponents = (
        <Box component="div" sx={{ margin: 2, marginTop: { xs: 2, lg: 3 } }}>
            {/* Map */}
            <Box component="div" sx={{ width: "100%", height: "40vh", marginTop: 2 }}>
                {isloggedIn && usersRoleMapPermission.includes(loggedUser.role)
                    ? < MapViewer gpxFileContent={hike.gpx_content} height={'100%'} width={'100%'} startPoint={hike.start} endPoint={hike.end} refPoints={hike.reference_points} trailColor={getColorByDifficulty(hike.difficulty)} />
                    : <Box component="div" sx={{ backgroundColor: "black", height: "100%", opacity: 0.9, display: "flex", textAlign: "center", alignItems: "center" }}>
                        <Typography gutterBottom variant="h5" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, color: 'white' }}>
                            Only a Hiker or a Local Guide can view the map.<br /><Link to="/login" className={"link"}>Sign In</ Link> or <Link to="/register" className={"link"}>Register</ Link> for free
                        </Typography>
                    </Box>
                }
            </Box>
            {/* Start Point */}
            <Box component="div" sx={{ marginTop: 2 }}>
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
            <ThemeProvider theme={theme}>
                <Box component="div" sx={{ display: "flex", marginBottom: 2, marginTop: 2, paddingLeft: 2, paddingRight: 2, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between" }} >
                    {/* Map Title */}
                    <Typography variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600, marginLeft: "auto", marginRight: "auto", paddingLeft: "24px" }}>
                        Map
                    </Typography>
                    {/* Close Drawer */}
                    <IconButton color="neutral" aria-label="reset map" component="label" onClick={toggleFilterPanelDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </ThemeProvider>
            {geoDetailsComponents}
        </Box >
    );

    return (
        <>
            {/* Hike Geo Details Panel - Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }, border: "1px solid #BBBBBB" }} lg={3} >
                {geoDetailsComponents}
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