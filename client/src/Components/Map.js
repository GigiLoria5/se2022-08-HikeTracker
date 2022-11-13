import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


export default function Map() {

    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    const position = [45.06968, 7.70493];

    const outerBounds = [
        [50.505, -29.09],
        [52.505, 29.09],
    ];
    /*
          return (
            <Map center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </Map>
          );
    
    */

    return (
        <>

            {/** */}
            <MapContainer center={position} zoom={11} scrollWheelZoom={false} style={{ height: "50vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            {/**/}



        </>
    )
}
