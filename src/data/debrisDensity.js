// ─── Debris Density by Orbital Regime ─────────────────────────────────────
// Reference layer: values compiled 2025-04-12, not live (see referenceMeta.js).
// Representative static dataset mirroring Space-Track.org TLE data patterns.
// Object counts are approximate and based on publicly available estimates
// from NASA ODPO, ESA Space Debris Office, and 18th Space Defense Squadron
// catalogued object reports (2024–2025).

export const ORBITAL_REGIMES = {
  LEO: {
    id: "LEO",
    label: "Low Earth Orbit",
    altitudeRange: "200–2,000 km",
    description: "Densest orbital regime. Home to ISS, Starlink, reconnaissance, and Earth observation satellites. Primary zone for collision risk and post-ASAT debris accumulation.",
    color: "#ef4444",
  },
  MEO: {
    id: "MEO",
    label: "Medium Earth Orbit",
    altitudeRange: "2,000–35,786 km",
    description: "Navigation constellation regime (GPS, GLONASS, Galileo, BeiDou). Lower object density but high strategic value. Debris here has multi-century orbital lifetime.",
    color: "#f59e0b",
  },
  GEO: {
    id: "GEO",
    label: "Geostationary Orbit",
    altitudeRange: "~35,786 km",
    description: "Communications and early warning satellites. Finite number of orbital slots coordinated through ITU. Graveyard orbit used for disposal but compliance is uneven.",
    color: "#8b5cf6",
  },
  HEO: {
    id: "HEO",
    label: "Highly Elliptical Orbit",
    altitudeRange: "Variable (perigee ~500 km, apogee ~40,000 km)",
    description: "Molniya and Tundra orbits for high-latitude communications and early warning. Small population but strategically significant for polar coverage.",
    color: "#4488ff",
  },
  SSO: {
    id: "SSO",
    label: "Sun-Synchronous Orbit",
    altitudeRange: "600–800 km (typical)",
    description: "Subset of LEO used for Earth observation and reconnaissance. Extremely congested altitude band with highest conjunction rates per unit volume.",
    color: "#10b981",
  },
};

export const DEBRIS_DENSITY_DATA = [
  {
    regime: "LEO",
    trackedObjects: 19847,
    estimatedDebris_1to10cm: 500000,
    estimatedDebris_below1cm: 128000000,
    riskLevel: "critical",
    riskScore: 92,
    majorContributors: [
      // Cataloged fragments and share still in orbit, from NASA ODPO "Top-10 Worst Historical
      // Breakup Events Based on Catalog Data as of 31 January 2023", ODQN vol. 27 issue 1:
      // https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv27i1.pdf
      // FY-1C 3532 cataloged / 2793 in orbit; Cosmos 2251 1715 / 1021 (Iridium 33 fragments
      // are counted separately); Cosmos 1408 1785 / 364.
      { event: "FY-1C ASAT (2007)", fragments: 3532, percentRemaining: 79 },
      { event: "Cosmos 2251 (collision with Iridium 33, 2009)", fragments: 1715, percentRemaining: 60 },
      { event: "Cosmos 1408 ASAT (2021)", fragments: 1785, percentRemaining: 20 },
      { event: "Starlink constellation ops", fragments: "N/A — operational", percentRemaining: 100 },
    ],
    densityTrend: "increasing",
    collisionProbabilityIndex: 0.87,
    yearlyConjunctions_below1km: 4200,
  },
  {
    regime: "MEO",
    trackedObjects: 1284,
    estimatedDebris_1to10cm: 12000,
    estimatedDebris_below1cm: 3500000,
    riskLevel: "medium",
    riskScore: 41,
    majorContributors: [
      { event: "Spent upper stages", fragments: 340, percentRemaining: 95 },
      { event: "Navigation constellation disposal failures", fragments: 87, percentRemaining: 100 },
    ],
    densityTrend: "stable",
    collisionProbabilityIndex: 0.12,
    yearlyConjunctions_below1km: 180,
  },
  {
    regime: "GEO",
    trackedObjects: 1476,
    estimatedDebris_1to10cm: 8000,
    estimatedDebris_below1cm: 1200000,
    riskLevel: "high",
    riskScore: 67,
    majorContributors: [
      { event: "Failed graveyard orbit disposal", fragments: 210, percentRemaining: 100 },
      { event: "Ekran-2 explosion (1978)", fragments: 54, percentRemaining: 88 },
      { event: "Titan IIIC transtage breakups", fragments: 178, percentRemaining: 96 },
    ],
    densityTrend: "increasing",
    collisionProbabilityIndex: 0.34,
    yearlyConjunctions_below1km: 320,
  },
  {
    regime: "HEO",
    trackedObjects: 412,
    estimatedDebris_1to10cm: 3200,
    estimatedDebris_below1cm: 450000,
    riskLevel: "low",
    riskScore: 24,
    majorContributors: [
      { event: "Spent Molniya upper stages", fragments: 156, percentRemaining: 72 },
    ],
    densityTrend: "stable",
    collisionProbabilityIndex: 0.06,
    yearlyConjunctions_below1km: 45,
  },
  {
    regime: "SSO",
    trackedObjects: 6234,
    estimatedDebris_1to10cm: 180000,
    estimatedDebris_below1cm: 42000000,
    riskLevel: "critical",
    riskScore: 88,
    majorContributors: [
      { event: "FY-1C ASAT debris (transiting)", fragments: 890, percentRemaining: 82 },
      { event: "Earth observation constellation growth", fragments: "N/A — operational", percentRemaining: 100 },
      { event: "Spent rocket bodies (SL-8 Cosmos)", fragments: 420, percentRemaining: 94 },
    ],
    densityTrend: "rapidly increasing",
    collisionProbabilityIndex: 0.79,
    yearlyConjunctions_below1km: 3100,
  },
];

export const DEBRIS_ALTITUDE_BANDS = [
  { altitude: 200, density: 0.8, label: "200 km" },
  { altitude: 300, density: 1.2, label: "300 km" },
  { altitude: 400, density: 2.1, label: "400 km — ISS" },
  // Cosmos 1408 was at 490 x 465 km when destroyed (ODQN vol. 26 issue 1,
  // https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv26i1.pdf); most fragments decayed by 2023.
  { altitude: 500, density: 3.8, label: "500 km — Cosmos 1408 destroyed at ~480 km" },
  { altitude: 550, density: 4.2, label: "550 km — Starlink" },
  { altitude: 600, density: 5.1, label: "600 km" },
  { altitude: 700, density: 6.4, label: "700 km" },
  { altitude: 780, density: 8.7, label: "780 km" },
  { altitude: 800, density: 9.2, label: "800 km — SSO peak" },
  // FY-1C was in an 845 x 865 km orbit when destroyed (ODQN vol. 11 issue 2,
  // https://orbitaldebris.jsc.nasa.gov/quarterly-news/pdfs/odqnv11i2.pdf).
  { altitude: 850, density: 8.1, label: "850 km — FY-1C destroyed at ~865 km" },
  { altitude: 900, density: 5.8, label: "900 km" },
  { altitude: 1000, density: 3.9, label: "1,000 km" },
  { altitude: 1200, density: 2.1, label: "1,200 km" },
  { altitude: 1500, density: 1.4, label: "1,500 km" },
];
