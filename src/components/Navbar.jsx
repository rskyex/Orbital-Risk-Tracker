export default function Navbar() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#hero">
        <span className="navbar-brand-icon">🛰</span>
        <div>
          <div>Orbital Risk Tracker</div>
          <div className="navbar-brand-sub">Space Incident Intelligence</div>
        </div>
      </a>

      <div className="navbar-links">
        {[
          { label: "Globe",       id: "globe" },
          { label: "Incidents",   id: "explorer" },
          { label: "Analytics",   id: "analytics" },
          { label: "Methodology", id: "methodology" },
        ].map(({ label, id }) => (
          <button key={id} className="navbar-link" onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
        <button className="navbar-cta" onClick={() => scrollTo("globe")}>
          Explore →
        </button>
      </div>
    </nav>
  );
}
