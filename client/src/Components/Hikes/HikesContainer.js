import React, { useEffect, useState } from 'react'
import { Container, Fab, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HikesFilterPanel from './HikesFilterPanel';
import HikesList from './HikesList';
import API from '../../API';
import { isPointInsideRange } from '../../Utils/GeoUtils';

const initialLat = 51.505;
const initialLng = -0.09;

const HikesContainer = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [hikes, setHikes] = useState([]);
    const [filter, setFilter] = useState({
        "country": null, "province": null, "city": null, "difficulty": null,
        "track_length_min": null, "track_length_max": null,
        "ascent_min": null, "ascent_max": null,
        "expected_time_min": null, "expected_time_max": null
    });
    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });
    const [radius, setRadius] = useState(null);
    const [loadingHikes, setLoadingHikes] = useState(true);

    useEffect(() => {
        API.getHikesWithFilters(filter)
            .then(hikes => {
                // APPLY HERE HIKES AROUND A POINT WITHIN RADIUS FILTER
                const hikesFiltered = (radius === null)
                    ? hikes
                    : hikes.filter(h => {
                        const coordinates = h.start[0].coordinates.split(', ');
                        const hikeLatitude = coordinates[0];
                        const hikeLongitude = coordinates[1];
                        return isPointInsideRange({ latitude: position.lat, longitude: position.lng }, radius * 1000, { latitude: hikeLatitude, longitude: hikeLongitude });
                    });
                // Set Hikes After Filtered
                setHikes(hikesFiltered);
                // Add some delay to load smoothly
                setTimeout(() => {
                    setLoadingHikes(false);
                }, 300);
            });
        // eslint-disable-next-line 
    }, [filter.country, filter.province, filter.city, filter.difficulty, filter.track_length, filter.ascent, filter.ascent, position.lat, position.lng, radius]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Container className='container-full-page'>
            <Grid container >
                {/* Title */}
                <Grid item xs={12} >
                    <Typography variant="h5" marginTop={2} marginBottom={0.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                        Find your next hike
                    </Typography>
                </Grid>

                {/* Filter */}
                <HikesFilterPanel hikes={hikes} setLoadingHikes={setLoadingHikes} filter={filter} setFilter={setFilter} position={position} setPosition={setPosition} radius={radius} setRadius={setRadius} />

                {/* Hikes List */}
                <HikesList hikes={hikes} loadingHikes={loadingHikes} />
            </Grid>

            {/* Scroll To Top Button */}
            {!showTopBtn ? null : <Fab sx={{
                position: 'fixed',
                bottom: "25px",
                right: "25px",
            }} aria-label={"Scroll To Top"}
                color={"primary"}
                onClick={goToTop}
            >
                <ArrowUpwardIcon />
            </Fab>}
        </Container >
    )
}

export default HikesContainer