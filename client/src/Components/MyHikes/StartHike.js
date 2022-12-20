import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Container from '@mui/material/Container';


function StartHike(props) {
    //const { title } = props.title;
    const title = "title"
    const setisStarting = props.setisStarting

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
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}T${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`


    const [valueStart, setValueStart] = useState(dayjs(date));
    const [valueStop, setValueStop] = useState(dayjs(date));
    
    //if true, the user has pressed the start button
    const [isStarted, setisStarted] = useState(false);
    
    //if true, the user has pressed the stop button
    const [isStopped, setisStopped] = useState(false);
    
    

    const handleChangeStart = (newValue) => {
        setValueStart(newValue);
    };

    const handleChangeStop = (newValue) => {
        setValueStop(newValue);
    };

    const handleStart = () => {
        setisStarted(true)
        console.log(valueStart)
    }
    const handleStop = () => {
        setisStopped(true)
        setisStarted(false)
        setisStarting(false)
    }
    const handleCancel = () => {
        
    }

    return(
        <div>
            <Grid container >

                <ThemeProvider theme={theme} >
                    
                        <Grid xs={12}>
                            <Typography variant="h5" marginTop={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                                START A HIKE
                            </Typography>
                        </Grid>
                        <Grid xs={0} md={3}></Grid>
                        <Grid xs={12} md={6} marginTop={3} >
                            <Container component="main" maxWidth="m">
                                <Paper elevation={3} sx={{ ...thm }} >
                                    <Typography variant="h6" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',textTransform: 'uppercase', m:3 }}>{title}</Typography>
                                    
                                    { isStarted ?
                                    <Grid>
                                        <Typography variant="h6" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Hike started at {valueStart.$H}:{valueStart.$m} the {valueStart.$M}/{valueStart.$D}/{valueStart.$y}.</Typography>
                                        <Typography variant="h6" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 600, m:2 }}>In progress...</Typography>

                                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>  
                                                <DateTimePicker
                                                label="Stop timer"
                                                value={valueStop}
                                                onChange={handleChangeStop}
                                                renderInput={(params) => <TextField {...params} />}
                                                
                                                />  
                                            </LocalizationProvider>
                                            <Button  size='large' onClick={handleStop} variant="contained" color='primary'>STOP</Button>
                                        </Stack>
                                    </Grid>
                                    :
                                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>  
                                            <DateTimePicker
                                            label="Start timer"
                                            value={valueStart}
                                            onChange={handleChangeStart}
                                            renderInput={(params) => <TextField {...params} />}
                                            
                                            />  
                                        </LocalizationProvider>
                                        <Button  size='large' onClick={handleStart} variant="contained" color='primary'>START</Button>
                                    </Stack>

                                    }

                                    <Button sx={{m:3 ,minWidth: '80px' }} onClick={handleCancel} variant="outlined" color='primary'>CANCEL HIKE</Button>
                                
                                </Paper>
                            </Container>
                        </Grid>
                        <Grid xs={0} md={3}></Grid>
                    
                </ThemeProvider>

            </Grid >
        </div>
    )
}

export default StartHike