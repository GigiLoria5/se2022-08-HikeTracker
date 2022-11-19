import React from 'react'

import { Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


const HikesFilterPanel = (props) => {
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = React.useState(false);

    /* To hide/show the filter panel for small screen */
    const toggleFilterPanelDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceFilterPanelOpen(state);
    };

    /* Filter panel for small screen */
    const filterHiddenPanel = (<Box
        sx={{ width: "auto", display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
        role="presentation"
        onClick={toggleFilterPanelDrawer(false)}
        onKeyDown={toggleFilterPanelDrawer(false)}
    >
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? "Inbox" : "Mail"}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? "Inbox" : "Mail"}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>);

    return (

        <>
            {/* Panel Full Size */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} lg={3} >
                <p>Filter</p>
            </Grid>

            {/* Panel Button - Small Screen */}
            <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                <Button variant="outlined" color="inherit" startIcon={<FilterListIcon />} onClick={toggleFilterPanelDrawer(true)}> Filter </Button>
            </Grid>

            {/* Filter Panel - Small Screen */}
            {deviceFilterPanelOpen && <Grid item sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center' }} xs={12}>
                <React.Fragment key={"filter-left-panel"}>
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
                </React.Fragment>
            </Grid>}
        </>
    )
}

export default HikesFilterPanel;
