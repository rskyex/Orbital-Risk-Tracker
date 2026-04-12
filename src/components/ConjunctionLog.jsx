import { useState } from "react";
import { CONJUNCTION_EVENTS, CONJUNCTION_SUMMARY } from "../data/conjunctions";

function getSevColor(sev) {
  if (sev === "critical") return "#ef4444";
  if (sev === "high") return "#f59e0b";
  if (sev === "medium") return "#4488ff";
  return "#10b981";
}

export default function ConjunctionLog() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? CONJUNCTION_EVENTS
    : CONJUNCTION_EVENTS.filter((e) => e.severity === filter);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(CONJUNCTION_EVENTS, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conjunction_events.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="data-layer-panel glass reveal" id="conjunction-log">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Data Layer</p>
          <h3 className="data-layer-title">Conjunction Event Log</h3>
          <p className="data-layer-desc">
            Recent close-approach events with collision probability, object pair identification,
            altitude band, and responsible operator. Format mirrors USSPACECOM CDM structure.
          </p>
        </div>
        <button className="export-btn" onClick={exportJSON} title="Export as JSON">
          Export JSON
        </button>
      </div>

      {/* Summary stats */}
      <div className="conjunction-summary">
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value">{CONJUNCTION_SUMMARY.averageDailyAlerts}</span>
          <span className="conjunction-summary-label">Avg. Daily Alerts</span>
        </div>
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value" style={{ color: "#ef4444" }}>
            Pc &gt; {CONJUNCTION_SUMMARY.criticalThreshold}
          </span>
          <span className="conjunction-summary-label">Critical Threshold</span>
        </div>
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value">{CONJUNCTION_SUMMARY.manoeuvresExecutedYTD}</span>
          <span className="conjunction-summary-label">Manoeuvres YTD</span>
        </div>
      </div>

      {/* Severity filter */}
      <div className="filter-group" style={{ marginBottom: 12 }}>
        {["all", "critical", "high", "medium", "low"].map((s) => (
          <button
            key={s}
            className={`filter-pill ${filter === s ? "filter-pill--active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Event table */}
      <div className="conjunction-table-wrap">
        <table className="conjunction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Primary Object</th>
              <th>Secondary Object</th>
              <th>Miss (m)</th>
              <th>Pc</th>
              <th>Band</th>
              <th>Sev.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((evt) => {
              const isExpanded = expanded === evt.id;
              return (
                <tr key={evt.id} className="conjunction-row-group">
                  <td colSpan={7} style={{ padding: 0 }}>
                    <div
                      className={`conjunction-row ${isExpanded ? "conjunction-row--expanded" : ""}`}
                      onClick={() => setExpanded(isExpanded ? null : evt.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="conjunction-row-cells">
                        <span className="conj-cell conj-date">{evt.date}</span>
                        <span className="conj-cell conj-primary">{evt.primaryObject.name}</span>
                        <span className="conj-cell conj-secondary">{evt.secondaryObject.name}</span>
                        <span className="conj-cell conj-miss" style={{ color: evt.missDistance_m < 100 ? "#ef4444" : evt.missDistance_m < 500 ? "#f59e0b" : "var(--text-secondary)" }}>
                          {evt.missDistance_m.toLocaleString()}
                        </span>
                        <span className="conj-cell conj-pc" style={{ color: evt.collisionProbability > 0.01 ? "#ef4444" : "var(--text-secondary)" }}>
                          {evt.collisionProbability.toExponential(2)}
                        </span>
                        <span className="conj-cell conj-band">{evt.altitudeBand}</span>
                        <span className="conj-cell conj-sev">
                          <span className="conj-sev-dot" style={{ background: getSevColor(evt.severity) }} />
                        </span>
                      </div>
                      {isExpanded && (
                        <div className="conjunction-expanded">
                          <div className="conjunction-detail-grid">
                            <div>
                              <strong>Primary:</strong> {evt.primaryObject.name} ({evt.primaryObject.type})<br />
                              Operator: {evt.primaryObject.operator} — {evt.primaryObject.state}
                            </div>
                            <div>
                              <strong>Secondary:</strong> {evt.secondaryObject.name} ({evt.secondaryObject.type})<br />
                              Origin: {evt.secondaryObject.operator} — {evt.secondaryObject.state}
                            </div>
                            <div>
                              <strong>Relative Velocity:</strong> {evt.relativeVelocity_kms} km/s<br />
                              <strong>Regime:</strong> {evt.regime}
                            </div>
                          </div>
                          <div className="analyst-note-inline">
                            <span className="analyst-note-icon">ANALYST NOTE</span>
                            {evt.analystNote}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
