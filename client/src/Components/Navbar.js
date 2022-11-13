import { Outlet, useNavigate } from "react-router-dom";
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
import Logo from "./Logo";
import { Typography } from "@mui/material";

const drawerWidth = 240;
const navItems = { 'Hikes': '/hikes' };
const guideItems = { 'Local Guide Page': '/local-guide-page' };

function MyNavbar(props) {

    const { window, activePage, changeActivePage, isloggedIn, loggedUser } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
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
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Logo */}
                        <Container sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1, ml: 1 }} maxWidth="xs" className="navbar-container">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </Container>
                        {/* Nav Links */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            {Object.entries(navItems).map(([name, route]) => (
                                <Button className={`${activePage === name ? 'active-link' : ''}`} key={name} sx={{ color: '#fff' }}
                                    onClick={() => { changeActivePage(name); navigate(route); }}>
                                    {name}
                                </Button>
                            ))}
                            {
                                loggedUser.role == "local_guide" ? Object.entries(guideItems).map(([name, route]) => (
                                    <Button className={`${activePage === name ? 'active-link' : ''}`} key={name} sx={{ color: '#fff' }}
                                        onClick={() => { changeActivePage(name); navigate(route); }}>
                                        {name}
                                    </Button>
                                )) : <></>
                            }
                        </Box>
                        {/* User Account Actions */}
                        <Box sx={{ display: { xs: 'flex', sm: 'flex' } }} className="box-end margin-right-32">
                            {/* Account User Buttons */}
                            {isloggedIn ?
                                <>
                                    <Box  >
                                        {loggedUser.name || loggedUser.surname !== '' ?
                                            <>
                                                <Typography variant="button" color="inherit" component="div"> {loggedUser.name} </Typography>
                                                <Typography variant="button" color="inherit" component="div"> {loggedUser.surname} </Typography></> :
                                            <Typography variant="button" color="inherit" component="div"> {loggedUser.email} </Typography>
                                        }
                                    </Box>
                                    <Button sx={{ m: 0.5 }} variant="outlined" color="inherit" onClick={() => { props.handleLogout(); navigate('/') }} >Logout</Button>

                                </> :
                                <>
                                    <Button variant="text" color="inherit" sx={{ mr: 2 }} onClick={() => { changeActivePage(null); navigate('/login'); }}>Login</Button>
                                    <Button variant="outlined" color="inherit" onClick={() => { changeActivePage(null); navigate('/register'); }}>Register</Button>
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
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
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
                                    <ListItem key={name} disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} className={`${activePage === name ? 'active-link' : ''}`}
                                            onClick={() => { changeActivePage(name); navigate(route); }}>
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
