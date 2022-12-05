import React, { useEffect, useState } from 'react'
import { Container, Fab, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import API from '../../API';
import { emptyFilter } from '../../Utils/Hut';
import { initialLat, initialLng } from '../../Utils/MapLocatorConstants';
import HutsList from './HutsList';
import HutsFilterPanel from './HutsFilterPanel';

function HutsContainer() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [huts, setHuts] = useState([]);
    const [filter, setFilter] = useState(emptyFilter);
    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });
    const [radius, setRadius] = useState(null);
    const [search, setSearch] = useState("");
    const [loadingHuts, setLoadingHuts] = useState(true);

    useEffect(() => {
        API.getHutsWithFilters(null)
            .then(huts => {
                console.log(huts);
                // Set Huts After Filtered
                setHuts(huts);
                // Add some delay to load smoothly
                setTimeout(() => {
                    setLoadingHuts(false);
                }, 300);
            });
        // eslint-disable-next-line 
    }, []);

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