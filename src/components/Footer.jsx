export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navItems = [
    { label: "Globe View",        id: "globe" },
    { label: "Incident Explorer", id: "explorer" },
    { label: "Analytics",         id: "analytics" },
    { label: "Methodology",       id: "methodology" },
  ];

  const stack = ["React", "Vite", "react-globe.gl", "Recharts", "Three.js"];

  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <span style={{ fontSize:20 }}>🛰</span>
              <div className="footer-brand-name">Orbital Risk Tracker</div>
            </div>
            <p className="footer-brand-desc">
              An interactive geospatial intelligence dashboard visualising
              space security incidents through the Jervis security dilemma
              framework. Built as a portfolio project demonstrating the
              intersection of IR theory and data visualisation.
            </p>
            <div style={{ marginTop:16, display:"flex", gap:10 }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:"inline-flex",
                  alignItems:"center",
                  gap:6,
                  fontSize:12,
                  color:"var(--text-secondary)",
                  background:"rgba(255,255,255,0.06)",
                  border:"1px solid var(--border)",
                  padding:"5px 12px",
                  borderRadius:6,
                  textDecoration:"none",
                  transition:"all 0.15s",
                }}
              >
                ⭐ GitHub Repository
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-col-title">Navigation</p>
            <div className="footer-links">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  className="footer-link"
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Framework */}
          <div>
            <p className="footer-col-title">Framework Basis</p>
            <div className="footer-links">
              {[
                "Jervis (1978) Security Dilemma",
                "Farrell & Newman (2019) Weaponized Interdependence",
                "Salami Tactics Theory",
                "SWF Space Threat Assessments",
                "C4ADS 'Above Us Only Stars'",
              ].map((s) => (
                <span key={s} className="footer-link" style={{ cursor:"default" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>
            Portfolio project · Space Security &amp; Governance ·{" "}
            {new Date().getFullYear()}
          </span>
          <div className="footer-stack">
            {stack.map((s) => (
              <span key={s} className="stack-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
