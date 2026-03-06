import { useState } from "react";
import { INCIDENTS, INCIDENT_TYPES, getTypeColor } from "../data/incidents";
import IncidentModal from "./IncidentModal";
import OrbitalGlobe from "./globe/OrbitalGlobe";

export default function GlobeSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="globe-section" id="globe">
      <div className="section-container">
        {/* Header */}
        <div className="section-header reveal">
          <p className="section-label">Live Intelligence View</p>
          <h2 className="section-title">
            3D Orbital Incident Map
          </h2>
          <p className="section-subtitle">
            Incidents plotted at their operational geography. Pulse rings
            scale with severity. Click any marker to open the full intelligence
            record.
          </p>
        </div>

        <div className="globe-layout">
          {/* Globe */}
          <div className="globe-container reveal">
            <OrbitalGlobe
              incidents={INCIDENTS}
              onIncidentClick={setSelected}
            />

            {/* Legend */}
            <div className="globe-legend">
              {Object.entries(INCIDENT_TYPES).map(([key, def]) => (
                <div key={key} className="globe-legend-item">
                  <div
                    className="globe-legend-dot"
                    style={{ background: def.color, color: def.color }}
                  />
                  {def.label}
                </div>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="globe-side reveal">
            <div className="glass" style={{ padding: "24px" }}>
              <p className="section-label">How to read this</p>
              <p className="globe-panel-title">Orbital Threat Landscape</p>
              <p className="globe-panel-desc">
                Each incident is colour-coded by type and sized by severity.
                Pulsing rings indicate active or ongoing threat classes.
              </p>

              <p className="globe-hint">
                🖱 Click a marker to view full intelligence record
              </p>
              <p className="globe-hint" style={{ marginTop: 8 }}>
                🌀 Drag to rotate · Scroll to zoom
              </p>

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {INCIDENTS.filter((i) => i.severity === "critical").map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => setSelected(inc)}
                    style={{
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      color: "#fca5a5",
                      fontSize: 12,
                      fontFamily: "var(--font)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 2 }}>
                      ⚡ {inc.title}
                    </div>
                    <div style={{ opacity: 0.7 }}>
                      {inc.actor} · {inc.year} · Critical
                    </div>
                  </button>
                ))}
              </div>

              <p
                style={{
                  marginTop: 20,
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}
              >
                {INCIDENTS.length} incidents plotted ·{" "}
                {INCIDENTS.filter((i) => i.salamiTactic).length} classified as
                salami tactics
              </p>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <IncidentModal incident={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
