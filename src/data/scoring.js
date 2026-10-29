// ─── Derived scores ─────────────────────────────────────────────────────────
// One place for every computed score, so components never re-derive them.
//
// Axis directions (1–5, researcher-coded):
//   legibility    1 = covert            5 = fully transparent
//   reversibility 1 = irreversible      5 = instantly reversible
//   escalation    1 = negligible        5 = critical

/**
 * Risk Index, exactly 1–5. Low legibility (ambiguity), low reversibility
 * (lasting effects) and high escalation potential each raise risk.
 */
export function riskIndex(inc) {
  return ((6 - inc.legibility) + (6 - inc.reversibility) + inc.escalation) / 3;
}

/**
 * Salami tactic: an act that is not clearly interpretable (legibility ≤ 3)
 * and can be undone (reversibility ≥ 3). Each such step stays deniable and
 * below the threshold for a response, which is what lets a series of them
 * shift the status quo.
 */
export const SALAMI_RULE = "legibility ≤ 3 and reversibility ≥ 3";
export function isSalami(inc) {
  return inc.legibility <= 3 && inc.reversibility >= 3;
}

// ─── Governance risk ────────────────────────────────────────────────────────

/** Overall governance risk: equal-weighted mean of the four sub-scores, rounded. */
export function governanceOverall(components) {
  const v = Object.values(components);
  return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
}

// Adherence value of each treaty compliance status: formal participation
// counts 1, partial or pending 0.5, none 0.
const ADHERENCE = {
  ratified: 1,
  adopted: 1,
  signatory: 1,
  compliant: 1,
  partially_adopted: 0.5,
  filings_pending: 0.5,
  consensus_2019: 0.5,
  not_adopted: 0,
  non_signatory: 0,
  non_party: 0,
};

/**
 * Norm adherence risk (0–100) for a state, derived from its row in the treaty
 * compliance matrix: 100 × (1 − mean adherence across the instruments).
 * Returns null when the state has no row or a status has no adherence value.
 */
export function normAdherenceFromMatrix(matrix, columns, state) {
  const row = matrix.find((r) => r.actor === state);
  if (!row) return null;
  const vals = columns.map((c) => ADHERENCE[row[c.key]]);
  if (vals.some((v) => v === undefined)) return null;
  return Math.round(100 * (1 - vals.reduce((a, b) => a + b, 0) / vals.length));
}
