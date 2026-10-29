import { useMemo } from "react";
import { CONJUNCTION_SUMMARY } from "../data/conjunctions";
import { DEBRIS_DENSITY_DATA } from "../data/debrisDensity";
import { SNAPSHOT_LABEL } from "../data/referenceMeta";
import ReferenceBadge from "./ReferenceBadge";

export default function RiskOverviewHeader() {
  // SSO is a subset of LEO, so its objects are already in the LEO count.
  const totalTracked = useMemo(
    () => DEBRIS_DENSITY_DATA.filter((d) => d.regime !== "SSO").reduce((sum, d) => sum + d.trackedObjects, 0),
    []
  );

  return (
    <div className="risk-overview-header">
      <div className="risk-overview-inner">
        <div className="risk-overview-item">
          <span className="risk-overview-value">{totalTracked.toLocaleString()}</span>
          <span className="risk-overview-label">Tracked Objects (LEO incl. SSO, MEO, GEO, HEO)</span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value" style={{ color: "#ef4444" }}>
            {CONJUNCTION_SUMMARY.highRisk72h}
          </span>
          <span className="risk-overview-label">High-Risk Conjunctions ({SNAPSHOT_LABEL})</span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value">{CONJUNCTION_SUMMARY.totalTracked72h}</span>
          <span className="risk-overview-label">Total Conjunctions ({SNAPSHOT_LABEL})</span>
        </div>
        <div className="risk-overview-divider" />
        <div className="risk-overview-item">
          <span className="risk-overview-value">{CONJUNCTION_SUMMARY.manoeuvresExecutedYTD}</span>
          <span className="risk-overview-label">Avoidance Manoeuvres ({SNAPSHOT_LABEL})</span>
        </div>
      </div>
      <div className="risk-overview-badge">
        <ReferenceBadge />
      </div>
    </div>
  );
}
