import { useMemo, useState } from "react";
import {
  INCIDENTS,
  INCIDENT_TYPES,
  DIFFERENTIATION_LEVELS,
  DIFFERENTIATION_UNCODED,
  INTERPRETATION_STATUS,
  INTERPRETATION_UNCODED,
  getDistinguishability,
  getAuthorityHolderColorMap,
  getAuthorityDistribution,
} from "../data/incidents";
import IncidentModal from "./IncidentModal";
import OrbitalGlobe from "./globe/OrbitalGlobe";

export default function GlobeSection() {
  const [selected, setSelected] = useState(null);
  // Map layer: "type" (default) | "differentiation" | "interpretation".
  const [layer, setLayer] = useState("type");
  // Differentiation-only filter: isolate low-distinguishability incidents.
  const [lowOnly, setLowOnly] = useState(false);
  // Interpretation secondary view: "status" (default) | "authority".
  const [interpView, setInterpView] = useState("status");

  const differentiationLayer = layer === "differentiation";
  const interpretationLayer  = layer === "interpretation";

  const visibleIncidents = useMemo(() => {
    if (!differentiationLayer || !lowOnly) return INCIDENTS;
    return INCIDENTS.filter((inc) => getDistinguishability(inc) === "low");
  }, [differentiationLayer, lowOnly]);

  const authorityColorMap = useMemo(
    () => getAuthorityHolderColorMap(INCIDENTS),
    []
  );
  const authorityDistribution = useMemo(
    () => getAuthorityDistribution(INCIDENTS),
    []
  );

  const colorBy = differentiationLayer
    ? "differentiation"
    : interpretationLayer
      ? interpView === "authority"
        ? "interpretation-authority"
        : "interpretation-status"
      : "type";

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

        {/* Layer control */}
        <div className="globe-layer-controls reveal">
          <span className="globe-layer-label">Map layer</span>
          <div className="filter-group">
            <button
              className={`filter-pill ${layer === "type" ? "filter-pill--active" : ""}`}
              onClick={() => setLayer("type")}
            >
              Incident Type
            </button>
            <button
              className={`filter-pill ${differentiationLayer ? "filter-pill--active" : ""}`}
              style={differentiationLayer ? { "--pill-color": DIFFERENTIATION_LEVELS.low.color } : {}}
              onClick={() => setLayer("differentiation")}
            >
              Differentiation
            </button>
            <button
              className={`filter-pill ${interpretationLayer ? "filter-pill--active" : ""}`}
              style={interpretationLayer ? { "--pill-color": INTERPRETATION_STATUS.contested.color } : {}}
              onClick={() => setLayer("interpretation")}
            >
              Interpretive Authority
            </button>
          </div>

          {differentiationLayer && (
            <button
              className={`filter-pill ${lowOnly ? "filter-pill--active" : ""}`}
              style={lowOnly ? { "--pill-color": DIFFERENTIATION_LEVELS.low.color } : {}}
              onClick={() => setLowOnly((v) => !v)}
            >
              {lowOnly ? "✓ Low distinguishability only" : "Isolate low distinguishability"}
            </button>
          )}

          {interpretationLayer && (
            <div className="filter-group">
              <button
                className={`filter-pill ${interpView === "status" ? "filter-pill--active" : ""}`}
                style={interpView === "status" ? { "--pill-color": INTERPRETATION_STATUS.contested.color } : {}}
                onClick={() => setInterpView("status")}
              >
                By status
              </button>
              <button
                className={`filter-pill ${interpView === "authority" ? "filter-pill--active" : ""}`}
                style={interpView === "authority" ? { "--pill-color": INTERPRETATION_STATUS.unresolved.color } : {}}
                onClick={() => setInterpView("authority")}
              >
                By authority holder
              </button>
            </div>
          )}
        </div>

        <div className="globe-layout">
          {/* Globe */}
          <div className="globe-container reveal">
            <OrbitalGlobe
              key={layer}
              incidents={visibleIncidents}
              onIncidentClick={setSelected}
              colorBy={colorBy}
              authorityColorMap={authorityColorMap}
            />

            {/* Legend */}
            {interpretationLayer ? (
              <div className="globe-legend globe-legend--differentiation">
                {interpView === "authority" ? (
                  <>
                    {authorityDistribution.holders.map(({ actor }) => (
                      <div key={actor} className="globe-legend-item">
                        <div
                          className="globe-legend-dot"
                          style={{ background: authorityColorMap[actor], color: authorityColorMap[actor] }}
                        />
                        {actor}
                      </div>
                    ))}
                    <div className="globe-legend-item">
                      <div className="globe-legend-dot" style={{ background: "#64748b", color: "#64748b" }} />
                      Contested / unresolved
                    </div>
                  </>
                ) : (
                  Object.entries(INTERPRETATION_STATUS).map(([key, def]) => (
                    <div key={key} className="globe-legend-item">
                      <div
                        className="globe-legend-dot"
                        style={{ background: def.color, color: def.color }}
                      />
                      {def.label}
                    </div>
                  ))
                )}
                <div className="globe-legend-item">
                  <div
                    className="globe-legend-dot globe-legend-dot--uncoded"
                    style={{ color: INTERPRETATION_UNCODED.color }}
                  />
                  {INTERPRETATION_UNCODED.label}
                </div>
                <p className="globe-legend-note">
                  Where one framing prevails without a settled definition,
                  <strong> interpretive authority has been allocated to that actor</strong>.
                </p>
              </div>
            ) : differentiationLayer ? (
              <div className="globe-legend globe-legend--differentiation">
                {Object.entries(DIFFERENTIATION_LEVELS).map(([key, def]) => (
                  <div key={key} className="globe-legend-item">
                    <div
                      className="globe-legend-dot"
                      style={{ background: def.color, color: def.color }}
                    />
                    {def.label}
                  </div>
                ))}
                <div className="globe-legend-item">
                  <div
                    className="globe-legend-dot globe-legend-dot--uncoded"
                    style={{ color: DIFFERENTIATION_UNCODED.color }}
                  />
                  {DIFFERENTIATION_UNCODED.label}
                </div>
                <p className="globe-legend-note">
                  Lower distinguishability = <strong>higher security dilemma intensity</strong>.
                  Hot end = offensive intent is indistinguishable from benign intent.
                </p>
              </div>
            ) : (
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
            )}
          </div>

          {/* Side panel */}
          <div className="globe-side reveal">
            {interpretationLayer ? (
              <div className="glass" style={{ padding: "24px" }}>
                <p className="section-label">Distribution</p>
                <p className="globe-panel-title">Interpretive Authority</p>
                <p className="globe-panel-desc">
                  Incidents where each actor's framing prevailed — the
                  distribution of framing power across the coded dataset.
                </p>

                <div className="authority-dist">
                  {authorityDistribution.holders.map(({ actor, count }) => (
                    <div key={actor} className="authority-dist-row">
                      <span className="authority-dist-actor">
                        <span
                          className="authority-dist-dot"
                          style={{ background: authorityColorMap[actor] }}
                        />
                        {actor}
                      </span>
                      <span className="authority-dist-count">{count}</span>
                    </div>
                  ))}
                  <div className="authority-dist-row authority-dist-row--muted">
                    <span className="authority-dist-actor">
                      <span className="authority-dist-dot" style={{ background: "#64748b" }} />
                      Contested / unresolved
                    </span>
                    <span className="authority-dist-count">
                      {authorityDistribution.contestedOrUnresolved}
                    </span>
                  </div>
                </div>

                {authorityDistribution.holders.length === 0 &&
                  authorityDistribution.contestedOrUnresolved === 0 && (
                    <p className="globe-hint">No incidents coded for interpretive authority yet.</p>
                  )}

                <p style={{ marginTop: 20, fontSize: 11, color: "var(--text-muted)" }}>
                  Real incidents are deliberately left uncoded; ILLUSTRATIVE
                  samples render the layer.
                </p>
              </div>
            ) : (
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
                  {visibleIncidents.length} incidents plotted ·{" "}
                  {INCIDENTS.filter((i) => i.salamiTactic).length} classified as
                  salami tactics
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <IncidentModal incident={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
