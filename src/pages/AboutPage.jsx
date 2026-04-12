import { Link } from "react-router-dom";
import StarField from "../components/StarField";

const FRAMEWORKS = [
  {
    title: "Space Situational Awareness Theory",
    color: "#4488ff",
    description: "The capacity to detect, track, identify, and characterise objects and events in the space domain. SSA underpins all other governance functions: attribution, compliance verification, and collision avoidance depend on the ability to observe. This tool's data layers draw on SSA principles to present debris density, conjunction events, and object tracking as foundational governance inputs — not merely technical metrics.",
  },
  {
    title: "Orbital Commons Governance",
    color: "#10b981",
    description: "Outer space is a shared resource governed by the Outer Space Treaty's non-appropriation principle (Article II) and the concept of the 'province of all mankind' (Article I). However, orbital regimes function increasingly as congested, rival-use commons where one operator's debris becomes another's collision risk. This tool applies commons governance theory — drawing on Ostrom's institutional analysis — to assess where governance institutions are adequate to the resource management challenge and where they are not.",
  },
  {
    title: "Dual-Use Entanglement",
    color: "#8b5cf6",
    description: "Space assets are inherently dual-use: the same satellite that provides civilian communications may relay military traffic; the same inspection capability that enables servicing can enable anti-satellite positioning. This entanglement makes offense-defense distinguishability — a core variable in security dilemma theory (Jervis, 1978) — structurally low in the space domain. The Governance Risk Score's 'Escalation Coupling' component directly measures this entanglement.",
  },
  {
    title: "Attribution Under International Law",
    color: "#f59e0b",
    description: "The ability to attribute a harmful act to a responsible state or operator is the prerequisite for accountability under the Liability Convention and customary international law. In the space domain, attribution is complicated by the opacity of military operations, the difficulty of tracking small debris, and the absence of comprehensive SSA sharing agreements. This tool's 'Attribution Difficulty' sub-component in the Governance Risk Score quantifies this structural challenge.",
  },
  {
    title: "Long-Term Sustainability Norms",
    color: "#ef4444",
    description: "The COPUOS Long-Term Sustainability Guidelines (2019) represent the most comprehensive multilateral attempt to establish norms for sustainable space operations. Their voluntary nature, uneven adoption, and absence of compliance mechanisms make them a critical test case for soft-law governance in a domain where binding instruments have proven politically impossible to negotiate. This tool tracks LTS adoption as a key variable in the Norm Adherence component of the Governance Risk Score.",
  },
];

const DATA_SOURCES_INFO = [
  { source: "Space-Track.org TLE data", usage: "Debris density and tracked object counts by orbital regime", limitation: "Catalogue completeness varies; objects <10 cm generally untracked; data patterns used, not live API calls" },
  { source: "NASA Orbital Debris Program Office (ODPO)", usage: "Debris population estimates, ASAT test consequence assessments", limitation: "Models are probabilistic; sub-centimetre population is estimated, not observed" },
  { source: "ESA Space Debris Office", usage: "European SSA data, debris environment models", limitation: "Coverage concentrated in European tracking network field of view" },
  { source: "ITU Space Network Systems database", usage: "GEO slot filings, frequency coordination status", limitation: "Filing data is administrative, not operational — 'paper satellite' filings create noise" },
  { source: "COPUOS / UNOOSA", usage: "Treaty ratification status, LTS Guidelines adoption", limitation: "Self-reported by states; no independent verification mechanism" },
  { source: "Secure World Foundation", usage: "Counterspace capabilities, RPO activity tracking", limitation: "Open-source intelligence; classified activities are by definition excluded" },
  { source: "CSIS Space Threat Assessment", usage: "Annual threat landscape assessment", limitation: "US-centric analytical perspective" },
];

const SCORE_CONSTRUCTION = [
  { component: "Attribution Difficulty (25%)", description: "Scores the structural difficulty of identifying the responsible party for a harmful act in a given orbital regime. Inputs: catalogue completeness, operator transparency, dual-use ambiguity, state registration compliance rates." },
  { component: "Norm Adherence (25%)", description: "Aggregate treaty participation and guideline adoption of actors operating in the regime. Weighted by Treaty Compliance Matrix data. Non-adoption of LTS Guidelines and non-participation in Artemis Accords are scored as governance risk signals." },
  { component: "Deorbit Compliance Likelihood (25%)", description: "Based on constellation size, stated end-of-life policy, and historical compliance rates. Larger constellations with no stated EOL policy score higher. FCC 5-year rule and ESA Zero Debris Charter compliance are positive factors." },
  { component: "Escalation Coupling (25%)", description: "Degree to which a governance failure in this regime could escalate into interstate tension. Inputs: military asset co-location, dual-use infrastructure dependence, adversary proximity, historical incident frequency." },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <StarField className="page-stars" />
      <div className="about-page">
        <div className="method-header">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Theoretical Grounding
          </div>
          <h1 className="method-title">About This Tracker</h1>
          <p className="method-subtitle">
            Analytical foundations, data sources, scoring methodology, and platform
            context for the Orbital Risk Tracker within the Faultline suite.
          </p>
        </div>

        {/* Analytical Frameworks */}
        <section className="about-section">
          <h2 className="about-section-title">Analytical Frameworks</h2>
          <p className="about-section-desc">
            The Orbital Risk Tracker is grounded in five analytical frameworks that
            collectively provide a governance-grade lens for assessing orbital risk.
            These frameworks are adapted from the Faultline platform's Cyber Escalation
            Atlas methodology, extended to the space domain.
          </p>
          <div className="frameworks-grid">
            {FRAMEWORKS.map((fw) => (
              <div key={fw.title} className="framework-card glass" style={{ borderTopColor: fw.color }}>
                <h3 style={{ color: fw.color, fontSize: 15, marginBottom: 8 }}>{fw.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{fw.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section className="about-section">
          <h2 className="about-section-title">Data Sources & Limitations</h2>
          <p className="about-section-desc">
            All data displayed in this tool is derived from publicly available sources.
            Where live API integration is not available, representative static datasets
            are used that mirror real data formats and magnitudes. All mock data is
            clearly structured for replacement by live feeds when available.
          </p>
          <div className="about-table-wrap">
            <table className="about-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Usage in Tracker</th>
                  <th>Known Limitation</th>
                </tr>
              </thead>
              <tbody>
                {DATA_SOURCES_INFO.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.source}</td>
                    <td>{d.usage}</td>
                    <td style={{ color: "var(--text-muted)" }}>{d.limitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Governance Risk Score */}
        <section className="about-section">
          <h2 className="about-section-title">Governance Risk Score — Construction</h2>
          <p className="about-section-desc">
            The Governance Risk Score is a composite 0–100 index measuring the gap between
            governance capacity and operational risk in a given orbital regime or constellation
            cluster. Higher scores indicate greater governance deficit relative to the risk
            generated. The score draws on four equally weighted sub-components.
          </p>
          <div className="score-construction">
            {SCORE_CONSTRUCTION.map((s) => (
              <div key={s.component} className="score-component glass">
                <h4 style={{ color: "var(--cyan)", fontSize: 13, marginBottom: 6 }}>{s.component}</h4>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.7 }}>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="score-scale-visual">
            <div className="score-scale-bar">
              <div style={{ flex: 1, background: "#10b981", borderRadius: "4px 0 0 4px" }} />
              <div style={{ flex: 1, background: "#f59e0b" }} />
              <div style={{ flex: 1, background: "#ef4444", borderRadius: "0 4px 4px 0" }} />
            </div>
            <div className="score-scale-labels">
              <span style={{ color: "#10b981" }}>0–33: Low Risk</span>
              <span style={{ color: "#f59e0b" }}>34–66: Moderate Risk</span>
              <span style={{ color: "#ef4444" }}>67–100: High Risk</span>
            </div>
          </div>
        </section>

        {/* Creator */}
        <section className="about-section">
          <h2 className="about-section-title">Creator</h2>
          <div className="creator-profile glass">
            <img src="/profile.jpg" alt="Risa Koyanagi" className="creator-avatar" />
            <div className="creator-details">
              <h3 className="creator-name">Risa Koyanagi</h3>
              <p className="creator-affiliation">Cambridge Future Scholar</p>
              <p className="creator-bio">
                Researcher working across space, nuclear, and emerging technology governance
                and strategic risk. Her work focuses on legitimation, dual-use systems, and
                authority architecture. She also designs public-facing research platforms on
                AI governance, strategic infrastructure risk, and interpretive systems.
              </p>
              <div className="creator-links">
                <a href="https://risakoyanagi.com" target="_blank" rel="noopener noreferrer" className="creator-link-btn">
                  risakoyanagi.com
                </a>
                <a href="https://faultline-nqmm.vercel.app/" target="_blank" rel="noopener noreferrer" className="creator-link-btn creator-link-btn--alt">
                  Faultline Platform
                </a>
                <a href="https://github.com/rskyex" target="_blank" rel="noopener noreferrer" className="creator-link-btn creator-link-btn--alt">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Context */}
        <section className="about-section">
          <h2 className="about-section-title">Within the Faultline Platform</h2>
          <p className="about-section-desc">
            The Orbital Risk Tracker is one module within{" "}
            <a href="https://faultline-nqmm.vercel.app/" target="_blank" rel="noopener noreferrer"
               style={{ color: "var(--cyan)", textDecoration: "none" }}>
              Faultline
            </a>
            , a strategic intelligence platform providing governance-grade analytical tools for
            domains where technical risk and institutional capacity are misaligned — where the
            speed of technological change outpaces the development of governance frameworks.
          </p>
          <div className="platform-modules glass">
            <a href="https://globalnuclearinfrastructureatlas.vercel.app/" target="_blank" rel="noopener noreferrer" className="platform-module platform-module--link">
              <h4 style={{ color: "var(--cyan)" }}>Global Nuclear Infrastructure Atlas</h4>
              <p>Maps critical nuclear infrastructure, governance gaps, and proliferation risk
              vectors across global supply chains and regulatory regimes.</p>
            </a>
            <div className="platform-module platform-module--active">
              <h4 style={{ color: "var(--cyan)" }}>Orbital Risk Tracker</h4>
              <p>This tool. Maps orbital risk across debris density, conjunction events,
              spectrum congestion, and jurisdiction fragmentation. Integrates technical and
              legal-institutional risk in a single analytical frame.</p>
            </div>
            <a href="https://cyber-escalation-atlas.vercel.app/" target="_blank" rel="noopener noreferrer" className="platform-module platform-module--link">
              <h4 style={{ color: "var(--cyan)" }}>Cyber Escalation Atlas</h4>
              <p>Maps cyber operations across the escalation spectrum using Jervis security
              dilemma theory. Tracks state-attributed cyber incidents and their governance implications.</p>
            </a>
            <a href="https://space-mandate-atlas.vercel.app/" target="_blank" rel="noopener noreferrer" className="platform-module platform-module--link">
              <h4 style={{ color: "var(--cyan)" }}>Space Mandate Atlas</h4>
              <p>Tracks international space governance mandates, treaty architectures, and
              institutional authority across orbital regimes and jurisdictions.</p>
            </a>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 16, lineHeight: 1.7 }}>
            All Faultline tools share a common analytical methodology: they assess the gap
            between the governance frameworks applied to a domain and the risk that domain
            generates. The tools are designed for use by policy professionals, academic
            researchers, and strategic analysts who need governance-grade intelligence —
            not just technical data.
          </p>
        </section>

        <div className="method-footer-nav">
          <Link to="/" className="btn-secondary">&larr; Home</Link>
          <Link to="/governance" className="btn-secondary">Governance Architecture &rarr;</Link>
          <Link to="/radar" className="btn-primary">Jervis Radar &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
