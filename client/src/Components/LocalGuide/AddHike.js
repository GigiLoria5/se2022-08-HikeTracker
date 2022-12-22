import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import AddHike1 from './AddHike1';
import AddHike2 from './AddHike2';

function AddHike() {

    const [startPointDescription, setStartPointDescription] = useState("");
    const [endPointDescription, setEndPointDescription] = useState("");

    const [stepOneDone, setStepOneDone] = useState(false);

    const [startPointGPSlat, setStartPointGPSlat] = useState("");
    const [startPointGPSlon, setStartPointGPSlon] = useState("");

    const [endPointGPSlat, setEndPointGPSlat] = useState("");
    const [endPointGPSlon, setEndPointGPSlon] = useState("");

    const [startPointType, setStartPointType] = useState("gps"); //for start point
    const [endPointType, setEndPointType] = useState("gps");// for end point

    const [selectedGpxFile, setSelectedGpxFile] = useState();
    const [selectedImgFile, setSelectedImgFile] = useState(null);

    const [startPointValue, setStartPointValue] = useState("gps");
    const [endPointValue, setEndPointValue] = useState("gps");

    const [ascent, setAscent] = useState(0);
    const [length, setLength] = useState(0);
    const [expectedTime, setExpectedTime] = useState(0.0);
    const [peakAltitude, setPeakAltitude] = useState(0);
    const [newHike, setNewHike] = useState(true)

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

    return (
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12} marginTop={2} >
                        {
                            stepOneDone === false ?
                                <AddHike1
                                    setStepOneDone={setStepOneDone}

                                    setExpectedTime={setExpectedTime}
                                    setAscent={setAscent}
                                    setLength={setLength}
                                    newHike={newHike}

                                    selectedGpxFile={selectedGpxFile}
                                    setSelectedGpxFile={setSelectedGpxFile}
                                    setPeakAltitude={setPeakAltitude}

                                    startPointDescription={startPointDescription}
                                    setStartPointDescription={setStartPointDescription}
                                    endPointDescription={endPointDescription}
                                    setEndPointDescription={setEndPointDescription}

                                    startPointGPSlat={startPointGPSlat}
                                    setStartPointGPSlat={setStartPointGPSlat}
                                    startPointGPSlon={startPointGPSlon}
                                    setStartPointGPSlon={setStartPointGPSlon}

                                    endPointGPSlat={endPointGPSlat}
                                    setEndPointGPSlat={setEndPointGPSlat}
                                    endPointGPSlon={endPointGPSlon}
                                    setEndPointGPSlon={setEndPointGPSlon}

                                    startPointType={startPointType}
                                    setStartPointType={setStartPointType}
                                    endPointType={endPointType}
                                    setEndPointType={setEndPointType}

                                    startPointValue={startPointValue}
                                    setStartPointValue={setStartPointValue}
                                    endPointValue={endPointValue}
                                    setEndPointValue={setEndPointValue}
                                />
                                :
                                <AddHike2
                                    setStepOneDone={setStepOneDone}

                                    expectedTime={expectedTime}
                                    ascent={ascent}
                                    length={length}
                                    selectedFile={selectedGpxFile}
                                    peakAltitude={peakAltitude}
                                    setNewHike={setNewHike}

                                    selectedImgFile={selectedImgFile}
                                    setSelectedImgFile={setSelectedImgFile}

                                    startPointDescription={startPointDescription}
                                    endPointDescription={endPointDescription}

                                    startPointGPSlat={startPointGPSlat}
                                    startPointGPSlon={startPointGPSlon}

                                    endPointGPSlat={endPointGPSlat}
                                    endPointGPSlon={endPointGPSlon}

                                    startPointType={startPointType}
                                    endPointType={endPointType}

                                    startPointValue={startPointValue}
                                    endPointValue={endPointValue}
                                />
                        }
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    );
}

export default AddHike;