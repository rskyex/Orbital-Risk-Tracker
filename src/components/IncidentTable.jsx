import { TYPE_COLORS, TYPE_LABELS } from "../data/incidents";

export default function IncidentTable({ incidents, selected, onSelect }) {
  return (
    <div className="table-wrapper">
      <p className="section-label" style={{ marginBottom: 8 }}>
        Incident Log — {incidents.length} records
      </p>
      <div className="table-scroll">
        <table className="incident-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Incident</th>
              <th>Actor</th>
              <th>Type</th>
              <th>Domain</th>
              <th>Salami</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => {
              const isSelected = selected?.id === inc.id;
              const color = TYPE_COLORS[inc.type];
              return (
                <tr
                  key={inc.id}
                  className={`table-row ${isSelected ? "table-row--selected" : ""}`}
                  onClick={() => onSelect(inc)}
                  style={{ borderLeft: isSelected ? `3px solid ${color}` : "3px solid transparent" }}
                >
                  <td className="td-date">
                    {new Date(inc.date).toLocaleDateString("en-GB", { year: "numeric", month: "short" })}
                  </td>
                  <td className="td-title">{inc.title}</td>
                  <td>{inc.actor}</td>
                  <td>
                    <span
                      className="type-pill"
                      style={{ background: color + "22", color, border: `1px solid ${color}55` }}
                    >
                      {TYPE_LABELS[inc.type]}
                    </span>
                  </td>
                  <td>
                    <span className="domain-tag">{inc.domain}</span>
                  </td>
                  <td className="td-salami">
                    {inc.salamiTactic ? (
                      <span className="salami-yes">🔪 Yes</span>
                    ) : (
                      <span className="salami-no">— No</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
