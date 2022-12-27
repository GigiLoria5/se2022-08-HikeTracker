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
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { addActivity, deleteActivity, terminateActivity, getRunningActivity } from '../../API/Activity';
import { Activity } from '../../Utils/Activity';
import HowToStart from './HowToStart';

function StartHike(props) {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}T${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`


    const isStarting = props.isStarting; // isStarting = true if coming from hike, false if coming from navbar 

    const setIsStarting = props.setIsStarting;
    const setSaved = props.setSaved;
    const [valueStart, setValueStart] = useState(dayjs(date));
    const [valueStop, setValueStop] = useState(dayjs(date));
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    

    /*if true, the user has pressed the start button*/
    const [isStarted, setisStarted] = useState(false);
    const [title, setTitle] = useState("");
    const [hike, setHike] = useState(props.hike);
    useEffect(() => {
        setMessage('');
        //setIsInHike(true);
        if(!hike){
            setIsStarting(false);
        }
        else{
            setTitle(hike.title);
        }
        checkIfStarted(); // Every time this interface is opened, it checks if the hike is already started in the db 
        
        // eslint-disable-next-line
    }, [])

    const checkIfStarted = async () => {
        // Backend: call API getRunningActivity to check if the activity is running and retrieve the running information
        await getRunningActivity()
            .then((activity) => {
                if(activity !== false) {
                    setisStarted(true);
                    setIsStarting(false);
                    setTitle(activity.title);
                    setValueStart(dayjs(activity.start_time));
                }            
            }).catch(err => {
                const obj = JSON.parse(err);
                setMessage(obj.error);
            });
        
    }



    const navigate = useNavigate()
    var moment = require('moment');
    moment().format();

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


    /*Function to compute the total time spent in hours and minutes*/
    /*const getTime = (valueStart, valueStop) => {
        var now = moment(`${dayjs(valueStart)}+0000`);
        var expiration = moment(`${dayjs(valueStop)}+0000`);
        // get the difference between the moments
        const diff = expiration.diff(now);
        //express as a duration
        const diffDuration = moment.duration(diff);
        return ({ hours: diffDuration.hours() + diffDuration.days() * 24 + diffDuration.months() * 730 + diffDuration.years() * 8760, minutes: diffDuration.minutes() }) //VALUES TO STORE IN DB IN THE BACKEND DOESN'T COMPUTE THE TIME SPENT
    }*/

    /*Function that returns true if value start < value stop*/
    const checkTime = (valueStart, valueStop) => {
        var now = moment(dayjs(valueStart).toISOString());
        var expiration = moment(dayjs(valueStop).toISOString());
        // get the difference between the moments
        const diff = expiration.diff(now);
        if (diff <= 0) {
            return (false)
        } else {
            return (true)
        }
    }

    const handleChangeStart = (newValue) => {
        if (newValue) {
            setValueStart(newValue);
        }
    };

    const handleChangeStop = (newValue) => {
        if (newValue) {
            setValueStop(newValue);
        }
    };


    const handleStart = async () => {
        if (!isNaN(valueStart.$D) && !isNaN(valueStart.$H) && !isNaN(valueStart.$M) && !isNaN(valueStart.$W) && !isNaN(valueStart.$m) && !isNaN(valueStart.$ms) && !isNaN(valueStart.$s) && !isNaN(valueStart.$y)) {
            // Backend: call API addActivity to start the hike
            await addActivity(new Activity({
                hike_id: hike.id,
                start_time: valueStart
            }))
                .then(() =>{
                    setisStarted(true)
                    setIsStarting(false);
                    navigate("/my-hikes")
                }
                ).catch(err => {
                    const obj = JSON.parse(err);
                    setMessage(obj.error);
                });

        } else {
            setMessage("Please select a date and a time.")
        }

    }
    const handleStop = async () => {
        if (!isNaN(valueStop.$D) && !isNaN(valueStop.$H) && !isNaN(valueStop.$M) && !isNaN(valueStop.$W) && !isNaN(valueStop.$m) && !isNaN(valueStop.$ms) && !isNaN(valueStop.$s) && !isNaN(valueStop.$y)) {
            if (checkTime(valueStart, valueStop) === true) {

                // Backend: call API terminateActivity to terminate the hike
                await terminateActivity(new Activity({
                    end_time: valueStop
                }))
                    .then(
                        () => {
                            setSaved(true);
                            setisStarted(false);
                            setIsStarting(false);
                            //setSaved(true);
                            setHike({});
                        }
                        //setIsInHike(false)
                    ).catch(err => {
                        console.log(err);
                        const obj = JSON.parse(err);
                        setMessage(obj.error);
                    });

            } else {
                setMessage("Please select a date and time after the departure date")
            }
        } else {
            setMessage("Please select a date and a time.")
        }
    }
    const handleCancel = async () => {
        if (isStarted) {
            // Backend: call API deleteActivity 
            await deleteActivity()
                .then(() =>{
                    setOpen(false)
                    //setIsInHike(false)
                    setisStarted(false)
                    setIsStarting(false)
                    setHike({})}
                    //navigate(-1)
                ).catch(err => {
                    const obj = JSON.parse(err);
                    setMessage(obj.error);
                });
        }else{
            navigate(-1)
        }

    }

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Grid container >
                <ThemeProvider theme={theme} >
                    {((isStarted || isStarting) )?
                        <>
                        <Grid xs={0} md={3}></Grid>
                        <Grid xs={12} md={6}  marginTop={1} sx={{alignItems: 'center', flexDirection:'column', display:'flex'}}>
                            <Container component="main" maxWidth="m" >
                                <Paper elevation={3} sx={{ ...thm }} >
                                    <Typography component={'span'} variant="h6" align='center' sx={{ ...thm, textTransform: 'uppercase', m: 3, fontWeight: 600 }}>{isStarted? "ONGOING HIKE: ": "START HIKE: "} {title}</Typography>
                                    {isStarted ?
                                        <Grid>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        marginBottom={1}
                                                        label="Start time"
                                                        value={valueStart}
                                                        disabled={true}
                                                        onChange={() => {}}
                                                        renderInput={(params) => <TextField {...params}/>}
                                                    />
                                                </LocalizationProvider>
                                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} marginTop={3}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        label="Stop time"
                                                        value={valueStop}
                                                        onChange={handleChangeStop}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Stack>
                                        </Grid>
                                        :
                                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    label="Start timer"
                                                    value={valueStart}
                                                    onChange={handleChangeStart}
                                                    renderInput={(params) => <TextField {...params}
                                                     />}
                                                />
                                            </LocalizationProvider>
                                            
                                        </Stack>
                                    }
                                    {message && <Alert sx={{ mb: 1, mt: 2, width: 'fit-content', align: 'center' }} severity="error" onClose={() => setMessage('')}>{message}</Alert>}
                                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3, mb: 3}}>
                                    

                                    {isStarted && 
                                        <>
                                            <Button sx={{ minWidth: '80px' }} onClick={() => setOpen(true)} variant="outlined" color='error'>CANCEL ONGOING HIKE</Button>
                                            <Button  onClick={handleStop} variant="contained" color='primary'>TERMINATE</Button>
                                        </>}
                                    {!isStarted && <Button sx={{ minWidth: '80px' }} onClick={handleCancel} variant="outlined" color='primary'>GO BACK</Button>}
                                    {!isStarted && <Button onClick={handleStart} variant="contained" color='primary'>START</Button>} 
                                    </Stack>
                                
                                </Paper>
                            </Container>
                            

                        </Grid>
                        <Grid xs={0} md={3}></Grid>
                    </>
                        :
                        <Grid xs={12}><HowToStart/></Grid>
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                        <DialogContent sx={{ ...thm }}>
                            <DialogContentText align='center' sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography component={'span'} variant="h6" align='center' sx={{ ...thm, textTransform: 'uppercase', fontWeight: 600 }}>{title}</Typography>
                            <Typography component={'span'} sx={{ mt: 1}}>{"Do you want to cancel ongoing hike without saving it?"}</Typography>
                            </DialogContentText>
                            
                        </DialogContent>
                        <DialogActions sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 3}}>
                            <Button onClick={handleClose} variant="outlined" color='primary'>
                                Back
                            </Button>
                            <Button  onClick={handleCancel} variant="contained" color='error'>CANCEL</Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
            </Grid >
        </div>
    )
}

export default StartHike