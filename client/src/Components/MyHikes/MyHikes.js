import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import HowToStart from './HowToStart';
import MyCompletedHikes from './MyCompletedHikes';
import StartHike from './StartHike';
import { useLocation } from 'react-router-dom';

function MyHikes() {
    const location = useLocation();
    //let isStarting = false;
    //let hike = {}
    const [isInHike, setIsInHike] = useState(false);
    const [hike, setHike] = useState({});
    const [isStarting, setIsStarting] = useState(location.state !== null? location.state.isStarting: false);
    const [added, setAdded] = useState(false);
    const [saved, setSaved] = useState(false);
    
    useEffect(() => {
        if(location.state !== null){
            //isStarting = location.state.isStarting
            setIsStarting(location.state.isStarting);
            setHike(location.state.hike);
            //hike = location.state.hike
        }
    }, [])

    useEffect(() => {
        if(isStarting == false){
            setAdded(true);
        }
    }, [isStarting])
    
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
                        {(isStarting && !saved)?
                            <StartHike isStarting={isStarting} setIsStarting={setIsStarting} setSaved={(state) => setSaved(state)} hike={location.state.hike}/>
                            :
                            <StartHike isStarting={false} setIsStarting={setIsStarting} setSaved={(state) => setSaved(state)} hike={{}}/>}
                        
                        { /*isStarting? 
                        <Grid></Grid>
                        :
                        <HowToStart/>*/
                        }
                        <MyCompletedHikes added={saved}/>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

export default MyHikes