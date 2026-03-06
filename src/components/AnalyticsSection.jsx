import { useState } from "react";
import { INCIDENTS, getTypeColor } from "../data/incidents";
import JervisRadar from "./charts/JervisRadar";
import ComparisonBar from "./charts/ComparisonBar";
import TimelineChart from "./charts/TimelineChart";
import IncidentModal from "./IncidentModal";

export default function AnalyticsSection() {
  const [radarTarget, setRadarTarget] = useState(INCIDENTS[3]); // Luch default
  const [modalTarget, setModalTarget] = useState(null);

  return (
    <section className="analytics-section" id="analytics">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-label">Risk Intelligence</p>
          <h2 className="section-title">Analytics</h2>
          <p className="section-subtitle">
            Quantitative analysis of space incidents using Jervis's three
            key variables: legibility, reversibility, and escalation potential.
          </p>
        </div>

        <div className="analytics-grid">
          {/* Jervis Radar — interactive incident selector */}
          <div className="analytics-card glass reveal">
            <p className="analytics-card-title">Jervis Risk Radar</p>
            <p className="analytics-card-desc">
              Click an incident below to view its 3-axis risk profile
            </p>
            <JervisRadar incident={radarTarget} />
            <div className="chart-incident-selector">
              {INCIDENTS.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => setRadarTarget(inc)}
                  style={{
                    background: radarTarget?.id === inc.id
                      ? getTypeColor(inc.type) + "22"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${radarTarget?.id === inc.id ? getTypeColor(inc.type) + "66" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 11,
                    color: radarTarget?.id === inc.id ? getTypeColor(inc.type) : "var(--text-muted)",
                    fontFamily: "var(--font)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {inc.title.length > 20 ? inc.title.slice(0, 20) + "…" : inc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Salami tactic breakdown */}
          <div className="analytics-card glass reveal">
            <p className="analytics-card-title">Salami Tactic Classification</p>
            <p className="analytics-card-desc">
              Breakdown of incidents by salami-tactic status and type
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:8 }}>
              {[
                { label:"Salami Tactics", items: INCIDENTS.filter(i=>i.salamiTactic), color:"#fbbf24" },
                { label:"Non-Salami",     items: INCIDENTS.filter(i=>!i.salamiTactic), color:"var(--text-muted)" },
              ].map(({ label, items, color }) => (
                <div key={label}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--text-secondary)", marginBottom:6 }}>
                    <span style={{ color }}>{label}</span>
                    <strong style={{ color:"var(--text-primary)" }}>{items.length}</strong>
                  </div>
                  <div style={{ height:6, background:"rgba(255,255,255,0.05)", borderRadius:3, marginBottom:10 }}>
                    <div style={{ height:"100%", width:`${(items.length/INCIDENTS.length)*100}%`, background:color, borderRadius:3 }} />
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                    {items.map(inc => (
                      <button
                        key={inc.id}
                        onClick={() => setModalTarget(inc)}
                        style={{
                          background:"rgba(255,255,255,0.04)",
                          border:"1px solid rgba(255,255,255,0.08)",
                          borderRadius:4,
                          padding:"2px 8px",
                          fontSize:10,
                          color:"var(--text-muted)",
                          fontFamily:"var(--font)",
                          cursor:"pointer",
                          transition:"all 0.15s",
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.color="var(--text-primary)";e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}}
                        onMouseLeave={e=>{e.currentTarget.style.color="var(--text-muted)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"}}
                      >
                        {inc.title.length > 22 ? inc.title.slice(0,22)+"…" : inc.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="analytics-card glass reveal analytics-card--wide">
            <p className="analytics-card-title">Incident Timeline (2007 – 2023)</p>
            <p className="analytics-card-desc">
              Dot size = severity · Position by type · Click for details
            </p>
            <TimelineChart onSelect={(d) => setModalTarget(INCIDENTS.find(i=>i.id===d.id))} />
          </div>

          {/* Comparison bar */}
          <div className="analytics-card glass reveal analytics-card--full">
            <p className="analytics-card-title">All Incidents — Jervis Axes Comparison</p>
            <p className="analytics-card-desc">
              Comparing legibility, reversibility, and escalation scores across
              all 13 incidents
            </p>
            <ComparisonBar />
          </div>
        </div>
      </div>

      {modalTarget && (
        <IncidentModal incident={modalTarget} onClose={() => setModalTarget(null)} />
      )}
    </section>
  );
}
