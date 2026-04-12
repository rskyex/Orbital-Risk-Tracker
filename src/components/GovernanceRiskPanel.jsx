import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { GOVERNANCE_METHODOLOGY, REGIME_GOVERNANCE_SCORES, CONSTELLATION_GOVERNANCE_SCORES } from "../data/governance";
import { ORBITAL_REGIMES } from "../data/debrisDensity";

function getScoreColor(score) {
  if (score <= 33) return "#10b981";
  if (score <= 66) return "#f59e0b";
  return "#ef4444";
}

function ScoreGauge({ score, size = 80 }) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 40 40)" style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 800, color }}>{score}</span>
        <span style={{ fontSize: 8, color: "var(--text-muted)" }}>/100</span>
      </div>
    </div>
  );
}

function MethodologyTooltip({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="methodology-tooltip-overlay" onClick={onClose}>
      <div className="methodology-tooltip-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>x</button>
        <h3 style={{ color: "var(--cyan)", marginBottom: 12 }}>{GOVERNANCE_METHODOLOGY.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.7 }}>
          {GOVERNANCE_METHODOLOGY.description}
        </p>
        {GOVERNANCE_METHODOLOGY.components.map((c) => (
          <div key={c.id} style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8, borderLeft: "3px solid var(--cyan)" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-primary)", marginBottom: 4 }}>
              {c.label} <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: 11 }}>({(c.weight * 100)}% weight)</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{c.description}</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>{c.scale}</p>
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {GOVERNANCE_METHODOLOGY.colorScale.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />
              <span style={{ color: s.color }}>{s.min}–{s.max}: {s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GovernanceRiskPanel() {
  const [view, setView] = useState("regime");
  const [selected, setSelected] = useState(REGIME_GOVERNANCE_SCORES[0]);
  const [showMethodology, setShowMethodology] = useState(false);

  const radarData = selected
    ? GOVERNANCE_METHODOLOGY.components.map((c) => ({
        axis: c.label.split(" ")[0],
        value: selected.components[c.id],
        full: 100,
      }))
    : [];

  const exportJSON = () => {
    const data = { REGIME_GOVERNANCE_SCORES, CONSTELLATION_GOVERNANCE_SCORES, GOVERNANCE_METHODOLOGY };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "governance_risk_scores.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="data-layer-panel glass reveal" id="governance-risk">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Governance Assessment</p>
          <h3 className="data-layer-title">Governance Risk Score</h3>
          <p className="data-layer-desc">
            Composite 0–100 index measuring governance deficit relative to risk.
            Higher scores indicate greater governance gaps.{" "}
            <button className="inline-link-btn" onClick={() => setShowMethodology(true)}>
              View methodology
            </button>
          </p>
        </div>
        <button className="export-btn" onClick={exportJSON}>Export JSON</button>
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={`regime-toggle ${view === "regime" ? "regime-toggle--active" : ""}`} onClick={() => { setView("regime"); setSelected(REGIME_GOVERNANCE_SCORES[0]); }}>
          By Orbital Regime
        </button>
        <button className={`regime-toggle ${view === "constellation" ? "regime-toggle--active" : ""}`} onClick={() => { setView("constellation"); setSelected(CONSTELLATION_GOVERNANCE_SCORES[0]); }}>
          By Constellation
        </button>
      </div>

      <div className="governance-layout">
        {/* Selector */}
        <div className="governance-selector">
          {(view === "regime" ? REGIME_GOVERNANCE_SCORES : CONSTELLATION_GOVERNANCE_SCORES).map((item) => {
            const key = view === "regime" ? item.regime : item.constellation;
            const score = view === "regime" ? item.overallScore : item.score;
            const isActive = selected === item;
            const color = getScoreColor(score);
            return (
              <button
                key={key}
                className={`governance-select-btn ${isActive ? "governance-select-btn--active" : ""}`}
                style={isActive ? { borderColor: color + "66" } : {}}
                onClick={() => setSelected(item)}
              >
                <span style={{ fontWeight: 600, color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}>{key}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color }}>{score}</span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="governance-detail">
          {selected && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
                <ScoreGauge score={view === "regime" ? selected.overallScore : selected.score} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 16, color: "var(--text-primary)" }}>
                    {view === "regime" ? selected.regime : selected.constellation}
                  </h4>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: getScoreColor(view === "regime" ? selected.overallScore : selected.score) }}>
                    {(view === "regime" ? selected.overallScore : selected.score) <= 33 ? "Low Governance Risk" : (view === "regime" ? selected.overallScore : selected.score) <= 66 ? "Moderate Governance Risk" : "High Governance Risk"}
                  </p>
                </div>
              </div>

              {/* Component scores */}
              <div className="governance-components">
                {GOVERNANCE_METHODOLOGY.components.map((c) => {
                  const val = selected.components[c.id];
                  return (
                    <div key={c.id} className="governance-component-row">
                      <span style={{ fontSize: 12, color: "var(--text-secondary)", flex: 1 }}>{c.label}</span>
                      <div style={{ flex: 2, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                        <div style={{ width: `${val}%`, height: "100%", background: getScoreColor(val), borderRadius: 3, transition: "width 0.4s ease" }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: getScoreColor(val), width: 32, textAlign: "right" }}>{val}</span>
                    </div>
                  );
                })}
              </div>

              {/* Radar chart */}
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
                  <Radar dataKey="value" stroke={getScoreColor(view === "regime" ? selected.overallScore : selected.score)} fill={getScoreColor(view === "regime" ? selected.overallScore : selected.score)} fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}/100`]} />
                </RadarChart>
              </ResponsiveContainer>

              {/* Analyst note */}
              <div className="analyst-note-card">
                <span className="analyst-note-icon">ANALYST NOTE</span>
                <p>{selected.analystNote || selected.note}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <MethodologyTooltip show={showMethodology} onClose={() => setShowMethodology(false)} />
    </div>
  );
}
