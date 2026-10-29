import { REFERENCE_NOTE } from "../data/referenceMeta";

/** Visible marker on every reference layer: compiled values, not live data. */
export default function ReferenceBadge() {
  return (
    <span className="reference-badge" role="note">
      {REFERENCE_NOTE}
    </span>
  );
}
