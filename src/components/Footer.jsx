import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const PAGES = [
    { label: "Home",              to: "/" },
    { label: "Governance",        to: "/governance" },
    { label: "Jervis Radar",      to: "/radar" },
    { label: "Data Sources",      to: "/data-sources" },
    { label: "About This Tracker", to: "/about" },
  ];
  const STACK = ["React", "Vite", "react-globe.gl", "Recharts", "Three.js", "react-router-dom"];
  const REFS = [
    "Jervis (1978) — Security Dilemma",
    "Farrell & Newman (2019) — Weaponized Interdependence",
    "SWF Global Counterspace Capabilities",
    "CSIS Space Threat Assessment",
    "C4ADS 'Above Us Only Stars' (2019)",
    "CISA/NCSC Advisory AA22-110A",
    "OPSGROUP GPS Spoofing Reports",
  ];

  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-grid">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <span style={{ fontSize:22 }}>🛰</span>
              <span className="footer-brand-name">Orbital Risk Tracker</span>
            </div>
            <p className="footer-brand-desc">
              Interactive geospatial intelligence platform visualising real-world
              space security incidents through the Jervis security dilemma framework.
              Portfolio project demonstrating the intersection of IR scholarship and
              data visualisation.
            </p>
            <p style={{ marginTop:12, fontSize:12, color:"var(--cyan)", opacity:0.85 }}>
              © {YEAR} Risa Koyanagi. All original design &amp; code rights reserved.
            </p>
            <p style={{ marginTop:4, fontSize:11, color:"var(--text-muted)", lineHeight:1.6 }}>
              Incident data compiled from public sources — see Data Sources page.
              Original content belongs to respective authors and organisations.
            </p>
            <a href="https://github.com/rskyex/orbital" target="_blank" rel="noopener noreferrer"
               className="footer-github-link">★ GitHub Repository</a>
          </div>
          <div>
            <p className="footer-col-title">Pages</p>
            <div className="footer-links">
              {PAGES.map(({ label, to }) => (
                <Link key={to} to={to} className="footer-link">{label}</Link>
              ))}
              <button
                className="footer-link"
                onClick={() => {
                  window.location.hash = "/";
                  setTimeout(
                    () => document.getElementById("methodology")?.scrollIntoView({ behavior: "smooth" }),
                    80
                  );
                }}
              >
                Methodology
              </button>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Key Sources</p>
            <div className="footer-links">
              {REFS.map((s) => (
                <span key={s} className="footer-link" style={{ cursor:"default" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <span style={{ color:"var(--cyan)", fontWeight:700 }}>© {YEAR} Risa Koyanagi</span>
            <span style={{ margin:"0 10px", opacity:0.3 }}>·</span>
            <span>Portfolio Project · Space Security &amp; Governance</span>
          </div>
          <div className="footer-stack">
            {STACK.map((s) => <span key={s} className="stack-tag">{s}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
