import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SmootherTextField from "../../SmootherTextField";

const PointsInput = (props) => {
    const { pointType, pointValue, pointGPSlat, pointGPSlon, handleChange, setPointValue, setPointDescription } = props;
    return (
        <FormControl sx={{ width: '30ch' }}>
            <InputLabel id="demo-simple-select-label">Location type</InputLabel>
            <Select value={pointType} label="Location Type 2" onChange={handleChange}>
                <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                <MenuItem value={'address'}>Address</MenuItem>
                <MenuItem value={'name'}>Name</MenuItem>
            </Select>
            {pointType === "gps" ? (
                <>
                    <TextField variant="outlined" color='primary' label="Latitude" margin="normal" sx={{ width: '30ch' }} value={pointGPSlat} disabled />
                    <TextField variant="outlined" color='primary' label="Longitude" sx={{ width: '30ch', marginTop: 1 }} value={pointGPSlon} disabled />
                </>
            ) : (
                <Grid></Grid>
            )}
            {pointType === "address" ? (
                <SmootherTextField maxWidth='30ch' label="Point address" text={pointValue} setText={setPointValue} required={pointType === "address"} />
            ) : (
                <Grid></Grid>
            )}

            {pointType === "name" ? (
                <SmootherTextField maxWidth='30ch' label="Point name" text={pointValue} setText={setPointValue} required={pointType === "name"} />
            ) : (
                <Grid></Grid>
            )}

            <SmootherTextField maxWidth='30ch' label="Description" text="" setText={setPointDescription} required={true} />

        </FormControl>
    )
}

export default PointsInput;