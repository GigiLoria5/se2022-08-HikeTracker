import React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";


function LocalGuidePage() {
    const theme = createTheme({

        palette: {
            primary: {
                main: '#008037',
            },
            secondary: {
                main: '#b0b0b0',
            },
        },
    });


    return (
        <div>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" marginTop={1} gutterBottom>
                        <br />Set up Platform Content
                    </Typography>
                </Grid>

                <Grid item xs={12} marginTop={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ThemeProvider theme={theme}>
                        <Button component={Link} to={"/local-guide-add-hikes"} variant="contained" size="large" color='primary'>ADD A HIKE</Button>
                    </ThemeProvider>
                    <Grid><br /></Grid>
                    <ThemeProvider theme={theme}>
                        <Button component={Link} to={"/local-guide-add-hut"} variant="contained" size="large" color='primary'>ADD A HUT</Button>
                    </ThemeProvider>
                </Grid>


            </Grid>

        </div>
    );
}

export default LocalGuidePage;