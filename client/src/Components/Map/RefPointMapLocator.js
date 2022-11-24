import React, { useEffect } from 'react'

import { LayersControl, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import markerIconBlue from '../../Assets/Map/marker-icon-blue.png';
import markerIconRed from  '../../Assets/Map/marker-icon-red.png';
import 'leaflet/dist/leaflet.css';
function RefPointMarker(props) {
    const { position, setPosition, radius} = props;
    /*const map = useMapEvents({
        click(e) {
            props.editRefPoint(e.latlng.lat, e.latlng.lon);
        },
    });*/

    return position === null ? null : (
        <Marker eventHandlers={{
            click: (e) => {
                props.editRefPoint(props.latitude, props.longitude);
            },
          }} position={[props.latitude, props.longitude]} icon={new Icon({ iconUrl: markerIconRed, iconSize: [20, 31], iconAnchor: [10, 31] })} >
        </Marker >
    )
}
function AddPoint(props) {
    const map = useMapEvents({
        click(e) {
            props.addPoint(e.latlng.lat, e.latlng.lng)
        }
    })
    
    return null
  }


/**
 * 
 * @param {Object} props.position an object with "lat" and "lng" properties
 * @param {Object} props.height the height of the map which should be defined as a string: 'value px' 
 * @param {Object} props.width the width of the map which should be defined as a string: 'value px' 
 */
function RefPointMapLocator(props) {
    
    const { position, setPosition, radius, height, width, initialLat, initialLng, zoomLevel, points, refpoints, addRefPoints, editRefPoint} = props;
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
            <Polyline
	            pathOptions={{ color: 'blue' }}
	            positions={points}
            />
            <AddPoint addPoint={addRefPoints}/>
            {/* Map Elements */}
            {/*<LocationMarker position={position} setPosition={setPosition} radius={radius}/>*/}
            {refpoints ? 
            refpoints.map(a=>{
            return <RefPointMarker key={a.latitude+"."+a.longitude} latitude={a.latitude} longitude={a.longitude} editRefPoint={editRefPoint}/> })
             : <></>}
        </MapContainer>
    )
}

export default RefPointMapLocator