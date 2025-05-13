import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

type Props = {
  height?: string;
  width?: string;
  className?: string;
  zoom?: number;
};

const VillageMap = ({ height, width, className, zoom }: Props) => {
  const [geoData, setGeoData] = useState(null);
  const center: LatLngExpression = [-6.53028, 106.824309];
  

  useEffect(() => {
    fetch('/data/cimandalaVillageMap.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <div style={{ height, width ,}}>
      <MapContainer
        className={className}
        center={center}
        zoom={zoom ?? 14}
        style={{ height: '100%', width: '100%' }}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        boxZoom={false}
        keyboard={false}
        touchZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        {
          geoData && 
          <GeoJSON 
            data={geoData} 
            style={() =>({
              weight: 2,
              color: '#5DC37F',
              fillOpacity: 0.3
            })}
          />
        }
      </MapContainer>
    </div>
  );
};

export default VillageMap;
