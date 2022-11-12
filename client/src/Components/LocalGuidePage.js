import React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom";





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
                
                <Grid item xs={12} marginTop={10} sx = {{display: 'flex',    flexDirection: 'column', alignItems: 'center'}}>
                    <ThemeProvider theme={theme}>
                        <Button component={Link} to={"/local-guide-add-hikes"} variant="contained" size="large" color='primary'>ADD A HIKE</Button>
                    </ThemeProvider>
                </Grid>
                

            </Grid>
            
        </div>
    );
    }

export default LocalGuidePage;