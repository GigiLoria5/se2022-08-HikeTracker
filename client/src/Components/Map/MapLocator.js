import React, { useEffect, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css";

function LocationMarker(props) {
    const { position, setPosition } = props;
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

    useEffect(() => {
        map.locate();
        // eslint-disable-next-line 
    }, []);

    return position === null ? null : (
        <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
            <Popup>You are here</Popup>
        </Marker >
    )
}

function MapLocator(props) {
    const { position, setPosition } = props;

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '200px', width: '300px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker className="small-map" position={position} setPosition={setPosition} />
        </MapContainer>
    )
}

export default MapLocator