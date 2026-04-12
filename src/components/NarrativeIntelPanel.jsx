import { CONJUNCTION_EVENTS } from "../data/conjunctions";
import { REGIME_GOVERNANCE_SCORES } from "../data/governance";
import { STRUCTURAL_GAPS } from "../data/legalFramework";

// Pre-computed analyst notes that contextualise risk in governance terms
const NARRATIVE_NOTES = [
  {
    id: "leo-congestion",
    zone: "LEO (550–850 km)",
    severity: "critical",
    title: "Critical Congestion Zone — Governance Deficit",
    note: "This conjunction cluster occurs in a regime with no binding deorbit obligation and three operators from states that have not adopted the LTS Guidelines. Attribution of any resulting debris is likely to be contested. The FY-1C debris field (2007) and Cosmos 1408 debris (2021) continue to generate hundreds of conjunction alerts annually in this band — the cumulative cost of two ASAT tests that predated any norm against such testing.",
    connectedGaps: ["stm_vacuum", "mega_mismatch"],
    regime: "LEO",
  },
  {
    id: "sso-recon",
    zone: "SSO (780–850 km)",
    severity: "high",
    title: "Reconnaissance–Civilian Cohabitation Risk",
    note: "The sun-synchronous orbit band hosts both civilian Earth observation infrastructure (Copernicus, Landsat) and military reconnaissance assets. Soviet-era SL-8 rocket bodies — large, uncontrolled, and concentrated at this altitude — represent the single highest category of collision risk. Any debris-generating event here would simultaneously threaten civilian climate monitoring, military ISR, and commercial imagery services, creating a multi-domain escalation pathway that existing governance does not address.",
    connectedGaps: ["fault_attribution", "stm_vacuum"],
    regime: "SSO",
  },
  {
    id: "geo-rpo",
    zone: "GEO (35,786 km)",
    severity: "high",
    title: "Proximity Operations in Ungoverned Space",
    note: "Russia's Luch/Olymp-K satellites have conducted persistent rendezvous and proximity operations near Western GEO communications and early warning satellites. No binding international framework governs RPO activity, right-of-way, or minimum safe distances in GEO. The ITU coordinates spectrum but has no mandate over physical proximity. This creates a governance void where intelligence-gathering and potentially hostile positioning activities proceed without constraint.",
    connectedGaps: ["stm_vacuum", "norm_fragmentation"],
    regime: "GEO",
  },
  {
    id: "mega-constellation",
    zone: "LEO (340–600 km)",
    severity: "critical",
    title: "Megaconstellation Regulatory Arbitrage",
    note: "Three planned constellations totalling over 56,000 satellites (Starlink Gen2, Guowang, Thousand Sails) are proceeding under three different regulatory regimes with no mutual coordination mechanism. The FCC regulates Starlink; Chinese authorities regulate Guowang and Thousand Sails. No international body has authority to assess cumulative environmental impact, coordinate frequency use, or enforce collision avoidance standards across jurisdictions. Existing frameworks assess individual satellite compliance — they do not aggregate risk at constellation scale.",
    connectedGaps: ["mega_mismatch", "non_state_gap"],
    regime: "LEO",
  },
  {
    id: "timed-cosmos",
    zone: "LEO (610 km)",
    severity: "critical",
    title: "TIMED–Cosmos 2221 Near-Miss — Legal Void",
    note: "The February 2024 conjunction between NASA's TIMED satellite and the defunct Soviet Cosmos 2221 (separation: ~10 metres) illustrates the limits of existing liability law. Had a collision occurred, the Liability Convention would have required proving fault — but the secondary object's operator (the USSR) no longer exists, and its legal successor (Russia) had no obligation to deorbit a satellite launched decades before the debris mitigation guidelines were adopted. The Convention provides no mechanism for adjudicating such historical liability chains.",
    connectedGaps: ["fault_attribution", "adr_vacuum"],
    regime: "LEO",
  },
  {
    id: "norm-bifurcation",
    zone: "All Regimes",
    severity: "high",
    title: "Normative Bifurcation Risk",
    note: "The Artemis Accords (43 signatories) and the emerging China–Russia normative bloc represent two parallel governance architectures for space activities. Where these blocs' orbital assets intersect — particularly in LEO and GEO — there is no shared framework for conjunction assessment, data sharing, or incident response. A collision between a Starlink satellite and a Thousand Sails satellite would fall into a governance void where neither bloc's norms provide a resolution pathway.",
    connectedGaps: ["norm_fragmentation", "stm_vacuum"],
    regime: "LEO",
  },
];

export default function NarrativeIntelPanel() {
  return (
    <div className="data-layer-panel glass reveal" id="narrative-intel">
      <div className="data-layer-header">
        <div>
          <p className="section-label">Intelligence Analysis</p>
          <h3 className="data-layer-title">Narrative Intelligence Panels</h3>
          <p className="data-layer-desc">
            Analyst notes contextualising orbital risk in governance terms — not just
            technical terms. Each note identifies the applicable governance gap and
            the structural reason existing frameworks are insufficient.
          </p>
        </div>
      </div>

      <div className="narrative-grid">
        {NARRATIVE_NOTES.map((note) => {
          const sevColor = note.severity === "critical" ? "#ef4444" : note.severity === "high" ? "#f59e0b" : "#4488ff";
          const connectedGapData = note.connectedGaps.map((gid) => STRUCTURAL_GAPS.find((g) => g.id === gid)).filter(Boolean);

          return (
            <div key={note.id} className="narrative-card" style={{ borderLeftColor: sevColor }}>
              <div className="narrative-card-header">
                <span className="narrative-zone-badge" style={{ color: sevColor, background: sevColor + "14" }}>
                  {note.zone}
                </span>
                <span className="narrative-sev-badge" style={{ color: sevColor }}>
                  {note.severity.toUpperCase()}
                </span>
              </div>
              <h4 className="narrative-card-title">{note.title}</h4>
              <p className="narrative-card-note">{note.note}</p>
              {connectedGapData.length > 0 && (
                <div className="narrative-gaps">
                  <span className="narrative-gaps-label">Connected governance gaps:</span>
                  {connectedGapData.map((gap) => (
                    <span key={gap.id} className="narrative-gap-tag">{gap.title}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
