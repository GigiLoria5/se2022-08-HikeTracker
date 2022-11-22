import React, { useEffect, useState } from 'react'

import { Circle, LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import markerIconBlue from '../../Assets/Map/marker-icon-blue.png';
import { Icon } from 'leaflet';
//import "leaflet/dist/leaflet.css";

function LocationMarker(props) {
    const { position, setPosition, radius } = props;
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    // on start locate user to the current position (if the gps is allowed from the browser)
    useEffect(() => {
        map.locate();
        // eslint-disable-next-line 
    }, []);

    // when the input fields change, update indicator
    useEffect(() => {
        if (position && position.lat && position.lng)
            map.flyTo(position, map.getZoom());
        // eslint-disable-next-line 
    }, [position.lat, position.lng]);

    return position === null ? null : (
        <Marker position={position} icon={new Icon({ iconUrl: markerIconBlue, iconSize: [25, 41], iconAnchor: [12, 41] })} >
            <Popup>You are here</Popup>
        </Marker >
    )
}

function MapLocator(props) {
    const { position, setPosition, radius, height, width, initialLat, initialLng, zoomLevel } = props;

    return (
        <MapContainer
            center={[initialLat, initialLng]}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            style={{ height: height, width: width }}
        >
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
            <LocationMarker position={position} setPosition={setPosition} radius={radius} />
        </MapContainer>
    )
}

export default MapLocator