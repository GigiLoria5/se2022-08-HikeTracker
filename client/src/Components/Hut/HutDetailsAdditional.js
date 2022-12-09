import React from 'react'
import { Box, ClickAwayListener, createTheme, Divider, Drawer, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { splitCoordinates } from '../../Utils/GeoUtils';
import PointViewer from '../Map/PointViewer';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#546070',
        },
    },
});

function HutDetailsAdditional(props) {
    const { hut, deviceFilterPanelOpen, toggleFilterPanelDrawer } = props;

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Additional Information: address, phone number, email and website (if any)
    const hutDetailsAdditional = (
        <>
            {/* Address */}
            <Box component="div" sx={{ marginTop: 2 }}>
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    Address
                </Typography>
                {/* Value */}
                <Box component="div" display="flex" marginBottom={1.5}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: "100%"
                    }}>
                        <Typography gutterBottom variant="body2" color="text.secondary" margin={0} paddingRight={2}>
                            {hut.address}
                        </Typography>
                        {/* Point Link to Google Maps */}
                        <IconButton color="warning" aria-label="reset radius" component="label" sx={{ marginLeft: "auto", padding: 0 }} onClick={() => openInNewTab(`https://maps.google.com/maps?q=${hut.coordinates}`)}>
                            <AssistantDirectionIcon />
                        </IconButton>
                    </Box>
                </Box >
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

            {/* Phone Number */}
            <Box component="div" >
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    Phone Number
                </Typography>
                {/* Value */}
                <Box component="div" display="flex" marginBottom={1.5}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: "100%"
                    }}>
                        <Typography gutterBottom variant="body2" color="text.secondary" margin={0} paddingRight={2}>
                            {hut.phone_number}
                        </Typography>
                    </Box>
                </Box >
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

            {/* Email */}
            <Box component="div" >
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    Email
                </Typography>
                {/* Value */}
                <Box component="div" display="flex" marginBottom={1.5}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: "100%"
                    }}>
                        <Typography gutterBottom variant="body2" color="text.secondary" margin={0} paddingRight={2}>
                            {hut.email}
                        </Typography>
                    </Box>
                </Box >
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

            {/* Website */}
            <Box component="div" >
                {/* Section Title */}
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' } }} margin={0}>
                    Website
                </Typography>
                {/* Point Description */}
                {!hut.website
                    ? <Typography gutterBottom variant="body2" color="text.secondary" margin={0}>
                        No website available for this hut
                    </Typography>
                    : <Box component="div" display="flex" marginBottom={1.5}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%"
                        }}>
                            <Typography gutterBottom variant="body2" color="text.secondary" margin={0} paddingRight={2}>
                                {hut.website}
                            </Typography>
                        </Box>
                    </Box >
                }
            </Box>
        </>
    );

    // Right Sidebar component which include map + information about points. Only Available for hikers and local guides
    const hutDetailsAdditionalComponent = (
        <Box component="div" sx={{ margin: 2, marginTop: { xs: 2, lg: 3 } }}>
            {/* Map */}
            <Box component="div" sx={{ width: "100%", height: "40vh", marginTop: 2 }}>
                <PointViewer height={'100%'} width={'100%'} label={hut.name} lat={splitCoordinates(hut.coordinates)[0]} lng={splitCoordinates(hut.coordinates)[1]} />
            </Box>
            {hutDetailsAdditional}
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
            {hutDetailsAdditionalComponent}
        </Box >
    );

    return (
        <>
            {/* Hike Geo Details Panel - Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }, border: "1px solid #BBBBBB" }} lg={3} >
                {hutDetailsAdditionalComponent}
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

export default HutDetailsAdditional