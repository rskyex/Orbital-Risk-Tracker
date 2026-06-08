# Orbital Risk Tracker

A governance-grade analytical platform for visualizing and assessing space security incidents, orbital environmental hazards, and governance risks. Built as part of the **Faultline** strategic intelligence suite.

## Overview

Orbital Risk Tracker applies the **Jervis Security Dilemma Framework** (1978) to evaluate space security incidents across three dimensions:

- **Legibility** — How identifiable is the responsible actor?
- **Reversibility** — Can the effects be undone?
- **Escalation Potential** — How likely is a military response?

The platform maps 30+ documented incidents (2006–2024) including ASAT tests, jamming, proximity operations, cyber attacks, GPS spoofing, and laser dazzling. Beyond incident tracking, it provides a governance-first analytical layer covering legal frameworks, jurisdiction fragmentation, and structural governance gaps in the space domain.

## Features

### Incident Analysis
- **3D Orbital Globe** — Interactive globe visualization of space security incidents
- **Jervis Radar Analysis** — Multi-axis radar charts scoring incidents on the security dilemma framework
- **Searchable Incident Database** — 30+ incidents filterable by type, actor, and severity with full intelligence records

### Orbital Environment
- **Debris Density Tracking** — Object counts across 5 orbital regimes (LEO, MEO, GEO, HEO, SSO)
- **Conjunction Log** — Near-miss events with collision probability, miss distance, and relative velocity
- **Spectrum Congestion** — ITU GEO slot filings and frequency coordination analysis

### Governance & Legal Framework
- **Governance Risk Scoring** — Composite index (0–100) per orbital regime with 4 sub-indices: attribution difficulty, norm adherence, deorbit compliance, and escalation coupling
- **Treaty Compliance Matrix** — Coverage of OST, Liability Convention, Registration Convention, COPUOS LTS Guidelines, Artemis Accords, and ITU regulations across 9 major actors
- **Jurisdiction Fragmentation** — Constellation-level tracking of licensing state, operator nationality, and treaty applicability (Starlink, OneWeb, Kuiper, Guowang, and others)
- **Structural Governance Gaps** — Identified voids including LEO congestion deficit, SSO reconnaissance cohabitation, GEO proximity operations, megaconstellation regulatory arbitrage, and collision liability gaps
- **Reform Pathways Monitor** — Active and proposed governance reform tracking

### Intelligence & Actors
- **Narrative Intelligence Panel** — Contextual analyst notes linking spatial risk events to governance implications
- **Space Actor Profiles** — Treaty ratification matrices and norm posture for major spacefaring nations and commercial entities

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM 7 (HashRouter) |
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
├── pages/                         # Route-level page components
│   ├── HomePage.jsx               # Multi-section dashboard
│   ├── RadarPage.jsx              # Jervis security dilemma radar
│   ├── GovernancePage.jsx         # Governance architecture & treaties
│   ├── MethodologyPage.jsx        # Scoring rubric & methodology
│   ├── DataSourcesPage.jsx        # Data source documentation
│   ├── AboutPage.jsx              # Platform overview
│   └── IncidentDetailPage.jsx     # Individual incident detail
│
├── components/                    # 25+ reusable UI components
│   ├── globe/
│   │   └── OrbitalGlobe.jsx      # 3D globe (react-globe.gl)
│   ├── charts/
│   │   ├── JervisRadar.jsx       # Security dilemma radar chart
│   │   ├── TimelineChart.jsx     # Temporal incident data
│   │   └── ComparisonBar.jsx     # Comparative analysis
│   ├── IncidentExplorer.jsx      # Searchable incident database
│   ├── IncidentMap.jsx           # Leaflet map visualization
│   ├── DebrisDensityPanel.jsx    # Debris tracking by regime
│   ├── ConjunctionLog.jsx        # Conjunction event log
│   ├── SpectrumCongestionPanel.jsx
│   ├── GovernanceRiskPanel.jsx   # Governance risk scoring
│   ├── GovernanceArchitecture.jsx # Treaty & framework visualization
│   ├── NarrativeIntelPanel.jsx   # Contextual narrative analysis
│   ├── ActorProfiles.jsx         # Space actor profiles & compliance
│   ├── Navbar.jsx, Hero.jsx, Footer.jsx
│   └── StarField.jsx             # Background animation
│
├── data/                          # Structured datasets
│   ├── incidents.js               # 30+ space security incidents
│   ├── actors.js                  # Space actor profiles
│   ├── governance.js              # Governance risk scores by regime
│   ├── conjunctions.js            # Conjunction events (CDM format)
│   ├── debrisDensity.js           # Debris counts by orbital regime
│   ├── spectrumCongestion.js      # ITU spectrum & frequency data
│   ├── legalFramework.js          # Treaty compliance & structural gaps
│   ├── jurisdiction.js            # Constellation jurisdiction tracking
│   └── sources.js                 # Data source references
│
├── hooks/
│   └── useScrollReveal.js         # Scroll animation hook
│
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
