import { useState, useMemo } from "react";
import IncidentMap from "./components/IncidentMap";
import DetailPanel from "./components/DetailPanel";
import IncidentTable from "./components/IncidentTable";
import RiskBarChart from "./components/RiskBarChart";
import { INCIDENTS, TYPE_LABELS } from "./data/incidents";
import "./App.css";

const FILTER_TYPES = ["all", "proximity", "jamming", "asat", "cyber"];

const FILTER_LABELS = {
  all: "All Incidents",
  ...TYPE_LABELS,
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? INCIDENTS
        : INCIDENTS.filter((i) => i.type === activeFilter),
    [activeFilter]
  );

  const stats = useMemo(() => {
    const salami = INCIDENTS.filter((i) => i.salamiTactic).length;
    const actors = [...new Set(INCIDENTS.map((i) => i.actor))].length;
    return { total: INCIDENTS.length, salami, actors };
  }, []);

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-top">
          <div className="header-left">
            <span className="header-icon">🛰</span>
            <div>
              <h1 className="header-title">Orbital Risk Tracker</h1>
              <p className="header-subtitle">
                Space Incident &amp; Governance Risk Visualization ·
                Jervis Security Dilemma Framework
              </p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Incidents</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.salami}</span>
              <span className="stat-label">Salami Tactics</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.actors}</span>
              <span className="stat-label">State Actors</span>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          {FILTER_TYPES.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "filter-btn--active" : ""}`}
              onClick={() => {
                setActiveFilter(f);
                setSelected(null);
              }}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </header>

      {/* ── Main grid ── */}
      <main className="main-grid">
        {/* Left column */}
        <div className="left-col">
          <div className="map-section">
            <IncidentMap
              incidents={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
          <div className="bottom-section">
            <RiskBarChart incidents={INCIDENTS} />
            <IncidentTable
              incidents={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="right-col">
          <DetailPanel incident={selected} />
        </div>
      </main>

      <footer className="footer">
        <span>
          Built with React · Leaflet.js · Recharts · Vite &nbsp;|&nbsp;
          Academic framework: Jervis (1978),{" "}
          <em>Cooperation Under the Security Dilemma</em>
        </span>
      </footer>
    </div>
  );
}
