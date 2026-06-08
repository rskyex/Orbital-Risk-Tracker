import { useEffect, useRef, useState, Suspense, lazy } from "react";
import {
  INCIDENT_TYPES,
  getTypeColor,
  getDistinguishabilityColor,
  getInterpretationStatusColor,
  getAuthorityHolderColor,
} from "../../data/incidents";

// Lazy-load so Vite can code-split the heavy Three.js bundle
const Globe = lazy(() => import("react-globe.gl"));

const NIGHT_TEXTURE   = "//unpkg.com/three-globe/example/img/earth-night.jpg";
const WATER_TEXTURE   = "//unpkg.com/three-globe/example/img/earth-water.png";

export default function OrbitalGlobe({
  incidents,
  onIncidentClick,
  colorBy = "type",
  authorityColorMap = {},
}) {
  const globeRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [ready, setReady]   = useState(false);

  // Point/ring colour resolves by the active layer: incident type (default),
  // offense–defense distinguishability, interpretation status, or the actor
  // holding interpretive authority.
  const colorFor = (d) => {
    switch (colorBy) {
      case "differentiation":          return getDistinguishabilityColor(d);
      case "interpretation-status":    return getInterpretationStatusColor(d);
      case "interpretation-authority": return getAuthorityHolderColor(d, authorityColorMap);
      default:                         return getTypeColor(d.type);
    }
  };

  // Auto-rotate
  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    globeRef.current.pointOfView({ altitude: 2.2 }, 0);
  }, [ready]);

  // Stop rotation on hover
  const handlePointHover = (point) => {
    setHovered(point);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !point;
    }
  };

  // Rings data = incidents as pulsing rings
  const ringsData = incidents.map((inc) => ({
    ...inc,
    lat: inc.latitude,
    lng: inc.longitude,
    maxR: inc.severity === "critical" ? 4 : inc.severity === "high" ? 3 : 2,
    propagationSpeed: 1.5,
    repeatPeriod: 700 + Math.random() * 400,
  }));

  return (
    <Suspense
      fallback={
        <div className="globe-loading">
          <div className="globe-spinner" />
          <span>Initialising globe…</span>
        </div>
      }
    >
      <Globe
        ref={globeRef}
        width={undefined}
        height={560}
        // Textures
        globeImageUrl={NIGHT_TEXTURE}
        bumpImageUrl={WATER_TEXTURE}
        // Atmosphere
        atmosphereColor="#2255cc"
        atmosphereAltitude={0.22}
        // Background
        backgroundColor="rgba(0,0,0,0)"
        // Points
        pointsData={incidents}
        pointLat="latitude"
        pointLng="longitude"
        pointColor={(d) => colorFor(d)}
        pointRadius={(d) => (d.severity === "critical" ? 0.7 : d.severity === "high" ? 0.55 : 0.4)}
        pointAltitude={0.015}
        pointLabel={() => ""}
        onPointClick={(point) => onIncidentClick(point)}
        onPointHover={handlePointHover}
        // Rings (pulse effect)
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d) => (t) => {
          const color = colorFor(d);
          const hex = color.replace("#", "");
          const r = parseInt(hex.slice(0,2),16);
          const g = parseInt(hex.slice(2,4),16);
          const b = parseInt(hex.slice(4,6),16);
          return `rgba(${r},${g},${b},${Math.max(0, 1 - t)})`;
        }}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        onGlobeReady={() => setReady(true)}
      />

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="globe-hover-card"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            maxWidth: 260,
            pointerEvents: "none",
          }}
        >
          <div
            className="globe-hover-card-type"
            style={{ color: getTypeColor(hovered.type) }}
          >
            {INCIDENT_TYPES[hovered.type]?.label}
          </div>
          <div className="globe-hover-card-title">{hovered.title}</div>
          <div className="globe-hover-card-meta">
            {hovered.actor} · {hovered.year} · Click for details
          </div>
        </div>
      )}
    </Suspense>
  );
}
