import { useState, useMemo } from "react";
import {
  INCIDENTS,
  INCIDENT_TYPES,
  SEVERITY_LEVELS,
  ACTORS,
  YEARS,
  getTypeColor,
  getSeverityColor,
} from "../data/incidents";
import IncidentModal from "./IncidentModal";

export default function IncidentExplorer() {
  const [selected, setSelected]       = useState(null);
  const [search, setSearch]           = useState("");
  const [typeFilter, setTypeFilter]   = useState("all");
  const [actorFilter, setActorFilter] = useState("all");
  const [sevFilter, setSevFilter]     = useState("all");

  const filtered = useMemo(() => {
    return INCIDENTS.filter((inc) => {
      if (typeFilter  !== "all" && inc.type     !== typeFilter)  return false;
      if (actorFilter !== "all" && inc.actor    !== actorFilter) return false;
      if (sevFilter   !== "all" && inc.severity !== sevFilter)   return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !inc.title.toLowerCase().includes(q) &&
          !inc.actor.toLowerCase().includes(q) &&
          !inc.summary.toLowerCase().includes(q) &&
          !inc.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [typeFilter, actorFilter, sevFilter, search]);

  return (
    <section className="explorer-section" id="explorer">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-label">Incident Database</p>
          <h2 className="section-title">Incident Explorer</h2>
          <p className="section-subtitle">
            Browse, filter, and drill into all documented space and
            cyber-electromagnetic incidents.
          </p>
        </div>

        {/* Controls */}
        <div className="explorer-controls reveal">
          <input
            className="explorer-search"
            type="text"
            placeholder="Search by title, actor, tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Type filter */}
          <div className="filter-group">
            <button
              className={`filter-pill ${typeFilter === "all" ? "filter-pill--active" : ""}`}
              onClick={() => setTypeFilter("all")}
            >
              All Types
            </button>
            {Object.entries(INCIDENT_TYPES).map(([key, def]) => (
              <button
                key={key}
                className={`filter-pill ${typeFilter === key ? "filter-pill--active" : ""}`}
                style={typeFilter === key ? { "--pill-color": def.color } : {}}
                onClick={() => setTypeFilter(key)}
              >
                {def.label}
              </button>
            ))}
          </div>

          {/* Severity filter */}
          <div className="filter-group">
            <button
              className={`filter-pill ${sevFilter === "all" ? "filter-pill--active" : ""}`}
              onClick={() => setSevFilter("all")}
            >
              All Severity
            </button>
            {Object.entries(SEVERITY_LEVELS).map(([key, def]) => (
              <button
                key={key}
                className={`filter-pill ${sevFilter === key ? "filter-pill--active" : ""}`}
                onClick={() => setSevFilter(key)}
              >
                {def.label}
              </button>
            ))}
          </div>

          {/* Actor filter */}
          <div className="filter-group">
            <button
              className={`filter-pill ${actorFilter === "all" ? "filter-pill--active" : ""}`}
              onClick={() => setActorFilter("all")}
            >
              All Actors
            </button>
            {ACTORS.map((a) => (
              <button
                key={a}
                className={`filter-pill ${actorFilter === a ? "filter-pill--active" : ""}`}
                onClick={() => setActorFilter(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <p className="explorer-count reveal">
          Showing <strong>{filtered.length}</strong> of {INCIDENTS.length}{" "}
          incidents
        </p>

        {/* Cards grid */}
        <div className="incidents-grid">
          {filtered.map((inc) => {
            const tc = getTypeColor(inc.type);
            const sc = getSeverityColor(inc.severity);
            return (
              <div
                key={inc.id}
                className={`incident-card glass reveal ${selected?.id === inc.id ? "incident-card--selected" : ""}`}
                onClick={() => setSelected(inc)}
                style={{ "--card-border-color": tc }}
              >
                <div className="incident-card-header">
                  <div className="incident-card-badges">
                    <span
                      className="type-badge"
                      style={{ color: tc, background: tc + "18", borderColor: tc + "44" }}
                    >
                      {INCIDENT_TYPES[inc.type]?.label}
                    </span>
                    <span
                      className="severity-badge"
                      style={{ background: sc + "20", color: sc }}
                    >
                      {SEVERITY_LEVELS[inc.severity]?.label}
                    </span>
                  </div>
                  {inc.salamiTactic && <span className="salami-badge">🔪</span>}
                </div>

                <h3 className="incident-card-title">{inc.title}</h3>

                <div className="incident-card-meta">
                  <span>📅 {new Date(inc.date).toLocaleDateString("en-GB", { year: "numeric", month: "short" })}</span>
                  <span>🌐 {inc.actor}</span>
                  <span>📡 {inc.domain}</span>
                </div>

                <p className="incident-card-summary">{inc.summary}</p>

                <div className="incident-card-tags">
                  {inc.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                  {inc.tags.length > 3 && (
                    <span className="tag-chip">+{inc.tags.length - 3}</span>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              No incidents match the current filters.
            </div>
          )}
        </div>
      </div>

      {selected && (
        <IncidentModal incident={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
