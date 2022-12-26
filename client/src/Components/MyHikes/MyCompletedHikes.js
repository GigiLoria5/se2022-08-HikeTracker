import React, { useState , useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from "@mui/material/Typography";
import HikeListCompleted from './HikeListCompleted';
import { Hike } from "../../Utils/Hike"
import { difficultyFromState } from '../../Utils/DifficultyMapping';


function MyCompletedHikes() {
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

    /*Hikes to delete when API will be done */
    const hike1 = new Hike({
        title: "Hike example 0",
        peak_altitude: "100",
        city: "city",
        province: "province",
        country: "country",
        difficulty: difficultyFromState("Hiker"),
        hours: "4",
        minutes: "20",
        date: "12/20/2022",
        id: 1
    })
    const hike2 = new Hike({
        title: "Hike example 1",
        peak_altitude: "100",
        city: "city",
        province: "province",
        country: "country",
        difficulty: difficultyFromState("Hiker"),
        hours: "4",
        minutes: "20",        
        date: "12/20/2022",
        id: 2
    })
    const hike3 = new Hike({
        title: "Hike example 2",
        peak_altitude: "100",
        city: "city",
        province: "province",
        country: "country",
        difficulty: difficultyFromState("Hiker"),
        hours: "4",
        minutes: "20",
        date: "12/20/2022",
        id: 3
    })
    const hike4 = new Hike({
        title: "Hike example 3",
        peak_altitude: "100",
        city: "city",
        province: "province",
        country: "country",
        difficulty: difficultyFromState("Hiker"),
        hours: "4",
        minutes: "20",
        date: "12/20/2022",
        id: 4
    })

    const hikelist = [hike1, hike2, hike3, hike4]
    const [hikes, setHikes] = useState([]);
    const [loadingHikes, setLoadingHikes] = useState(true);

    /* TO REPLACE THE HIKE LIST WHEN API DONE
    useEffect(() => {
        if (loadingHikes) {
            API.getHikesCompleted()
                .then(hikes => {
                    // Set Hikes Completed
                    setHikes(hikes);
                    // Add some delay to load smoothly
                    setTimeout( 300);
                });
        }
    });
    */
    useEffect(() => {
        if (loadingHikes) {
            //load hikes
            setHikes(hikelist)
            // Add some delay to load smoothly
            setTimeout();
        }
    },[]);
    
    const setTimeout = (() => {
        setLoadingHikes(false);
    });
    
    return(
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12} marginTop={2} sx={{ ...thm }}>
                        <Typography variant="h5" marginTop={2} align="center" sx={{textTransform: 'uppercase', fontWeight: 600 }}>MY COMPLETED HIKES</Typography>
                        <HikeListCompleted key={hikes.id} hikes={hikes} loadingHikes={loadingHikes} />
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

export default MyCompletedHikes