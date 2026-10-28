# Changelog

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
