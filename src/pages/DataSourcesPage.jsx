import { useState } from "react";
import { Link } from "react-router-dom";
import { SOURCES } from "../data/sources";
import StarField from "../components/StarField";

const TYPE_LABELS = {
  official:  { label: "Official / Government", color: "#4488ff" },
  thinktank: { label: "Think Tank / Research",  color: "#8b5cf6" },
  company:   { label: "Industry / Company",      color: "#10b981" },
  aviation:  { label: "Aviation Safety",         color: "#f59e0b" },
  media:     { label: "Specialist Media",        color: "#e879f9" },
};

const TYPE_FILTER_ORDER = ["all", "official", "thinktank", "company", "aviation", "media"];

export default function DataSourcesPage() {
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? SOURCES : SOURCES.filter((s) => s.type === filter);

  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <StarField className="page-stars" />

      <div className="sources-page">
        <div className="method-header">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Primary Source Registry
          </div>
          <h1 className="method-title">Data Sources</h1>
          <p className="method-subtitle">
            {SOURCES.length} public sources used in compiling the Orbital Risk Tracker dataset.
            All URLs were valid as of March 2026.
          </p>
        </div>

        {/* Filter pills */}
        <div className="sources-filter-row">
          {TYPE_FILTER_ORDER.map((t) => {
            const meta = TYPE_LABELS[t];
            const count = t === "all" ? SOURCES.length : SOURCES.filter((s) => s.type === t).length;
            return (
              <button
                key={t}
                className={`sources-filter-pill ${filter === t ? "sources-filter-pill--active" : ""}`}
                style={filter === t && meta ? { borderColor: meta.color, color: meta.color } : {}}
                onClick={() => setFilter(t)}
              >
                {t === "all" ? "All" : meta.label}
                <span className="sources-filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Source cards */}
        <div className="sources-grid">
          {visible.map((src) => {
            const meta = TYPE_LABELS[src.type];
            return (
              <div key={src.id} className="source-card">
                <div className="source-card-header">
                  <span
                    className="source-type-badge"
                    style={{ background: meta.color + "22", color: meta.color }}
                  >
                    {meta.label}
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-card-link"
                    aria-label={`Visit ${src.name}`}
                  >
                    ↗
                  </a>
                </div>
                <h3 className="source-card-name">{src.name}</h3>
                <p className="source-card-desc">{src.description}</p>
                <div className="source-card-coverage">
                  <span className="source-coverage-label">Coverage:</span> {src.coverage}
                </div>
              </div>
            );
          })}
        </div>

        <div className="method-footer-nav">
          <Link to="/" className="btn-secondary">← Home</Link>
          <Link to="/methodology" className="btn-secondary">Methodology →</Link>
          <Link to="/radar" className="btn-primary">Jervis Radar →</Link>
        </div>
      </div>
    </div>
  );
}
