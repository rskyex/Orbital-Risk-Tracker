import { Link } from "react-router-dom";
import StarField from "../components/StarField";

const AXES = [
  {
    key: "legibility",
    label: "Legibility",
    color: "#4488ff",
    description:
      "How clearly can the targeted state identify the actor and intent behind the incident? Low legibility enables deniability and ambiguity.",
    rubric: [
      { score: 1, text: "Completely covert — no observable signature" },
      { score: 2, text: "Technically detectable but attribution contested" },
      { score: 3, text: "Observable but actor motive disputed" },
      { score: 4, text: "Observable; attribution probable but not formally confirmed" },
      { score: 5, text: "Fully transparent — public statement or undeniable signature" },
    ],
  },
  {
    key: "reversibility",
    label: "Reversibility",
    color: "#f59e0b",
    description:
      "Can the effects of the incident be undone? Higher scores are more reversible. Irreversible actions (e.g., kinetic ASAT debris) permanently alter the operational environment and score 1.",
    rubric: [
      { score: 1, text: "Irreversible — asset destroyed, debris generated, or permanent disruption" },
      { score: 2, text: "Long-term effects (years); asset damaged but not destroyed" },
      { score: 3, text: "Medium-term effects (weeks to months)" },
      { score: 4, text: "Short-term effects (hours to days)" },
      { score: 5, text: "Fully reversible — effect ends when action stops" },
    ],
  },
  {
    key: "escalation",
    label: "Escalation Potential",
    color: "#ef4444",
    description:
      "How likely is the incident to trigger a retaliatory or escalatory response? Incidents that cross red lines or involve direct military assets score higher.",
    rubric: [
      { score: 1, text: "Negligible — no credible escalatory pathway" },
      { score: 2, text: "Low — unlikely to provoke direct response" },
      { score: 3, text: "Moderate — could trigger diplomatic protest or limited response" },
      { score: 4, text: "High — crosses established norms; military response plausible" },
      { score: 5, text: "Critical — direct attack on military asset; escalation likely" },
    ],
  },
];

const CONFIDENCE_ROWS = [
  { level: "Confirmed", color: "#10b981", definition: "Officially acknowledged by the perpetrating or targeted state, or verified by multiple independent technical analyses." },
  { level: "High", color: "#4488ff", definition: "Strong technical or documentary evidence from credible sources; no significant counter-attribution." },
  { level: "Medium", color: "#f59e0b", definition: "Credible reporting from established institutions, but some ambiguity remains in attribution or effect." },
  { level: "Contested", color: "#ef4444", definition: "Attribution disputed between major actors, or significant evidence gaps remain." },
];

export default function MethodologyPage() {
  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <StarField className="page-stars" />

      <div className="methodology-page">
        {/* Header */}
        <div className="method-header">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Framework Documentation
          </div>
          <h1 className="method-title">Methodology</h1>
          <p className="method-subtitle">
            How incidents are selected, scored, and classified in the Orbital Risk Tracker.
          </p>
        </div>

        {/* Project Purpose */}
        <section className="method-section">
          <h2 className="method-section-title">Project Purpose</h2>
          <p className="method-body">
            The Orbital Risk Tracker is a portfolio research project designed to apply international
            relations theory — specifically Robert Jervis's 1978 security dilemma framework — to
            real-world space security incidents. The goal is to surface patterns in how states use
            ambiguity, reversibility, and escalation management to pursue strategic objectives in
            the space domain while maintaining plausible deniability.
          </p>
          <p className="method-body">
            All incidents are drawn from publicly available, academically and journalistically
            credible sources. No classified information is used or implied. This project is
            intended for educational, research, and career portfolio purposes.
          </p>
          <p className="method-body" style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
            Compiled by Risa Koyanagi · Last updated March 2026
          </p>
        </section>

        {/* Jervis Framework */}
        <section className="method-section">
          <h2 className="method-section-title">The Jervis Security Dilemma Framework</h2>
          <p className="method-body">
            Robert Jervis's 1978 paper <em>"Cooperation Under the Security Dilemma"</em> (World
            Politics, 30:2) introduced the distinction between{" "}
            <strong>offense-defense differentiation</strong> and{" "}
            <strong>offense-defense balance</strong>. In contexts where offensive and defensive
            capabilities are indistinguishable, states face heightened uncertainty and incentives
            to act preemptively.
          </p>
          <p className="method-body">
            Space is a domain of near-perfect offense-defense ambiguity: proximity operations,
            jamming, and cyber intrusions can serve either intelligence-gathering or attack
            preparation — often simultaneously. This project operationalizes the security dilemma
            through three empirically assessable dimensions:
          </p>

          <div className="method-axes-grid">
            {AXES.map((ax) => (
              <div key={ax.key} className="method-axis-card" style={{ borderColor: ax.color + "44" }}>
                <div className="method-axis-header">
                  <span className="method-axis-dot" style={{ background: ax.color }} />
                  <h3 className="method-axis-name" style={{ color: ax.color }}>{ax.label}</h3>
                </div>
                <p className="method-axis-desc">{ax.description}</p>

                <table className="method-rubric-table">
                  <thead>
                    <tr>
                      <th>Score</th>
                      <th>Definition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ax.rubric.map((r) => (
                      <tr key={r.score}>
                        <td>
                          <span className="method-score-badge" style={{ background: ax.color + "22", color: ax.color }}>
                            {r.score}
                          </span>
                        </td>
                        <td>{r.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Index */}
        <section className="method-section">
          <h2 className="method-section-title">Risk Index Calculation</h2>
          <p className="method-body">
            The composite Risk Index condenses the three Jervis axes into a single score on
            exactly 1–5, rising for low-visibility, irreversible and escalatory actions:
          </p>
          <div className="method-formula-box">
            <code>Risk Index = ((6 − Legibility) + (6 − Reversibility) + Escalation) / 3</code>
          </div>
          <p className="method-body">
            Legibility and Reversibility are <em>inverted</em> (6 − score): low legibility raises
            risk because covert actions are harder to deter, and low reversibility raises risk
            because the effects last. Escalation adds directly. With each axis on 1–5, the result
            runs from exactly 1 to 5. Earlier versions added reversibility as coded, which ranked
            irreversible ASAT tests as the least risky incidents; the formula is computed in one
            place (src/data/scoring.js).
          </p>
          <p className="method-body">
            This formula is a simplification intended for visualization and comparison. Real
            strategic risk assessment involves additional factors — geopolitical context, allied
            responses, second-order effects — that fall outside this dataset's scope.
          </p>
        </section>

        {/* Salami Tactics */}
        <section className="method-section">
          <h2 className="method-section-title">Salami Tactics Classification</h2>
          <p className="method-body">
            Salami tactics (also called "salami slicing") describe a strategy of incremental
            coercion in which each individual action remains below the threshold that would
            trigger a significant response, while the cumulative effect substantially changes
            the strategic landscape.
          </p>
          <p className="method-body">
            In this dataset the flag is computed, not coded by hand. An incident is a salami
            tactic when it meets both conditions:
          </p>
          <ul className="method-list">
            <li>
              <strong>Legibility ≤ 3</strong> — the action is not clearly interpretable, so
              the actor or its intent can be denied
            </li>
            <li>
              <strong>Reversibility ≥ 3</strong> — the effects can be undone, so each step
              stays below the threshold for a response
            </li>
          </ul>
          <p className="method-body">
            Overt, attributed jamming (legibility 4) and irreversible acts such as ASAT tests or
            towing a satellite to a graveyard orbit (reversibility 1–2) are therefore not salami
            steps, even when they form part of a pattern.
          </p>
          <p className="method-body">
            This operationalization draws on Thomas Schelling's concept of compellence and the
            application of salami tactics to contemporary gray-zone conflict by Brands (2016)
            and Morgan et al. (2017).
          </p>
        </section>

        {/* Data Collection */}
        <section className="method-section">
          <h2 className="method-section-title">Data Collection Approach</h2>
          <p className="method-body">
            Incidents were selected through a structured literature review of:
          </p>
          <ul className="method-list">
            <li>Annual reports from the Secure World Foundation (Global Counterspace Capabilities) and CSIS (Space Threat Assessment)</li>
            <li>US Space Command and Department of Defense public statements</li>
            <li>Aviation safety authority advisories (EASA, EUROCONTROL, OPSGROUP)</li>
            <li>Cybersecurity firm technical analyses (SentinelLabs, Kaspersky GReAT)</li>
            <li>Specialist trade publications (SpaceNews, Aviation Week)</li>
            <li>Academic journal articles (Astropolitics, Space Policy, Security Studies)</li>
          </ul>
          <p className="method-body">
            Selection criteria: incidents must (a) involve an identifiable actor, (b) have a
            credible source with a published URL, (c) have a plausible geographic coordinate,
            and (d) involve a space or space-adjacent system. Commercial disputes, launch failures,
            and purely accidental events are excluded.
          </p>
        </section>

        {/* Confidence Levels */}
        <section className="method-section">
          <h2 className="method-section-title">Confidence Levels</h2>
          <p className="method-body">
            Each incident carries a confidence rating reflecting the strength of available evidence:
          </p>
          <div className="method-confidence-grid">
            {CONFIDENCE_ROWS.map((row) => (
              <div key={row.level} className="method-confidence-card">
                <span className="method-confidence-badge" style={{ background: row.color + "22", color: row.color }}>
                  {row.level}
                </span>
                <p>{row.definition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section className="method-section">
          <h2 className="method-section-title">Limitations</h2>
          <ul className="method-list">
            <li>
              <strong>Open-source only</strong> — classified signals intelligence, internal
              government assessments, and proprietary satellite data are not accessible.
              High-legibility incidents may be over-represented because covert incidents are by
              definition harder to document.
            </li>
            <li>
              <strong>Western-source bias</strong> — the available English-language literature
              skews toward US, European, and Five Eyes perspectives. Russian, Chinese, and other
              state perspectives are underrepresented in the source base.
            </li>
            <li>
              <strong>Attribution uncertainty</strong> — many incidents formally remain
              "unattributed." Where this project records an actor, it reflects the weight of
              credible open-source reporting, not legal proof.
            </li>
            <li>
              <strong>Scoring subjectivity</strong> — Jervis scores are the author's
              interpretation of public evidence. Reasonable analysts may score incidents
              differently.
            </li>
            <li>
              <strong>Geographic approximation</strong> — incident coordinates represent the
              approximate locus of effect (e.g., jamming source or affected orbit), not a
              precise strike location.
            </li>
          </ul>
        </section>

        {/* Footer nav */}
        <div className="method-footer-nav">
          <Link to="/" className="btn-secondary">← Home</Link>
          <Link to="/radar" className="btn-primary">Jervis Radar →</Link>
          <Link to="/data-sources" className="btn-secondary">Data Sources →</Link>
        </div>
      </div>
    </div>
  );
}
