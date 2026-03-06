import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RiskBarChart({ incidents }) {
  const data = incidents.map((inc) => ({
    name: inc.title.length > 22 ? inc.title.slice(0, 22) + "…" : inc.title,
    Legibility: inc.legibility,
    Reversibility: inc.reversibility,
    Escalation: inc.escalation,
  }));

  return (
    <div className="barchart-wrapper">
      <p className="section-label" style={{ marginBottom: 8 }}>
        Jervis Framework — All Incidents Comparison
      </p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 10, left: -20, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2535" />
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 9 }} />
          <YAxis domain={[0, 5]} tick={{ fill: "#64748b", fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: "#1e2535", border: "1px solid #334155", borderRadius: 6 }}
            labelStyle={{ color: "#94a3b8" }}
            itemStyle={{ color: "#e2e8f0" }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
          <Bar dataKey="Legibility" fill="#4f7cff" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Reversibility" fill="#f59e0b" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Escalation" fill="#ef4444" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
