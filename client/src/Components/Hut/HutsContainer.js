import React, { useEffect, useState } from 'react'
import { Container, Fab, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import API from '../../API';
import { emptyFilter } from '../../Utils/Hut';
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';
import HutsList from './HutsList';
import HutsFilterPanel from './HutsFilterPanel';
import { isPointInsideRange } from '../../Utils/GeoUtils';

function HutsContainer() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [huts, setHuts] = useState([]);
    const [filter, setFilter] = useState(emptyFilter);
    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });
    const [radius, setRadius] = useState(null);
    const [search, setSearch] = useState("");
    const [loadingHuts, setLoadingHuts] = useState(true);

    useEffect(() => {
        if (loadingHuts) {
            API.getHutsWithFilters(filter)
                .then(huts => {
                    // APPLY SEARCH BY NAME
                    let hutsFiltered = (search === "")
                        ? huts
                        : huts.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
                    // APPLY HUTS AROUND A POINT WITHIN RADIUS FILTER
                    hutsFiltered = (radius === null)
                        ? hutsFiltered
                        : hutsFiltered.filter(h => {
                            const coordinates = h.coordinates.split(', ');
                            const hutLatitude = coordinates[0];
                            const hutLongitude = coordinates[1];
                            return isPointInsideRange({ latitude: position.lat, longitude: position.lng }, radius * 1000, { latitude: hutLatitude, longitude: hutLongitude });
                        });
                    // Set Huts After Filtered
                    setHuts(hutsFiltered);
                    // Add some delay to load smoothly
                    setTimeout(() => {
                        setLoadingHuts(false);
                    }, 300);
                });
        }
        // eslint-disable-next-line 
    }, [filter.country, filter.province, filter.city,
    filter.hut_type.length, filter.altitude_max, filter.altitude_min,
    filter.beds_number_max, filter.beds_number_min,
    position.lat, position.lng, radius, search, loadingHuts]);

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
                        Huts
                    </Typography>
                </Grid>

                {/* Filter */}
                <HutsFilterPanel huts={huts} setLoadingHuts={setLoadingHuts} filter={filter} setFilter={setFilter} position={position} setPosition={setPosition}
                    radius={radius} setRadius={setRadius} setSearch={setSearch} />

                {/* Huts List */}
                <HutsList huts={huts} loadingHuts={loadingHuts} />
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
    );
}

export default HutsContainer