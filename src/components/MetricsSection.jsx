import { useMemo, useEffect, useRef, useState } from "react";
import { INCIDENTS, INCIDENT_TYPES, SEVERITY_LEVELS } from "../data/incidents";

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
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value}</span>;
}

export default function MetricsSection() {
  const stats = useMemo(() => {
    const byType = Object.entries(INCIDENT_TYPES).map(([key, def]) => ({
      type: key,
      label: def.label,
      color: def.color,
      count: INCIDENTS.filter((i) => i.type === key).length,
    }));
    return {
      total:    INCIDENTS.length,
      salami:   INCIDENTS.filter((i) => i.salamiTactic).length,
      actors:   new Set(INCIDENTS.map((i) => i.actor)).size,
      critical: INCIDENTS.filter((i) => i.severity === "critical").length,
      yearSpan: `${Math.min(...INCIDENTS.map(i=>i.year))}–${Math.max(...INCIDENTS.map(i=>i.year))}`,
      byType,
    };
  }, []);

  const cards = [
    { icon: "📡", value: stats.total,    label: "Total Incidents",  desc: `${stats.yearSpan} documented`, color: "var(--cyan)" },
    { icon: "⚠️", value: stats.critical,  label: "Critical Events",  desc: "Highest severity rating",    color: "var(--red)" },
    { icon: "🔪", value: stats.salami,    label: "Salami Tactics",   desc: "Gradual, deniable actions",  color: "var(--amber)" },
    { icon: "🌐", value: stats.actors,    label: "State Actors",     desc: "Named responsible parties",  color: "var(--blue)" },
    { icon: "🛰", value: stats.byType.find(t=>t.type==="proximity")?.count ?? 0, label: "Proximity Ops", desc: "In-orbit maneuver events",    color: "var(--blue)" },
    { icon: "📶", value: stats.byType.find(t=>t.type==="jamming")?.count + stats.byType.find(t=>t.type==="spoofing")?.count, label: "EM Incidents",  desc: "Jamming & GPS spoofing",   color: "var(--amber)" },
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
                <AnimatedNumber target={c.value} />
              </div>
              <div className="metric-card-label">{c.label}</div>
              <div className="metric-card-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
