import { Autocomplete, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { hutTypeLabel, hutTypes } from '../../Utils/Hut';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function HutTypeFilter(props) {
    const { filter, setFilter, setLoadingHikes, resetHutType, setResetHutType } = props;
    const [value, setValue] = React.useState([]);

    // RESET
    useEffect(() => {
        if (resetHutType) {
            setValue([]);
            setResetHutType(false);
        }
        // eslint-disable-next-line 
    }, [resetHutType]);

    const handleChangeType = (newTypes) => {
        setValue(newTypes);
        setLoadingHikes(true);
        setFilter({ ...filter, hut_type: newTypes });
    };

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            {/* Title */}
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                Type
            </Typography>
            {/* Select Type(s) */}
            <Autocomplete
                multiple
                id="checkboxes-hut-type"
                options={hutTypes}
                disableCloseOnSelect
                getOptionLabel={(option) => hutTypeLabel[option]}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {hutTypeLabel[option]}
                    </li>
                )}
                sx={{ maxWidth: 300 }}
                renderInput={(params) => (
                    <TextField {...params} label="Hut Types" />
                )}
                onChange={(_, value) => handleChangeType(value)}
            />
        </Box>
    )
}

export default HutTypeFilter