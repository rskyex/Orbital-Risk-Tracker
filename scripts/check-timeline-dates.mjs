// Fails if an actor timeline entry (ACTOR_PROFILES[].recentBehaviour) is dated
// differently from the incident record it describes. Run: npm run check:dates
//
// Matching, by title keywords:
// - Words are compared case-insensitively after dropping stop words. "Kosmos"
//   counts as "Cosmos".
// - An entry matches an incident when they share at least 2 words, at least one
//   of which is not common across titles (Cosmos, ASAT, jamming, country names ...).
// - If both name designators (words with digits, e.g. 2558, SJ-21), they must
//   share one, so "Cosmos 2558" never matches "Cosmos-2542/2543".
// - Entries about ongoing activity ("continued ...", "expanded ...") describe a
//   period, not a dated event, and are skipped.
// - Illustrative incident records are ignored.
// The timeline month (YYYY-MM) must equal the incident's date month.
import { ACTOR_PROFILES } from "../src/data/actors.js";
import { INCIDENTS } from "../src/data/incidents.js";

const STOP = new Set(
  ("a an and the of in on at to for by with from near during into its us first new " +
    "test tests launched launch satellite satellites space orbit asset assets " +
    "operation operations activities activity systematic campaign proximity").split(" ")
);
const COMMON = new Set(
  ("asat cosmos jamming spoofing inspector mission demonstration geo leo gps gnss sj " +
    "ukraine russia china india usa korea").split(" ")
);
const ONGOING = /\b(continued|ongoing|expanded|progressed)\b/i;

const words = (s) =>
  new Set(s.toLowerCase().replace(/kosmos/g, "cosmos").split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w)));
const designators = (ws) => [...ws].filter((w) => /\d/.test(w));

const incidents = INCIDENTS.filter((i) => !i.tags?.includes("ILLUSTRATIVE")).map((i) => ({ ...i, words: words(i.title) }));

const errors = [];
let checked = 0;
for (const actor of ACTOR_PROFILES) {
  for (const entry of actor.recentBehaviour || []) {
    if (ONGOING.test(entry.event)) continue;
    const ew = words(entry.event);
    const ed = designators(ew);
    const matches = incidents.filter((inc) => {
      const shared = [...inc.words].filter((w) => ew.has(w));
      if (shared.length < 2 || shared.every((w) => COMMON.has(w))) return false;
      const id = designators(inc.words);
      return !(ed.length && id.length && !id.some((d) => ew.has(d)));
    });
    if (!matches.length) continue;
    const label = `${actor.id} ${entry.date} "${entry.event}"`;
    if (matches.length > 1) {
      errors.push(`${label} matches several incidents: ${matches.map((m) => `#${m.id}`).join(", ")}`);
      continue;
    }
    const [inc] = matches;
    checked++;
    if (inc.date.slice(0, 7) !== entry.date) {
      errors.push(`${label} is dated ${entry.date}, but incident #${inc.id} "${inc.title}" is ${inc.date}`);
    } else {
      console.log(`ok  ${label} = #${inc.id} ${inc.date}`);
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error(`FAIL ${e}`);
  console.error(`check:dates failed (${errors.length} problem(s))`);
  process.exit(1);
}
console.log(`check:dates passed (${checked} timeline entries matched to incidents)`);
