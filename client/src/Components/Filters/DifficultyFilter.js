import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { customDifficultyIcons } from '../../Utils/CustomDifficultyIcons';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconHover .MuiSvgIcon-root': {
        opacity: 0.15,
    },
}));

const customIcons = customDifficultyIcons;

function IconContainer(props) {
    const { value, ...other } = props;

    return <span {...other} className={other.className}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

function DifficultyFilter(props) {
    const { filter, setFilter, setLoadingHikes, resetDifficulty, setResetDifficulty } = props;
    const [value, setValue] = React.useState(-1);
    const [hover, setHover] = React.useState(-1);

    // RESET
    useEffect(() => {
        if (resetDifficulty) {
            setValue(-1);
            setHover(-1);
            setResetDifficulty(false);
        }
        // eslint-disable-next-line 
    }, [resetDifficulty]);

    return (
        <Box component="div" sx={{ marginTop: 1, padding: 4, paddingTop: 0, paddingBottom: 0 }}>
            {/* Title */}
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 550, fontSize: { xs: '4.50vw', sm: '3vw', md: '2.5vw', lg: '1.5vw' }, marginBottom: 1 }} margin={0}>
                Difficulty
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                {/* Rating Icons */}
                {<StyledRating
                    name="highlight-selected-only"
                    value={value}
                    onChange={(_, newValue) => {
                        setValue(newValue);
                        setLoadingHikes(true);
                        setFilter({ ...filter, "difficulty": newValue });
                    }}
                    onChangeActive={(_, newHover) => {
                        setHover(newHover);
                    }}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value) => customIcons[value].label}
                    highlightSelectedOnly
                    max={3}
                />}
                {/* Rating Label */}
                {value > 0 && (
                    <Box sx={{ ml: 2 }}>{customIcons[hover !== -1 ? hover : value].label}</Box>
                )}
                {value < 1 && hover > 0 && (
                    <Box sx={{ ml: 2 }}>{customIcons[hover].label}</Box>
                )}
            </Box>
        </Box>
    )
}

export default DifficultyFilter