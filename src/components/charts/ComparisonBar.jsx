import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";
import { INCIDENTS } from "../../data/incidents";

export default function ComparisonBar() {
  const data = INCIDENTS.map((inc) => ({
    name:          inc.title.length > 18 ? inc.title.slice(0, 18) + "…" : inc.title,
    Legibility:    inc.legibility,
    Reversibility: inc.reversibility,
    Escalation:    inc.escalation,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="name" tick={{ fill:"var(--text-muted)", fontSize:9 }} interval={0} angle={-30} textAnchor="end" height={48} />
        <YAxis domain={[0,5]} tick={{ fill:"var(--text-muted)", fontSize:10 }} />
        <Tooltip
          contentStyle={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:8, fontSize:12 }}
          labelStyle={{ color:"var(--text-secondary)" }}
          itemStyle={{ color:"var(--text-primary)" }}
        />
        <Legend wrapperStyle={{ fontSize:11, color:"var(--text-secondary)" }} />
        <Bar dataKey="Legibility"    fill="#4488ff" radius={[2,2,0,0]} />
        <Bar dataKey="Reversibility" fill="#f59e0b" radius={[2,2,0,0]} />
        <Bar dataKey="Escalation"    fill="#ef4444" radius={[2,2,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
