(() => {
  'use strict';

  const WIDTH = 1920;
  const HEIGHT = 1080;
  const DURATION = 48;
  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d', { alpha: false });

  const C = {
    canvas: '#0d1a0d', deep: '#081108', surface: '#162416', raised: '#203520',
    ink: '#f7f0dd', muted: '#c8c2b1', gold: '#f1d27a', goldDeep: '#b8891a',
    success: '#3fbf75', successInk: '#bcf7d0', danger: '#c0392b', dangerInk: '#ffc9c2',
    listening: '#9dc4ff'
  };

  const sceneRanges = [
    [0, 7, 'FIRST SOUND'], [7, 14, 'YOUR REPLY'], [14, 23, 'BY TIME'],
    [23, 31, 'FIRST SENTENCE'], [31, 41, 'TINY DIALOGUE'], [41, 48, 'FIRST WIN']
  ];

  const imageSources = {
    study: 'assets/kerala-study.png',
    frauGreeting: 'assets/frau-weber-greeting.png',
    frauTeaching: 'assets/frau-weber-teaching.png',
    kuttanWaving: 'assets/kuttan-waving.png',
    kuttanPointing: 'assets/kuttan-pointing.png'
  };
  const images = {};

  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const reveal = (t, at, duration = .7) => easeOut((t - at) / duration);
  const fade = (local, length) => clamp(local / .45) * clamp((length - local) / .55);

  function font(size, family = 'Georgia', weight = 700) {
    return `${weight} ${size}px ${family}`;
  }

  function mono(size, weight = 700) {
    return `${weight} ${size}px "Cascadia Mono", Consolas, monospace`;
  }

  function sans(size, weight = 700) {
    return `${weight} ${size}px Bahnschrift, "Arial Narrow", Arial, sans-serif`;
  }

  function roundRect(x, y, w, h, r, fill, stroke, lineWidth = 2) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  }

  function label(text, x, y, color = C.gold, align = 'left', size = 21) {
    ctx.save();
    ctx.font = mono(size);
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text.toUpperCase(), x, y);
    ctx.restore();
  }

  function headline(text, x, y, size = 84, align = 'left', color = C.ink) {
    ctx.save();
    ctx.font = sans(size);
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function phrase(text, x, y, size = 112, align = 'left', color = C.ink) {
    ctx.save();
    ctx.font = font(size);
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawImageContain(img, x, y, w, h, alpha = 1, scale = 1) {
    if (!img || !img.complete) return;
    const ratio = Math.min(w / img.naturalWidth, h / img.naturalHeight) * scale;
    const dw = img.naturalWidth * ratio;
    const dh = img.naturalHeight * ratio;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, x + (w - dw) / 2, y + h - dh, dw, dh);
    ctx.restore();
  }

  function drawImageCover(img, x, y, w, h, alpha = 1, zoom = 1) {
    if (!img || !img.complete) return;
    const ratio = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
    const sw = w / ratio;
    const sh = h / ratio;
    const sx = (img.naturalWidth - sw) / 2;
    const sy = (img.naturalHeight - sh) / 2;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  }

  function base(t, activeIndex) {
    ctx.fillStyle = C.deep;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    const glow = ctx.createRadialGradient(1490, 250, 0, 1490, 250, 760);
    glow.addColorStop(0, 'rgba(241,210,122,.13)');
    glow.addColorStop(1, 'rgba(241,210,122,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.globalAlpha = .07;
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1;
    for (let x = 0; x <= WIDTH; x += 96) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, HEIGHT); ctx.stroke(); }
    for (let y = 0; y <= HEIGHT; y += 96) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(WIDTH, y); ctx.stroke(); }
    ctx.restore();

    label('ADIPOLI GERMAN · MODULE 01 · LESSON 01', 112, 68, C.gold, 'left', 18);
    label(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')} / 00:48`, 1808, 68, C.muted, 'right', 17);

    const x0 = 112, total = 1696, gap = 10;
    const seg = (total - gap * (sceneRanges.length - 1)) / sceneRanges.length;
    sceneRanges.forEach((s, i) => {
      const x = x0 + i * (seg + gap);
      ctx.fillStyle = i < activeIndex ? C.goldDeep : i === activeIndex ? C.gold : 'rgba(247,240,221,.16)';
      ctx.fillRect(x, 1018, seg, i === activeIndex ? 8 : 4);
      if (i === activeIndex) label(s[2], x, 1000, C.gold, 'left', 14);
    });
  }

  function withScene(t, start, end, index, draw) {
    if (t < start || t >= end) return;
    const local = t - start;
    const alpha = fade(local, end - start);
    base(t, index);
    ctx.save();
    ctx.globalAlpha = alpha;
    draw(local, end - start);
    ctx.restore();
  }

  function sceneFirstSound(local) {
    const r1 = reveal(local, .1, .8);
    const r2 = reveal(local, .45, .85);
    const r3 = reveal(local, 1.0, .65);
    drawImageCover(images.study, 0, 0, WIDTH, HEIGHT, .21, 1.02 + local * .0015);
    const veil = ctx.createLinearGradient(0, 0, WIDTH, 0);
    veil.addColorStop(0, 'rgba(8,17,8,.98)'); veil.addColorStop(.62, 'rgba(8,17,8,.82)'); veil.addColorStop(1, 'rgba(8,17,8,.42)');
    ctx.fillStyle = veil; ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.save(); ctx.globalAlpha *= r1; label('FRAU WEBER · MODEL AUDIO', 144, 280, C.listening); ctx.restore();
    ctx.save(); ctx.globalAlpha *= r2; ctx.translate(0, lerp(45, 0, r2)); phrase('Guten Morgen.', 144, 505, 150); ctx.restore();
    ctx.save(); ctx.globalAlpha *= r3; ctx.fillStyle = C.gold; ctx.fillRect(144, 550, 790 * r3, 6); label('LISTEN → COPY', 144, 620, C.muted, 'left', 20); ctx.restore();

    roundRect(1330, 160, 430, 760, 32, 'rgba(22,36,22,.92)', 'rgba(157,196,255,.44)', 3);
    drawImageContain(images.frauGreeting, 1350, 200, 390, 670, .98, .98);
    roundRect(1380, 820, 330, 66, 999, C.listening, null);
    label('FIRST SOUND', 1545, 864, C.deep, 'center', 18);

    const waveStart = 790;
    for (let i = 0; i < 15; i++) {
      const h = 28 + 74 * Math.abs(Math.sin(i * 1.7 + local * 5)) * reveal(local, 1.15, .6);
      roundRect(waveStart + i * 28, 686 - h / 2, 11, h, 6, i % 3 === 0 ? C.listening : C.gold, null);
    }
  }

  function sceneReply(local) {
    const r1 = reveal(local, .12, .65);
    const r2 = reveal(local, .55, .8);
    const r3 = reveal(local, 1.2, .7);
    const countdown = Math.max(1, 5 - Math.floor(clamp((local - 2.1) / .72, 0, 4.9)));
    label('YOUR TURN · SAFE POLITE REPLY', 144, 214, C.gold);
    ctx.save(); ctx.globalAlpha *= r2; ctx.translate(0, lerp(44, 0, r2)); phrase('Guten Morgen,', 144, 432, 128); phrase('Frau Weber.', 144, 566, 128, 'left', C.gold); ctx.restore();
    ctx.save(); ctx.globalAlpha *= r3; label('SAY IT ALOUD NOW', 150, 650, C.muted, 'left', 20); ctx.restore();

    roundRect(1210, 154, 560, 770, 32, 'rgba(22,36,22,.90)', 'rgba(241,210,122,.33)', 3);
    drawImageContain(images.kuttanWaving, 1240, 182, 500, 700, r1, .97);
    if (local > 2.1 && local < 5.8) {
      ctx.save();
      ctx.globalAlpha *= .92;
      ctx.beginPath(); ctx.arc(1290, 256, 78, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
      headline(String(countdown), 1290, 286, 82, 'center', C.deep);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(241,210,122,.38)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(144, 750); ctx.lineTo(1040, 750); ctx.stroke();
    label('FIRST ATTEMPT GETS SPACE · 5 SECOND PAUSE', 144, 806, C.successInk, 'left', 18);
  }

  function sceneGreetings(local) {
    label('GREETING BY TIME', 144, 178, C.gold);
    headline('One day. Four safe tools.', 144, 282, 78);
    const entries = [
      ['08:00', 'Guten Morgen', 'morning', C.listening],
      ['14:00', 'Guten Tag', 'day / formal', C.gold],
      ['19:00', 'Guten Abend', 'evening', C.success],
      ['LEAVE', 'Auf Wiedersehen', 'goodbye', C.muted]
    ];
    ctx.strokeStyle = 'rgba(241,210,122,.36)'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(230, 620); ctx.lineTo(1690, 620); ctx.stroke();
    const active = Math.min(3, Math.floor(clamp((local - 1.1) / 1.65, 0, 3.99)));
    entries.forEach((e, i) => {
      const x = 250 + i * 470;
      const rr = reveal(local, .55 + i * .28, .65);
      ctx.save(); ctx.globalAlpha *= rr;
      ctx.beginPath(); ctx.arc(x, 620, i === active ? 30 : 19, 0, Math.PI * 2); ctx.fillStyle = e[3]; ctx.fill();
      if (i === active) { ctx.beginPath(); ctx.arc(x, 620, 47 + Math.sin(local * 4) * 3, 0, Math.PI * 2); ctx.strokeStyle = e[3]; ctx.lineWidth = 3; ctx.stroke(); }
      label(e[0], x, 532, e[3], 'center', 18);
      phrase(e[1], x, 740, i === 3 ? 48 : 58, 'center', i === active ? C.ink : C.muted);
      label(e[2], x, 790, C.muted, 'center', 15);
      ctx.restore();
    });
    if (local > 6.5) {
      const rr = reveal(local, 6.5, .5);
      ctx.save(); ctx.globalAlpha *= rr;
      roundRect(365, 846, 1190, 92, 24, 'rgba(192,57,43,.13)', 'rgba(192,57,43,.55)', 2);
      label('REPAIR', 410, 902, C.dangerInk, 'left', 17);
      phrase('Gute Nacht', 600, 908, 40, 'left', C.dangerInk);
      label('IS FOR GOING TO SLEEP · NOT A NORMAL EVENING HELLO', 945, 900, C.muted, 'left', 16);
      ctx.restore();
    }
  }

  function sceneSentence(local) {
    label('YOUR FIRST SENTENCE', 144, 184, C.gold);
    const r = reveal(local, .25, .75);
    ctx.save(); ctx.globalAlpha *= r; ctx.translate(0, lerp(42, 0, r)); phrase('Ich lerne Deutsch.', 144, 392, 136); ctx.restore();
    ctx.fillStyle = C.gold; ctx.fillRect(144, 438, 1060 * reveal(local, .8, .8), 6);
    label('I AM LEARNING GERMAN.', 144, 500, C.muted, 'left', 19);

    const chunks = [
      ['Ich', 'I', .62], ['lerne', 'learn / am learning', 1.2], ['Deutsch', 'German language', 1.8]
    ];
    const widths = [360, 520, 650];
    let x = 144;
    chunks.forEach((c, i) => {
      const rr = reveal(local, c[2], .62);
      ctx.save(); ctx.globalAlpha *= rr; ctx.translate(0, lerp(38, 0, rr));
      roundRect(x, 570, widths[i], 250, 28, i === 2 ? 'rgba(241,210,122,.12)' : 'rgba(22,36,22,.91)', i === 2 ? C.gold : 'rgba(241,210,122,.28)', 2);
      phrase(c[0], x + 34, 688, i === 2 ? 72 : 78, 'left', i === 2 ? C.gold : C.ink);
      label(c[1], x + 36, 770, C.muted, 'left', 16);
      ctx.restore();
      x += widths[i] + 28;
    });
    if (local > 4.4) {
      const rr = reveal(local, 4.4, .5);
      ctx.save(); ctx.globalAlpha *= rr;
      label('SOUND TARGETS', 144, 902, C.listening, 'left', 17);
      phrase('Ich ≠ “Ish”', 455, 910, 38, 'left', C.ink);
      phrase('Deutsch ≈ “doych”', 930, 910, 38, 'left', C.ink);
      label('UNDERSTANDABLE > PERFECT', 1772, 902, C.successInk, 'right', 17);
      ctx.restore();
    }
  }

  function sceneDialogue(local) {
    label('YOUR FIRST TINY DIALOGUE', 144, 152, C.gold);
    roundRect(105, 195, 360, 720, 30, 'rgba(22,36,22,.89)', 'rgba(157,196,255,.36)', 2);
    drawImageContain(images.frauTeaching, 126, 235, 320, 590, .98, .98);
    label('FRAU WEBER · LISTEN', 285, 870, C.listening, 'center', 16);
    roundRect(1455, 195, 360, 720, 30, 'rgba(22,36,22,.89)', 'rgba(241,210,122,.36)', 2);
    drawImageContain(images.kuttanPointing, 1476, 235, 320, 590, .98, .98);
    label('KUTTAN / YOU · ANSWER', 1635, 870, C.gold, 'center', 16);

    roundRect(515, 195, 890, 720, 30, 'rgba(8,17,8,.74)', 'rgba(241,210,122,.28)', 2);
    const turns = [
      ['FRAU WEBER', 'Guten Morgen.', C.listening],
      ['YOUR TURN', 'Guten Morgen, Frau Weber.', C.gold],
      ['FRAU WEBER', 'Lernen Sie Deutsch?', C.listening],
      ['YOUR TURN', 'Ja. Ich lerne Deutsch.', C.gold],
      ['FRAU WEBER', 'Sehr gut.', C.success]
    ];
    const active = Math.min(turns.length - 1, Math.floor(clamp((local - .6) / 1.75, 0, 4.99)));
    for (let i = 0; i < active; i++) {
      const y = 282 + i * 68;
      label(turns[i][0], 570, y, C.muted, 'left', 13);
      ctx.save(); ctx.globalAlpha = .48; phrase(turns[i][1], 770, y + 2, 27, 'left', C.muted); ctx.restore();
    }
    const turn = turns[active];
    const rr = reveal(local, .6 + active * 1.75, .45);
    ctx.save(); ctx.globalAlpha *= rr; ctx.translate(0, lerp(30, 0, rr));
    roundRect(565, 590, 790, 220, 26, 'rgba(22,36,22,.96)', turn[2], 3);
    label(turn[0], 615, 650, turn[2], 'left', 17);
    phrase(turn[1], 960, 744, turn[1].length > 22 ? 48 : 62, 'center', C.ink);
    ctx.restore();
    label('CURRENT LINE STAYS LARGE · PRIOR TURNS RECEDE', 960, 864, C.muted, 'center', 15);
  }

  function sceneRecap(local) {
    label('YOU CAN NOW SAY', 144, 190, C.gold);
    headline('Three lines. First win.', 144, 310, 88);
    const lines = [
      ['Guten Morgen, Frau Weber.', 144, 390, 815],
      ['Ich lerne Deutsch.', 987, 390, 789],
      ['Auf Wiedersehen.', 144, 635, 815]
    ];
    lines.forEach((line, i) => {
      const rr = reveal(local, .45 + i * .3, .55);
      ctx.save(); ctx.globalAlpha *= rr; ctx.translate(0, lerp(34, 0, rr));
      roundRect(line[1], line[2], line[3], 205, 28, i === 0 ? 'rgba(241,210,122,.14)' : 'rgba(22,36,22,.92)', i === 0 ? C.gold : 'rgba(241,210,122,.27)', 2);
      phrase(line[0], line[1] + 38, line[2] + 125, line[0].length > 22 ? 49 : 60, 'left', i === 0 ? C.gold : C.ink);
      ctx.restore();
    });
    const rr = reveal(local, 1.6, .65);
    ctx.save(); ctx.globalAlpha *= rr;
    roundRect(987, 635, 789, 205, 28, C.gold, C.goldDeep, 3);
    label('NEXT EXACT ACTION', 1032, 700, C.deep, 'left', 16);
    headline('Practice: answer Frau Weber  →', 1032, 782, 41, 'left', C.deep);
    ctx.restore();
    label('WEAKNESS = DATA, NOT SHAME.', 144, 914, C.successInk, 'left', 18);
  }

  function renderAt(time) {
    const t = clamp(Number(time) || 0, 0, DURATION - 1 / 240);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    withScene(t, 0, 7, 0, sceneFirstSound);
    withScene(t, 7, 14, 1, sceneReply);
    withScene(t, 14, 23, 2, sceneGreetings);
    withScene(t, 23, 31, 3, sceneSentence);
    withScene(t, 31, 41, 4, sceneDialogue);
    withScene(t, 41, 48, 5, sceneRecap);
    return true;
  }

  async function load() {
    await Promise.all(Object.entries(imageSources).map(([key, src]) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => { images[key] = img; resolve(); };
      img.onerror = reject;
      img.src = src;
    })));
    window.renderAt = renderAt;
    window.__composition = { width: WIDTH, height: HEIGHT, duration: DURATION, fps: 24, renderer: 'HTML Canvas + Puppeteer + FFmpeg' };
    renderAt(0);
    window.__ready = true;
  }

  load().catch(err => { window.__readyError = String(err); throw err; });
})();
