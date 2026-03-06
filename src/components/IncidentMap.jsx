import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TYPE_COLORS, TYPE_LABELS } from "../data/incidents";

export default function IncidentMap({ incidents, selected, onSelect }) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[20, 30]}
        zoom={2}
        minZoom={1}
        maxZoom={6}
        style={{ height: "100%", width: "100%", background: "#0d1117" }}
        worldCopyJump={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
        />
        {incidents.map((inc) => {
          const isSelected = selected?.id === inc.id;
          return (
            <CircleMarker
              key={inc.id}
              center={[inc.lat, inc.lng]}
              radius={isSelected ? 16 : 11}
              pathOptions={{
                color: TYPE_COLORS[inc.type],
                fillColor: TYPE_COLORS[inc.type],
                fillOpacity: isSelected ? 0.9 : 0.55,
                weight: isSelected ? 3 : 1.5,
              }}
              eventHandlers={{ click: () => onSelect(inc) }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                <div style={{ fontSize: 12 }}>
                  <strong>{inc.title}</strong>
                  <br />
                  {inc.actor} · {new Date(inc.date).getFullYear()}
                  <br />
                  <span style={{ color: TYPE_COLORS[inc.type] }}>
                    {TYPE_LABELS[inc.type]}
                  </span>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
