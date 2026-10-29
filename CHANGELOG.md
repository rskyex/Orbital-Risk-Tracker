# Changelog

## Dataset 1.3.0 — 2026-10-29

Scoring (src/data/scoring.js, one place for every derived score):

- Reversibility direction: 1 = irreversible, 5 = instantly reversible, as in the data. The
  methodology page's rubric was reversed and is corrected.
- Risk Index = ((6 − legibility) + (6 − reversibility) + escalation) / 3, exactly 1–5, replacing
  four copies of ((5 − L) + R + E) / 3, which ranked irreversible ASAT tests lowest (2.00) and ran
  0.67–4.67. Exports include the computed riskIndex.
- Salami tactic is computed: legibility ≤ 3 and reversibility ≥ 3 (was hand-coded; the page's
  stated rule fitted 7 of 32 records). 21 of 32 records qualify. No longer salami: Baltic/Nordic
  GNSS jamming, Starlink jamming in Ukraine and the systematic GNSS EW campaign (openly attributed,
  legibility 4) and the SJ-21 tow (reversibility 2).

Governance risk scores:

- Overall scores are computed as the mean of the four sub-scores.
- Constellation norm adherence is derived from the treaty compliance matrix for the licensing
  state (Starlink 31, Guowang 68, Thousand Sails 65, GPS 26, GLONASS 46, BeiDou 48 overall).
  OneWeb (UK not in the matrix) and all regime scores keep author judgement, labelled as such.
- Each sub-score shows its basis and a rubric line with its inputs.

Coding: differentiation and interpretation are coded on two documented incidents with sources:
Fengyun-1C (distinguishability high; interpretation settled, with China's dissent noted) and
Cosmos 2576 (distinguishability low; interpretation contested between USSPACECOM and Russia's
foreign ministry).

## Dataset 1.2.0 — 2026-10-29

Reference layers:

- Conjunctions, debris density and spectrum congestion are reference values compiled on
  12 Apr 2025, not live data. Every layer and the header strip say so; "72h" and "YTD" counts are
  labelled as a snapshot; CDM-style ids are synthetic (SYN-CDM-...); exports carry
  `illustrative` and `asOf`. The Environment Health score (38/100) is removed: nothing derived it.
- Header total of tracked objects no longer adds SSO to LEO (SSO is a subset).

Corrections (each cited in a code comment):

- Debris: FY-1C destroyed in an 845 x 865 km orbit (NASA ODQN 11-2); Cosmos 1408 at 490 x 465 km
  (ODQN 26-1); fragments still in orbit as of 31 Jan 2023: FY-1C 2,793 of 3,532 (79%), Cosmos 2251
  1,021 of 1,715 (60%), Cosmos 1408 364 of 1,785 (20%, was 91%) (ODQN 27-1).
- Guowang: deploying since its first launch on 16 Dec 2024 (was pre-deployment).
- China and the LTS Guidelines: "joined the 2019 COPUOS consensus; national implementation not
  documented" (A/74/20, Annex II), replacing "not adopted".
- Incident 19: the object was released from Cosmos 2543 near another Russian satellite (USSPACECOM,
  23 Jul 2020), not from Cosmos 2536 near the ISS; title, target and tags corrected.
- Incidents 25 and 28: the EASA GNSS bulletin is SIB 2022-02R3; there is no SIB 2024-09.
- Illustrative records 901-904: confidence "n/a (fictional)".

Sources:

- 18 of the 20 incidents that linked only to a home page now link to the report itself (verified
  pages; SWF 2018 PDF page references given). Incident 3 (DoD briefing, archive.defense.gov no
  longer resolves) and incident 22 (no SpaceX or Wired page found) still have no deep link.
- Incident 26's report is CSIS's Space Threat Assessment 2023, not SWF's.

Accessibility: labelled timeline range inputs, a named modal close button, muted text contrast
raised from about 2.3:1 to 5.4:1.

## Dataset 1.1.0 — 2026-10-28

Data corrections:

- Russia timeline: Starlink jamming 2022-02 → 2022-03; Cosmos 2558 near USA-326 2023-05 → 2022-08
  (now match incidents 22 and 24).
- Incident 21 (Viasat KA-SAT): AA22-110A, which does not mention KA-SAT, replaced by CISA/FBI
  AA22-076A; added Viasat's KA-SAT overview, SentinelOne's AcidRain analysis and the EU
  declaration of 10 May 2022 (the same sources as the Cyber Escalation Atlas case).
- Incident 26 (SJ-21 tow of Compass-G2): 2023-01-26 → 2022-01-26 (Breaking Defense, 26 Jan 2022);
  China timeline entry 2023-10 → 2022-01.
- Incident records can list several sources; downloads gain a `sources` column.
- `npm run check:dates` (alias `check:data`, run before each build) fails when an actor timeline
  date differs from the matching incident.
