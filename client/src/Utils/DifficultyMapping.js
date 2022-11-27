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

const difficultyFromState = (difficultyValue) => {
    let val = null;
    switch (difficultyValue) {
        case "Tourist":
            val = 1;
            break;
        case "Hiker":
            val = 2;
            break;
        case "Professionnal":
            val = 3;
            break;
        default:
            break;
    }
    return val;
}

export { customDifficultyIcons, getColorByDifficulty, difficultyFromState }