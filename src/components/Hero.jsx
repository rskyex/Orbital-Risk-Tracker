import { useState, Suspense, lazy, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { INCIDENTS, INCIDENT_TYPES, getTypeColor } from "../data/incidents";
import StarField from "./StarField";
import IncidentModal from "./IncidentModal";

const Globe = lazy(() => import("react-globe.gl"));

const NIGHT_TEXTURE = "//unpkg.com/three-globe/example/img/earth-night.jpg";

export default function Hero() {
  const globeRef    = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady]     = useState(false);
  const [hovered, setHovered] = useState(null);
  const [modal, setModal]     = useState(null);
  const [size, setSize]       = useState({ w: 700, h: 700 });

  // Measure container for globe sizing
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setSize({ w: offsetWidth, h: offsetHeight });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-rotate + initial altitude
  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = true;
    globeRef.current.pointOfView({ altitude: 2.0 }, 0);
  }, [ready]);

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
    if (globeRef.current) globeRef.current.controls().autoRotate = !point;
  };

  return (
    <section className="hero-v2" id="hero">
      {/* Deep-space background */}
      <div className="hero-v2-bg" />
      <StarField className="hero-v2-stars" />

      {/* ── Grid layout: left text · right globe ── */}
      <div className="hero-v2-layout">
        {/* Left — text + CTA */}
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
            <a className="btn-primary" href="#explorer">
              Explore Incidents
            </a>
            <Link className="btn-secondary" to="/radar">
              Jervis Radar →
            </Link>
          </div>

          {/* Mini type legend */}
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

        {/* Right — 3D globe */}
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
              pointColor={(d) => getTypeColor(d.type)}
              pointRadius={(d) =>
                d.severity === "critical" ? 0.75 : d.severity === "high" ? 0.55 : 0.4
              }
              pointAltitude={0.015}
              pointLabel={() => ""}
              onPointClick={(p) => setModal(p)}
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

          {/* Hover tooltip overlay */}
          {hovered && (
            <div className="hero-globe-tooltip">
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

          {/* Scroll hint */}
          <div className="hero-scroll-hint">
            <div className="scroll-hint-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      {modal && <IncidentModal incident={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
