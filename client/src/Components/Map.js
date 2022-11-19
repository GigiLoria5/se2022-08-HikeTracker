import { useEffect } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/////////////////////////////////////////////////////////////////////
//////           THIS COMPONENT WILL BE DELETED                //////
/////////////////////////////////////////////////////////////////////


/**
 *  TO TRY WITH A GPX PARSED FROM BACKEND
 *  
 *  props.gpx is a gpx file already parsed (with a xml parser or a gpx parser) in the backend,
 *  since in the frontend it doesn't work.
 * 
 *  I tried with simple files transcripted as string, and it worked. But usually gpx files are very very long...
 * 
 */
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

  //while there is not an api to retrieve a gpx-parsed file
  const positions = [
    [40.689818841705, -74.04511194542516],
    [40.75853187779803, -73.98495720388513],
    [40.86151538060051, -74.06201170384256],
    [40.80981015620906, -74.03656769139772],
    [40.80721155324825, -74.04274750092904],
    [40.78901848327006, -74.081199649124],
    [40.764319913561216, -74.08840942691056],
    [40.749756455072884, -74.09493255919364],
    [40.74793579843903, -74.07673645335137],
    [40.675849802727335, -74.19758606169779],
    [40.60394644123212, -74.05991363796608],
    [40.6495463256113, -73.96000671720954],
  ]

  if (props.gpx.tracks)
    positions = props.gpx.tracks[0].points.map(p => [p.lat, p.lon]);

  return (
    <>
      <MapContainer
        // for simplicty set center to first gpx point
        center={positions[0]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "70vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          pathOptions={{ fillColor: 'red', color: 'blue' }}
          positions={positions}
        />

        <Marker position={positions[0]}>
          <Popup>
            Start point
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

