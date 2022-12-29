import { Button } from '@mui/material';

function RunningButtons(props) {
    const { runningActivity, clickHandleStart, hikeId } = props;

    if (runningActivity === false) {
        return <><Button variant="contained" color='success' onClick={clickHandleStart} sx={{ m: 1, mb: 2, mt: 2 }}>
            Start this hike
        </Button></>
    } else if (runningActivity.hike_id === parseInt(hikeId)) {
            return <><Button variant="contained" color='error' onClick={clickHandleStart} sx={{ m: 1, mb: 2, mt: 2 }}>
                Stop this hike
            </Button></>
        } else {
            return <><Button variant="contained" color='info' disabled sx={{ m: 1, mb: 2, mt: 2 }}>
                Another hike is running
            </Button></>
        }


}

export default RunningButtons;