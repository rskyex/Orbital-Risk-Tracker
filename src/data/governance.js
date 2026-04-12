// ─── Governance Risk Scoring ──────────────────────────────────────────────
// Composite risk scores per orbital regime and constellation cluster.
// Score is 0–100 where higher = greater governance risk.
// Methodology draws on four sub-components weighted equally (25% each).

export const GOVERNANCE_METHODOLOGY = {
  title: "Governance Risk Score — Methodology",
  description: "The Governance Risk Score is a composite index (0–100) measuring the gap between the governance capacity applied to an orbital regime or constellation cluster and the risk it generates. Higher scores indicate greater governance deficit relative to risk.",
  components: [
    {
      id: "attribution",
      label: "Attribution Difficulty",
      weight: 0.25,
      description: "Can a malicious or negligent act be traced to a responsible state or operator? Scores the difficulty of identifying the responsible party for a debris-generating or interference event in this regime. Factors: object catalogue completeness, operator transparency, dual-use ambiguity, state registration compliance.",
      scale: "0 = clear attribution chain; 100 = attribution functionally impossible",
    },
    {
      id: "normAdherence",
      label: "Norm Adherence",
      weight: 0.25,
      description: "Is the operator or state party to relevant legal instruments and soft-law frameworks? Scores the aggregate treaty participation and guideline adoption of actors operating in this regime. Weighted by Treaty Compliance Matrix data from Section 7.",
      scale: "0 = full adherence to all applicable instruments; 100 = no adherence to any applicable instrument",
    },
    {
      id: "deorbitCompliance",
      label: "Deorbit Compliance Likelihood",
      weight: 0.25,
      description: "Based on constellation size, stated end-of-life (EOL) policy, and historical compliance rates for the operator or state. Larger constellations with no stated EOL policy score higher (greater risk).",
      scale: "0 = assured deorbit compliance; 100 = no deorbit plan or capacity",
    },
    {
      id: "escalationCoupling",
      label: "Escalation Coupling",
      weight: 0.25,
      description: "Does this object or regime intersect with dual-use or military assets? Scores the degree to which a collision, interference, or governance failure in this regime could escalate into interstate tension or military response. Factors: military asset proximity, dual-use infrastructure dependence, adversary co-location.",
      scale: "0 = no escalation coupling; 100 = direct military escalation pathway",
    },
  ],
  colorScale: [
    { min: 0, max: 33, label: "Low Risk", color: "#10b981" },
    { min: 34, max: 66, label: "Moderate Risk", color: "#f59e0b" },
    { min: 67, max: 100, label: "High Risk", color: "#ef4444" },
  ],
};

export const REGIME_GOVERNANCE_SCORES = [
  {
    regime: "LEO",
    overallScore: 74,
    components: {
      attribution: 62,
      normAdherence: 68,
      deorbitCompliance: 82,
      escalationCoupling: 84,
    },
    analystNote: "LEO carries the highest governance risk of any orbital regime. The combination of extreme congestion, multiple non-adherent operators (Guowang, Thousand Sails constellations from states that have not adopted LTS Guidelines), legacy Soviet debris, and direct military asset co-location creates a compound risk environment that existing governance frameworks were not designed to manage. The absence of a binding space traffic management regime is most acutely felt here.",
  },
  {
    regime: "MEO",
    overallScore: 52,
    components: {
      attribution: 28,
      normAdherence: 42,
      deorbitCompliance: 48,
      escalationCoupling: 90,
    },
    analystNote: "MEO presents a paradox: relatively low debris density and high attribution capability, but extreme escalation coupling. GPS, GLONASS, Galileo, and BeiDou all reside here — the navigation infrastructure upon which global aviation, maritime, financial, and military systems depend. Any collision in MEO would generate debris with multi-century orbital lifetimes, threatening all four navigation constellations simultaneously.",
  },
  {
    regime: "GEO",
    overallScore: 61,
    components: {
      attribution: 34,
      normAdherence: 55,
      deorbitCompliance: 72,
      escalationCoupling: 83,
    },
    analystNote: "GEO governance is shaped by the ITU coordination regime, which provides structure but not enforcement. Failed graveyard orbit disposals, growing RPO activity (Luch/Olymp-K), and disputed orbital slot filings create a regime where governance tools exist but compliance is uneven. The finite number of GEO slots makes this a zero-sum resource allocation problem with no binding arbitration mechanism.",
  },
  {
    regime: "HEO",
    overallScore: 38,
    components: {
      attribution: 42,
      normAdherence: 35,
      deorbitCompliance: 30,
      escalationCoupling: 45,
    },
    analystNote: "HEO presents moderate governance risk driven primarily by the strategic military significance of Molniya and Tundra orbits for early warning and polar communications. Low object density reduces collision risk, but the military character of most HEO assets means that any conjunction event carries disproportionate escalation potential.",
  },
  {
    regime: "SSO",
    overallScore: 71,
    components: {
      attribution: 58,
      normAdherence: 65,
      deorbitCompliance: 78,
      escalationCoupling: 83,
    },
    analystNote: "SSO is a subset of LEO but merits separate governance attention due to its extreme congestion in the 600–800 km band. This is the primary Earth observation regime — host to both civilian (Copernicus, Landsat) and military reconnaissance assets. The cohabitation of reconnaissance and civilian satellites means that any debris event has immediate dual-use implications. Legacy SL-8 rocket bodies remain the single largest category of high-risk debris objects.",
  },
];

export const CONSTELLATION_GOVERNANCE_SCORES = [
  {
    constellation: "Starlink",
    score: 35,
    components: { attribution: 12, normAdherence: 18, deorbitCompliance: 38, escalationCoupling: 72 },
    note: "Low governance risk on individual satellite compliance, but systemic risk from scale (60% of LEO) and dual-use military provision.",
  },
  {
    constellation: "OneWeb",
    score: 24,
    components: { attribution: 10, normAdherence: 15, deorbitCompliance: 22, escalationCoupling: 48 },
    note: "Well-regulated under UK Space Industry Act. Moderate escalation coupling from government/military customers.",
  },
  {
    constellation: "Guowang",
    score: 82,
    components: { attribution: 72, normAdherence: 88, deorbitCompliance: 92, escalationCoupling: 76 },
    note: "Highest-risk planned constellation. No public debris mitigation plan, LTS Guidelines not adopted, no ITU coordination agreement with existing NGSO operators.",
  },
  {
    constellation: "Thousand Sails",
    score: 78,
    components: { attribution: 68, normAdherence: 85, deorbitCompliance: 88, escalationCoupling: 72 },
    note: "First launches August 2024 without public frequency coordination or debris mitigation commitments. Operating in regime with no binding deorbit obligation.",
  },
  {
    constellation: "GPS",
    score: 28,
    components: { attribution: 5, normAdherence: 10, deorbitCompliance: 15, escalationCoupling: 82 },
    note: "Excellently governed military system, but escalation coupling is inherently extreme — any threat to GPS is a national security crisis.",
  },
  {
    constellation: "GLONASS",
    score: 55,
    components: { attribution: 25, normAdherence: 62, deorbitCompliance: 52, escalationCoupling: 80 },
    note: "State-operated military/civilian system. Russia's partial LTS adoption and non-participation in Artemis Accords elevate norm adherence risk.",
  },
  {
    constellation: "BeiDou",
    score: 58,
    components: { attribution: 30, normAdherence: 72, deorbitCompliance: 48, escalationCoupling: 82 },
    note: "Multi-orbit military/civilian system. China's non-adoption of LTS Guidelines and non-participation in Artemis Accords elevate governance risk.",
  },
];

// Overall orbital environment health score (composite)
export const ORBITAL_HEALTH_SCORE = {
  score: 38,
  label: "Stressed",
  description: "The orbital environment is under increasing governance strain. Debris density is rising faster than mitigation capacity, conjunction rates are accelerating, and the regulatory framework has not kept pace with the growth in operators and objects.",
  trend: "deteriorating",
  lastUpdated: "2025-04-12",
};
