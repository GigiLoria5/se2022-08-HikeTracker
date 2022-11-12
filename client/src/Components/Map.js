import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { MapContainer, Polygon, Polyline, TileLayer, FeatureGroup } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

import { Point, Trail, coordArray } from './Utils';

//test
const p1 = new Point("P1", 45.06968, 7.70493);
const p2 = new Point("P2", 45.05942, 7.80493);
const p3 = new Point("P3", 45.06988, 7.90493);
const p4 = new Point("P4", 45.06968, 7.70493);

const trail = new Trail(p1, p4, [p2, p3]);

export default function Map(props) {

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

  //const positions = [[45.06968, 7.70493], [45.05942, 7.80493], [45.06988, 7.90493], [45.06968, 7.70493]];
  const positions = [[45.06968, 7.70493], [45.05942, 7.80493]];

  return (
    <>

      {/** */}
      <MapContainer center={position} zoom={11} scrollWheelZoom={false} style={{ height: "50vh" }}>
        
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <FeatureGroup>
          {positions?.map((mark, i) => (
            <Marker key={i} position={mark}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          ))}

          <Polyline positions={positions} color="red" />
        </FeatureGroup>


        <Polygon color="red" positions={positions} />

        <Marker position={p2.coord}>
          <Popup>
            {p2.label}
          </Popup>
        </Marker>

        <Marker position={p3.coord}>
          <Popup>
            {p3.label}
          </Popup>
        </Marker>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>
      {/**/}



    </>
  )
}
