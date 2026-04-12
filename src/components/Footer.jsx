import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();

const FAULTLINE_MODULES = [
  { label: "Faultline Hub",                 url: "https://faultline-nqmm.vercel.app/" },
  { label: "Global Nuclear Infrastructure Atlas", url: "https://globalnuclearinfrastructureatlas.vercel.app/" },
  { label: "Orbital Risk Tracker",          url: "https://orbitalrisktracker.vercel.app/" },
  { label: "Cyber Escalation Atlas",        url: "https://cyber-escalation-atlas.vercel.app/" },
  { label: "Space Mandate Atlas",           url: "https://lunar-mandate-atlas.vercel.app/" },
];

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
        {/* Creator profile strip */}
        <div className="footer-creator">
          <img src="/profile.jpg" alt="Risa Koyanagi" className="footer-creator-avatar" />
          <div className="footer-creator-info">
            <p className="footer-creator-name">Risa Koyanagi</p>
            <p className="footer-creator-bio">
              Cambridge Future Scholar. Researcher working across space, nuclear, and
              emerging technology governance and strategic risk — focusing on legitimation,
              dual-use systems, and authority architecture.
            </p>
            <div className="footer-creator-links">
              <a href="https://risakoyanagi.com" target="_blank" rel="noopener noreferrer">risakoyanagi.com</a>
              <span style={{ opacity:0.3 }}>·</span>
              <a href="https://faultline-nqmm.vercel.app/" target="_blank" rel="noopener noreferrer">Faultline Platform</a>
              <span style={{ opacity:0.3 }}>·</span>
              <a href="https://github.com/rskyex" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <span style={{ fontSize:22 }}>🛰</span>
              <span className="footer-brand-name">Orbital Risk Tracker</span>
            </div>
            <p className="footer-brand-desc">
              Interactive geospatial intelligence platform visualising real-world
              space security incidents through the Jervis security dilemma framework.
              Part of the{" "}
              <a href="https://faultline-nqmm.vercel.app/" target="_blank" rel="noopener noreferrer"
                 style={{ color:"var(--cyan)", textDecoration:"none" }}>
                Faultline
              </a>{" "}
              strategic intelligence suite.
            </p>
            <p style={{ marginTop:12, fontSize:12, color:"var(--cyan)", opacity:0.85 }}>
              © {YEAR} Risa Koyanagi. All original design &amp; code rights reserved.
            </p>
            <p style={{ marginTop:4, fontSize:11, color:"var(--text-muted)", lineHeight:1.6 }}>
              Incident data compiled from public sources — see Data Sources page.
              Original content belongs to respective authors and organisations.
            </p>
            <a href="https://github.com/rskyex/Orbital-Risk-Tracker" target="_blank" rel="noopener noreferrer"
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
            <p className="footer-col-title">Faultline Suite</p>
            <div className="footer-links">
              {FAULTLINE_MODULES.map(({ label, url }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="footer-link">
                  {label}
                </a>
              ))}
            </div>
            <p className="footer-col-title" style={{ marginTop: 20 }}>Key Sources</p>
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
            <span>
              <a href="https://faultline-nqmm.vercel.app/" target="_blank" rel="noopener noreferrer"
                 style={{ color:"var(--text-muted)", textDecoration:"none" }}>
                Faultline Platform
              </a>
              {" "}· Space Security &amp; Governance
            </span>
          </div>
          <div className="footer-stack">
            {STACK.map((s) => <span key={s} className="stack-tag">{s}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
