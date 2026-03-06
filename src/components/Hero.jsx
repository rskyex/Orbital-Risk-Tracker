export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="section-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Space Security &amp; Governance Intelligence
          </div>

          <h1 className="hero-title">
            Mapping the{" "}
            <span className="hero-title-accent">
              Grey&nbsp;Zone
            </span>{" "}
            of Space Conflict
          </h1>

          <p className="hero-desc">
            An interactive intelligence dashboard visualizing{" "}
            <strong>real-world space incidents</strong> — from satellite
            proximity operations and GNSS jamming to ASAT tests and
            cyberattacks — through the lens of{" "}
            <strong>Jervis's security dilemma theory</strong>.
          </p>

          <div className="hero-cta-row">
            <button className="btn-primary" onClick={() => scrollTo("globe")}>
              🌐 Explore Globe
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("methodology")}>
              📐 Methodology
            </button>
          </div>

          <p className="hero-framework-note">
            <span>Framework basis:</span>
            Jervis (1978) · Salami Tactics · Weaponized Interdependence
          </p>
        </div>
      </div>
    </section>
  );
}
