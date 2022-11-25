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
                    <Typography variant="h4" margin={1} marginTop={3} gutterBottom>
                        Set up Platform Content
                    </Typography>
                </Grid>

                <Grid item xs={12} marginTop={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ThemeProvider theme={theme}>
                        <Grid margin={1}>
                            <Button component={Link} to={"/local-guide-add-hikes"} variant="contained" size="large" color='primary'>ADD A HIKE</Button>
                        </Grid>
                        <Grid margin={1}>
                            <Button component={Link} to={"/local-guide-add-parking"} variant="contained" size="large" color='primary'>ADD A PARKING LOT</Button>
                        </Grid>

                    </ThemeProvider>
                </Grid>


            </Grid>

        </div>
    );
}

export default LocalGuidePage;