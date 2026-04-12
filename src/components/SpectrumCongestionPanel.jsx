import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { SPECTRUM_BANDS, GEO_SLOT_DATA, SPECTRUM_SUMMARY, NGSO_CONSTELLATION_FILINGS } from "../data/spectrumCongestion";

function getDisputeColor(status) {
  if (status === "disputed") return "#ef4444";
  if (status === "coordination_ongoing") return "#f59e0b";
  return "#10b981";
}

function getDisputeLabel(status) {
  if (status === "disputed") return "Disputed";
  if (status === "coordination_ongoing") return "Coordination Ongoing";
  return "Clear";
}

export default function SpectrumCongestionPanel() {
  const [view, setView] = useState("geo");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const congestionData = GEO_SLOT_DATA.map((s) => ({
    slot: s.slot,
    congestion: Math.round(s.congestionIndex * 100),
    filings: s.ituFilings,
    color: getDisputeColor(s.disputeStatus),
  }));

  const exportJSON = () => {
    const data = { GEO_SLOT_DATA, SPECTRUM_SUMMARY, NGSO_CONSTELLATION_FILINGS };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spectrum_congestion.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="data-layer-panel glass reveal" id="spectrum-congestion">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Data Layer</p>
          <h3 className="data-layer-title">Spectrum Congestion Index</h3>
          <p className="data-layer-desc">
            ITU-filed vs active frequency allocations by GEO slot. Flags disputed or
            overlapping filings. NGSO constellation filing status.
          </p>
        </div>
        <button className="export-btn" onClick={exportJSON}>Export JSON</button>
      </div>

      {/* Summary */}
      <div className="conjunction-summary">
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value">{SPECTRUM_SUMMARY.occupiedSlots}/{SPECTRUM_SUMMARY.totalGeoSlots}</span>
          <span className="conjunction-summary-label">GEO Slots Occupied</span>
        </div>
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value" style={{ color: "#f59e0b" }}>{SPECTRUM_SUMMARY.disputedSlots}</span>
          <span className="conjunction-summary-label">Disputed Slots</span>
        </div>
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value">{SPECTRUM_SUMMARY.pendingFilings}</span>
          <span className="conjunction-summary-label">Pending ITU Filings</span>
        </div>
        <div className="conjunction-summary-item">
          <span className="conjunction-summary-value" style={{ color: "#ef4444" }}>{SPECTRUM_SUMMARY.paperSatelliteFilings}</span>
          <span className="conjunction-summary-label">Paper Satellite Filings</span>
        </div>
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button className={`regime-toggle ${view === "geo" ? "regime-toggle--active" : ""}`} onClick={() => setView("geo")}>GEO Slots</button>
        <button className={`regime-toggle ${view === "ngso" ? "regime-toggle--active" : ""}`} onClick={() => setView("ngso")}>NGSO Filings</button>
        <button className={`regime-toggle ${view === "bands" ? "regime-toggle--active" : ""}`} onClick={() => setView("bands")}>Frequency Bands</button>
      </div>

      {view === "geo" && (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={congestionData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="slot" tick={{ fill: "var(--text-muted)", fontSize: 9 }} interval={0} angle={-30} textAnchor="end" height={48} />
              <YAxis domain={[0, 100]} tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`, "Congestion"]} />
              <Bar dataKey="congestion" radius={[4, 4, 0, 0]}>
                {congestionData.map((d, i) => (
                  <Cell key={i} fill={d.color} opacity={0.8} cursor="pointer" onClick={() => setSelectedSlot(GEO_SLOT_DATA[i])} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {selectedSlot && (
            <div className="spectrum-slot-detail" style={{ borderColor: getDisputeColor(selectedSlot.disputeStatus) + "44" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, color: "var(--text-primary)" }}>{selectedSlot.slot} — {selectedSlot.name}</h4>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-secondary)" }}>{selectedSlot.operator} ({selectedSlot.state})</p>
                </div>
                <span className="conj-sev-badge" style={{ background: getDisputeColor(selectedSlot.disputeStatus) + "18", color: getDisputeColor(selectedSlot.disputeStatus) }}>
                  {getDisputeLabel(selectedSlot.disputeStatus)}
                </span>
              </div>
              <div className="regime-stats-grid" style={{ marginTop: 12 }}>
                <div className="regime-stat"><span className="regime-stat-value">{selectedSlot.ituFilings}</span><span className="regime-stat-label">ITU Filings</span></div>
                <div className="regime-stat"><span className="regime-stat-value">{selectedSlot.activeTransponders}</span><span className="regime-stat-label">Active Transponders</span></div>
                <div className="regime-stat"><span className="regime-stat-value">{selectedSlot.bands.join(", ")}</span><span className="regime-stat-label">Bands</span></div>
                <div className="regime-stat"><span className="regime-stat-value">{Math.round(selectedSlot.congestionIndex * 100)}%</span><span className="regime-stat-label">Congestion</span></div>
              </div>
              {selectedSlot.disputeNote && (
                <div className="analyst-note-inline" style={{ marginTop: 12 }}>
                  <span className="analyst-note-icon">DISPUTE NOTE</span>
                  {selectedSlot.disputeNote}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {view === "ngso" && (
        <div className="ngso-grid">
          {NGSO_CONSTELLATION_FILINGS.map((c) => (
            <div key={c.name} className="ngso-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <strong style={{ color: "var(--text-primary)", fontSize: 13 }}>{c.name}</strong>
                <span className="conj-sev-badge" style={{ background: c.status === "operational" ? "#10b98118" : c.status === "partially_deployed" || c.status === "early_deployment" ? "#f59e0b18" : "#4488ff18", color: c.status === "operational" ? "#10b981" : c.status === "partially_deployed" || c.status === "early_deployment" ? "#f59e0b" : "#4488ff" }}>
                  {c.status.replace(/_/g, " ")}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                {c.operator} ({c.state}) — {c.satellites.toLocaleString()} sats — {c.bands.join("/")}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "bands" && (
        <div className="bands-grid">
          {Object.entries(SPECTRUM_BANDS).map(([id, band]) => (
            <div key={id} className="band-card" style={{ borderColor: band.color + "44" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: band.color }} />
                <strong style={{ color: band.color, fontSize: 13 }}>{band.label}</strong>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, fontFamily: "var(--mono)" }}>{band.range}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{band.usage}</div>
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.6 }}>
        {SPECTRUM_SUMMARY.note}
      </p>
    </div>
  );
}
