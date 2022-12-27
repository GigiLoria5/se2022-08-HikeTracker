import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';


function HowToStart() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#008037',
            },
            secondary: {
                main: '#e3e3e3',
            },
            third: {
                main: "#ffffff"
            },
            fourth: {
                main: "#701f1f"
            }
        },
    });

    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 1
    };

    return(
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12} sx={{ ...thm}}>
                        <Typography variant="h5" align='center' sx={{nb:2, mb:1, textTransform: 'uppercase', fontWeight: 600 }}>HOW TO START A HIKE ?</Typography>
                        <Typography variant='h6'align='center' sx={{  ml:5, mr:5}}>
                            To start a hike, select a hike from the hike list in <Link to="/hikes" className={"link"}>Hikes</Link>, and press the "Start this hike" button.
                        </Typography>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

export default HowToStart