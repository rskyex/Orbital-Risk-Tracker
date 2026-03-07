import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Incidents",    to: "/#explorer",   anchor: "explorer" },
  { label: "Radar",        to: "/radar",        anchor: null },
  { label: "Methodology",  to: "/methodology",  anchor: null },
  { label: "Data Sources", to: "/data-sources", anchor: null },
];

export default function Navbar() {
  const { pathname } = useLocation();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <span className="navbar-brand-icon">🛰</span>
        <div>
          <div className="navbar-brand-name">Orbital Risk Tracker</div>
          <div className="navbar-brand-sub">Space Incident Intelligence</div>
        </div>
      </Link>

      <div className="navbar-links">
        {NAV_LINKS.map(({ label, to, anchor }) =>
          anchor ? (
            <button
              key={label}
              className="navbar-link"
              onClick={() => scrollTo(anchor)}
            >
              {label}
            </button>
          ) : (
            <Link
              key={label}
              to={to}
              className={`navbar-link ${pathname === to ? "navbar-link--active" : ""}`}
            >
              {label}
            </Link>
          )
        )}
        <Link className="navbar-cta" to="/radar">
          Radar →
        </Link>
      </div>
    </nav>
  );
}
