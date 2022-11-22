import React, {useState} from 'react';
import { TextField } from '@mui/material';

const SmootherTextField = (props) => {
        const [localText, setLocalText] = useState(props.text);
        return <TextField 
            variant="outlined" 
            label={props.label} 
            margin="normal" 
            sx={{ width: 'fit-content' }}
            value={localText}
            onBlur={ev=> {props.setText(ev.target.value)}}
            onChange={ev => {setLocalText(ev.target.value)} }
            required/>
    }

export default SmootherTextField