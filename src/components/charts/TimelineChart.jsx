import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";
import { INCIDENTS, getTypeColor, INCIDENT_TYPES } from "../../data/incidents";

const TYPE_ORDER = ["proximity", "jamming", "spoofing", "asat", "cyber"];

export default function TimelineChart({ onSelect }) {
  const data = INCIDENTS.map((inc) => ({
    ...inc,
    x: inc.year,
    y: TYPE_ORDER.indexOf(inc.type),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:8, padding:"10px 14px", fontSize:12 }}>
        <div style={{ fontWeight:700, color:"var(--text-primary)", marginBottom:4 }}>{d.title}</div>
        <div style={{ color: getTypeColor(d.type) }}>{INCIDENT_TYPES[d.type]?.label}</div>
        <div style={{ color:"var(--text-muted)" }}>{d.actor} · {d.year}</div>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ScatterChart margin={{ top: 8, right: 16, left: 4, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="x"
          type="number"
          domain={[2005, 2025]}
          tickCount={10}
          tick={{ fill:"var(--text-muted)", fontSize:10 }}
          label={{ value:"Year", fill:"var(--text-muted)", fontSize:11, position:"insideBottomRight", offset:-4 }}
        />
        <YAxis
          dataKey="y"
          type="number"
          domain={[-0.5, TYPE_ORDER.length - 0.5]}
          tickCount={TYPE_ORDER.length}
          tickFormatter={(v) => INCIDENT_TYPES[TYPE_ORDER[Math.round(v)]]?.label ?? ""}
          tick={{ fill:"var(--text-muted)", fontSize:9 }}
          width={82}
        />
        <Tooltip content={<CustomTooltip />} />
        {[2014, 2022].map((y) => (
          <ReferenceLine key={y} x={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
        ))}
        <Scatter
          data={data}
          onClick={(d) => onSelect?.(d)}
          style={{ cursor: "pointer" }}
        >
          {data.map((d) => (
            <Cell
              key={d.id}
              fill={getTypeColor(d.type)}
              opacity={0.85}
              r={d.severity === "critical" ? 10 : d.severity === "high" ? 8 : 6}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
