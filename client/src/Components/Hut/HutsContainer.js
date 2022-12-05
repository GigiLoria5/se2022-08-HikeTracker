import React, { useEffect, useState } from 'react'
import API from '../../API';

function HutsContainer() {
    const [huts, setHuts] = useState([]);
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


    return (
        <div>HutsContainer</div>
    )
}

export default HutsContainer