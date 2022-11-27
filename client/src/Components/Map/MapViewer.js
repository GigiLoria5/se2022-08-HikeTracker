
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { LayerGroup, LayersControl, MapContainer, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet';
import markerStart from '../../Assets/Map/start-flag.png';
import markerFinish from '../../Assets/Map/finish-flag.png';
import markerLocation from '../../Assets/Map/location-marker.png';
import { Icon } from 'leaflet';
import { findFarthestPoint, getMidPoint, splitCoordinates } from '../../Utils/GeoUtils';
import { getPointShortDescription } from '../../Utils/Point';
import { getPoints } from '../../Utils/GPX';

function LocationMarker(props) {
    const { startPoint, endPoint, refPoints } = props;

    return (
        <>
            {/* Start Point */}
            <LayersControl.Overlay checked name="Start Point">
                <Marker position={startPoint.coordinates.split(', ')} icon={new Icon({ iconUrl: markerStart, iconSize: [29, 41], iconAnchor: [12, 41] })} >
                    <Tooltip direction="bottom" offset={[1, 0]} opacity={1}>
                        Start Point
                    </Tooltip>
                </Marker >
            </LayersControl.Overlay>

            {/* End Point */}
            <LayersControl.Overlay checked name="End Point">
                <Marker position={endPoint.coordinates.split(', ')} icon={new Icon({ iconUrl: markerFinish, iconSize: [29, 41], iconAnchor: [12, 41] })} >
                    <Tooltip direction="bottom" offset={[1, 0]} opacity={1}>
                        End Point
                    </Tooltip>
                </Marker >
            </LayersControl.Overlay>

            {/* Reference Points */}
            <LayersControl.Overlay checked name="Reference Points">
                <LayerGroup>
                    {!refPoints
                        ? null
                        : refPoints.map((point, index) => {
                            const pCoordinates = splitCoordinates(point.coordinates);
                            return (
                                <Marker key={index} position={{ lat: parseFloat(pCoordinates[0]), lng: parseFloat(pCoordinates[1]) }} icon={new Icon({ iconUrl: markerLocation, iconSize: [15, 41], iconAnchor: [12, 41] })} >
                                    <Tooltip direction="bottom" offset={[-3, 0]} opacity={1}>
                                        {getPointShortDescription(point.ref_point_type, point)}
                                    </Tooltip>
                                </Marker >
                            );
                        })
                    }
                </LayerGroup >
            </LayersControl.Overlay>
        </>
    )
}

function MapViewer(props) {
    const { gpxFileContent, height, width, startPoint, endPoint, refPoints, trailColor } = props;
    const [positions, setPositions] = useState(null);
    const [center, setCenter] = useState(null);

    useEffect(() => {
        // Parse GPX file
        getPoints({text: () => gpxFileContent}).then(
            positions => {
                // Find center
                const startPointGPXCoordinates = positions[0].map(c => c);
                const farthestPointCoordinates = findFarthestPoint(startPointGPXCoordinates, positions);
                const midPointPosition = getMidPoint(startPointGPXCoordinates, farthestPointCoordinates);
                // Set states
                setCenter(midPointPosition);
                setPositions(positions);
                // eslint-disable-next-line
            }
        )
        
    }, []);

    return (
        positions === null
            ? <CircularProgress color="success" />
            : <MapContainer
                center={center}
                zoom={13}
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

                    {/* Trail Markers */}
                    <LocationMarker startPoint={startPoint} endPoint={endPoint} refPoints={refPoints} />
                </LayersControl >
                {/* Trail */}
                < Polyline
                    pathOptions={{ fillColor: 'red', color: trailColor }}
                    positions={positions}
                />
            </MapContainer >
    )
}

export default MapViewer