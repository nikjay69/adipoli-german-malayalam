# AI Generation Session Log

Append-only log of every Imagen + Veo + ffmpeg call from `scripts/render-arc.py`. Each entry is one Markdown section.

Use this to audit drift, debug failures, and reconstruct the prompt actually sent for any given output. Format is intentionally human-readable so future Nik (or future Claude/Openclaw) can grep through it without tooling.

This file is auto-appended by the orchestrator. Do not hand-edit existing entries — they're a frozen record of what was sent and when. New entries always go at the bottom.

---

