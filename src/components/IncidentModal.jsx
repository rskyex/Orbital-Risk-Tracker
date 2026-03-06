import { useEffect } from "react";
import { getTypeColor, getSeverityColor, INCIDENT_TYPES, SEVERITY_LEVELS } from "../data/incidents";

const JERVIS_AXES = [
  {
    key: "legibility",
    label: "Legibility",
    low: "Highly ambiguous",
    high: "Clearly interpretable",
    color: "var(--blue)",
  },
  {
    key: "reversibility",
    label: "Reversibility",
    low: "Permanent / irreversible",
    high: "Instantly reversible",
    color: "var(--amber)",
  },
  {
    key: "escalation",
    label: "Escalation",
    low: "Minimal tension",
    high: "Severe tension",
    color: "var(--red)",
  },
];

export default function IncidentModal({ incident, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const typeColor = getTypeColor(incident.type);
  const sevColor  = getSeverityColor(incident.severity);

  const riskIndex = (
    ((5 - incident.legibility) + incident.reversibility + incident.escalation) / 3
  ).toFixed(1);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal glass">
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Type + severity row */}
        <div className="modal-type-row">
          <span
            className="type-badge"
            style={{
              color: typeColor,
              background: typeColor + "18",
              borderColor: typeColor + "44",
            }}
          >
            {INCIDENT_TYPES[incident.type]?.label}
          </span>
          <span
            className="severity-badge"
            style={{ background: sevColor + "20", color: sevColor }}
          >
            {SEVERITY_LEVELS[incident.severity]?.label}
          </span>
          {incident.salamiTactic && (
            <span className="salami-badge">🔪 Salami Tactic</span>
          )}
        </div>

        <h2 className="modal-title">{incident.title}</h2>

        {/* Meta grid */}
        <div className="modal-meta-grid">
          {[
            { label: "Date",   value: new Date(incident.date).toLocaleDateString("en-GB", { year:"numeric", month:"long", day:"numeric" }) },
            { label: "Actor",  value: incident.actor },
            { label: "Target", value: incident.target },
            { label: "Domain", value: incident.domain },
            { label: "Risk Index", value: `${riskIndex} / 5` },
          ].map(({ label, value }) => (
            <div key={label} className="modal-meta-item">
              <span className="modal-meta-label">{label}</span>
              <span className="modal-meta-value">{value}</span>
            </div>
          ))}
        </div>

        {/* Irreversible warning */}
        {!incident.salamiTactic && incident.reversibility <= 2 && (
          <div className="warning-banner">
            ⚠ This incident is <strong>NOT</strong> a salami tactic — it is
            irreversible and clearly interpretable as an aggressive act.
          </div>
        )}

        {/* Summary */}
        <p className="modal-section-title">Intelligence Summary</p>
        <p className="modal-summary">{incident.summary}</p>

        {/* Jervis radar */}
        <div className="modal-jervis">
          <p className="modal-section-title">Jervis Risk Profile</p>
          <div className="modal-jervis-grid">
            {JERVIS_AXES.map((ax) => {
              const val = incident[ax.key];
              return (
                <div key={ax.key} className="jervis-score-box">
                  <div className="jervis-score-axis">{ax.label}</div>
                  <div
                    className="jervis-score-val"
                    style={{ color: ax.color }}
                  >
                    {val}
                    <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
                      /5
                    </span>
                  </div>
                  <div className="jervis-score-bar">
                    <div
                      className="jervis-score-fill"
                      style={{ width: `${val * 20}%`, background: ax.color }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      marginTop: 4,
                    }}
                  >
                    {val <= 2 ? ax.low : val >= 4 ? ax.high : "Moderate"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <p className="modal-section-title">Classification Tags</p>
        <div className="modal-tags">
          {incident.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>

        {/* Source */}
        <div className="modal-source">
          <strong>Source:</strong> {incident.source}
        </div>
      </div>
    </div>
  );
}
