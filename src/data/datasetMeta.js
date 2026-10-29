// Dataset metadata and versioned exports for verifiers.
// Adds to (does not change) the incident data in ./incidents.js.
import { INCIDENTS } from "./incidents";
import { riskIndex } from "./scoring.js";

// Bump these whenever incident records change.
// DATASET_LAST_UPDATED is the date of the last change to src/data/incidents.js.
export const DATASET_VERSION = "1.3.0";
export const DATASET_LAST_UPDATED = "2026-10-29";
export const SITE_URL = "https://orbitalrisktracker.vercel.app";

/**
 * The four ILLUSTRATIVE records (ids 901 to 904) are fictional samples that
 * exist only so the analysis layers have coded examples. They are tagged
 * "ILLUSTRATIVE" in the source data.
 */
export const isIllustrative = (inc) =>
  Array.isArray(inc.tags) && inc.tags.includes("ILLUSTRATIVE");

export const DOCUMENTED_INCIDENTS = INCIDENTS.filter((i) => !isIllustrative(i));
export const ILLUSTRATIVE_INCIDENTS = INCIDENTS.filter(isIllustrative);

export const INCIDENT_COLUMNS = [
  { key: "id", description: "Record identifier. Ids 901 to 904 are illustrative." },
  { key: "illustrative", description: "true for the four fictional ILLUSTRATIVE samples, false for documented incidents." },
  { key: "title", description: "Incident title." },
  { key: "date", description: "Event date (YYYY-MM-DD; day or month may be approximate)." },
  { key: "year", description: "Event year." },
  { key: "actor", description: "Attributed or responsible actor, as recorded." },
  { key: "target", description: "Affected asset or system." },
  { key: "type", description: "Incident type code." },
  { key: "subtype", description: "Incident subtype." },
  { key: "orbit", description: "Orbital regime (LEO, MEO, GEO, HEO, ground)." },
  { key: "domain", description: "Domain of the effect." },
  { key: "latitude", description: "Plotted latitude (approximate, for display)." },
  { key: "longitude", description: "Plotted longitude (approximate, for display)." },
  { key: "severity", description: "low, medium, high or critical." },
  { key: "confidence", description: "Confidence in the account of the event." },
  { key: "legibility", description: "Jervis-based score, 1 to 5 (researcher judgement)." },
  { key: "reversibility", description: "Jervis-based score, 1 (irreversible) to 5 (instantly reversible) (researcher judgement)." },
  { key: "escalation", description: "Jervis-based score, 1 to 5 (researcher judgement)." },
  { key: "salamiTactic", description: "Computed: true when legibility ≤ 3 and reversibility ≥ 3 (src/data/scoring.js)." },
  { key: "riskIndex", description: "Computed: ((6 − legibility) + (6 − reversibility) + escalation) / 3, range 1–5." },
  { key: "tags", description: "Tags, separated by \" | \"." },
  { key: "source", description: "Source citation text." },
  { key: "sourceTitle", description: "Short source title." },
  { key: "sourceType", description: "official, thinktank, company, aviation or media." },
  { key: "sourceUrl", description: "Source URL, where recorded." },
  { key: "sources", description: "All source URLs, separated by \" | \", where a record lists several." },
  { key: "summary", description: "Short summary." },
];

function csvCell(v) {
  if (v === null || v === undefined) return "";
  const s = Array.isArray(v) ? v.join(" | ") : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function incidentsMeta() {
  return {
    dataset: "Orbital Risk Tracker: space security incidents",
    version: DATASET_VERSION,
    lastUpdated: DATASET_LAST_UPDATED,
    recordCount: INCIDENTS.length,
    documentedCount: DOCUMENTED_INCIDENTS.length,
    illustrativeCount: ILLUSTRATIVE_INCIDENTS.length,
    note: "Records with illustrative=true are fictional samples and must not be cited as events.",
    source: `${SITE_URL}/#/data`,
  };
}

const withFlag = (inc) => ({ ...inc, illustrative: isIllustrative(inc), riskIndex: Number(riskIndex(inc).toFixed(2)) });

export function incidentsJson() {
  return JSON.stringify({ meta: incidentsMeta(), records: INCIDENTS.map(withFlag) }, null, 2);
}

export function incidentsCsv() {
  const meta = incidentsMeta();
  const head = Object.entries(meta).map(([k, v]) => `# ${k}: ${v}`);
  const header = INCIDENT_COLUMNS.map((c) => c.key).join(",");
  const rows = INCIDENTS.map(withFlag).map((r) =>
    INCIDENT_COLUMNS.map((c) => csvCell(c.key === "sources" ? r.sources?.map((s) => s.url) : r[c.key])).join(",")
  );
  return [...head, header, ...rows].join("\n");
}

export function downloadText(filename, content, mime) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
