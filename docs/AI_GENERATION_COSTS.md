# AI Generation Cost Ledger

Live append-only ledger of API spend from `scripts/render-arc.py`. Estimates are based on the orchestrator's per-call cost model:

- **Imagen 3 (Vertex AI)**: ~$0.04 per image
- **Veo 3.1 Fast (Vertex AI)**: ~$0.035 per second of video (≈ ₹3/sec, matches the observed ~₹12/4s clip from the existing pilot videos 1 and 7)

**Actual Vertex AI billing is authoritative.** This ledger reflects the orchestrator's prediction at call time, which may diverge slightly from final billed amounts. Verify periodically against the GCP billing console (Billing → Reports → filter by service: "Vertex AI").

This file is auto-appended by the orchestrator. New rows go at the bottom.

| Timestamp (UTC) | Type | Scene | Units | Est. USD | Status | Output |
|---|---|---|---|---|---|---|
