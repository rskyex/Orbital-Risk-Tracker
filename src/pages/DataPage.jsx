import { Link } from "react-router-dom";
import StarField from "../components/StarField";
import {
  DATASET_VERSION,
  DATASET_LAST_UPDATED,
  INCIDENT_COLUMNS,
  DOCUMENTED_INCIDENTS,
  ILLUSTRATIVE_INCIDENTS,
  incidentsMeta,
  incidentsCsv,
  incidentsJson,
  downloadText,
} from "../data/datasetMeta";

const BASE_NAME = `orbital-risk-tracker-incidents-v${DATASET_VERSION}`;

export default function DataPage() {
  const meta = incidentsMeta();
  const stats = [
    { label: "Version", value: DATASET_VERSION, id: "orb-version" },
    { label: "Last updated", value: DATASET_LAST_UPDATED, id: "orb-updated" },
    { label: "Records", value: meta.recordCount, id: "orb-count" },
    { label: "Documented / illustrative", value: `${meta.documentedCount} + ${meta.illustrativeCount}`, id: "orb-split" },
  ];
  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <StarField className="page-stars" />
      <div className="sources-page">
        <div className="method-header">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Dataset Downloads
          </div>
          <h1 className="method-title">Data</h1>
          <p className="method-subtitle">
            Download the incident dataset behind the tracker. Files are generated in your
            browser from the same records the site uses.
          </p>
        </div>

        <div className="data-stats">
          {stats.map((s) => (
            <div key={s.id} className="data-stat glass" data-testid={s.id}>
              <div className="data-stat-label">{s.label}</div>
              <div className="data-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="data-actions">
          <button type="button" className="data-btn data-btn--primary"
            onClick={() => downloadText(`${BASE_NAME}.csv`, incidentsCsv(), "text/csv")}>
            Download CSV
          </button>
          <button type="button" className="data-btn"
            onClick={() => downloadText(`${BASE_NAME}.json`, incidentsJson(), "application/json")}>
            Download JSON
          </button>
        </div>

        <div className="data-note data-note--warn" role="note">
          <strong>{ILLUSTRATIVE_INCIDENTS.length} records are illustrative and fictional.</strong>{" "}
          Records {ILLUSTRATIVE_INCIDENTS.map((i) => i.id).join(", ")} exist only so the
          analysis layers have coded examples. They carry <code>illustrative: true</code> in
          both files and must not be cited as events. The other {DOCUMENTED_INCIDENTS.length}{" "}
          records are documented incidents compiled from public sources, listed on the{" "}
          <Link to="/data-sources">Data Sources</Link> page.
        </div>

        <div className="data-note">
          Both files carry the dataset version, last-updated date and record counts. In the
          JSON they sit under <code>meta</code> with the records under <code>records</code>. In
          the CSV they are comment lines starting with <code>#</code> at the top (in pandas, read
          with <code>comment="#"</code>). Scores are researcher judgement; see the methodology.
        </div>

        <h2 className="data-h2">CSV columns</h2>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Column</th><th>Description</th></tr>
            </thead>
            <tbody>
              {INCIDENT_COLUMNS.map((c) => (
                <tr key={c.key}><td><code>{c.key}</code></td><td>{c.description}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
