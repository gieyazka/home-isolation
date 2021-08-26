import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = ({lat,lon}) => {
  return (
    <MapContainer
    center={[lat,lon]}
    zoom={16}
    scrollWheelZoom={false}
    style={{ height: "100%", width: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="http://www.powermap.in.th">Power map</a> contributors'
      url="https://maps.powermap.live/api/v2/map/vtile/thailand_th/{z}/{x}/{y}.png?access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
    />
    <Marker position={[lat,lon]}>
      <Popup>
        Your location
      </Popup>
    </Marker>
  </MapContainer>
  );
};

export default Map;