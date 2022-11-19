import React from 'react'

import { Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


const HikesFilterPanel = (props) => {
    const [deviceFilterPanelOpen, setDeviceFilterPanelOpen] = React.useState(false);

    const toggleFilterPanelDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceFilterPanelOpen(state);
    };

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
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} lg={3}>
                <h1>Filter</h1>
                <p>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non turpis ut lorem auctor auctor. Proin iaculis quis justo a rutrum. Nunc lacinia massa eget rhoncus gravida. Curabitur nec vulputate lacus, vel tempor mauris. Duis convallis libero quis arcu molestie, ac laoreet turpis eleifend. Mauris purus lacus, vestibulum sit amet turpis in, mattis porta felis. Curabitur non libero consectetur, tempus mauris quis, fermentum ante. Nullam pretium condimentum augue, eget imperdiet leo ornare ac.

                    Donec quis laoreet tortor, vel imperdiet turpis. Donec maximus velit vel risus luctus, id convallis ex pretium. Sed sit amet venenatis risus. Donec ullamcorper sollicitudin tellus, eget porta libero dapibus in. In nec nulla quis enim tincidunt congue. Suspendisse venenatis felis odio, in sollicitudin felis auctor ac. Proin ligula risus, euismod in tellus et, venenatis aliquet orci.

                    Aliquam sagittis sapien nulla, et viverra nibh fermentum sit amet. Vestibulum egestas tortor orci, eu malesuada elit volutpat non. Phasellus faucibus enim eu lacus luctus facilisis. Curabitur at dictum elit, vitae bibendum nisl. Integer lacinia felis vitae ligula vehicula, semper pretium metus fermentum. Donec egestas placerat sapien eget cursus. Nunc molestie quis risus in semper. Etiam volutpat enim est, eu egestas libero bibendum et. Fusce maximus orci non diam congue, quis bibendum enim fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc tincidunt elementum pellentesque. Quisque eget tellus at nisl vulputate vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus. In id auctor ligula, sit amet pellentesque dui. Nullam ut sem rutrum, lacinia mauris vel, imperdiet sapien. Donec congue fringilla lacus sit amet malesuada.

                    Proin orci mauris, rutrum placerat dui ut, dignissim semper orci. Nullam in dui enim. Duis sit amet ullamcorper orci. Nam tortor arcu, tristique dignissim facilisis sed, tempus nec libero. Suspendisse porttitor convallis magna, non imperdiet ligula ultrices eget. Duis sit amet facilisis quam. Proin tincidunt enim id accumsan egestas. Vivamus erat velit, aliquet nec nisi nec, semper tincidunt quam. Ut consectetur tellus vestibulum, rhoncus sem id, mollis magna. Etiam et est volutpat, ullamcorper ex eu, hendrerit massa. Donec ut bibendum libero, vel dignissim odio. Duis sit amet libero quam.

                    Nulla id ligula tincidunt, viverra nisl quis, semper justo. Aenean congue urna arcu, eu molestie lacus efficitur vel. Proin finibus tortor nisl, in gravida lacus sodales pharetra. Integer mollis lectus id est fermentum, a condimentum risus placerat. Nam a dapibus ligula. Mauris dapibus semper pharetra. Mauris in enim leo. Aliquam consectetur tincidunt ligula ac interdum. Donec vestibulum, ipsum at eleifend elementum, orci massa tempor dui, ac aliquet magna felis eu mauris. Duis erat enim, efficitur at sagittis in, scelerisque a libero. Duis sed turpis vestibulum, ornare erat a, lobortis felis. Phasellus laoreet quam turpis, nec euismod lacus fringilla sed. Aliquam erat volutpat.

                    In hac habitasse platea dictumst. Phasellus finibus facilisis neque, a blandit eros pretium id. Aenean semper sapien a leo efficitur pellentesque. Ut pretium molestie efficitur. Pellentesque lobortis ligula at semper porta. Ut id lorem efficitur, fringilla velit ut, semper leo. Phasellus et enim at odio fermentum vestibulum.

                    Phasellus lobortis nulla id venenatis lobortis. Duis sagittis interdum tellus, at pretium ligula feugiat sed. In varius scelerisque tristique. Etiam porttitor ullamcorper facilisis. Vivamus in imperdiet lectus. Cras vitae pharetra est. Pellentesque elementum magna eu diam suscipit vehicula. Ut at tortor in eros feugiat molestie sit amet eget urna. Proin justo enim, feugiat quis felis nec, viverra lacinia felis. Suspendisse potenti. Nullam viverra sodales ante at ullamcorper. Proin quis nulla id libero tincidunt facilisis at eu est.

                    Nulla aliquet quis quam ac placerat. Praesent tempor leo et dolor convallis malesuada. Cras a convallis magna, pharetra vulputate ex. Nam auctor ligula vitae nibh aliquam vehicula eu eget felis. Aliquam erat volutpat. Donec tempor tellus sit amet eros efficitur, ac suscipit dui maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum lacus eu fringilla bibendum. Praesent consectetur arcu nec enim semper, a euismod odio vestibulum. Suspendisse at vulputate elit. Proin ut euismod purus. Donec cursus ultricies auctor. Donec eget sem commodo, ultrices dui nec, luctus ligula. Nullam ornare eros at ante pellentesque, id tristique velit faucibus. Donec et odio suscipit, lacinia risus sed, tempor lorem.

                    Phasellus ullamcorper felis a congue dictum. Nulla facilisi. Phasellus scelerisque sit amet augue eu viverra. Donec sed neque dui. Pellentesque id orci sit amet elit ullamcorper tempus et at odio. In tristique lorem nisi, vitae elementum diam commodo fermentum. Vestibulum quis mauris lorem. Suspendisse congue magna sed lorem mattis rutrum.

                    Fusce id dolor orci. Praesent at mauris gravida, dignissim nisl id, rhoncus nulla. Cras ut libero laoreet, egestas neque id, semper nisi. Sed metus dui, varius sit amet egestas et, imperdiet a augue. Mauris dictum pharetra metus sed feugiat. Pellentesque venenatis augue quam, et tincidunt eros venenatis eget. Nunc placerat luctus dui, ac vestibulum eros dignissim vitae.

                    Fusce posuere ipsum leo, quis ultricies nunc sollicitudin tristique. In congue risus eget elit luctus, in efficitur enim euismod. Aenean turpis ex, sagittis eu hendrerit maximus, ultrices at mauris. Donec finibus vehicula consectetur. Nunc vehicula faucibus mauris suscipit aliquam. Etiam vitae finibus erat, vitae aliquam mauris. Ut sodales arcu in justo vehicula, vitae pellentesque lorem ultrices. Phasellus feugiat diam vitae tortor aliquet pulvinar. In nec posuere lacus, sit amet rutrum neque. Donec pellentesque, sapien non vulputate accumsan, arcu nibh volutpat turpis, ac porttitor massa nisl ut felis. Pellentesque vel orci quis purus mattis fermentum. Sed id urna eu leo ultrices porttitor.

                    Suspendisse potenti. Phasellus lacinia mattis elit eu convallis. Duis sit amet feugiat erat. Curabitur egestas sapien nec dui ornare rhoncus at ut quam. Maecenas bibendum, enim vel scelerisque varius, orci ante lacinia dui, non lacinia augue massa id nunc. Morbi quis nunc nec purus malesuada ultricies a non mi. Morbi faucibus efficitur dolor scelerisque lacinia.

                    Mauris eget aliquam lacus, nec imperdiet mi. Vivamus at risus lacus. Fusce maximus, sapien porttitor pulvinar pharetra, leo velit laoreet lectus, non interdum libero elit vel metus. Curabitur non tincidunt purus. Mauris magna sapien, iaculis a libero sit amet, aliquet feugiat nisi. Phasellus ac arcu eget massa maximus congue. Nulla id augue. </p>
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
