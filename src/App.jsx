import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar             from "./components/Navbar";
import HomePage           from "./pages/HomePage";
import RadarPage          from "./pages/RadarPage";
import DataSourcesPage    from "./pages/DataSourcesPage";
import IncidentDetailPage from "./pages/IncidentDetailPage";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/radar"         element={<RadarPage />} />
        <Route path="/data-sources"  element={<DataSourcesPage />} />
        <Route path="/incidents/:id" element={<IncidentDetailPage />} />
      </Routes>
    </HashRouter>
  );
}
