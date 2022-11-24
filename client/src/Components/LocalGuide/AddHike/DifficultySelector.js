import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DifficultySelector = (props) => {
    const {difficulty, setDifficulty} = props;
    return (
        <FormControl margin="normal" sx={{ width: 'fit-content', minWidth: '30ch', maxWidth: '30ch' }} >   
        <InputLabel>Difficulty</InputLabel>
        <Select
            value={difficulty}
            variant="outlined"
            onChange={e => setDifficulty(e.target.value)}
            label="Difficulty"
            required
        >
            <MenuItem value=""> <em>Select a difficulty</em> </MenuItem>
            <MenuItem value={"Tourist"}>Tourist</MenuItem>
            <MenuItem value={"Hiker"}>Hiker</MenuItem>
            <MenuItem value={"Professionnal Hiker"}>Professionnal Hiker</MenuItem>

        </Select>
    </FormControl>
    )
}

export default DifficultySelector;