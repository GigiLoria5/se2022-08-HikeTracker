import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SmootherTextField from "../../SmootherTextField";
import Typography from "@mui/material/Typography";
import UiLink from '@mui/material/Link'
import { Link } from "react-router-dom";

const PointsInput = (props) => {
    const { pointType, pointValue, pointGPSlat, pointGPSlon, handleChange, setPointValue, setPointDescription, description, huts, parkings } = props;
    return (
        <FormControl sx={{ width: '30ch' }}>
            <InputLabel id="demo-simple-select-label">Location type</InputLabel>
            <Select value={pointType} label="Location Type 2" onChange={handleChange}>
                <MenuItem value={"gps"}>GPS coordinates</MenuItem>
                <MenuItem value={'address'}>Address</MenuItem>
                <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'parking'}>Parking Lot</MenuItem>
                <MenuItem value={'hut'}>Hut</MenuItem>
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

            {pointType === "parking" ? (
                <>
                    <FormControl sx={{ width: '30ch', mt: 2 }}>
                        {
                            parkings.length === 0
                                ? <Typography sx={{ fontSize: 14 }} color="grey.700">
                                    There aren't known parking lots near this point. You can create one
                                    <UiLink sx={{ ml: .5 }} underline="always" color="grey.700" component={Link} to={"/local-guide-add-parking"}>
                                        here
                                    </UiLink>
                                </Typography>
                                : <>
                                    <InputLabel id="demo-simple-select-label">Choose a parking</InputLabel>
                                    <Select value={pointValue} label="Choose a parking" onChange={ev => { setPointValue(ev.target.value) }}>
                                        {parkings.map((p) => <MenuItem key={p.id} value={p.id}>{p.address}, {p.city} ({p.province}) - {p.country}</MenuItem>)}
                                    </Select>
                                </>
                        }


                    </FormControl>
                </>
            ) : (
                <Grid></Grid>
            )}

            {pointType === "hut" ? (
                <>
                    <FormControl sx={{ width: '30ch', mt: 2 }}>
                        {
                            huts.length === 0
                                ? <Typography sx={{ fontSize: 14 }} color="grey.700">
                                    There aren't known huts near this point. You can create one
                                    <UiLink sx={{ ml: .5 }} underline="always" color="grey.700" component={Link} to={"/local-guide-add-hut"}>
                                        here
                                    </UiLink>
                                </Typography>
                                : <>
                                    <InputLabel id="demo-simple-select-label">Choose a hut</InputLabel>
                                    <Select value={pointValue} label="Choose a hut" onChange={ev => { setPointValue(ev.target.value) }}>
                                        {huts.map((h) => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
                                    </Select>
                                </>
                        }


                    </FormControl>
                </>
            ) : (
                <Grid></Grid>
            )}

            {
                ((pointType === "hut" && huts.length === 0) || (pointType === "parking" && parkings.length === 0))
                    ? false
                    : <SmootherTextField maxWidth='30ch' label="Description" text={description} setText={setPointDescription} required={true} />
            }
        </FormControl>
    )
}

export default PointsInput;