import React, { useEffect, useState } from 'react'

import { LayersControl, MapContainer, Marker, Polyline, TileLayer, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import Control from 'react-leaflet-custom-control'
import locationMarker from '../../Assets/Map/location-marker.png';
import markerStart from '../../Assets/Map/start-flag.png';
import 'leaflet/dist/leaflet.css';
import { getClosestPoint } from '../../Utils/GeoUtils';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import {useLeafletContext} from '@react-leaflet/core';
import L from 'leaflet';
import { Button } from '@mui/material';
function RefPointMarker(props) {
    const { position } = props;

    return position === null ? null : (
        <Marker eventHandlers={{
            click: (e) => {
                props.editRefPoint(props.latitude, props.longitude);
            },
        }} position={[props.latitude, props.longitude]} icon={new Icon({ iconUrl: locationMarker, iconSize: [15, 41], iconAnchor: [8, 41] })} >
        </Marker >
    )
}
function AddPoint(props) {
    useMapEvents({
        click(e) {
            const p = getClosestPoint([e.latlng.lat, e.latlng.lng], props.points)
            //props.addPoint(e.latlng.lat, e.latlng.lng)
            props.addPoint(p[0], p[1])
        }
    })

    return null
}

function ResetPosition(props) {
    const map = useMapEvents({
    })

    return <Control prepend position='bottomright'>
        <Button color='inherit' variant='contained' onClick={e => {
            e.preventDefault();
            map.flyTo([props.lat, props.lon], props.zoom);
        }}>
            <LocationSearchingIcon/>
        </Button>
    </Control>
}

/**
 * 
 * @param {Object} props.position an object with "lat" and "lng" properties
 * @param {Object} props.height the height of the map which should be defined as a string: 'value px' 
 * @param {Object} props.width the width of the map which should be defined as a string: 'value px' 
 */
function RefPointMapLocator(props) {
    
    
    const { height, width, initialLat, initialLng, zoomLevel, points, refpoints, addRefPoints, editRefPoint } = props;
    return (
        <MapContainer
            center={[initialLat, initialLng]}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            style={{ height: height, width: width }}
        >
            {/* Map Controls */}
            <LayersControl>
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
            </LayersControl>
            <Polyline
                pathOptions={{ color: 'blue' }}
                positions={points}
            />
            <AddPoint addPoint={addRefPoints} points={points}/>
            {/* Map Elements */}
            {/*<LocationMarker position={position} setPosition={setPosition} radius={radius}/>*/}
            <Marker position={[initialLat, initialLng]} icon={new Icon({ iconUrl: markerStart, iconSize: [29, 41], iconAnchor: [0, 41] })} >
            </Marker >
            <ResetPosition lat={initialLat} lon={initialLng} zoom={zoomLevel}/>
            {refpoints ?
                refpoints.map(a => {
                    return <RefPointMarker key={a.latitude + "." + a.longitude} latitude={a.latitude} longitude={a.longitude} editRefPoint={editRefPoint} />
                })
                : <></>}
        </MapContainer>
    )
}

export default RefPointMapLocator