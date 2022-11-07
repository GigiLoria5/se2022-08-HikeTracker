import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";






function AddHike() {
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
            <Grid item xs={0.5}></Grid>
                
            <Grid item xs={11} marginTop={5}>
                <ThemeProvider theme={theme}>
                    <Paper elevation={3} background-color='secondary'>
                        <Typography>
                            <br/>
                        </Typography>
                        
                    </Paper>

                    <Button  variant="contained" color='primary'>ADD A HIKE</Button>
                </ThemeProvider>
            </Grid>
            <Grid item xs={0.5}></Grid>

        </Grid>
        
    </div>
    );
}

export default AddHike;