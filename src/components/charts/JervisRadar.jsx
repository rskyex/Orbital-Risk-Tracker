import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { getTypeColor } from "../../data/incidents";

const AXIS_DESC = {
  Legibility:    "How interpretable is the action? (1=ambiguous, 5=clear)",
  Reversibility: "Can it be quickly undone? (1=permanent, 5=instant)",
  Escalation:    "How much does it raise interstate tension? (1=low, 5=high)",
};

export default function JervisRadar({ incident }) {
  if (!incident) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:220, color:"var(--text-muted)", fontSize:13 }}>
        Select an incident to view its Jervis risk profile
      </div>
    );
  }

  const color = getTypeColor(incident.type);
  const data = [
    { axis: "Legibility",    value: incident.legibility,    full: 5 },
    { axis: "Reversibility", value: incident.reversibility, full: 5 },
    { axis: "Escalation",    value: incident.escalation,    full: 5 },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data} margin={{ top: 10, right: 24, bottom: 10, left: 24 }}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
          <Radar
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(v, _, props) => [`${v}/5`, AXIS_DESC[props.payload.axis]]}
            contentStyle={{ background: "var(--surface-2)", border: `1px solid ${color}44`, borderRadius: 8, fontSize: 12 }}
            labelStyle={{ display: "none" }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ display:"flex", justifyContent:"space-around", marginTop: 4 }}>
        {data.map((d) => (
          <div key={d.axis} style={{ textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--text-muted)" }}>{d.axis}</div>
            <div style={{ fontSize:20, fontWeight:800, color }}>{d.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
