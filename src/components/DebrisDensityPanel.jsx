import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, AreaChart, Area,
} from "recharts";
import { ORBITAL_REGIMES, DEBRIS_DENSITY_DATA, DEBRIS_ALTITUDE_BANDS } from "../data/debrisDensity";

function getRiskColor(level) {
  if (level === "critical") return "#ef4444";
  if (level === "high") return "#f59e0b";
  if (level === "medium") return "#4488ff";
  return "#10b981";
}

export default function DebrisDensityPanel() {
  const [activeRegime, setActiveRegime] = useState("LEO");
  const [showAltitude, setShowAltitude] = useState(false);

  const regime = DEBRIS_DENSITY_DATA.find((d) => d.regime === activeRegime);
  const regimeMeta = ORBITAL_REGIMES[activeRegime];

  const barData = DEBRIS_DENSITY_DATA.map((d) => ({
    regime: d.regime,
    tracked: d.trackedObjects,
    risk: d.riskScore,
    color: ORBITAL_REGIMES[d.regime]?.color || "#4488ff",
  }));

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ DEBRIS_DENSITY_DATA, DEBRIS_ALTITUDE_BANDS }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "debris_density_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="data-layer-panel glass reveal" id="debris-density">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Data Layer</p>
          <h3 className="data-layer-title">Debris Density by Orbital Regime</h3>
          <p className="data-layer-desc">
            Tracked object counts and collision probability indices across five orbital
            regimes. Source pattern: Space-Track.org TLE catalogue, NASA ODPO, ESA Space
            Debris Office.
          </p>
        </div>
        <button className="export-btn" onClick={exportJSON} title="Export as JSON">
          Export JSON
        </button>
      </div>

      {/* Regime toggles */}
      <div className="regime-toggles">
        {Object.entries(ORBITAL_REGIMES).map(([id, meta]) => (
          <button
            key={id}
            className={`regime-toggle ${activeRegime === id ? "regime-toggle--active" : ""}`}
            style={activeRegime === id ? { borderColor: meta.color, color: meta.color } : {}}
            onClick={() => setActiveRegime(id)}
          >
            <span className="regime-toggle-dot" style={{ background: meta.color }} />
            {id}
          </button>
        ))}
      </div>

      {/* Regime detail */}
      {regime && regimeMeta && (
        <div className="regime-detail">
          <div className="regime-detail-header">
            <div>
              <h4 style={{ color: regimeMeta.color, margin: 0, fontSize: 16 }}>
                {regimeMeta.label} ({regimeMeta.altitudeRange})
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 4 }}>
                {regimeMeta.description}
              </p>
            </div>
            <div className="regime-risk-badge" style={{ background: getRiskColor(regime.riskLevel) + "18", color: getRiskColor(regime.riskLevel), borderColor: getRiskColor(regime.riskLevel) + "44" }}>
              Risk: {regime.riskScore}/100
            </div>
          </div>

          <div className="regime-stats-grid">
            <div className="regime-stat">
              <span className="regime-stat-value">{regime.trackedObjects.toLocaleString()}</span>
              <span className="regime-stat-label">Tracked Objects</span>
            </div>
            <div className="regime-stat">
              <span className="regime-stat-value">{regime.estimatedDebris_1to10cm.toLocaleString()}</span>
              <span className="regime-stat-label">Est. 1–10 cm Debris</span>
            </div>
            <div className="regime-stat">
              <span className="regime-stat-value">{regime.yearlyConjunctions_below1km.toLocaleString()}</span>
              <span className="regime-stat-label">Conjunctions/Year (&lt;1 km)</span>
            </div>
            <div className="regime-stat">
              <span className="regime-stat-value">{regime.collisionProbabilityIndex}</span>
              <span className="regime-stat-label">Collision Probability Index</span>
            </div>
          </div>

          {/* Major contributors */}
          {regime.majorContributors.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                Major Debris Contributors
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {regime.majorContributors.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 6, fontSize: 12 }}>
                    <span style={{ color: "var(--text-secondary)" }}>{c.event}</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                      {typeof c.fragments === "number" ? `${c.fragments} frags` : c.fragments}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chart toggle */}
      <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 8 }}>
        <button
          className={`regime-toggle ${!showAltitude ? "regime-toggle--active" : ""}`}
          onClick={() => setShowAltitude(false)}
        >
          By Regime
        </button>
        <button
          className={`regime-toggle ${showAltitude ? "regime-toggle--active" : ""}`}
          onClick={() => setShowAltitude(true)}
        >
          By Altitude
        </button>
      </div>

      {/* Charts */}
      {!showAltitude ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} margin={{ top: 8, right: 8, left: -16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="regime" tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              formatter={(v) => [v.toLocaleString(), "Tracked Objects"]}
            />
            <Bar dataKey="tracked" radius={[4, 4, 0, 0]}>
              {barData.map((d, i) => (
                <Cell key={i} fill={d.color} opacity={d.regime === activeRegime ? 1 : 0.4} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={DEBRIS_ALTITUDE_BANDS} margin={{ top: 8, right: 8, left: -16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="altitude" tick={{ fill: "var(--text-muted)", fontSize: 10 }} label={{ value: "Altitude (km)", fill: "var(--text-muted)", fontSize: 10, position: "insideBottomRight", offset: -4 }} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} label={{ value: "Relative Density", fill: "var(--text-muted)", fontSize: 10, angle: -90, position: "insideLeft" }} />
            <Tooltip
              contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              formatter={(v, _, props) => [v, props.payload.label]}
            />
            <Area type="monotone" dataKey="density" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
