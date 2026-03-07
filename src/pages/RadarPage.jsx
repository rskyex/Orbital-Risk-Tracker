import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { INCIDENTS, INCIDENT_TYPES, getTypeColor, getSeverityColor, SEVERITY_LEVELS } from "../data/incidents";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const AXES = [
  { key:"legibility",    label:"Legibility",    color:"var(--blue)",   low:"Highly ambiguous (dual-use)", high:"Clearly interpretable (aggressive)" },
  { key:"reversibility", label:"Reversibility", color:"var(--amber)",  low:"Permanent / irreversible",    high:"Instantly reversible" },
  { key:"escalation",    label:"Escalation",    color:"var(--red)",    low:"Minimal interstate tension",  high:"Severe / near-war tension" },
];

function RadarCard({ incident, color }) {
  if (!incident) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:240, color:"var(--text-muted)", fontSize:13 }}>
      Select an incident to view its profile
    </div>
  );

  const data = AXES.map((ax) => ({ axis: ax.label, value: incident[ax.key], full: 5 }));

  return (
    <>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} margin={{ top:10, right:30, bottom:10, left:30 }}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill:"var(--text-secondary)", fontSize:13, fontWeight:600 }} />
          <Radar dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2.5} />
          <Tooltip
            formatter={(v,_,p) => [`${v}/5`, p.payload.axis]}
            contentStyle={{ background:"var(--surface-2)", border:`1px solid ${color}44`, borderRadius:8, fontSize:12 }}
            labelStyle={{ display:"none" }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ display:"flex", justifyContent:"space-around", marginTop:8, marginBottom:16 }}>
        {AXES.map((ax) => (
          <div key={ax.key} style={{ textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--text-muted)", marginBottom:2 }}>{ax.label}</div>
            <div style={{ fontSize:22, fontWeight:800, color:ax.color }}>{incident[ax.key]}<span style={{ fontSize:12, color:"var(--text-muted)" }}>/5</span></div>
            <div style={{ height:3, background:"rgba(255,255,255,0.1)", borderRadius:2, marginTop:4, width:48, margin:"4px auto 0" }}>
              <div style={{ height:"100%", width:`${incident[ax.key]*20}%`, background:ax.color, borderRadius:2 }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CompareRadar({ a, b }) {
  if (!a || !b) return null;
  const colorA = getTypeColor(a.type);
  const colorB = getTypeColor(b.type);
  const data = AXES.map((ax) => ({ axis: ax.label, A: a[ax.key], B: b[ax.key] }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data} margin={{ top:10, right:30, bottom:10, left:30 }}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis dataKey="axis" tick={{ fill:"var(--text-secondary)", fontSize:12 }} />
        <Radar name={a.title.slice(0,20)} dataKey="A" stroke={colorA} fill={colorA} fillOpacity={0.15} strokeWidth={2} />
        <Radar name={b.title.slice(0,20)} dataKey="B" stroke={colorB} fill={colorB} fillOpacity={0.15} strokeWidth={2} />
        <Tooltip contentStyle={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:8, fontSize:12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default function RadarPage() {
  const [primary,   setPrimary]   = useState(INCIDENTS[8]);  // Luch
  const [compare,   setCompare]   = useState(INCIDENTS[19]); // Nudol
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() =>
    typeFilter === "all" ? INCIDENTS : INCIDENTS.filter(i => i.type === typeFilter),
    [typeFilter]
  );

  const riskIndex = (inc) =>
    (((5 - inc.legibility) + inc.reversibility + inc.escalation) / 3).toFixed(1);

  return (
    <div className="page-wrapper">
      <div className="section-container">
        {/* Breadcrumb */}
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link">← Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>Jervis Risk Radar</span>
        </div>

        <div className="section-header">
          <p className="section-label">Analytical Framework</p>
          <h1 className="section-title">Jervis Risk Radar</h1>
          <p className="section-subtitle">
            Interactive 3-axis risk profiling of space security incidents using Robert Jervis's
            security dilemma framework (1978). Select incidents to visualise and compare their
            Legibility, Reversibility, and Escalation Potential scores.
          </p>
        </div>

        {/* Framework summary */}
        <div className="glass radar-framework-row reveal">
          {AXES.map((ax) => (
            <div key={ax.key} className="radar-axis-card">
              <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:ax.color, marginBottom:6 }}>
                {ax.label}
              </div>
              <div style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.6 }}>
                <strong style={{ color:"var(--text-primary)" }}>Score 1:</strong> {ax.low}
                <br />
                <strong style={{ color:"var(--text-primary)" }}>Score 5:</strong> {ax.high}
              </div>
            </div>
          ))}
        </div>

        {/* Main layout */}
        <div className="radar-page-grid">
          {/* Left: incident selector */}
          <div>
            <div className="glass" style={{ padding:"20px" }}>
              <p className="section-label" style={{ marginBottom:12 }}>Select Primary Incident</p>
              <div className="filter-group" style={{ marginBottom:12 }}>
                <button className={`filter-pill ${typeFilter==="all"?"filter-pill--active":""}`}
                  onClick={() => setTypeFilter("all")}>All</button>
                {Object.entries(INCIDENT_TYPES).map(([k,d]) => (
                  <button key={k}
                    className={`filter-pill ${typeFilter===k?"filter-pill--active":""}`}
                    onClick={() => setTypeFilter(k)}>{d.label}</button>
                ))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:440, overflowY:"auto" }}>
                {filtered.map((inc) => {
                  const tc = getTypeColor(inc.type);
                  const isP = primary?.id === inc.id;
                  const isC = compare?.id === inc.id;
                  return (
                    <div key={inc.id} style={{
                      display:"flex", alignItems:"center", gap:8,
                      padding:"8px 10px", borderRadius:8, cursor:"pointer",
                      background: isP ? tc+"18" : isC ? tc+"0a" : "rgba(255,255,255,0.03)",
                      border:`1px solid ${isP ? tc+"66" : isC ? tc+"33" : "rgba(255,255,255,0.06)"}`,
                      transition:"all 0.15s",
                    }}>
                      <button onClick={() => setPrimary(inc)} style={{
                        flex:1, background:"none", border:"none", textAlign:"left",
                        color: isP ? "var(--text-primary)" : "var(--text-secondary)",
                        fontSize:12, fontFamily:"var(--font)", cursor:"pointer",
                      }}>
                        <div style={{ fontWeight: isP ? 700 : 400, marginBottom:2 }}>
                          {isP && "● "}{inc.title}
                        </div>
                        <div style={{ fontSize:10, color:"var(--text-muted)" }}>
                          {inc.actor} · {inc.year} · Risk {riskIndex(inc)}/5
                        </div>
                      </button>
                      <button onClick={() => setCompare(compare?.id===inc.id ? null : inc)}
                        style={{
                          fontSize:10, padding:"2px 8px", borderRadius:4, cursor:"pointer",
                          background: isC ? tc+"22" : "rgba(255,255,255,0.04)",
                          border:`1px solid ${isC ? tc+"55" : "rgba(255,255,255,0.08)"}`,
                          color: isC ? tc : "var(--text-muted)", fontFamily:"var(--font)",
                          whiteSpace:"nowrap",
                        }}>
                        {isC ? "✓ Compare" : "Compare"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: charts */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {/* Primary radar */}
            <div className="glass" style={{ padding:"24px" }}>
              <p className="analytics-card-title" style={{ marginBottom:4 }}>
                {primary ? primary.title : "No incident selected"}
              </p>
              {primary && (
                <p className="analytics-card-desc">
                  {primary.actor} · {primary.year} ·{" "}
                  <span style={{ color: getSeverityColor(primary.severity) }}>
                    {SEVERITY_LEVELS[primary.severity]?.label}
                  </span>
                  {primary.salamiTactic && " · 🔪 Salami Tactic"}
                </p>
              )}
              <RadarCard incident={primary} color={primary ? getTypeColor(primary.type) : "#4488ff"} />
              {primary && (
                <p style={{ fontSize:12, color:"var(--text-secondary)", lineHeight:1.7, borderTop:"1px solid var(--border)", paddingTop:12 }}>
                  {primary.summary}
                </p>
              )}
            </div>

            {/* Comparison radar */}
            {compare && compare.id !== primary?.id && (
              <div className="glass" style={{ padding:"24px" }}>
                <p className="analytics-card-title" style={{ marginBottom:4 }}>
                  Comparison: {primary?.title?.slice(0,24)}… vs {compare?.title?.slice(0,24)}…
                </p>
                <p className="analytics-card-desc">
                  Overlay of both Jervis profiles — blue vs{" "}
                  <span style={{ color: getTypeColor(compare.type) }}>
                    {INCIDENT_TYPES[compare.type]?.label}
                  </span>
                </p>
                <CompareRadar a={primary} b={compare} />
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:12 }}>
                  {[primary, compare].map((inc) => inc && (
                    <div key={inc.id} style={{
                      background:"rgba(255,255,255,0.03)", borderRadius:8,
                      padding:"10px 14px", borderLeft:`3px solid ${getTypeColor(inc.type)}`,
                    }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"var(--text-primary)", marginBottom:4 }}>{inc.title}</div>
                      <div style={{ fontSize:11, color:"var(--text-muted)" }}>
                        Legibility {inc.legibility} · Reversibility {inc.reversibility} · Escalation {inc.escalation}
                      </div>
                      <div style={{ fontSize:11, color: getTypeColor(inc.type), marginTop:2 }}>
                        Risk Index: {riskIndex(inc)}/5
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scoring note */}
            <div className="glass" style={{ padding:"20px" }}>
              <p className="section-label">Scoring Note</p>
              <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.7 }}>
                Scores reflect the author's analytical judgement based on public source material.
                Alternative interpretations are defensible. The framework operationalises{" "}
                <strong style={{ color:"var(--text-primary)" }}>Jervis (1978)</strong>,
                adapted for cyber and space domains where offense-defense distinguishability is
                inherently lower than in conventional military contexts.{" "}
                <Link to="/methodology" style={{ color:"var(--cyan)" }}>Full methodology →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
