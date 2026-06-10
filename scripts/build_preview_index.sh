#!/usr/bin/env bash
# Build a static index page listing all rendered guide videos in
# public/preview/. Re-runnable; idempotent.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PREVIEW_DIR="$REPO_ROOT/public/preview"
INDEX="$PREVIEW_DIR/index.html"

mkdir -p "$PREVIEW_DIR"

cat > "$INDEX" << 'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Adipoli — Guide Videos</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/hl/homelab.css" />
  <style>
    body { background: #0d1a0d; color: #f5f0e8; font-family: system-ui, sans-serif; margin: 0; padding: 32px; }
    h1 { margin: 0 0 8px; font-size: 36px; }
    p.lead { color: rgba(245,240,232,0.7); margin: 0 0 32px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(245,240,232,0.12); border-radius: 12px; padding: 16px; }
    .card h2 { font-size: 18px; margin: 0 0 8px; color: #d4a520; }
    .card video { width: 100%; border-radius: 8px; background: #000; }
    .meta { font-size: 13px; color: rgba(245,240,232,0.55); margin-top: 6px; }
    .missing { opacity: 0.4; font-style: italic; padding: 32px 0; text-align: center; }
  </style>
</head>
<body>
  <h1>Adipoli — Guide videos</h1>
  <p class="lead">Reference videos for re-recording. 18 modules. Updated automatically by build_preview_index.sh.</p>
  <div class="grid">
EOF

for ID in $(seq 1 18); do
  PADDED=$(printf "%02d" "$ID")
  MP4="module-${PADDED}.mp4"
  if [[ -f "$PREVIEW_DIR/$MP4" ]]; then
    SIZE=$(du -h "$PREVIEW_DIR/$MP4" | cut -f1)
    cat >> "$INDEX" << EOF
    <div class="card">
      <h2>Module $PADDED</h2>
      <video controls preload="metadata" src="$MP4"></video>
      <div class="meta">$SIZE · <a href="$MP4" download style="color:#d4a520">download</a></div>
    </div>
EOF
  else
    cat >> "$INDEX" << EOF
    <div class="card">
      <h2>Module $PADDED</h2>
      <div class="missing">not yet rendered</div>
    </div>
EOF
  fi
done

cat >> "$INDEX" << 'EOF'
  </div>
</body>
</html>
EOF

echo "wrote $INDEX"
