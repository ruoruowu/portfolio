/*
 * Case Study Plates — builds the 23 section templates as real auto-layout
 * frames on the current page.
 *
 * Tokens are copied from src/app/globals.css so the output matches the built
 * site rather than approximating it. Content is the Paper Tots case.
 *
 * Run: Plugins → Development → Import plugin from manifest… → pick
 * figma-plugin/manifest.json, then run it with the target page open.
 */

// ── Tokens (globals.css) ────────────────────────────────────────────────
function hex(h) {
  const n = parseInt(h.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}
const C = {
  teal100: hex("#e3f0ef"), teal300: hex("#b0d4d3"), teal500: hex("#4e8f8c"),
  teal700: hex("#245e5b"), teal900: hex("#12403e"),
  cream100: hex("#fff6d9"), coral500: hex("#f56743"), coral700: hex("#c0431f"),
  ink900: hex("#191c1e"), ink700: hex("#3a4043"), ink500: hex("#697174"),
  ink200: hex("#dde1e0"), paper: hex("#fbfaf6"), white: hex("#ffffff"),
};
const solid = (c) => [{ type: "SOLID", color: c }];

// ── Fonts ───────────────────────────────────────────────────────────────
const WANT = {
  display:     { family: "Gabarito", style: "Bold" },
  displaySemi: { family: "Gabarito", style: "SemiBold" },
  displayMed:  { family: "Gabarito", style: "Medium" },
  body:        { family: "Hanken Grotesk", style: "Regular" },
  bodyMed:     { family: "Hanken Grotesk", style: "Medium" },
  bodySemi:    { family: "Hanken Grotesk", style: "SemiBold" },
  mono:        { family: "JetBrains Mono", style: "Regular" },
  monoMed:     { family: "JetBrains Mono", style: "Medium" },
};
const FALLBACK = {
  display: { family: "Inter", style: "Bold" },
  displaySemi: { family: "Inter", style: "Semi Bold" },
  displayMed: { family: "Inter", style: "Medium" },
  body: { family: "Inter", style: "Regular" },
  bodyMed: { family: "Inter", style: "Medium" },
  bodySemi: { family: "Inter", style: "Semi Bold" },
  mono: { family: "Roboto Mono", style: "Regular" },
  monoMed: { family: "Roboto Mono", style: "Medium" },
};
const FONT = {};
const missing = [];

async function loadFonts() {
  for (const role of Object.keys(WANT)) {
    try {
      await figma.loadFontAsync(WANT[role]);
      FONT[role] = WANT[role];
    } catch (e) {
      try {
        await figma.loadFontAsync(FALLBACK[role]);
        FONT[role] = FALLBACK[role];
        missing.push(WANT[role].family + " " + WANT[role].style);
      } catch (e2) {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        FONT[role] = { family: "Inter", style: "Regular" };
        missing.push(WANT[role].family + " " + WANT[role].style);
      }
    }
  }
}

// ── Builders ────────────────────────────────────────────────────────────
/** Auto-layout frame. dir "V"|"H"; everything else optional. */
function F(name, o) {
  o = o || {};
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = o.dir === "H" ? "HORIZONTAL" : "VERTICAL";
  f.primaryAxisSizingMode = o.primary || "AUTO";
  f.counterAxisSizingMode = o.counter || "AUTO";
  f.itemSpacing = o.gap == null ? 0 : o.gap;
  const p = o.pad || [0, 0, 0, 0]; // top right bottom left
  f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3];
  f.fills = o.fill ? solid(o.fill) : [];
  if (o.radius) f.cornerRadius = o.radius;
  if (o.stroke) {
    f.strokes = solid(o.stroke);
    f.strokeWeight = o.strokeWeight || 1;
    if (o.dash) f.dashPattern = [6, 4];
  }
  if (o.align) f.counterAxisAlignItems = o.align;      // MIN | CENTER | MAX
  if (o.justify) f.primaryAxisAlignItems = o.justify;
  const horiz = o.dir === "H";
  if (o.width) {
    f.resize(o.width, f.height || 1);
    if (horiz) f.primaryAxisSizingMode = "FIXED"; else f.counterAxisSizingMode = "FIXED";
  }
  if (o.height) {
    f.resize(f.width || 1, o.height);
    if (horiz) f.counterAxisSizingMode = "FIXED"; else f.primaryAxisSizingMode = "FIXED";
  }
  if (o.stretch) f.layoutAlign = "STRETCH";
  if (o.grow) f.layoutGrow = 1;
  if (o.clip != null) f.clipsContent = o.clip;
  return f;
}

/** Text node. Stretches to its parent unless a width is given. */
function T(chars, o) {
  o = o || {};
  const t = figma.createText();
  t.fontName = FONT[o.font || "body"];
  t.fontSize = o.size || 15;
  t.characters = chars;
  t.fills = solid(o.color || C.ink700);
  t.lineHeight = { unit: "PERCENT", value: o.lh || 155 };
  if (o.ls != null) t.letterSpacing = { unit: "PERCENT", value: o.ls };
  if (o.upper) t.textCase = "UPPER";
  if (o.hug) {
    t.textAutoResize = "WIDTH_AND_HEIGHT";
  } else {
    t.textAutoResize = "HEIGHT";
    if (o.width) t.resize(o.width, t.height);
    else t.layoutAlign = "STRETCH";
  }
  return t;
}

/** Empty image frame. Dashed teal, labelled with its intended ratio. */
function SLOT(label, dim, height, dark) {
  const f = F("slot/" + label, {
    dir: "V", gap: 6, height: height, align: "CENTER", justify: "CENTER",
    fill: dark ? C.teal900 : C.teal100,
    stroke: dark ? C.teal500 : C.teal500, dash: true, stretch: true,
    pad: [16, 16, 16, 16],
  });
  f.appendChild(T(label, { font: "monoMed", size: 11, ls: 8, upper: true,
    color: dark ? C.teal300 : C.teal700, width: 240 }));
  if (dim) f.appendChild(T(dim, { font: "mono", size: 10, color: C.teal500, width: 240 }));
  for (const c of f.children) c.textAlignHorizontal = "CENTER";
  return f;
}

function EYEBROW(s, color) {
  return T(s, { font: "monoMed", size: 11, ls: 14, upper: true, color: color || C.teal700 });
}
function CHIP(label) {
  const f = F("chip", { dir: "H", gap: 8, align: "CENTER", pad: [6, 14, 6, 14],
    fill: C.white, stroke: C.ink200, radius: 999 });
  const dot = figma.createEllipse();
  dot.resize(6, 6); dot.fills = solid(C.teal700);
  f.appendChild(dot);
  f.appendChild(T(label, { size: 14, color: C.ink900, hug: true }));
  return f;
}
function BTN(label, bg, fg) {
  const f = F("button", { dir: "H", pad: [12, 22, 12, 22], fill: bg || C.teal700, radius: 999 });
  f.appendChild(T(label, { font: "bodyMed", size: 15, color: fg || C.white, hug: true }));
  return f;
}

// ── Plate chrome ────────────────────────────────────────────────────────
const PLATE_W = 1040;
const COL_W = 980;         // matches --page-max
const plates = [];

/** Wraps built content in the labelled plate chrome. bleed = no stage padding. */
function PLATE(id, name, note, spec, content, bleed) {
  const p = F(id + " · " + name, {
    dir: "V", width: PLATE_W, counter: "FIXED", fill: C.white, stroke: C.ink200,
  });

  const head = F("plate head", {
    dir: "H", gap: 14, pad: [14, 20, 14, 20], fill: C.paper, align: "CENTER", stretch: true,
  });
  const badge = F("id", { dir: "H", pad: [3, 8, 3, 8], fill: C.teal700, radius: 3 });
  badge.appendChild(T(id, { font: "monoMed", size: 12, color: C.white, hug: true }));
  head.appendChild(badge);
  head.appendChild(T(name, { font: "bodySemi", size: 17, color: C.ink900, hug: true }));
  const noteT = T(note, { size: 13, color: C.ink500 });
  noteT.layoutGrow = 1; noteT.layoutAlign = "INHERIT";
  head.appendChild(noteT);
  const specF = F("spec", { dir: "H", pad: [3, 8, 3, 8], fill: C.teal100, radius: 3 });
  specF.appendChild(T(spec, { font: "mono", size: 11, color: C.teal700, hug: true }));
  head.appendChild(specF);
  p.appendChild(head);

  const stage = F("stage", {
    dir: "V", gap: 0, fill: C.paper, stretch: true,
    pad: bleed ? [0, 0, 0, 0] : [28, 30, 28, 30],
  });
  stage.appendChild(content);
  p.appendChild(stage);

  plates.push(p);
  return p;
}

// ── Small compositional helpers ─────────────────────────────────────────
/** Fixed-width vertical column, for use inside horizontal rows. */
function COL(w, gap) { return F("col", { dir: "V", gap: gap || 12, width: w, counter: "FIXED" }); }
/** Full-width vertical stack sized to the content column. */
function ROW(gap, width) {
  return F("row", { dir: "H", gap: gap, width: width || COL_W, counter: "FIXED", stretch: true });
}
function STACK(gap, width) {
  return F("stack", { dir: "V", gap: gap, width: width || COL_W, counter: "FIXED", stretch: true });
}

function buildPlates() {

// ══ A · HEADERS ════════════════════════════════════════════════════════
{ // A1 Split hero
  const r = ROW(44);
  const left = COL(492, 20);
  left.appendChild(EYEBROW("In active development"));
  left.appendChild(T("Paper Tots", { font: "display", size: 46, lh: 106, color: C.ink900, width: 492 }));
  left.appendChild(T("AI-generated children's books that turn a kid's own idea into an illustrated story, built solo end-to-end with a lean engineering team.",
    { size: 18, width: 492 }));
  const chips = F("chips", { dir: "H", gap: 10, width: 492, counter: "FIXED" });
  ["Solo founding designer", "User research", "No PM"].forEach((c) => chips.appendChild(CHIP(c)));
  left.appendChild(chips);
  r.appendChild(left);
  const right = COL(444, 0);
  right.appendChild(SLOT("Hero art", "4:3 · landing page + spread", 280));
  r.appendChild(right);
  PLATE("A1", "Split hero", "Default opening. Title and framing left, product art right. Built today as ParallaxHero.", "grid 1.05fr .95fr · gap 44", r);
}

{ // A2 Full-bleed art hero
  const s = F("bleed", { dir: "V", gap: 0, width: PLATE_W, counter: "FIXED", stretch: true });
  s.appendChild(SLOT("Full-bleed art", "21:9 · bleeds past the 980 column", 300));
  const panel = F("panel", { dir: "V", gap: 16, pad: [40, 44, 40, 44], fill: C.cream100, stretch: true });
  panel.appendChild(EYEBROW("Case 04"));
  panel.appendChild(T("Paper Tots", { font: "display", size: 40, lh: 108, color: C.ink900 }));
  panel.appendChild(T("Designing the generation, not just the interface around it.", { size: 18 }));
  s.appendChild(panel);
  PLATE("A2", "Full-bleed art hero", "When the artwork is the argument. Art runs edge to edge, title on cream beneath.", "full-bleed · art 21:9", s, true);
}

{ // A3 Centered hero with metrics
  const s = STACK(40);
  const c = F("centered", { dir: "V", gap: 20, align: "CENTER", stretch: true });
  c.appendChild(EYEBROW("Market research · 2025"));
  const h = T("Stories for the kid you know best", { font: "display", size: 46, lh: 106, color: C.ink900, width: 700 });
  h.textAlignHorizontal = "CENTER"; c.appendChild(h);
  const d = T("A personalized children's book market growing fast enough that quality, not availability, became the differentiator.", { size: 18, width: 620 });
  d.textAlignHorizontal = "CENTER"; c.appendChild(d);
  s.appendChild(c);
  const stats = ROW(28);
  [["$1.8B", "market size, 2025"], ["$9.4B", "projected by 2034"], ["20.1%", "CAGR"], ["62M", "AI books read in 2025"]]
    .forEach(([v, l]) => {
      const col = COL(224, 8);
      col.appendChild(T(v, { font: "display", size: 40, lh: 100, color: C.teal700, width: 224 }));
      col.appendChild(T(l, { size: 13, color: C.ink500, width: 224 }));
      stats.appendChild(col);
    });
  s.appendChild(stats);
  PLATE("A3", "Centered hero with metrics", "For cases that open on numbers. Three or four; five reads as filler.", "centered · stats auto-fit 150", s);
}

{ // A4 Type-only hero
  const s = STACK(20);
  s.appendChild(EYEBROW("Confidential case · shown on request"));
  s.appendChild(T("Designing the generation, not the interface around it.", { font: "display", size: 46, lh: 106, color: C.ink900, width: 780 }));
  s.appendChild(T("Paper Tots · solo founding designer · two-person engineering team", { size: 18 }));
  const b = F("btnrow", { dir: "H", stretch: true });
  b.appendChild(BTN("Request the full case", C.paper, C.teal700));
  b.children[0].strokes = solid(C.teal300); b.children[0].strokeWeight = 1;
  s.appendChild(b);
  PLATE("A4", "Type-only hero", "For work under NDA or too early to show. Says it plainly instead of dressing a placeholder.", "single column · max 20ch", s);
}

// ══ B · SECTION HEADERS ════════════════════════════════════════════════
{ // B1
  const s = STACK(12);
  s.appendChild(EYEBROW("The decision"));
  s.appendChild(T("Treating the illustration prompt as a design system", { font: "displaySemi", size: 28, lh: 120, color: C.ink900 }));
  s.appendChild(T("Four named art styles, each specified the way a design system specifies a component: primary medium, linework, colour strategy, texture density.", { size: 15 }));
  PLATE("B1", "Eyebrow, heading, deck", "The workhorse. Eyebrow classifies, heading claims, deck qualifies.", "stack · gap 12 · deck 62ch", s);
}

{ // B2 numbered
  const s = STACK(28);
  [["01", "Watching parents make a book before deciding what to build", "Shadowing sessions with a facilitator-observer split, creation and review scheduled separately."],
   ["02", "Staging generation so cost and trust point the same way", "Characters first, then the first spread: two pages, not one."]]
   .forEach(([n, h, b]) => {
     const r = ROW(24);
     const num = COL(110, 0);
     num.appendChild(T(n, { font: "display", size: 46, lh: 100, color: C.teal300, width: 110 }));
     r.appendChild(num);
     const c = COL(846, 8);
     c.appendChild(T(h, { font: "bodySemi", size: 19, color: C.ink900, width: 846 }));
     c.appendChild(T(b, { size: 15, width: 846 }));
     r.appendChild(c);
     s.appendChild(r);
   });
  PLATE("B2", "Numbered marker", "Only when order carries meaning. Decisions readable in any sequence should not be numbered.", "grid 110px 1fr · in use today", s);
}

{ // B3 rule divider
  const r = ROW(16); r.counterAxisAlignItems = "CENTER";
  r.appendChild(T("Selected references", { font: "monoMed", size: 11, ls: 14, upper: true, color: C.teal700, width: 180 }));
  const rule = figma.createRectangle();
  rule.resize(740, 1); rule.fills = solid(C.ink200); rule.layoutGrow = 1;
  r.appendChild(rule);
  r.appendChild(T("06", { font: "monoMed", size: 11, ls: 14, color: C.ink500, width: 30 }));
  PLATE("B3", "Rule and label divider", "Quiet separator between phases, when the content already has momentum.", "flex · rule fills remainder", r);
}

{ // B4 gutter label
  const r = ROW(32);
  const g = COL(190, 8);
  g.appendChild(EYEBROW("Evaluation"));
  g.appendChild(T("sticky · top 96", { font: "mono", size: 10, color: C.teal500, width: 190 }));
  r.appendChild(g);
  const c = COL(758, 12);
  c.appendChild(T("A whole-book rubric scoring story, visual and book dimensions, with hard-gate failures that block publication.", { size: 15, width: 758 }));
  c.appendChild(T("This is where character inconsistency gets caught before a parent ever sees it.", { size: 15, width: 758 }));
  r.appendChild(c);
  PLATE("B4", "Gutter label", "Label parked in the left gutter while the body scrolls. Sticky on the site.", "grid 190px 1fr · gap 32", r);
}

// ══ C · BODY LAYOUTS ═══════════════════════════════════════════════════
{ // C1 alternating two-column
  const s = STACK(40);
  const a = ROW(36); a.counterAxisAlignItems = "CENTER";
  const at = COL(472, 12);
  at.appendChild(T("Writing a voice the model can't smooth over", { font: "bodySemi", size: 19, color: C.ink900, width: 472 }));
  at.appendChild(T("Tone shifts by context — marketing, creation, confirmation, error — against a voice that stays fixed.", { size: 15, width: 472 }));
  a.appendChild(at);
  const ai = COL(472, 0); ai.appendChild(SLOT("Voice system", "16:10 · deck slide 8", 190)); a.appendChild(ai);
  s.appendChild(a);

  const b = ROW(36); b.counterAxisAlignItems = "CENTER";
  const bi = COL(472, 0); bi.appendChild(SLOT("Eval scorecard", "16:10 · deck slide 11", 190)); b.appendChild(bi);
  const bt = COL(472, 12);
  bt.appendChild(T("Evaluating output like a product surface", { font: "bodySemi", size: 19, color: C.ink900, width: 472 }));
  bt.appendChild(T("Story, visual and book scored separately, with hard gates that stop a book shipping.", { size: 15, width: 472 }));
  b.appendChild(bt);
  s.appendChild(b);
  PLATE("C1", "Alternating two-column", "Flip the column order every other instance so a run of them has rhythm.", "grid 1fr 1fr · gap 36", s);
}

{ // C2 full-bleed band
  const s = F("bleed", { dir: "V", gap: 0, width: PLATE_W, counter: "FIXED", stretch: true });
  s.appendChild(SLOT("Full-bleed reference", "21:9 · art-style preset table", 280));
  const cap = F("caption", { dir: "V", pad: [16, 30, 16, 30], stretch: true });
  cap.appendChild(T("Four art styles, each specified down to linework and texture density.", { size: 13, color: C.ink500 }));
  s.appendChild(cap);
  PLATE("C2", "Full-bleed image band", "Breaks the 980 column to reset pace. Caption sits inside the column beneath.", "full-bleed · 21:9", s, true);
}

{ // C3 cream band
  const s = F("band", { dir: "V", gap: 18, pad: [52, 44, 52, 44], fill: C.cream100, width: PLATE_W, counter: "FIXED", stretch: true });
  s.appendChild(EYEBROW("Constraint"));
  s.appendChild(T("Two engineers, no PM, and a model that forgets what a character looks like.", { font: "displaySemi", size: 28, lh: 124, color: C.ink900, width: 700 }));
  s.appendChild(T("Every design decision was also a scope decision.", { size: 18 }));
  PLATE("C3", "Cream emphasis band", "Warm ground for a turn in the argument. Once or twice a page, no more.", "full-bleed · cream-100", s, true);
}

{ // C4 dark band
  const s = F("band", { dir: "V", gap: 18, pad: [56, 44, 56, 44], fill: C.teal900, width: PLATE_W, counter: "FIXED", stretch: true });
  s.appendChild(EYEBROW("The thesis", C.teal300));
  s.appendChild(T("Consistency came from constraining the prompt, not from picking a better model.", { font: "displaySemi", size: 28, lh: 124, color: C.cream100, width: 660 }));
  s.appendChild(T("The art-style presets did more for character continuity than any model upgrade in the same period.", { size: 18, color: C.teal300 }));
  PLATE("C4", "Dark contrast section", "Strongest emphasis available. Reserve for the single most important claim.", "full-bleed · teal-900", s, true);
}

{ // C5 pull quote
  const s = STACK(18);
  s.appendChild(T("“", { font: "display", size: 40, lh: 100, color: C.coral500 }));
  s.appendChild(T("The antidote to AI copy isn't trying harder. It's being more specific.", { font: "displayMed", size: 30, lh: 132, color: C.ink900, width: 620 }));
  s.appendChild(T("Paper Tots content guidelines", { font: "monoMed", size: 11, ls: 12, upper: true, color: C.ink500 }));
  PLATE("C5", "Pull quote", "Lift a line already earned in the body. A quote introducing a new idea is decoration.", "stack · quote max 22ch", s);
}

{ // C6 three-up
  const r = ROW(20);
  [["Cartoon", "Clean solid outlines, bright distinct families, low texture."],
   ["Whimsical", "Watercolour and gouache, pencil-defined, medium paper grain."],
   ["Minimal", "Economical thin linework, limited palette plus accents."]]
   .forEach(([n, d]) => {
     const c = COL(313, 12);
     c.appendChild(SLOT(n, "1:1", 150));
     c.appendChild(T(d, { size: 13, width: 313 }));
     r.appendChild(c);
   });
  PLATE("C6", "Three-up grid", "Parallel items only. If one card needs more room, this is the wrong layout.", "grid repeat(3,1fr) · gap 20", r);
}

// ══ D · COMPARISON AND SEQUENCE ════════════════════════════════════════
{ // D1 before / after
  const r = ROW(20);
  [["Legacy · Many Tales", "Stories starring the people they love", C.ink500],
   ["Current · Paper Tots", "Stories for the kid you know best", C.coral700]]
   .forEach(([tag, label, col]) => {
     const c = COL(480, 10);
     c.appendChild(T(tag, { font: "monoMed", size: 11, ls: 10, upper: true, color: col, width: 480 }));
     c.appendChild(SLOT(label, "16:10", 180));
     r.appendChild(c);
   });
  PLATE("D1", "Before and after", "Both frames the same size, or the comparison lies. Label the old one first.", "grid 1fr 1fr · gap 20", r);
}

{ // D2 wipe — two stacked frames, since Figma has no clip-path equivalent
  const s = STACK(14);
  const view = F("wipe view", { dir: "H", gap: 0, width: COL_W, height: 300, counter: "FIXED", primary: "FIXED", clip: true });
  const before = SLOT("Before · Many Tales", "16:9", 300); before.resize(490, 300); before.layoutAlign = "INHERIT";
  const after = SLOT("After · Paper Tots", "16:9", 300, true); after.resize(490, 300); after.layoutAlign = "INHERIT";
  view.appendChild(before); view.appendChild(after);
  s.appendChild(view);
  s.appendChild(T("On the site this is one frame with a draggable wipe. Figma has no clip-path equivalent, so it builds as two halves — rebuild the interaction with a component variant, or leave it to code.",
    { size: 13, color: C.ink500 }));
  PLATE("D2", "Before and after wipe", "Best when both states share a composition. Builds as two halves here; see the note.", "two halves · code-only wipe", s);
}

{ // D3 filmstrip
  const r = ROW(16);
  [["V1", "Cover flip breaks the spread geometry."],
   ["V2", "Shared vanishing point, corner curl remains."],
   ["V3", "Cover height matched to the spread."],
   ["V4", "Shipped. Reads as one continuous book."]]
   .forEach(([n, d]) => {
     const c = COL(236, 8);
     c.appendChild(SLOT(n, null, 170));
     c.appendChild(T(d, { size: 13, width: 236 }));
     r.appendChild(c);
   });
  PLATE("D3", "Filmstrip carousel", "For sequences the eye must travel — iterations, page order, a character across a book.", "flex · overflow-x auto · 260px", r);
}

{ // D4 timeline
  const r = ROW(0);
  [["01", "Research", "Shadowing sessions with parents"],
   ["02", "Design system", "Type, colour, components"],
   ["03", "Prompt system", "Four specified art styles"],
   ["04", "Voice", "Tone by context, DO and DON'T"],
   ["05", "Evals", "Whole-book rubric with hard gates"]]
   .forEach(([n, t, d], i) => {
     const c = F("step", { dir: "V", gap: 10, width: 196, counter: "FIXED", pad: [14, 18, 0, 0] });
     c.strokes = solid(i === 0 ? C.teal700 : C.teal300);
     c.strokeWeight = 2;
     c.strokeTopWeight = 2; c.strokeBottomWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0;
     c.appendChild(T(n, { font: "monoMed", size: 11, ls: 10, color: C.teal700, width: 178 }));
     c.appendChild(T(t, { font: "bodySemi", size: 14, color: C.ink900, width: 178 }));
     c.appendChild(T(d, { size: 13, color: C.ink500, width: 178 }));
     r.appendChild(c);
   });
  PLATE("D4", "Process timeline", "Genuine sequence only. The rule above each step is the timeline; the first is darker.", "grid repeat(5,1fr) · rule 2px", r);
}

{ // D5 annotated
  const r = ROW(24);
  const img = COL(692, 0); img.appendChild(SLOT("Edit spread, pages 9–10", "16:10 · product UI", 240)); r.appendChild(img);
  const pins = COL(264, 16);
  [["1", "Change is scoped to a character or the background before it is scoped to a page."],
   ["2", "Regeneration budget is shown as a count, not a warning."],
   ["3", "Text edits happen on the page itself, never in a separate field."]]
   .forEach(([n, t]) => {
     const p = F("pin", { dir: "H", gap: 12, width: 264, counter: "FIXED" });
     const b = F("n", { dir: "V", width: 22, height: 22, counter: "FIXED", primary: "FIXED",
       fill: C.coral500, radius: 999, align: "CENTER", justify: "CENTER" });
     b.appendChild(T(n, { font: "mono", size: 11, color: C.white, hug: true }));
     b.children[0].textAlignHorizontal = "CENTER";
     p.appendChild(b);
     p.appendChild(T(t, { size: 13, width: 230 }));
     pins.appendChild(p);
   });
  r.appendChild(pins);
  PLATE("D5", "Annotated screenshot", "Numbered pins beside the frame, not on top, so annotation survives resizing.", "grid 1fr 260px · gap 24", r);
}

// ══ E · SUPPORTING ═════════════════════════════════════════════════════
{ // E1 spec table
  const s = STACK(0);
  const head = ROW(0);
  ["Style", "Medium", "Linework", "Texture"].forEach((h, i) => {
    const c = F("th", { dir: "V", width: i === 0 ? 200 : 260, counter: "FIXED", pad: [12, 14, 12, 14] });
    c.strokes = solid(C.ink200); c.strokeWeight = 1;
    c.strokeTopWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0; c.strokeBottomWeight = 1;
    c.appendChild(T(h, { font: "monoMed", size: 11, ls: 10, upper: true, color: C.teal700, width: i === 0 ? 172 : 232 }));
    head.appendChild(c);
  });
  s.appendChild(head);
  [["Cartoon", "Modern digital", "Clean, solid outlines", "Low, smooth fills"],
   ["Whimsical", "Watercolour / gouache", "Soft, pencil-defined", "Medium, paper grain"],
   ["Minimal", "Vector line and shape", "Economical, thin", "Very low, flat fields"],
   ["Realistic", "Painted editorial", "Blended edges", "High"]]
   .forEach((row) => {
     const r = ROW(0);
     row.forEach((v, i) => {
       const c = F("td", { dir: "V", width: i === 0 ? 200 : 260, counter: "FIXED", pad: [12, 14, 12, 14] });
       c.strokes = solid(C.ink200); c.strokeWeight = 1;
       c.strokeTopWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0; c.strokeBottomWeight = 1;
       c.appendChild(T(v, { font: i === 0 ? "bodySemi" : "body", size: 14,
         color: i === 0 ? C.ink900 : C.ink700, width: i === 0 ? 172 : 232 }));
       r.appendChild(c);
     });
     s.appendChild(r);
   });
  PLATE("E1", "Spec table", "For real specification. A table used to lay out prose is a grid in a costume.", "table · hairline rows", s);
}

{ // E2 device frame
  const d = F("device", { dir: "V", gap: 0, pad: [12, 12, 26, 12], fill: C.ink900, radius: 14, width: COL_W, counter: "FIXED", stretch: true });
  const bar = F("bar", { dir: "H", gap: 6, pad: [0, 0, 10, 0] });
  for (let i = 0; i < 3; i++) { const e = figma.createEllipse(); e.resize(9, 9); e.fills = solid(C.ink500); bar.appendChild(e); }
  d.appendChild(bar);
  const shot = SLOT("papertots.com", "16:10", 220); shot.strokes = [];
  d.appendChild(shot);
  PLATE("E2", "Device frame", "Use when the surface matters — that this is a browser, at that width. Else it is decoration.", "ink-900 chrome · radius 14", d);
}

{ // E3 motion slot
  const s = STACK(12);
  s.appendChild(SLOT("Page flip, V1 to V4", "16:9 · mp4 or animated svg", 250, true));
  const row = F("controls", { dir: "H", gap: 14, align: "CENTER", stretch: true });
  row.appendChild(BTN("Play the flip"));
  row.appendChild(T("0:12 · no audio · loops", { size: 13, color: C.ink500, hug: true }));
  s.appendChild(row);
  PLATE("E3", "Motion slot", "A still poster with an explicit play affordance. Never autoplay; the reader is reading.", "16:9 · poster + control", s);
}

{ // E4 closing band
  const s = F("cta", { dir: "V", gap: 18, pad: [52, 44, 52, 44], fill: C.teal900, width: PLATE_W, counter: "FIXED", stretch: true, align: "MIN" });
  s.appendChild(EYEBROW("Where this stands", C.teal300));
  s.appendChild(T("Paper Tots is in active development. These decisions are grounded in research and product judgment, not yet in usage data.",
    { font: "displaySemi", size: 28, lh: 124, color: C.cream100, width: 760 }));
  s.appendChild(BTN("Expedia Group: Partnerships", C.cream100, C.teal900));
  PLATE("E4", "Closing band with next case", "Ends on a link, not a full stop. Name the next case rather than saying “next”.", "full-bleed · teal-900", s, true);
}

}

// ── Main ────────────────────────────────────────────────────────────────
async function main() {
  await loadFonts();

  // dynamic-page access requires loading the page before writing to it.
  if (figma.loadAllPagesAsync) await figma.currentPage.loadAsync();

  buildPlates();

  const sheet = F("Case Study Plates", {
    dir: "V", gap: 36, pad: [56, 40, 72, 40], fill: C.paper, counter: "FIXED", width: PLATE_W + 80,
  });

  const head = F("masthead", { dir: "V", gap: 14, pad: [0, 0, 24, 0], stretch: true });
  head.strokes = solid(C.ink900); head.strokeWeight = 2;
  head.strokeTopWeight = 0; head.strokeLeftWeight = 0; head.strokeRightWeight = 0; head.strokeBottomWeight = 2;
  head.appendChild(EYEBROW("ruochen.wu · case study system · sht 01"));
  head.appendChild(T("Case Study Plates", { font: "display", size: 52, lh: 105, color: C.ink900 }));
  head.appendChild(T("Twenty-three section layouts for case study pages, on the portfolio's own tokens and filled with Paper Tots content. Image slots are intentionally empty — drop your exports straight in.",
    { size: 18, width: 720 }));
  sheet.appendChild(head);

  for (const p of plates) sheet.appendChild(p);

  // Park the sheet clear of whatever is already on the page.
  let x = 0;
  for (const n of figma.currentPage.children) {
    if ("x" in n && "width" in n) x = Math.max(x, n.x + n.width);
  }
  sheet.x = x + 200;
  sheet.y = 0;
  figma.currentPage.appendChild(sheet);
  figma.currentPage.selection = [sheet];
  figma.viewport.scrollAndZoomIntoView([sheet]);

  const note = missing.length
    ? "Built 23 plates. Substituted for missing fonts: " + Array.from(new Set(missing)).join(", ")
    : "Built 23 plates on this page.";
  figma.closePlugin(note);
}

main().catch((e) => figma.closePlugin("Failed: " + e.message));
