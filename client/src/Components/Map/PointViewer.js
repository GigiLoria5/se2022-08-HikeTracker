
import React from 'react';
import { LayersControl, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import markerStart from '../../Assets/Map/start-flag.png';
import { Icon } from 'leaflet';

function LocationMarker(props) {
    const { position, label } = props;

    return (
        <Marker position={position} icon={new Icon({ iconUrl: markerStart, iconSize: [29, 41], iconAnchor: [12, 41] })} >
            <Tooltip direction="bottom" offset={[1, 0]} opacity={1}>
                {label}
            </Tooltip>
        </Marker >
    )
}

function PointViewer(props) {
    const { height, width, label, lat, lng } = props;

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={15}
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
            {/* Marker */}
            <LocationMarker position={{ lat: lat, lng: lng }} label={label} />
        </MapContainer >
    )
}

export default PointViewer