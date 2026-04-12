import { useMemo } from "react";
import { CONJUNCTION_SUMMARY } from "../data/conjunctions";
import { ORBITAL_HEALTH_SCORE } from "../data/governance";
import { DEBRIS_DENSITY_DATA } from "../data/debrisDensity";

function getHealthColor(score) {
  if (score >= 67) return "#10b981";
  if (score >= 34) return "#f59e0b";
  return "#ef4444";
}

export default function RiskOverviewHeader() {
  const totalTracked = useMemo(
    () => DEBRIS_DENSITY_DATA.reduce((sum, d) => sum + d.trackedObjects, 0),
    []
  );

  const healthColor = getHealthColor(ORBITAL_HEALTH_SCORE.score);

  return (
    <div className="risk-overview-header">
      <div className="risk-overview-inner">
        <div className="risk-overview-item">
          <span className="risk-overview-value">{totalTracked.toLocaleString()}</span>
          <span className="risk-overview-label">Tracked Objects</span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value" style={{ color: "#ef4444" }}>
            {CONJUNCTION_SUMMARY.highRisk72h}
          </span>
          <span className="risk-overview-label">High-Risk Conjunctions (72h)</span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value">{CONJUNCTION_SUMMARY.totalTracked72h}</span>
          <span className="risk-overview-label">Total Conjunctions (72h)</span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value" style={{ color: healthColor }}>
            {ORBITAL_HEALTH_SCORE.score}/100
          </span>
          <span className="risk-overview-label">
            Environment Health — <em>{ORBITAL_HEALTH_SCORE.label}</em>
          </span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value">{CONJUNCTION_SUMMARY.manoeuvresExecutedYTD}</span>
          <span className="risk-overview-label">Avoidance Manoeuvres YTD</span>
        </div>
      </div>
    </div>
  );
}
