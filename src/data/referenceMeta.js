// Reference layers (conjunctions, debris density, spectrum congestion) are
// static values compiled by the author on one date. They are not a live feed
// and their CDM-style ids are synthetic. Every view and export of these layers
// carries this metadata.
export const REFERENCE_AS_OF = "2025-04-12";
export const REFERENCE_AS_OF_LABEL = "12 Apr 2025";
export const REFERENCE_NOTE = `Reference values, compiled ${REFERENCE_AS_OF_LABEL}, not live`;
export const SNAPSHOT_LABEL = `snapshot as of ${REFERENCE_AS_OF_LABEL}`;

/** Wrap a reference layer for export so the file says what it is. */
export function referenceExport(layer, data) {
  return {
    meta: {
      layer,
      illustrative: true,
      asOf: REFERENCE_AS_OF,
      note: `${REFERENCE_NOTE}. Values are representative, compiled from public estimates; event ids are synthetic.`,
    },
    data,
  };
}
