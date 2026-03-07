import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Incidents",    anchor: "explorer" },
  { label: "Radar",        to: "/radar" },
  { label: "Methodology",  anchor: "methodology" },
  { label: "Data Sources", to: "/data-sources" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate     = useNavigate();

  // Scroll to on-page anchor — if not on home, navigate home first then scroll
  const scrollTo = (anchor) => {
    const doScroll = () =>
      setTimeout(
        () => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }),
        80
      );

    if (pathname === "/") {
      doScroll();
    } else {
      navigate("/");
      doScroll();
    }
  };

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
