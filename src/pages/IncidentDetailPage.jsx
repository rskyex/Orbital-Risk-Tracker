import { useParams, Link, useNavigate } from "react-router-dom";
import { INCIDENTS, INCIDENT_TYPES, SEVERITY_LEVELS, CONFIDENCE_LEVELS, SOURCE_TYPES, getTypeColor } from "../data/incidents";
import StarField from "../components/StarField";

function ScoreBar({ label, value, color }) {
  return (
    <div className="detail-score-row">
      <span className="detail-score-label">{label}</span>
      <div className="detail-score-track">
        <div
          className="detail-score-fill"
          style={{ width: `${(value / 5) * 100}%`, background: color }}
        />
      </div>
      <span className="detail-score-value" style={{ color }}>{value}/5</span>
    </div>
  );
}

export default function IncidentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const inc = INCIDENTS.find((i) => String(i.id) === String(id));

  if (!inc) {
    return (
      <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛸</div>
          <h2 style={{ color: "var(--cyan)", marginBottom: "0.5rem" }}>Incident Not Found</h2>
          <p style={{ color: "var(--text-dim)", marginBottom: "2rem" }}>No incident with ID #{id} exists in the dataset.</p>
          <Link to="/" className="btn-primary">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const typeMeta      = INCIDENT_TYPES[inc.type]   || {};
  const severityMeta  = SEVERITY_LEVELS[inc.severity] || {};
  const confidenceMeta = CONFIDENCE_LEVELS[inc.confidence] || {};
  const riskIndex = (((5 - inc.legibility) + inc.reversibility + inc.escalation) / 3).toFixed(2);

  const prevInc = INCIDENTS.find((i) => i.id === inc.id - 1);
  const nextInc = INCIDENTS.find((i) => i.id === inc.id + 1);

  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <StarField className="page-stars" />

      <div className="incident-detail-page">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb">
          <Link to="/#explorer">← All Incidents</Link>
          <span>/</span>
          <span>#{inc.id}</span>
        </div>

        {/* Header card */}
        <div className="detail-header-card" style={{ borderColor: typeMeta.color + "44" }}>
          <div className="detail-badges-row">
            <span className="source-type-badge" style={{ background: typeMeta.color + "22", color: typeMeta.color }}>
              {typeMeta.label}
            </span>
            <span className="source-type-badge" style={{ background: severityMeta.color + "22", color: severityMeta.color }}>
              {severityMeta.label}
            </span>
            <span className="source-type-badge" style={{ background: confidenceMeta.color + "22", color: confidenceMeta.color }}>
              {confidenceMeta.label} Confidence
            </span>
            {inc.salamiTactic && (
              <span className="source-type-badge" style={{ background: "#e879f922", color: "#e879f9" }}>
                Salami Tactic
              </span>
            )}
          </div>

          <h1 className="detail-title">{inc.title}</h1>

          <div className="detail-meta-row">
            <span>{inc.year}</span>
            <span className="detail-meta-sep">·</span>
            <span>{inc.actor}</span>
            <span className="detail-meta-sep">·</span>
            <span>{inc.orbit || inc.domain}</span>
            {inc.subtype && (
              <>
                <span className="detail-meta-sep">·</span>
                <span>{inc.subtype}</span>
              </>
            )}
          </div>
        </div>

        <div className="detail-body-grid">
          {/* Left: summary + source */}
          <div>
            <div className="detail-card">
              <h2 className="detail-card-title">Summary</h2>
              <p className="method-body">{inc.summary}</p>

              <div className="detail-target-row">
                <span className="detail-target-label">Target</span>
                <span className="detail-target-value">{inc.target}</span>
              </div>
            </div>

            <div className="detail-card">
              <h2 className="detail-card-title">Source</h2>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                {inc.source}
              </p>
              {inc.sourceTitle && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span className="source-type-badge" style={{ background: "var(--surface-2)" }}>
                    {SOURCE_TYPES[inc.sourceType] || inc.sourceType}
                  </span>
                  {inc.sourceUrl && (
                    <a
                      href={inc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-card-link"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {inc.sourceTitle} ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            {inc.tags && inc.tags.length > 0 && (
              <div className="detail-card">
                <h2 className="detail-card-title">Tags</h2>
                <div className="detail-tags-row">
                  {inc.tags.map((t) => (
                    <span key={t} className="detail-tag">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Jervis scores + risk */}
          <div>
            <div className="detail-card">
              <h2 className="detail-card-title">Jervis Risk Scores</h2>
              <ScoreBar label="Legibility"     value={inc.legibility}    color="#4488ff" />
              <ScoreBar label="Reversibility"  value={inc.reversibility} color="#f59e0b" />
              <ScoreBar label="Escalation"     value={inc.escalation}    color="#ef4444" />

              <div className="detail-risk-index" style={{ borderColor: typeMeta.color + "55" }}>
                <span className="detail-risk-label">Risk Index</span>
                <span className="detail-risk-value" style={{ color: typeMeta.color }}>{riskIndex}</span>
                <span className="detail-risk-sub">/ 5.00</span>
              </div>

              <p style={{ color: "var(--text-dim)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
                Formula: ((5 − Legibility) + Reversibility + Escalation) / 3
              </p>
              <Link to="/methodology" style={{ color: "var(--cyan)", fontSize: "0.78rem" }}>
                See scoring methodology →
              </Link>
            </div>

            {inc.salamiTactic && (
              <div className="detail-card detail-salami-warning">
                <div className="modal-warning-icon">⚠</div>
                <strong>Salami Tactic Detected</strong>
                <p>
                  Low legibility (≤ 2) combined with low reversibility (≤ 2) indicates this
                  incident was designed to achieve strategic effect while maintaining plausible
                  deniability.
                </p>
              </div>
            )}

            <div className="detail-card">
              <h2 className="detail-card-title">Quick Facts</h2>
              {[
                ["Incident ID", `#${inc.id}`],
                ["Date", inc.date || inc.year],
                ["Actor", inc.actor],
                ["Domain", inc.domain],
                ["Orbit", inc.orbit || "—"],
                ["Type", typeMeta.label || inc.type],
                ["Severity", severityMeta.label || inc.severity],
                ["Confidence", confidenceMeta.label || inc.confidence],
              ].map(([k, v]) => (
                <div key={k} className="detail-fact-row">
                  <span className="detail-fact-key">{k}</span>
                  <span className="detail-fact-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="detail-nav-row">
          {prevInc ? (
            <Link to={`/incidents/${prevInc.id}`} className="detail-nav-btn">
              ← #{prevInc.id} {prevInc.title}
            </Link>
          ) : <span />}
          {nextInc && (
            <Link to={`/incidents/${nextInc.id}`} className="detail-nav-btn detail-nav-btn--right">
              #{nextInc.id} {nextInc.title} →
            </Link>
          )}
        </div>

        <div className="method-footer-nav" style={{ marginTop: "1rem" }}>
          <Link to="/#explorer" className="btn-secondary">← Incident Explorer</Link>
          <Link to="/radar" className="btn-primary">Jervis Radar →</Link>
        </div>
      </div>
    </div>
  );
}
