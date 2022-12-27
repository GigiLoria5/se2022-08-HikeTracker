import React, { useState , useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from "@mui/material/Typography";
import HikeListCompleted from './HikeListCompleted';
import { Hike } from "../../Utils/Hike"
import { difficultyFromState } from '../../Utils/DifficultyMapping';
import API from '../../API';
import { timeToHHMM } from '../../Utils/TimeUtils';


function MyCompletedHikes(props) {
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


    const hikelist = []
    const [hikes, setHikes] = useState([]);
    const [loadingHikes, setLoadingHikes] = useState(true);

    useEffect(() => {
        if (loadingHikes) {
            API.getCompletedActivities()
                .then(hikes => {
                    const h = hikes.map(h => {
                        const duration = timeToHHMM(h.duration/60)
                        return {...h, minutes: duration.split(":")[1], hours:duration.split(":")[0]}
                    })
                    // Set Hikes Completed
                    setHikes(h);
                    setLoadingHikes(false);
                    // Add some delay to load smoothly
                    //setTimeout( 300);
                });
        }
    }, [loadingHikes]);

    useEffect(() => {
        if(props.added)
        setLoadingHikes(true);
    }, [props.added])
    
    const setTimeout = (() => {
        setLoadingHikes(false);
    });
    
    return(
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12} marginTop={2} sx={{ ...thm }}>
                        <Typography variant="h5" marginTop={2} marginBottom={0.5} align="center" sx={{textTransform: 'uppercase', fontWeight: 600 }}>MY COMPLETED HIKES</Typography>
                        <HikeListCompleted key={hikes.id} hikes={hikes} loadingHikes={loadingHikes} />
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

export default MyCompletedHikes