import { useState, Suspense, lazy, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { INCIDENTS, INCIDENT_TYPES, getTypeColor } from "../data/incidents";
import StarField from "./StarField";

const Globe = lazy(() => import("react-globe.gl"));

const NIGHT_TEXTURE = "//unpkg.com/three-globe/example/img/earth-night.jpg";

// Works with HashRouter — no hash-in-hash problem
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Info panel shown inside the globe area after clicking a pin
function GlobeInfoPanel({ incident, onClose }) {
  if (!incident) {
    return (
      <div className="globe-info-panel globe-info-panel--empty">
        <span className="globe-info-empty-icon">🛰</span>
        <span>Click a glowing marker to inspect the incident</span>
      </div>
    );
  }

  const typeColor = getTypeColor(incident.type);
  const typeMeta  = INCIDENT_TYPES[incident.type] || {};
  const riskIndex = (
    ((5 - incident.legibility) + incident.reversibility + incident.escalation) / 3
  ).toFixed(1);

  return (
    <div className="globe-info-panel" style={{ borderColor: typeColor + "66" }}>
      <button className="globe-info-close" onClick={onClose} aria-label="Close">×</button>

      <div className="globe-info-type" style={{ color: typeColor }}>
        <span className="globe-info-type-dot" style={{ background: typeColor }} />
        {typeMeta.label} · {incident.year}
      </div>

      <div className="globe-info-title">{incident.title}</div>

      <div className="globe-info-meta">
        <span>{incident.actor}</span>
        <span className="globe-info-sep">·</span>
        <span>{incident.orbit || incident.domain}</span>
        <span className="globe-info-sep">·</span>
        <span style={{ color: typeColor }}>Risk {riskIndex} / 5</span>
      </div>

      <p className="globe-info-summary">
        {incident.summary.slice(0, 180)}
        {incident.summary.length > 180 ? "…" : ""}
      </p>

      <Link to={`/incidents/${incident.id}`} className="globe-info-link">
        Full incident profile →
      </Link>
    </div>
  );
}

// Onboarding hint — pulses for 6 s then fades
function OnboardHint({ visible }) {
  return (
    <div className={`globe-onboard-hint ${visible ? "" : "globe-onboard-hint--hidden"}`}>
      <span className="globe-onboard-pulse" />
      Click any glowing marker to inspect the incident
    </div>
  );
}

export default function Hero() {
  const globeRef     = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady]       = useState(false);
  const [hovered, setHovered]   = useState(null);
  const [selected, setSelected] = useState(null);
  const [size, setSize]         = useState({ w: 700, h: 700 });
  const [showHint, setShowHint] = useState(true);

  // Measure container for explicit globe sizing
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-rotate after globe ready
  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate      = true;
    ctrl.autoRotateSpeed = 0.35;
    ctrl.enableZoom      = true;
    globeRef.current.pointOfView({ altitude: 2.0 }, 0);
  }, [ready]);

  // Dismiss onboard hint after 6 s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const ringsData = INCIDENTS.map((inc) => ({
    ...inc,
    lat: inc.latitude,
    lng: inc.longitude,
    maxR: inc.severity === "critical" ? 4.5 : inc.severity === "high" ? 3 : 2,
    propagationSpeed: 1.2,
    repeatPeriod: 800 + (inc.id * 137) % 500,
  }));

  const handleHover = (point) => {
    setHovered(point);
    // Pause rotation on hover so user can aim
    if (globeRef.current) globeRef.current.controls().autoRotate = !point;
  };

  const handleClick = (point) => {
    setSelected(point);
    setShowHint(false);
    if (globeRef.current) globeRef.current.controls().autoRotate = false;
  };

  return (
    <section className="hero-v2" id="hero">
      <div className="hero-v2-bg" />
      <StarField className="hero-v2-stars" />

      <div className="hero-v2-layout">
        {/* ── Left: text + CTA ── */}
        <div className="hero-v2-text">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Space Security Intelligence Platform
          </div>

          <h1 className="hero-v2-title">
            Orbital<br />
            <span className="hero-title-accent">Risk</span><br />
            Tracker
          </h1>

          <p className="hero-v2-desc">
            Mapping real-world space security incidents across
            orbit, cyberspace, and the electromagnetic spectrum.
          </p>

          <div className="hero-v2-cta">
            {/* button + JS scroll = HashRouter-safe */}
            <button
              className="btn-primary"
              onClick={() => scrollToSection("explorer")}
            >
              Explore Incidents ↓
            </button>
            <Link className="btn-secondary" to="/radar">
              Jervis Radar →
            </Link>
          </div>

          {/* Incident-type legend */}
          <div className="hero-v2-legend">
            {Object.entries(INCIDENT_TYPES).map(([key, def]) => (
              <div key={key} className="hero-legend-item">
                <span
                  className="hero-legend-dot"
                  style={{ background: def.color, boxShadow: `0 0 6px ${def.color}` }}
                />
                <span>{def.label}</span>
              </div>
            ))}
          </div>

          <p className="hero-framework-note">
            Jervis (1978) · Salami Tactics · Weaponized Interdependence
          </p>
        </div>

        {/* ── Right: 3D globe ── */}
        <div className="hero-v2-globe" ref={containerRef}>
          <Suspense
            fallback={
              <div className="globe-loading">
                <div className="globe-spinner" />
                <span>Loading globe…</span>
              </div>
            }
          >
            <Globe
              ref={globeRef}
              width={size.w}
              height={size.h}
              globeImageUrl={NIGHT_TEXTURE}
              backgroundColor="rgba(0,0,0,0)"
              atmosphereColor="#1a4abb"
              atmosphereAltitude={0.28}
              pointsData={INCIDENTS}
              pointLat="latitude"
              pointLng="longitude"
              pointColor={(d) =>
                selected?.id === d.id ? "#ffffff" : getTypeColor(d.type)
              }
              pointRadius={(d) =>
                selected?.id === d.id
                  ? 1.0
                  : hovered?.id === d.id
                  ? 0.8
                  : d.severity === "critical" ? 0.75 : d.severity === "high" ? 0.55 : 0.4
              }
              pointAltitude={0.015}
              pointLabel={() => ""}
              onPointClick={handleClick}
              onPointHover={handleHover}
              ringsData={ringsData}
              ringLat="lat"
              ringLng="lng"
              ringColor={(d) => (t) => {
                const c = getTypeColor(d.type);
                const h = c.replace("#", "");
                const r = parseInt(h.slice(0, 2), 16);
                const g = parseInt(h.slice(2, 4), 16);
                const b = parseInt(h.slice(4, 6), 16);
                return `rgba(${r},${g},${b},${Math.max(0, 1 - t)})`;
              }}
              ringMaxRadius="maxR"
              ringPropagationSpeed="propagationSpeed"
              ringRepeatPeriod="repeatPeriod"
              onGlobeReady={() => setReady(true)}
            />
          </Suspense>

          {/* Lightweight hover badge (only when nothing selected) */}
          {hovered && !selected && (
            <div
              className="globe-hover-badge"
              style={{ borderColor: getTypeColor(hovered.type) + "77" }}
            >
              <span style={{ color: getTypeColor(hovered.type) }}>
                {INCIDENT_TYPES[hovered.type]?.label}
              </span>
              {" · "}
              <strong>{hovered.title}</strong>
              {" · "}
              <span style={{ opacity: 0.6 }}>{hovered.actor}, {hovered.year}</span>
            </div>
          )}

          {/* Onboarding callout — auto-hides after 6 s or first click */}
          <OnboardHint visible={showHint && !selected} />

          {/* Persistent micro-instruction */}
          <div className="globe-micro-instruction">
            ↑ Click glowing markers to inspect incidents
          </div>

          {/* Click-result info panel (or empty-state prompt) */}
          <GlobeInfoPanel incident={selected} onClose={() => setSelected(null)} />

          {/* Scroll cue */}
          <div className="hero-scroll-hint">
            <div className="scroll-hint-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
