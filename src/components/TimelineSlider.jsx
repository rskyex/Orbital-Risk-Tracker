import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { INCIDENTS } from "../data/incidents";

// Build mock historical debris count data
const HISTORICAL_DATA = [
  { year: 2000, tracked: 8800, conjunctions: 180, leoSats: 620 },
  { year: 2001, tracked: 9100, conjunctions: 195, leoSats: 640 },
  { year: 2002, tracked: 9300, conjunctions: 210, leoSats: 660 },
  { year: 2003, tracked: 9500, conjunctions: 220, leoSats: 680 },
  { year: 2004, tracked: 9700, conjunctions: 235, leoSats: 700 },
  { year: 2005, tracked: 9900, conjunctions: 250, leoSats: 720 },
  { year: 2006, tracked: 10100, conjunctions: 265, leoSats: 740 },
  { year: 2007, tracked: 13800, conjunctions: 820, leoSats: 760, event: "FY-1C ASAT" },
  { year: 2008, tracked: 14200, conjunctions: 890, leoSats: 780 },
  { year: 2009, tracked: 16400, conjunctions: 1250, leoSats: 800, event: "Cosmos-Iridium" },
  { year: 2010, tracked: 16800, conjunctions: 1320, leoSats: 830 },
  { year: 2011, tracked: 17100, conjunctions: 1380, leoSats: 860 },
  { year: 2012, tracked: 17400, conjunctions: 1420, leoSats: 900 },
  { year: 2013, tracked: 17700, conjunctions: 1480, leoSats: 940 },
  { year: 2014, tracked: 18000, conjunctions: 1540, leoSats: 990 },
  { year: 2015, tracked: 18300, conjunctions: 1590, leoSats: 1050 },
  { year: 2016, tracked: 18600, conjunctions: 1650, leoSats: 1120 },
  { year: 2017, tracked: 18900, conjunctions: 1720, leoSats: 1200 },
  { year: 2018, tracked: 19200, conjunctions: 1800, leoSats: 1400 },
  { year: 2019, tracked: 19800, conjunctions: 1900, leoSats: 1800, event: "Starlink begins" },
  { year: 2020, tracked: 20400, conjunctions: 2200, leoSats: 2400 },
  { year: 2021, tracked: 23200, conjunctions: 3100, leoSats: 3600, event: "Cosmos 1408 ASAT" },
  { year: 2022, tracked: 25100, conjunctions: 3600, leoSats: 4800 },
  { year: 2023, tracked: 27400, conjunctions: 4100, leoSats: 6200 },
  { year: 2024, tracked: 29200, conjunctions: 4800, leoSats: 8400, event: "Thousand Sails begins" },
  { year: 2025, tracked: 29300, conjunctions: 5000, leoSats: 10400 },
];

export default function TimelineSlider() {
  const [range, setRange] = useState([2000, 2025]);
  const [metric, setMetric] = useState("tracked");

  const filteredData = useMemo(
    () => HISTORICAL_DATA.filter((d) => d.year >= range[0] && d.year <= range[1]),
    [range]
  );

  const eventYears = HISTORICAL_DATA.filter((d) => d.event).map((d) => d.year);

  const metricLabel = {
    tracked: "Tracked Objects",
    conjunctions: "Annual Conjunctions (<1 km)",
    leoSats: "Active LEO Satellites",
  };

  const metricColor = {
    tracked: "#ef4444",
    conjunctions: "#f59e0b",
    leoSats: "#4488ff",
  };

  return (
    <div className="data-layer-panel glass reveal" id="timeline-slider">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Temporal Analysis</p>
          <h3 className="data-layer-title">Orbital Risk Evolution</h3>
          <p className="data-layer-desc">
            Track the growth of orbital congestion, conjunction rates, and active satellite
            populations over a configurable time period.
          </p>
        </div>
      </div>

      {/* Metric toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {Object.entries(metricLabel).map(([key, label]) => (
          <button
            key={key}
            className={`regime-toggle ${metric === key ? "regime-toggle--active" : ""}`}
            style={metric === key ? { borderColor: metricColor[key], color: metricColor[key] } : {}}
            onClick={() => setMetric(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={filteredData} margin={{ top: 8, right: 8, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
          <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
            formatter={(v) => [v.toLocaleString(), metricLabel[metric]]}
            labelFormatter={(l) => {
              const d = HISTORICAL_DATA.find((h) => h.year === l);
              return d?.event ? `${l} — ${d.event}` : l;
            }}
          />
          {eventYears.filter((y) => y >= range[0] && y <= range[1]).map((y) => (
            <ReferenceLine key={y} x={y} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
          ))}
          <Area
            type="monotone"
            dataKey={metric}
            stroke={metricColor[metric]}
            fill={metricColor[metric]}
            fillOpacity={0.12}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Slider */}
      <div className="timeline-slider-controls">
        <div className="timeline-slider-labels">
          <span>{range[0]}</span>
          <span>{range[1]}</span>
        </div>
        <div className="timeline-dual-slider">
          <input
            type="range"
            min={2000}
            max={2025}
            value={range[0]}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (v < range[1]) setRange([v, range[1]]);
            }}
            className="timeline-range-input"
          />
          <input
            type="range"
            min={2000}
            max={2025}
            value={range[1]}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (v > range[0]) setRange([range[0], v]);
            }}
            className="timeline-range-input"
          />
        </div>
      </div>

      {/* Key events */}
      <div className="timeline-events">
        {HISTORICAL_DATA.filter((d) => d.event && d.year >= range[0] && d.year <= range[1]).map((d) => (
          <span key={d.year} className="timeline-event-tag">
            {d.year}: {d.event}
          </span>
        ))}
      </div>
    </div>
  );
}
