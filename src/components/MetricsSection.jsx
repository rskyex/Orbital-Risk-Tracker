import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { INCIDENTS, INCIDENT_TYPES } from "../data/incidents";
import { DOCUMENTED_INCIDENTS, ILLUSTRATIVE_INCIDENTS } from "../data/datasetMeta";

function AnimatedNumber({ target, duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1);
          setValue(Math.round(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value}</span>;
}

export default function MetricsSection() {
  // Headline counters show documented incidents only by default. The four
  // ILLUSTRATIVE records are fictional samples; a verifier can opt in to see
  // them counted, and the label says so.
  const [includeIllustrative, setIncludeIllustrative] = useState(false);
  const stats = useMemo(() => {
    const INCIDENTS_IN_SCOPE = includeIllustrative ? INCIDENTS : DOCUMENTED_INCIDENTS;
    const byType = Object.entries(INCIDENT_TYPES).map(([key, def]) => ({
      type: key,
      label: def.label,
      color: def.color,
      count: INCIDENTS_IN_SCOPE.filter((i) => i.type === key).length,
    }));
    return {
      total:    INCIDENTS_IN_SCOPE.length,
      salami:   INCIDENTS_IN_SCOPE.filter((i) => i.salamiTactic).length,
      actors:   new Set(INCIDENTS_IN_SCOPE.map((i) => i.actor)).size,
      critical: INCIDENTS_IN_SCOPE.filter((i) => i.severity === "critical").length,
      yearSpan: `${Math.min(...INCIDENTS_IN_SCOPE.map(i=>i.year))} to ${Math.max(...INCIDENTS_IN_SCOPE.map(i=>i.year))}`,
      byType,
    };
  }, [includeIllustrative]);

  const cards = [
    { icon: "📡", value: stats.total,    label: "Total Incidents",  desc: includeIllustrative ? `${stats.yearSpan}, incl. ${ILLUSTRATIVE_INCIDENTS.length} illustrative` : `${stats.yearSpan} documented`, color: "var(--cyan)" },
    { icon: "⚠️", value: stats.critical,  label: "Critical Events",  desc: "Highest severity rating",    color: "var(--red)" },
    { icon: "🔪", value: stats.salami,    label: "Salami Tactics",   desc: "Gradual, deniable actions",  color: "var(--amber)" },
    { icon: "🌐", value: stats.actors,    label: "State Actors",     desc: includeIllustrative ? "Distinct actor labels, incl. fictional ones" : "Distinct attributed actors",  color: "var(--blue)" },
    { icon: "🛰", value: stats.byType.find(t=>t.type==="proximity")?.count ?? 0, label: "Proximity Ops", desc: "In-orbit maneuver events",    color: "var(--blue)" },
    { icon: "📶", value: (stats.byType.find(t=>t.type==="jamming")?.count ?? 0) + (stats.byType.find(t=>t.type==="spoofing")?.count ?? 0), label: "EM Incidents",  desc: "Jamming & GPS spoofing",   color: "var(--amber)" },
  ];

  return (
    <section className="metrics-section" id="metrics">
      <div className="section-container">
        <div className="metrics-grid">
          {cards.map((c) => (
            <div
              key={c.label}
              className="metric-card glass reveal"
              style={{ "--card-color": c.color }}
            >
              <span className="metric-card-icon">{c.icon}</span>
              <div className="metric-card-value">
                <AnimatedNumber key={`${c.label}-${includeIllustrative}`} target={c.value} />
              </div>
              <div className="metric-card-label">{c.label}</div>
              <div className="metric-card-desc">{c.desc}</div>
            </div>
          ))}
        </div>
        <div className="illustrative-note" data-testid="illustrative-note">
          <span>
            Dataset: <strong>{DOCUMENTED_INCIDENTS.length} documented</strong> +{" "}
            <strong>{ILLUSTRATIVE_INCIDENTS.length} illustrative</strong> (fictional samples).{" "}
            {includeIllustrative
              ? "Counters above include the illustrative records."
              : "Counters above show documented incidents only."}
          </span>
          <label className="illustrative-toggle">
            <input
              type="checkbox"
              checked={includeIllustrative}
              onChange={(e) => setIncludeIllustrative(e.target.checked)}
              data-testid="illustrative-toggle"
            />
            Include illustrative records
          </label>
          <Link to="/data">Download the data</Link>
        </div>
      </div>
    </section>
  );
}
