import { useState } from "react";
import {
  TREATY_COMPLIANCE_MATRIX, COMPLIANCE_STATUS_LABELS, TREATY_COLUMNS,
  REGULATORY_TIERS, STRUCTURAL_GAPS, REFORM_PATHWAYS,
} from "../data/legalFramework";

function StatusBadge({ status }) {
  const meta = COMPLIANCE_STATUS_LABELS[status] || { label: status, color: "#3a4e6a" };
  return (
    <span className="treaty-cell-badge" style={{ color: meta.color, background: meta.color + "14" }}>
      {meta.label}
    </span>
  );
}

function TreatyComplianceMatrix() {
  return (
    <div className="legal-section">
      <h3 className="legal-section-title">Treaty Compliance Matrix</h3>
      <p className="legal-section-desc">
        Adherence status of major spacefaring actors across core legal instruments.
        Structural gap: the OST was drafted for three spacefaring states and governments
        as sole actors — its ambiguity creates jurisdiction voids for non-state operators.
      </p>
      <div className="treaty-matrix-wrap">
        <table className="treaty-matrix">
          <thead>
            <tr>
              <th>Actor</th>
              {TREATY_COLUMNS.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TREATY_COMPLIANCE_MATRIX.map((row) => (
              <tr key={row.actorId}>
                <td className="treaty-actor-cell">{row.actor}</td>
                {TREATY_COLUMNS.map((c) => (
                  <td key={c.key}><StatusBadge status={row[c.key]} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RegulatoryDivergenceTracker() {
  return (
    <div className="legal-section">
      <h3 className="legal-section-title">Regulatory Divergence Tracker</h3>
      <p className="legal-section-desc">
        Mapping the gap between what major regulatory regimes require and what the
        technical risk picture demands, across three binding-force tiers.
      </p>

      <div className="regulatory-tiers">
        {Object.entries(REGULATORY_TIERS).map(([tierId, tier]) => (
          <div key={tierId} className="regulatory-tier">
            <div className="tier-header" style={{ borderColor: tier.color }}>
              <span className="tier-dot" style={{ background: tier.color }} />
              <span style={{ color: tier.color, fontWeight: 700, fontSize: 13 }}>{tier.label}</span>
            </div>
            <div className="tier-items">
              {tier.items.map((item) => (
                <div key={item.id} className="tier-item">
                  <h4 className="tier-item-name">{item.name}</h4>
                  <p className="tier-item-desc">{item.description}</p>
                  {item.callout && (
                    <div className="legal-callout">
                      <span className="legal-callout-icon">PRECEDENT</span>
                      {item.callout}
                    </div>
                  )}
                  {item.status && (
                    <div className="tier-item-status">
                      Status: <strong>{item.status}</strong>
                      {item.jurisdiction && <> — {item.jurisdiction}</>}
                    </div>
                  )}
                  {item.statesWithLegislation && (
                    <div className="tier-states">
                      <span className="tier-states-label" style={{ color: "#10b981" }}>With legislation:</span>
                      {item.statesWithLegislation.join(", ")}
                    </div>
                  )}
                  {item.statesWithout && (
                    <div className="tier-states">
                      <span className="tier-states-label" style={{ color: "#ef4444" }}>Without:</span>
                      {item.statesWithout.join(", ")}
                    </div>
                  )}
                  {item.nonAdopters && (
                    <div className="tier-states">
                      <span className="tier-states-label" style={{ color: "#ef4444" }}>Non-adopters:</span>
                      {item.nonAdopters.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StructuralGapsPanel() {
  return (
    <div className="legal-section">
      <h3 className="legal-section-title">Where Law Does Not Reach</h3>
      <p className="legal-section-desc">
        Identified governance voids where existing legal frameworks are structurally
        insufficient for the risk they are expected to address.
      </p>
      <div className="gaps-grid">
        {STRUCTURAL_GAPS.map((gap) => {
          const sevColor = gap.severity === "critical" ? "#ef4444" : "#f59e0b";
          return (
            <div key={gap.id} className="gap-card" style={{ borderLeftColor: sevColor }}>
              <div className="gap-card-header">
                <span className="gap-category" style={{ color: sevColor }}>{gap.riskCategory}</span>
                <span className="gap-severity" style={{ color: sevColor }}>
                  {gap.severity.toUpperCase()}
                </span>
              </div>
              <h4 className="gap-card-title">{gap.title}</h4>
              <p className="gap-card-desc">{gap.description}</p>
              <div className="gap-connections">
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Regimes:</span>
                {gap.connectedRegimes.map((r) => (
                  <span key={r} className="gap-regime-tag">{r}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReformPathwaysMonitor() {
  return (
    <div className="legal-section">
      <h3 className="legal-section-title">Reform Pathways Monitor</h3>
      <p className="legal-section-desc">
        Active governance reform efforts and their current status. Structured for
        update-ready data refresh as new developments occur.
      </p>
      <div className="reform-feed">
        {REFORM_PATHWAYS.map((r) => (
          <div key={r.id} className="reform-card">
            <div className="reform-card-header">
              <span className="reform-status-badge" style={{ color: r.statusColor, background: r.statusColor + "14" }}>
                {r.status.replace(/_/g, " ").toUpperCase()}
              </span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Updated: {r.lastUpdate}</span>
            </div>
            <h4 className="reform-card-title">{r.title}</h4>
            <p className="reform-card-desc">{r.description}</p>
            {r.pendingCases && (
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>
                Pending cases: <strong>{r.pendingCases}</strong> — Avg. resolution: <strong>{r.averageResolutionTime}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GovernanceArchitecture() {
  const [activeTab, setActiveTab] = useState("matrix");

  const exportJSON = () => {
    const data = { TREATY_COMPLIANCE_MATRIX, REGULATORY_TIERS, STRUCTURAL_GAPS, REFORM_PATHWAYS };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "governance_architecture.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "matrix", label: "Treaty Matrix" },
    { id: "divergence", label: "Regulatory Divergence" },
    { id: "gaps", label: "Structural Gaps" },
    { id: "reform", label: "Reform Pathways" },
  ];

  return (
    <div className="governance-architecture-panel" id="governance-architecture">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Governance Architecture</p>
          <h3 className="data-layer-title">Legal & Regulatory Framework</h3>
          <p className="data-layer-desc">
            Structured reference layer connecting treaty obligations, regulatory gaps,
            and reform pathways to the risk data displayed elsewhere in the tool.
          </p>
        </div>
        <button className="export-btn" onClick={exportJSON}>Export JSON</button>
      </div>

      {/* Tab navigation */}
      <div className="legal-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`legal-tab ${activeTab === tab.id ? "legal-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="legal-tab-content glass">
        {activeTab === "matrix" && <TreatyComplianceMatrix />}
        {activeTab === "divergence" && <RegulatoryDivergenceTracker />}
        {activeTab === "gaps" && <StructuralGapsPanel />}
        {activeTab === "reform" && <ReformPathwaysMonitor />}
      </div>
    </div>
  );
}
