export default function Methodology() {
  return (
    <section className="methodology-section" id="methodology">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-label">Academic Framework</p>
          <h2 className="section-title">Methodology &amp; Data</h2>
          <p className="section-subtitle">
            This dashboard operationalises Jervis's (1978) security dilemma
            theory as a structured analytical framework for space incidents.
          </p>
        </div>

        {/* Framework cards */}
        <div className="methodology-grid">
          {[
            {
              icon: "🔍",
              title: "Legibility",
              color: "var(--blue)",
              body: (
                <>
                  <span className="method-card-accent" style={{ color: "var(--blue)" }}>
                    How interpretable is the action?
                  </span>{" "}
                  In space and cyber domains, the offense-defense balance is
                  highly ambiguous. A satellite inspector and a co-orbital ASAT
                  look identical from the outside. Low legibility enables actors
                  to act aggressively while maintaining plausible deniability.
                  <br /><br />
                  <em>Score 1:</em> Highly ambiguous (e.g. Luch-RPO).
                  &nbsp;<em>Score 5:</em> Unambiguous (e.g. Nudol ASAT test).
                </>
              ),
            },
            {
              icon: "⏪",
              title: "Reversibility",
              color: "var(--amber)",
              body: (
                <>
                  <span className="method-card-accent" style={{ color: "var(--amber)" }}>
                    Can the action be quickly undone?
                  </span>{" "}
                  High reversibility enables{" "}
                  <strong>salami tactics</strong> — a series of individually
                  deniable, reversible steps that collectively advance a
                  strategic position without triggering a proportionate response.
                  GNSS jamming can be switched off in seconds; a debris field
                  persists for decades.
                  <br /><br />
                  <em>Score 5:</em> Instant reversal (jamming).
                  &nbsp;<em>Score 1:</em> Permanent (ASAT debris).
                </>
              ),
            },
            {
              icon: "📈",
              title: "Escalation Potential",
              color: "var(--red)",
              body: (
                <>
                  <span className="method-card-accent" style={{ color: "var(--red)" }}>
                    How much does this raise interstate tension?
                  </span>{" "}
                  A composite of intent ambiguity and audience costs. High-profile
                  hard-kill ASAT tests carry high escalation potential because they
                  demonstrate capability unambiguously and force other states to
                  respond. Quiet proximity operations score low.
                  <br /><br />
                  <em>Score 5:</em> Catastrophic tension (ISS threat).
                  &nbsp;<em>Score 1:</em> Negligible (quiet RPO).
                </>
              ),
            },
            {
              icon: "🔪",
              title: "Salami Tactics",
              color: "var(--magenta)",
              body: (
                <>
                  <span className="method-card-accent" style={{ color: "var(--magenta)" }}>
                    Incremental coercion below the response threshold.
                  </span>{" "}
                  The combination of low legibility and high reversibility makes
                  space and cyber ideal domains for salami tactics: an actor can
                  advance its strategic position through repeated, individually
                  deniable probes. No single incident justifies escalation;
                  collectively they shift the status quo.
                  <br /><br />
                  Classified as salami: proximity ops, jamming campaigns, GPS
                  spoofing. Not salami: overt ASAT tests, strategic cyberattacks.
                </>
              ),
            },
            {
              icon: "🕸",
              title: "Weaponized Interdependence",
              color: "var(--purple)",
              body: (
                <>
                  <span className="method-card-accent" style={{ color: "var(--purple)" }}>
                    Exploiting asymmetric dependence on shared infrastructure.
                  </span>{" "}
                  Farrell &amp; Newman (2019) argue that states controlling
                  chokepoints in global networks can use access as a coercive
                  instrument. In space, GPS, satellite communications, and
                  remote sensing have become critical dependencies — making
                  their disruption a powerful, low-cost coercive tool.
                  <br /><br />
                  Key example: Viasat KA-SAT cyberattack — civilian satellite
                  infrastructure as a military pre-invasion chokepoint.
                </>
              ),
            },
            {
              icon: "🌐",
              title: "The Changed Musculature",
              color: "var(--cyan)",
              body: (
                <>
                  <span className="method-card-accent" style={{ color: "var(--cyan)" }}>
                    The security dilemma's skeleton endures; its musculature has changed.
                  </span>{" "}
                  The classic Jervis security dilemma assumes that military build-ups
                  are interpretable and largely irreversible. In the space and cyber
                  domain, competition runs through digital infrastructure — invisible,
                  dual-use, and instantly reversible. This changes the{" "}
                  <em>operationalisation</em> of the dilemma, not its core logic.
                </>
              ),
            },
          ].map((c) => (
            <div key={c.title} className="method-card glass reveal">
              <div
                className="method-card-icon"
                style={{ fontSize:28, lineHeight:1 }}
              >
                {c.icon}
              </div>
              <div
                className="method-card-title"
                style={{ color: c.color }}
              >
                {c.title}
              </div>
              <div className="method-card-body">{c.body}</div>
            </div>
          ))}
        </div>

        {/* Scoring table */}
        <div className="glass reveal" style={{ marginBottom: 32 }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
            <p className="analytics-card-title">Scoring Reference</p>
            <p className="analytics-card-desc">
              Each incident is scored on three axes (1–5). Scores are researcher
              judgements based on public information; they are indicative, not
              authoritative.
            </p>
          </div>
          <table className="scoring-table">
            <thead>
              <tr>
                <th>Axis</th>
                <th>Score 1</th>
                <th>Score 3 (Moderate)</th>
                <th>Score 5</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Legibility",    "Highly ambiguous / dual-use", "Partially interpretable", "Clearly offensive"],
                ["Reversibility", "Permanent (debris field)",     "Slow reversal",           "Instant reversal (jamming)"],
                ["Escalation",    "No state response",           "Diplomatic protest",       "ISS threat / war risk"],
              ].map(([ax, s1, s3, s5]) => (
                <tr key={ax}>
                  <td>{ax}</td>
                  <td>{s1}</td>
                  <td>{s3}</td>
                  <td>{s5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Data note */}
        <div className="glass data-note reveal">
          <strong>Data notes &amp; limitations.</strong> All incidents are drawn
          from publicly available sources including{" "}
          <strong>Secure World Foundation</strong> Space Threat Assessments,{" "}
          <strong>C4ADS</strong>, <strong>CISA/NCSC</strong> advisories, and
          peer-reviewed literature. This is a curated illustrative dataset for
          portfolio and analytical purposes. Scores reflect the author's
          interpretation; alternative scoring is defensible. The dataset does not
          claim to be exhaustive — many incidents remain classified or
          unattributed. Data structure is designed to be replaceable by API or
          CMS integration.
        </div>
      </div>
    </section>
  );
}
