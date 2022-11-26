import DifficultyIcon1 from '../Assets/Difficulty/DifficultyIcon1';
import DifficultyIcon2 from '../Assets/Difficulty/DifficultyIcon2';
import DifficultyIcon3 from '../Assets/Difficulty/DifficultyIcon3';

const customDifficultyIcons = {
    1: {
        icon: <DifficultyIcon1 />,
        label: 'Tourist',
    },
    2: {
        icon: <DifficultyIcon2 />,
        label: 'Hiker',
    },
    3: {
        icon: <DifficultyIcon3 />,
        label: 'Professional',
    },
};

const getColorByDifficulty = (difficulty) => {
    switch (difficulty) {
        case 1:
            return 'green';
        case 2:
            return 'blue';
        case 3:
            return 'black';
        default:
            return 'red';
    }
}

export { customDifficultyIcons, getColorByDifficulty }