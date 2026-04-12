import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import StarField from "../components/StarField";
import GovernanceArchitecture from "../components/GovernanceArchitecture";

export default function GovernancePage() {
  useScrollReveal();

  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <StarField className="page-stars" />
      <div className="governance-page">
        <div className="method-header">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Legal & Regulatory Framework
          </div>
          <h1 className="method-title">Governance Architecture</h1>
          <p className="method-subtitle">
            Treaty compliance, regulatory divergence, structural governance gaps,
            and active reform pathways — connected to the risk data displayed
            throughout the Orbital Risk Tracker.
          </p>
        </div>

        <GovernanceArchitecture />

        <div className="method-footer-nav" style={{ marginTop: 32 }}>
          <Link to="/" className="btn-secondary">&larr; Home</Link>
          <Link to="/about" className="btn-secondary">About This Tracker &rarr;</Link>
          <Link to="/radar" className="btn-primary">Jervis Radar &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
