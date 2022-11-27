import React, { useEffect } from 'react'

import { Circle, LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { initialLat as defaultLat, initialLng as defaultLng } from '../../Utils/MapLocatorConstants';
import markerIconBlue from '../../Assets/Map/marker-icon-blue.png';
import markerIconRed from '../../Assets/Map/marker-icon-red.png';

function LocationMarker(props) {
    const { position, setPosition, radius, waypoints } = props;
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
        if (defaultLat === position.lat && defaultLng === position.lng)
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
        <>
            <Marker key={"you-are-here"} position={position} icon={new Icon({ iconUrl: markerIconBlue, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                <Popup>You are here</Popup>
            </Marker >
            {radius === null ? null : <Circle center={position} pathOptions={{ fillColor: 'blue' }} radius={radius * 1000} />}
            {!waypoints
                ? null
                : waypoints.map((h, index) => {
                    return (
                        <Marker key={index} position={{ lat: parseFloat(h.lat), lng: parseFloat(h.lng) }} icon={new Icon({ iconUrl: markerIconRed, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                            <Popup>{h.label}</Popup>
                        </Marker >
                    );
                })
            }
        </>
    )
}

/**
 * 
 * @param {Object} props.position an object with "lat" and "lng" properties
 * @param {Object} props.height the height of the map which should be defined as a string: 'value px' 
 * @param {Object} props.width the width of the map which should be defined as a string: 'value px' 
 * @param {[String]} props.waypoints an array of objects with label, lat and lng properties
 */
function MapLocator(props) {
    const { position, setPosition, radius, height, width, initialLat, initialLng, zoomLevel, waypoints } = props;

    return (
        <MapContainer
            center={[initialLat, initialLng]}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            style={{ height: height, maxWidth: width }}
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
            {/* Map Elements */}
            <LocationMarker position={position} setPosition={setPosition} radius={radius} waypoints={waypoints} />
        </MapContainer>
    )
}

export default MapLocator