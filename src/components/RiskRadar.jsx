import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TYPE_COLORS } from "../data/incidents";

const AXIS_DESCRIPTIONS = {
  Legibility: "How interpretable is the action? (1=ambiguous, 5=clear)",
  Reversibility: "Can it be quickly undone? (1=permanent, 5=instant reversal)",
  Escalation: "How much does this raise interstate tension? (1=low, 5=high)",
};

export default function RiskRadar({ incident }) {
  if (!incident) return null;

  const data = [
    { axis: "Legibility", value: incident.legibility, full: 5 },
    { axis: "Reversibility", value: incident.reversibility, full: 5 },
    { axis: "Escalation", value: incident.escalation, full: 5 },
  ];

  const color = TYPE_COLORS[incident.type];

  return (
    <div>
      <p className="section-label">Jervis Risk Profile</p>
      <ResponsiveContainer width="100%" height={180}>
        <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="#2a3040" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <Radar
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value, name, props) => [
              `${value} / 5`,
              AXIS_DESCRIPTIONS[props.payload.axis] || props.payload.axis,
            ]}
            contentStyle={{ background: "#1e2535", border: `1px solid ${color}`, borderRadius: 6 }}
            labelStyle={{ display: "none" }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="radar-legend">
        {data.map((d) => (
          <div key={d.axis} className="radar-legend-item">
            <span className="radar-legend-axis">{d.axis}</span>
            <span className="radar-legend-score" style={{ color }}>
              {d.value}/5
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
