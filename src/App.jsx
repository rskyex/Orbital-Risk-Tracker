import "./App.css";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import MetricsSection   from "./components/MetricsSection";
import GlobeSection     from "./components/GlobeSection";
import IncidentExplorer from "./components/IncidentExplorer";
import AnalyticsSection from "./components/AnalyticsSection";
import Methodology      from "./components/Methodology";
import Footer           from "./components/Footer";

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 60 }}>
        <Hero />
        <MetricsSection />
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
