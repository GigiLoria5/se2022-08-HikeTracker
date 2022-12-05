import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '1.4375em',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    marginTop: '1em',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "rgba(0, 0, 0, 0.54)",
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
        border: "1px solid rgba(196,196,196,1)",
        borderRadius: "4px",
        height: '38px',
    },
    '& .MuiInputBase-input:focus, .MuiInputBase-input:hover': {
        border: "1px solid black",
    },
    width: '100%',
    maxWidth: '300px',
}));

function NameFilter(props) {
    const { setSearch, setLoadingHikes, resetSearch, setResetSearch } = props;
    const [timer, setTimer] = React.useState(null);
    const [value, setValue] = React.useState(null);

    // RESET
    React.useEffect(() => {
        if (resetSearch) {
            setValue(null);
            setSearch("");
            setResetSearch(false);
        }
        // eslint-disable-next-line 
    }, [resetSearch]);

    /* This delay is needed because if the user types in too many letters, fast or not, 
    *  a strong delay is created due to the high number of setSearch calls. 
    *  With the delay we try to reduce it as much as possible.
    */
    const changeDelay = (change) => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setValue(change); // update text
        setTimer( // in 400ms the hikes list will be updated
            setTimeout(() => {
                setLoadingHikes(true);
                setSearch(change);
            }, 400)
        );
    };

    return (
        <Box component="div" sx={{ marginTop: { xs: 3, lg: 2 }, padding: 4, paddingTop: 0, paddingBottom: 0, height: "56px" }}>
            <Box component="div" sx={{ display: "flex", marginBottom: 2, maxWidth: "300px" }} >
                {/* Search */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search by hike title…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => { changeDelay(e.target.value); }}
                        value={value !== null ? value : ""}
                    />
                </Search>
                {/* Reset Search Field */}
                <IconButton color="error" aria-label="reset radius" component="label" sx={{ height: "56px" }} onClick={() => changeDelay("")}>
                    <CancelIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default NameFilter