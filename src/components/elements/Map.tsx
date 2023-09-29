import React from 'react'
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
export const Map: React.FC = () => {
    const position: [number, number] = [51.505, -0.09];
    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>,
        </div>
    )
}
export default Map;