import React, {useState} from 'react';
import { TextField } from '@mui/material';

const SmootherTextField = (props) => {
        const [localText, setLocalText] = useState(props.text);
        return <TextField 
            variant="outlined" 
            label={props.label} 
            margin="normal" 
            sx={{ width: 'fit-content', maxWidth:'22ch'}}
            value={localText}
            onBlur={ev=> {props.setText(ev.target.value)}}
            onChange={ev => {setLocalText(ev.target.value)} }
            required={props.required}/>
    }

export default SmootherTextField