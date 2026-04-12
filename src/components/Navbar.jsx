import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Data Layers",   anchor: "data-layers" },
  { label: "Governance",    to: "/governance" },
  { label: "Actors",        anchor: "actors" },
  { label: "Incidents",     anchor: "explorer" },
  { label: "Radar",         to: "/radar" },
  { label: "About",         to: "/about" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate     = useNavigate();

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
          <div className="navbar-brand-sub">Faultline Platform</div>
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
          Radar &rarr;
        </Link>
      </div>
    </nav>
  );
}
