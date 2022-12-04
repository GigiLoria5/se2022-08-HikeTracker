import { Outlet, useLocation, useNavigate, Link as Link2 } from "react-router-dom";
import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Logo from "../Assets/Logo";
import { Typography } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;
const navItemsFixed = { 'Hikes': '/hikes' };

function MyNavbar(props) {

    const { window, isloggedIn, loggedUser } = props;
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [navItems, setNavItems] = React.useState(navItemsFixed);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuMobile, setMenuMobile] = React.useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChoice = (route) => {
        setAnchorEl(null);
        setMobileOpen(false);
        setMenuMobile(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuMobile = () => {
        setMenuMobile(!menuMobile);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    /* SETUP HIDDEN NAV ITEMS LINKS */
    React.useEffect(() => {
        if (isloggedIn && loggedUser.role === "local_guide")
            setNavItems({ ...navItemsFixed, 'Platform Content': '/local-guide-page' });
        else
            setNavItems({ ...navItemsFixed });
    }, [isloggedIn, loggedUser.role]);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {/* Full Navbar */}
                <AppBar position="static" component="nav">
                    <Toolbar>
                        {/* Hamburger Menu */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Logo */}
                        <Container sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, ml: 1 }} maxWidth="xs" className="navbar-container">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </Container>
                        {/* Nav Links */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {
                                Object.entries(navItems).map(([name, route]) => (
                                    name === 'Platform Content' ?
                                        <Box key={name}>
                                            <Button id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                sx={{
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#08961D',
                                                        color: '#fff',
                                                    }
                                                }}
                                                endIcon={<KeyboardArrowDownIcon />}
                                            >
                                                {name}
                                            </Button>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                                sx={{
                                                    "& .MuiPaper-root": {
                                                        backgroundColor: '#008037',
                                                        color: '#fff',
                                                    }
                                                }}
                                            >
                                                <MenuItem key={'hike'} component={Link2} to={"/local-guide-add-hikes1"} state={{newHike:true}} onClick={handleChoice}>NEW HIKE</MenuItem>
                                                <Divider style={{ width: '100%' }} />
                                                <MenuItem key={'hut'} component={Link2} to={"/local-guide-add-hut"} onClick={handleChoice}>NEW HUT</MenuItem>
                                                <Divider style={{ width: '100%' }} />
                                                <MenuItem key={'parking'} component={Link2} to={"/local-guide-add-parking"} onClick={handleChoice}>NEW PARKING LOT</MenuItem>
                                            </Menu>
                                        </Box>
                                        :
                                        <Button className={`${String(location.pathname) === String(route) ? 'active-link' : ''} btn-color-active`} key={name} sx={{ color: '#fff' }}
                                            onClick={() => { navigate(route); }}>
                                            {name}
                                        </Button>

                                ))}
                        </Box>
                        {/* User Account Actions */}
                        <Box sx={{ display: { xs: 'flex', md: 'flex' } }} className="box-end margin-right-32">
                            {isloggedIn ?
                                <>
                                    <Grid container className="vertical-align-center" >
                                        <Grid item xs={12} color="#eeeeee">
                                            <Typography color="inherit" component="div">
                                                {loggedUser.name && loggedUser.surname ? loggedUser.name + " " + loggedUser.surname : loggedUser.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} color="#e0e0e0">
                                            <Typography color="inherit" component="div"> {(loggedUser.role).replace('_', ' ')} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button sx={{ m: 0.5 }} variant="outlined" color="inherit" className="btn-color-active"
                                        onClick={() => { props.handleLogout(); navigate('/') }} >Logout</Button>
                                </> :
                                <>
                                    <Button variant="text" color="inherit" sx={{ mr: 2 }} className="btn-color-active" onClick={() => { navigate('/login'); }}>Login</Button>
                                    <Button variant="outlined" color="inherit" className="btn-color-active" onClick={() => { navigate('/register'); }}>Register</Button>
                                </>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Navbar on Device */}
                <Box component="nav">
                    {/* Hidden Left Side Menu */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <Box sx={{ textAlign: 'center' }}>
                            {/* Logo */}
                            <Container className="container-background-color">
                                <Container maxWidth="xs">
                                    <Link href="/">
                                        <Logo />
                                    </Link>
                                </Container>
                            </Container>
                            <Divider />
                            {/* Nav Links */}
                            <List>
                                {Object.entries(navItems).map(([name, route]) => (
                                    name === 'Platform Content' ?
                                        <Box key={name} >
                                            <ListItem disablePadding>
                                                <ListItemButton sx={{ textAlign: 'center' }} onClick={handleMenuMobile}>
                                                    <ListItemText primary="Platform Content" />
                                                    {menuMobile ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </ListItem>
                                            <Collapse in={menuMobile} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItemButton sx={{ textAlign: 'center' }} component={Link2} to={"/local-guide-add-hikes1"} state={{newHike:true}} onClick={handleDrawerToggle}>
                                                        <ListItemText primary="Add hike" />
                                                    </ListItemButton>
                                                    <ListItemButton sx={{ textAlign: 'center'}} component={Link2} to={"/local-guide-add-hut"} onClick={handleDrawerToggle}>
                                                        <ListItemText primary="Add hut" />
                                                    </ListItemButton>
                                                    <ListItemButton sx={{ textAlign: 'center'}} component={Link2} to={"/local-guide-add-parking"} onClick={handleDrawerToggle}>
                                                        <ListItemText primary="Add parking lot" />
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        </Box>
                                        :
                                        <ListItem key={name} disablePadding>
                                            <ListItemButton sx={{ textAlign: 'center' }} className={`${String(location.pathname) === String(route) ? 'active-link' : ''}`}
                                                onClick={() => { navigate(route); }}>
                                                <ListItemText primary={name} />
                                            </ListItemButton>
                                        </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Box>
            </Box>
            {/* Page Content (defined in other routes) */}
            <Outlet />
        </>

    );

}

export default MyNavbar
