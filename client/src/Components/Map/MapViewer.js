
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { LayersControl, MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import markerIconBlue from '../../Assets/Map/marker-icon-blue.png';
import { Icon } from 'leaflet';

function LocationMarker(props) {
    const { startPoint, endPoint, refPoints } = props;
    console.log(startPoint);

    return (
        <>
            <Marker position={startPoint.coordinates.split(', ')} icon={new Icon({ iconUrl: markerIconBlue, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                <Popup>You are here</Popup>
            </Marker >
        </>
    )
}

function MapViewer(props) {
    const { gpxFileContent, height, width, startPoint, endPoint, refPoints } = props;
    const [positions, setPositions] = useState(null);

    useEffect(() => {
        const gpxParser = require('gpxparser');
        const gpx = new gpxParser();
        gpx.parse(gpxFileContent);
        const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
        setPositions(positions);
    }, []);

    return (
        positions === null
            ? <CircularProgress color="success" />
            : <MapContainer
                center={[positions[0][0], positions[0][1]]}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: height, maxWidth: width }}
            >
                {/* Map Controls */}
                < LayersControl >
                    <LayersControl.BaseLayer checked name="Map View">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite View">
                        <TileLayer
                            url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                            maxZoom={20}
                            subdomains={['mt1', 'mt2', 'mt3']}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl >
                {/* Trail */}
                < Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={positions}
                />
                {/* Trail Markers */}
                <LocationMarker startPoint={startPoint} endPoint={endPoint} refPoints={refPoints} />
            </MapContainer >
    )
}

export default MapViewer