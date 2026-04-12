import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ACTOR_PROFILES, NORM_POSTURE_LABELS, BEHAVIOUR_TYPE_LABELS } from "../data/actors";
import { TREATY_COLUMNS, COMPLIANCE_STATUS_LABELS } from "../data/legalFramework";

function getScoreColor(score) {
  if (score <= 33) return "#10b981";
  if (score <= 66) return "#f59e0b";
  return "#ef4444";
}

function ActorModal({ actor, onClose }) {
  if (!actor) return null;

  const postureMeta = NORM_POSTURE_LABELS[actor.normPosture];
  const regimeData = Object.entries(actor.objectsByRegime)
    .filter(([, v]) => v > 0)
    .map(([regime, count]) => ({ regime, count }));

  const regimeColors = { LEO: "#ef4444", MEO: "#f59e0b", GEO: "#8b5cf6", HEO: "#4488ff", SSO: "#10b981" };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal glass actor-modal">
        <button className="modal-close" onClick={onClose}>x</button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 32 }}>{actor.flag === "COMMERCIAL" ? "🏢" : getFlagEmoji(actor.flag)}</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>{actor.name}</h2>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <span className="conj-sev-badge" style={{ background: postureMeta.color + "18", color: postureMeta.color }}>
                {postureMeta.label}
              </span>
              <span className="conj-sev-badge" style={{ background: getScoreColor(actor.governanceScore) + "18", color: getScoreColor(actor.governanceScore) }}>
                Gov. Risk: {actor.governanceScore}/100
              </span>
            </div>
          </div>
        </div>

        {/* Posture description */}
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
          {actor.normPostureDesc}
        </p>

        {/* Objects by regime */}
        <p className="section-label">Active Objects by Regime ({actor.totalActiveObjects.toLocaleString()} total)</p>
        {regimeData.length > 0 && (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={regimeData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }} layout="vertical">
              <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
              <YAxis type="category" dataKey="regime" tick={{ fill: "var(--text-muted)", fontSize: 11 }} width={40} />
              <Tooltip contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [v.toLocaleString(), "Objects"]} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {regimeData.map((d, i) => (
                  <Cell key={i} fill={regimeColors[d.regime] || "#4488ff"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Treaty status */}
        <p className="section-label" style={{ marginTop: 16 }}>Treaty / Instrument Adherence</p>
        <div className="treaty-status-grid">
          {TREATY_COLUMNS.map((col) => {
            const status = actor.treatyStatus[col.key];
            const meta = COMPLIANCE_STATUS_LABELS[status] || { label: status, color: "#3a4e6a" };
            return (
              <div key={col.key} className="treaty-status-item">
                <span className="treaty-status-name">{col.label}</span>
                <span className="treaty-status-badge" style={{ color: meta.color, background: meta.color + "14" }}>
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Recent behaviour */}
        <p className="section-label" style={{ marginTop: 16 }}>Recent Behaviour</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {actor.recentBehaviour.map((b, i) => {
            const bMeta = BEHAVIOUR_TYPE_LABELS[b.type] || { label: b.type, color: "#4488ff" };
            return (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", minWidth: 60 }}>{b.date}</span>
                <span className="conj-sev-badge" style={{ background: bMeta.color + "14", color: bMeta.color, fontSize: 10, whiteSpace: "nowrap" }}>
                  {bMeta.label}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{b.event}</span>
              </div>
            );
          })}
        </div>

        {/* Risk factors */}
        <p className="section-label" style={{ marginTop: 16 }}>Risk Factors</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {actor.riskFactors.map((r, i) => (
            <div key={i} style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getFlagEmoji(code) {
  if (!code || code.length !== 2) return "🌐";
  const codePoints = [...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function ActorProfiles() {
  const [selectedActor, setSelectedActor] = useState(null);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(ACTOR_PROFILES, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "actor_profiles.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="data-layer-panel glass reveal" id="actor-profiles">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Comparative Analysis</p>
          <h3 className="data-layer-title">Space Actor Profiles</h3>
          <p className="data-layer-desc">
            Treaty adherence, norm-building posture, active object counts, and recent
            behaviour for major space actors. Click any card for the full profile.
          </p>
        </div>
        <button className="export-btn" onClick={exportJSON}>Export JSON</button>
      </div>

      <div className="actor-grid">
        {ACTOR_PROFILES.map((actor) => {
          const postureMeta = NORM_POSTURE_LABELS[actor.normPosture];
          return (
            <div
              key={actor.id}
              className="actor-card"
              onClick={() => setSelectedActor(actor)}
              style={{ cursor: "pointer" }}
            >
              <div className="actor-card-header">
                <span style={{ fontSize: 22 }}>{actor.flag === "COMMERCIAL" ? "🏢" : getFlagEmoji(actor.flag)}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{actor.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{actor.totalActiveObjects.toLocaleString()} active objects</div>
                </div>
              </div>

              <div className="actor-card-badges">
                <span className="actor-posture-badge" style={{ color: postureMeta.color, background: postureMeta.color + "14" }}>
                  {postureMeta.label}
                </span>
                <span className="actor-posture-badge" style={{ color: getScoreColor(actor.governanceScore), background: getScoreColor(actor.governanceScore) + "14" }}>
                  Risk: {actor.governanceScore}
                </span>
              </div>

              {/* Mini regime breakdown */}
              <div className="actor-regime-mini">
                {Object.entries(actor.objectsByRegime).filter(([, v]) => v > 0).slice(0, 3).map(([regime, count]) => (
                  <span key={regime} style={{ fontSize: 10, color: "var(--text-muted)" }}>
                    {regime}: {count.toLocaleString()}
                  </span>
                ))}
              </div>

              {/* Latest behaviour */}
              {actor.recentBehaviour.length > 0 && (
                <div className="actor-latest">
                  <span className="conj-sev-badge" style={{
                    background: (BEHAVIOUR_TYPE_LABELS[actor.recentBehaviour[0].type]?.color || "#4488ff") + "14",
                    color: BEHAVIOUR_TYPE_LABELS[actor.recentBehaviour[0].type]?.color || "#4488ff",
                    fontSize: 10,
                  }}>
                    {actor.recentBehaviour[0].date}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                    {actor.recentBehaviour[0].event.length > 60 ? actor.recentBehaviour[0].event.slice(0, 60) + "..." : actor.recentBehaviour[0].event}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedActor && <ActorModal actor={selectedActor} onClose={() => setSelectedActor(null)} />}
    </div>
  );
}
