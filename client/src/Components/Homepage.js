import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const HomepageContent = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '100vh',
        minHeight: 'auto',
        maxHeight: 'auto',
    },
}));

function Homepage(props) {
    const { children } = props;
    const navigate = useNavigate();

    const actionPageName = 'Hikes';
    const actionPageRoute = '/hikes';
    const clickHandle = event => {
        event.preventDefault();
        navigate(actionPageRoute);
    }

    return (
        <Container className="container-full-size-fixed">
            <HomepageContent className='w-h-100'>
                <Container
                    sx={{
                        mt: 3,
                        mb: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {children}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: 'common.black',
                            opacity: 0.5,
                            zIndex: -1,
                        }}
                    />
                    <Box className='homepage-background' />
                    <Typography className="homepage-title" color="inherit" align="center" variant="h2" marked="center"
                        sx={{
                            fontSize: {
                                lg: '4vw',
                                md: '4.5vw',
                                sm: '6vw',
                                xs: '8vw'
                            }
                        }}>
                        Find your next hike
                    </Typography>
                    <Button
                        className='btn-center main-background-color'
                        color="secondary"
                        variant="contained"
                        size="large"
                        component="a"
                        href=""
                        sx={{ minWidth: 200 }}
                        onClick={clickHandle}
                    >
                        Find Out More
                    </Button>
                </Container>
            </HomepageContent>
        </Container>
    );
}

export default Homepage