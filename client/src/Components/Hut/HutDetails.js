import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API';

function HutDetails() {
    const { hutId } = useParams();
    const [hut, setHut] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // fetch /api/huts/:id
        if (hutId) {
            API.getHutById(parseInt(hutId))
                .then(h => {
                    console.log(h);
                    setTimeout(() => {
                        setHut(h);
                    }, 300);
                })
                .catch(_ => { setError("The page you requested cannot be found") })
        }
    }, [hutId]);

    return (
        <div>HutDetails</div>
    )
}

export default HutDetails