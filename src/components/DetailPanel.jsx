import RiskRadar from "./RiskRadar";
import { TYPE_COLORS, TYPE_LABELS } from "../data/incidents";

export default function DetailPanel({ incident }) {
  if (!incident) {
    return (
      <div className="detail-panel detail-panel--empty">
        <div className="detail-panel-placeholder">
          <div className="placeholder-icon">🛰</div>
          <p>Click an incident on the map or table to view details</p>
        </div>
      </div>
    );
  }

  const typeColor = TYPE_COLORS[incident.type];
  const riskIndex = (
    ((5 - incident.legibility) + incident.reversibility + incident.escalation) /
    3
  ).toFixed(1);

  return (
    <div className="detail-panel">
      <div className="detail-header" style={{ borderLeftColor: typeColor }}>
        <div className="detail-type-badge" style={{ backgroundColor: typeColor + "22", color: typeColor, borderColor: typeColor + "55" }}>
          {TYPE_LABELS[incident.type]}
        </div>
        <h2 className="detail-title">{incident.title}</h2>
        <div className="detail-meta-row">
          <span className="detail-meta-item">
            <span className="meta-label">Date</span>
            {new Date(incident.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
          </span>
          <span className="detail-meta-item">
            <span className="meta-label">Actor</span>
            {incident.actor}
          </span>
          <span className="detail-meta-item">
            <span className="meta-label">Target</span>
            {incident.target}
          </span>
          <span className="detail-meta-item">
            <span className="meta-label">Domain</span>
            {incident.domain}
          </span>
        </div>
      </div>

      <div className="detail-badges">
        <span
          className="badge"
          style={{
            background: incident.salamiTactic ? "#854d0e22" : "#14532d22",
            color: incident.salamiTactic ? "#fbbf24" : "#4ade80",
            border: `1px solid ${incident.salamiTactic ? "#854d0e" : "#14532d"}`,
          }}
        >
          {incident.salamiTactic ? "🔪 Salami Tactic" : "✓ Not a Salami Tactic"}
        </span>
        <span
          className="badge risk-index-badge"
          style={{ background: "#1e293b", color: "#e2e8f0", border: "1px solid #334155" }}
        >
          Risk Index: <strong style={{ color: typeColor }}>{riskIndex}</strong>/5
        </span>
      </div>

      {incident.salamiTactic === false && (
        <div className="warning-banner">
          ⚠ This incident is <strong>NOT</strong> a salami tactic — it is irreversible and
          immediately interpretable as an aggressive act.
        </div>
      )}

      <p className="section-label">Description</p>
      <p className="detail-description">{incident.description}</p>

      <RiskRadar incident={incident} />

      <p className="section-label">Tags</p>
      <div className="tag-list">
        {incident.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <p className="section-label">Source</p>
      <p className="detail-source">{incident.source}</p>
    </div>
  );
}
