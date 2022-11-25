import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import RefPointMapLocator from "../../Map/RefPointMapLocator";
import SmootherTextField from "../../SmootherTextField";

function RefPointAdd(props){
    const {start_point,
        points,
        addRefPoints,
        editRefPoint,
        refPoints,
        refPointType,
        refPointValue,
        addingRefPoint,
        editingRefPoint,
        setRefPointValue,
        refPointMessage,
        setRefPointType,
        refPointDescription,
        setRefPointMessage,
        setRefPointDescription,
        refPointLat,
        refPointLon,
        addReferencePoint,
        deleteReferencePoint} = props;
    return  <>
        <Grid item style={{width: "80%"}} alignItems="center" alignSelf="center" margin={2}>
        <RefPointMapLocator
            position={{lat:start_point.latitude, lng:start_point.longitude}}
            height={'300px'}
            width={'100%'}
            initialLat={start_point.latitude}
            initialLng={start_point.longitude}
            zoomLevel={15}
            points={points}
            addRefPoints={addRefPoints}
            editRefPoint={editRefPoint}
            refpoints={refPoints}
            />
        </Grid>
        {(addingRefPoint || editingRefPoint)? <FormControl sx={{ m:3, width: 'fit-content', minWidth: '30ch', maxWidth: '30ch' }} >
            
            <InputLabel>Location type</InputLabel>
            <Select
                value={refPointType}
                variant="outlined"
                sx={{ width: '30ch', maxWidth: '30ch' }}
                onChange={e => {
                    setRefPointType(e.target.value);
                    if(e.target.value==="gps"){
                        setRefPointValue("gps");
                    }
                    else{
                        setRefPointValue("");
                    }}}
                label="Location type"
                required
            >
                <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                <MenuItem value={"address"}>Address</MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>

            </Select>
            <SmootherTextField maxWidth='30ch' label="Description" text={refPointDescription} setText={setRefPointDescription} required={true}/>
            {refPointType === "gps" ? (
            <>
                <TextField variant="outlined" color='primary' label="Latitude" margin="normal" sx={{ width: '30ch', maxWidth: '30ch' }}  value={refPointLat}disabled /> 
                <TextField variant="outlined" color='primary' label="Longitude"   sx={{ width: '30ch', maxWidth: '30ch' }}  value={refPointLon} disabled/> 

            </>
            ) : (
                <Grid></Grid>
            )}
            {refPointType === "address" ? (
                <SmootherTextField maxWidth='30ch' label="Point address" text={refPointValue} setText={setRefPointValue} required={refPointType === "address"}/>                                           
            ) : (
                <Grid></Grid>
            )}

            {refPointType === "name" ? (
                <SmootherTextField maxWidth='30ch' label="Point name" text={refPointValue} setText={setRefPointValue} required={refPointType === "name"}/>
            ) : (
                <Grid></Grid>
            )}
            {refPointMessage &&
                <><Alert sx={{mt:1, mx:-5}} severity="error" onClose={() => setRefPointMessage('')}>{refPointMessage}</Alert>
                <Grid><br/></Grid>  </> 
            }
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Button sx={{ m:1, minWidth: '80px'}} onClick={addReferencePoint} variant="contained" color='primary'>{addingRefPoint? "ADD":"UPDATE"}</Button>
                <Button sx={{ m:1, minWidth: '80px'}} onClick={deleteReferencePoint} variant="contained" color='error'>{addingRefPoint? "CANCEL":"DELETE"}</Button>
            </Stack>
            
            
            
        </FormControl> : <></>
        
        }
    </>
    
    
}


export default RefPointAdd