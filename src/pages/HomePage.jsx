import { useScrollReveal } from "../hooks/useScrollReveal";
import RiskOverviewHeader  from "../components/RiskOverviewHeader";
import Hero                from "../components/Hero";
import MetricsSection      from "../components/MetricsSection";
import GlobeSection        from "../components/GlobeSection";
import DebrisDensityPanel  from "../components/DebrisDensityPanel";
import ConjunctionLog      from "../components/ConjunctionLog";
import SpectrumCongestionPanel from "../components/SpectrumCongestionPanel";
import GovernanceRiskPanel from "../components/GovernanceRiskPanel";
import NarrativeIntelPanel from "../components/NarrativeIntelPanel";
import ActorProfiles       from "../components/ActorProfiles";
import TimelineSlider      from "../components/TimelineSlider";
import IncidentExplorer    from "../components/IncidentExplorer";
import AnalyticsSection    from "../components/AnalyticsSection";
import Methodology         from "../components/Methodology";
import Footer              from "../components/Footer";

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <RiskOverviewHeader />
      <main style={{ paddingTop: 96 }}>
        <Hero />
        <MetricsSection />
        <div className="section-divider" />

        {/* Section 1: Data Layer Enrichment */}
        <section className="data-layers-section" id="data-layers">
          <div className="section-container">
            <div className="section-header reveal">
              <p className="section-label">Orbital Environment Data</p>
              <h2 className="section-title">Data Layer Enrichment</h2>
              <p className="section-subtitle">
                Debris density, conjunction events, spectrum congestion, and governance
                risk scores across orbital regimes. Toggle layers to explore the
                multi-dimensional risk landscape.
              </p>
            </div>
            <DebrisDensityPanel />
            <ConjunctionLog />
            <SpectrumCongestionPanel />
          </div>
        </section>

        <div className="section-divider" />

        {/* Section 2: Governance Risk Scoring */}
        <section className="governance-section" id="governance-risk">
          <div className="section-container">
            <GovernanceRiskPanel />
          </div>
        </section>

        <div className="section-divider" />

        {/* Section 3: Narrative Intelligence */}
        <section className="narrative-section" id="narrative">
          <div className="section-container">
            <NarrativeIntelPanel />
          </div>
        </section>

        <div className="section-divider" />

        {/* Section 4: Actor Profiles */}
        <section className="actors-section" id="actors">
          <div className="section-container">
            <ActorProfiles />
          </div>
        </section>

        <div className="section-divider" />

        {/* Section 5: Timeline */}
        <section className="timeline-section" id="timeline">
          <div className="section-container">
            <TimelineSlider />
          </div>
        </section>

        <div className="section-divider" />

        <GlobeSection />
        <div className="section-divider" />
        <IncidentExplorer />
        <div className="section-divider" />
        <AnalyticsSection />
        <div className="section-divider" />
        <Methodology />
      </main>
      <Footer />
    </>
  );
}
