# Orbital Risk Tracker

A governance-grade analytical platform for visualizing and assessing space security incidents, orbital environmental hazards, and governance risks. Built as part of the **Faultline** strategic intelligence suite.

## Overview

Orbital Risk Tracker applies the **Jervis Security Dilemma Framework** (1978) to evaluate space security incidents across three dimensions:

- **Legibility** — How identifiable is the responsible actor?
- **Reversibility** — Can the effects be undone?
- **Escalation Potential** — How likely is a military response?

The platform maps 30+ documented incidents (2006–2024) including ASAT tests, jamming, proximity operations, cyber attacks, GPS spoofing, and laser dazzling.

## Features

- **3D Orbital Globe** — Interactive globe visualization of space security incidents using react-globe.gl
- **Jervis Radar Analysis** — Multi-axis radar charts scoring incidents on the security dilemma framework
- **Debris Density Tracking** — Object counts across 5 orbital regimes (LEO, MEO, GEO, HEO, SSO)
- **Conjunction Log** — Near-miss events with collision probability, miss distance, and relative velocity
- **Spectrum Congestion** — ITU GEO slot filings and frequency coordination analysis
- **Governance Risk Scoring** — Composite index (0–100) measuring attribution difficulty, norm adherence, deorbit compliance, and escalation coupling
- **Space Actor Profiles** — Treaty ratification matrices and norm posture for major spacefaring nations and commercial entities
- **Searchable Incident Database** — Filterable by type, actor, and severity with full intelligence records
- **Legal Framework Visualization** — Treaty compliance matrices covering OST, Liability Convention, Registration Convention, COPUOS LTS Guidelines, Artemis Accords, and ITU regulations

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM 7 |
| 3D Globe | react-globe.gl |
| Maps | Leaflet + React-Leaflet |
| Charts | Recharts |
| Deployment | GitHub Pages / Vercel |

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/rskyex/Orbital-Risk-Tracker.git
cd Orbital-Risk-Tracker
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

## Project Structure

```
src/
├── pages/                  # Route-level page components
│   ├── HomePage.jsx        # Main dashboard
│   ├── RadarPage.jsx       # Jervis security dilemma radar
│   ├── GovernancePage.jsx  # Governance architecture
│   ├── MethodologyPage.jsx # Scoring rubric & methodology
│   ├── DataSourcesPage.jsx # Data source documentation
│   ├── AboutPage.jsx       # Platform overview
│   └── IncidentDetailPage.jsx
├── components/             # Reusable UI components
│   ├── globe/              # 3D orbital globe
│   ├── charts/             # Recharts visualizations
│   ├── IncidentExplorer.jsx
│   ├── DebrisDensityPanel.jsx
│   ├── ConjunctionLog.jsx
│   ├── GovernanceRiskPanel.jsx
│   ├── ActorProfiles.jsx
│   └── ...
├── data/                   # Incident, governance & reference datasets
├── hooks/                  # Custom React hooks
└── assets/
```

## Data Sources

- [Space-Track.org](https://www.space-track.org/) — Conjunction data and orbital elements
- [NASA ODPO](https://orbitaldebris.jsc.nasa.gov/) — Debris environment models
- [ESA Space Debris Office](https://www.esa.int/Space_Safety/Space_Debris) — Debris statistics
- [ITU](https://www.itu.int/) — Spectrum and GEO slot filings
- [UN COPUOS](https://www.unoosa.org/oosa/en/ourwork/copuos/index.html) — Long-term sustainability guidelines
- [Secure World Foundation](https://swfound.org/) — Space sustainability assessments
- [CSIS Aerospace Security Project](https://www.csis.org/programs/international-security-program/aerospace-security-project) — Incident documentation

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Copyright 2026 Risa Koyanagi
