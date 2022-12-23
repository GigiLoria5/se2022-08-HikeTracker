import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import HowToStart from './HowToStart';
import MyCompletedHikes from './MyCompletedHikes';
import StartHike from './StartHike';
import { useLocation } from 'react-router-dom';

function MyHikes() {
    const location = useLocation();
    let isStarting = false;
    let hike = {}
    const [isInHike, setIsInHike] = useState(true);
    
    if(location.state !== null){
        isStarting = location.state.isStarting
        hike = location.state.hike
    }
    
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

    return(
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12} marginTop={2} >
                        
                        <StartHike setIsInHike={setIsInHike} isInHike={isInHike} isStarting={isStarting} hike={hike}/>
                        { isStarting && isInHike ? 
                        <Grid></Grid>
                        :
                        <HowToStart/>
                        }
                        <MyCompletedHikes/>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

export default MyHikes