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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function StartHike(props) {
    //const { title } = props.title;
    const title = "TITLE"
    const setisStarting = props.setisStarting
    const isStarting = props.isStarting


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
    
    const getTime = (valueStart, valueStop)  => {
        //if same date
        if (valueStart.$y === valueStop.$y && valueStart.$D === valueStop.$D && valueStart.$M === valueStop.$M ){
            //convert hours into minutes for valueStart and valueStop
            var startmin = valueStart.$m + 60*(valueStart.$H)
            var stopmin = valueStop.$m + 60*(valueStop.$H)            
            //do a substraction valueStop - valueStart 
            var total = stopmin - startmin
            //convert minutes into hours and minutes
            var nhours = ~~(total/60)
            var nminutes = total%60
            //return object {hours:_ ,minutes:_}
            return ({hours: nhours, minutes: nminutes})
        } else {
        //if not the same date : 
            //if same year
            if (valueStart.$y === valueStop.$y){
                //if same month
                if (valueStart.$M === valueStop.$M ){
                    //convert days in minutes + convert hours in minutes + add to minutes
                    var startminM = valueStart.$m + 60*(valueStart.$H) + 1440*(valueStart.$D)
                    var stopminM = valueStop.$m + 60*(valueStop.$H)+ 1440*(valueStop.$D)
                    //do a substraction valueStop - valueStart 
                    var totalM = stopminM - startminM
                    //convert minutes into hours and minutes
                    var nhoursM = ~~(totalM/60)
                    var nminutesM = totalM%60
                    //return object {hours:_ ,minutes:_}
                    return ({hours: nhoursM, minutes: nminutesM})
                }
            }
                
                //if not same month
                    //
        }
    };

    //if true, the user has pressed the start button
    const [isStarted, setisStarted] = useState(false);
    
    //open pop up
    const [open, setOpen] = useState(false);


    const handleChangeStart = (newValue) => {
        setValueStart(newValue);
        console.log("date:", date)

    };

    const handleChangeStop = (newValue) => {
        setValueStop(newValue);
    };

    const handleStart = () => {
        setisStarted(true)
        console.log(valueStart)
    }
    const handleStop = () => {
        setisStarted(false)
        setisStarting(false)
        setOpen(true)
        
    }
    const handleCancel = () => {
        
    }

    const handleClose = () => {
        setOpen(false);
      };

    return(
        <div>
            <Grid container >

                <ThemeProvider theme={theme} >
                    
                {isStarting ?
                    <>
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
                        </>
                        :
                        <Grid></Grid>
                        }
                        <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                            <DialogTitle id="responsive-dialog-title" sx={{ display: "flex",  flexDirection: "column", alignItems: "center"}}>
                            {"Well done !"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ display: "flex", flexDirection: "column", alignItems: "center"  }}>
                                    
                                    {title} <br/>
                                    Hike started at {valueStart.$H}:{valueStart.$m} the {valueStart.$M}/{valueStart.$D}/{valueStart.$y}.<br/>
                                    Hike finished at {valueStop.$H}:{valueStop.$m} the {valueStop.$M}/{valueStop.$D}/{valueStop.$y}.<br/>
                                    You completed the hike in {getTime(valueStart, valueStop).hours} hours and {getTime(valueStart, valueStop).minutes} minutes.<br/>
                                    The list of all your completed hikes in My hikes.<br/>        
                                    
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ display: "flex", flexDirection: "column", alignItems: "center"  }}>
                                <Button onClick={handleClose} >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                </ThemeProvider>
            </Grid >
        </div>
    )
}

export default StartHike