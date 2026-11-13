---
name: tufte-data-viz
description: >-
  Use when creating, reviewing, or styling charts, graphs, dashboards,
  sparklines, flowcharts, diagrams, or any data visualization. Applies to Recharts, ECharts,
  Chart.js, matplotlib, seaborn, Plotly, ggplot2, plotnine, Vega-Lite, Altair,
  Observable Plot, D3.js, and SVG. Enforces Tufte
  principles (data-ink ratio, direct labeling, range-frame axes) plus
  modern screen-first standards (accessibility, responsive, dark mode).
allowed-tools: Read, Glob, Grep
---

# Tufte Data Visualization

Apply Edward Tufte's principles whenever generating or reviewing code that renders data visually. This skill covers charts of data, and flowcharts and other box-and-arrow diagrams; it does not cover slide/presentation design.

**Flowcharts and diagrams:** read `rules/diagrams-flowcharts.md` instead of applying the chart rules below. Rules about axes, baselines, range frames, aspect ratio and the lie factor concern quantities on scales and do not apply to diagrams.

## Workflow

Follow these steps in order when creating any chart:

### Step 1: Identify the message

Before writing code, determine:
1. The key finding or trend the chart must make visible.
2. The comparison context — a baseline, prior period, target, or peer group. A number without context is meaningless.
3. The chart type that best fits the data structure (see Chart type guidance below).

### Step 2: Apply graphical integrity, then the universal rules

Check the chart against Tufte's graphical integrity principles below, then his data-ink principles, then apply the universal rules. Every universal rule is a default — deviate only when the user explicitly requests otherwise.

### Step 3: Apply library-specific config

Use the Library quick reference table to find the essential overrides for the target library. For complete code examples and helper functions, read ONE rule file from `rules/` matching the library.

### Step 4: Validate

Run through the validation checklist at the bottom of this file before presenting the chart.

---

## Sources

Every rule below names its source, so Tufte's principles are never confused with this skill's own choices:

- **Tufte** — stated in Tufte's books, cited by book and chapter: *VDQI* = *The Visual Display of Quantitative Information* (1983; 2nd ed. 2001), *EI* = *Envisioning Information* (1990), *VE* = *Visual Explanations* (1997), *BE* = *Beautiful Evidence* (2006). Tufte's fifth book, *Seeing with Fresh Eyes* (2020), is not yet drawn on here.
- **Convention** — common practice in Tufte-style work, but not stated by Tufte. Specific values (hex colors, sizes, opacities, counts) are always this skill's defaults.
- **Extension** — added by this skill's authors for screens and content. Not from Tufte.

---

## Graphical integrity

*Source: Tufte, VDQI ch. 2.* Tufte's six principles, in summary:

1. **Proportional representation.** Numbers, as physically measured on the graphic, must be directly proportional to the quantities they represent. Tufte measures violations with the *lie factor*: the size of the effect shown in the graphic divided by the size of the effect in the data (1.0 is truthful).
2. **Clear, detailed labeling** defeats distortion and ambiguity. Write explanations of the data on the graphic itself; label important events in the data.
3. **Show data variation, not design variation.**
4. **Deflate money.** In time series of money, deflated and standardized units are nearly always better than nominal units.
5. **Dimensions.** The number of information-carrying dimensions depicted should not exceed the number of dimensions in the data.
6. **Context.** Graphics must not quote data out of context.

**Baselines.** Tufte prescribes no zero baseline: *VDQI* "never recommends showing zero-points" (Tufte, edwardtufte.com forum, 2003, citing VDQI pp. 74–75, where context comes from showing more data rather than reaching down to zero). For time series he advises a baseline that shows the data (Tufte, edwardtufte.com forum, "baseline for amount scale"). *This skill's application of principle 1 (convention):* a bar's length, or an area's size, is proportional to its value only when it starts at zero, so bars and areas start at zero; lines and dots encode by position and take a baseline that shows the data.

---

## Data-ink

*Source: Tufte, VDQI ch. 4 (data-ink), ch. 5 (chartjunk), ch. 1 (graphical excellence).*

Tufte's five principles, in his order:

1. **Above all else show the data.**
2. **Maximize the data-ink ratio, within reason.** Data-ink is the non-erasable core of a graphic; the ratio is the share of a graphic's ink devoted to the non-redundant display of data.
3. **Erase non-data-ink, within reason.**
4. **Erase redundant data-ink.**
5. **Revise and edit.**

"Within reason" is his qualifier: the principles guide editing; they are not a quota. Rules 1–4 below apply them.

**Chartjunk** (VDQI ch. 5) has three forms: unintentional optical art (moiré vibration from hatching and dense patterns), the dark grid, and the "duck" (a graphic whose decoration takes over the data). None belongs in a chart.

**Beyond erasing**, Tufte asks for more data, not less:
- **Data density** (VDQI ch. 8): maximize data density and the size of the data matrix, within reason. Many graphics can be shrunk well below their usual size (his shrink principle).
- **Multifunctioning graphical elements** (VDQI ch. 7): let one element carry data and structure at once, such as labels that also mark the ends of the data range.
- **Micro/macro readings** (EI ch. 2): a good display reads as an overall pattern and, on close inspection, as detail. "To clarify, add detail."

Graphical excellence, in his words, gives the viewer the greatest number of ideas in the shortest time with the least ink in the smallest space (VDQI ch. 1).

---

## Analytical design

*Source: Tufte, BE ch. 5, "The Fundamental Principles of Analytical Design".*

1. **Show comparisons**, contrasts, differences (rule 13).
2. **Show causality**, mechanism, explanation, systematic structure (annotations, rule 12; diagrams, `rules/diagrams-flowcharts.md`).
3. **Show multivariate data** — more than one or two variables (small multiples, layering).
4. **Integrate evidence** — words, numbers and images together (rule 2).
5. **Document the evidence** — a detailed title, the authors and sponsors, the data sources, complete measurement scales, and the relevant issues. Give every chart a source line and state its units.
6. **Content counts most of all** — no design rescues weak, irrelevant or untrustworthy data.

---

## Universal rules

Rules 1–14 cover static principles; 15–19 extend them for screens; 20–22 address content and formatting. Each rule names its source (see Sources above).

### 1. Remove top and right borders

*Source: Tufte — erasing the frame around the data, VDQI ch. 6.*

No chart should have top or right axis lines, borders, or spines. The bottom and left axes are sufficient. Top and right lines are non-data-ink.

### 2. Direct labels, not legends

*Source: Tufte — words, numbers and drawings used together on the graphic, VDQI ch. 2 and ch. 9.*

Label each data series directly — at the endpoint of a line, on or beside a bar, next to a cluster. Remove the `<Legend>` component entirely. If there is only one series, the chart title provides that context; no label is needed.

### 3. No gridlines by default

*Source: Tufte — dark grids are chartjunk; a grid should be muted or suppressed, VDQI ch. 5. His alternative for bars is white grid lines drawn through them (VDQI ch. 6). The opacity values and the horizontal-only default are this skill's (convention).*

The default is zero gridlines. Where readers need to read values precisely, add a muted grid: horizontal-only at very low opacity (0.08–0.12) by default. A muted vertical grid is fine when it eases reading along x, as in the timetables Tufte shows approvingly. For interactive charts, a contextual crosshair on hover can stand in for a grid (see rule 15).

### 4. Range-frame axes

*Source: Tufte — the range-frame, VDQI ch. 6.*

Axis lines should span only the range of the data, not from zero to some arbitrary maximum. The axis starts at (or near) the minimum data value and ends at the maximum.

### 5. No 3D effects

*Source: Tufte — graphical integrity principle 5 (dimensions), VDQI ch. 2; chartjunk, VDQI ch. 5.*

No perspective, no depth, no shadows on chart elements. Two-dimensional data gets two-dimensional representation.

### 6. No pie charts

*Source: Tufte — given their low data density and their failure to order numbers along a visual dimension, pie charts should never be used, VDQI ch. 9.*

Use a horizontal bar chart sorted by value, or a table. If the user still asks for a pie chart after this is explained, follow the request; that is a choice of the person asking, not a Tufte rule.

### 7. Aspect ratio ~1.5:1

*Source: Tufte — horizontal graphics about 50 percent wider than tall, unless the data suggest another shape, VDQI ch. 9. The standard sizes are this skill's defaults (convention).*

Charts should be approximately 50% wider than tall. Standard sizes: 600x400, 750x500, 900x600. Exception: sparklines and small multiples may be more compact.

### 8. Gray first, highlight selectively

*Source: Tufte — muted fields with strong color only in small areas (after Imhof), EI ch. 5; the smallest effective difference, VE ch. 4. The four-color limit, the palette types and the hex values are this skill's defaults (convention).*

The default data series color is medium gray (`#666`). Use a single accent color to highlight the most important series or data point. Never use more than 4 distinct colors. Choose the right palette type: **categorical** (4-color muted) for unordered groups, **sequential** (single-hue ramp) for ordered magnitude, **diverging** (two-hue from center) for deviation from a midpoint. See `rules/typography-and-color.md` for hex values.

### 9. Off-white background

*Source: convention — the `#fffff8` background comes from Tufte CSS (a web style for Tufte-like documents), not from Tufte's books, which are printed on white paper.*

Light mode: `#fffff8`. Dark mode: `#151515`. Never use pure white (`#ffffff`) or pure black (`#000000`).

### 10. Serif fonts for data

*Source: Tufte — the friendly data graphic sets type "upper-and-lower case, with serifs", with words spelled out and running left to right, VDQI ch. 9 (p. 183). The font stack is this skill's (convention), after Tufte's books, set in Monotype Bembo (ET Book is its digital revival).*

Use serif type for every label, annotation, tick and title: `"ET Book", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif`. Set it upper-and-lower case (no all-caps labels or headers), spell words out, and keep it horizontal.

### 11. No dual y-axes

*Source: convention — not stated as a rule in Tufte's books. The alternative given here, small multiples, is Tufte's (EI ch. 4).*

Two y-axes on one chart create false implied correlations. Use small multiples instead — two charts stacked vertically with shared x-axis.

### 12. Annotate the notable

*Source: Tufte — graphical integrity principle 2 (label important events in the data), VDQI ch. 2. The placement details are this skill's defaults (convention).*

If the data contains a peak, trough, inflection point, or event boundary, add a text annotation pointing to it directly on the chart. Place annotations in the nearest clear space — offset from the data point with a short leader line if needed. When multiple annotations compete for space, keep only the most important; move others to a footnote or tooltip.

### 13. Show comparison context

*Source: Tufte — "Compared to what?", EI p. 67; graphical integrity principle 6 (context), VDQI ch. 2.*

Include at least one reference element: a reference line (average, target, prior period), a shaded band, or a second series. A chart showing one line with no context fails the "Compared to what?" test.

### 14. Minimal tooltips

*Source: extension — Tufte did not write about tooltips.*

Tooltips should be plain text with the data value and label. No colored background, no border, no arrow pointer, no shadow.

### 15. Progressive disclosure over static density

*Source: extension. This rule pulls against Tufte, who asks for high data density (VDQI ch. 8) and for evidence shown adjacent in space, where it can be compared at a glance (Tufte, 2010 lecture, reported in *Eye* magazine). Apply it only on top of a static view that already carries the data and its comparisons.*

Default to the Tufte-clean overview — high data-ink, minimal chrome. Layer details through hover, tap, and click (values, annotations, comparisons). Disclosure adds detail; it never hides the comparison the chart exists to show. A contextual crosshair on hover replaces permanent gridlines.

### 16. Accessible by default

*Source: extension (WCAG), except that choosing colors color-deficient viewers can tell apart is Tufte's (friendly data graphic, VDQI ch. 9, p. 183).*

3:1 contrast ratio minimum for chart elements against their background; 4.5:1 for text in charts. Never use color as the sole differentiator — pair it with shape, dash, or a direct label. Not hatching or pattern fills: Tufte counts them as chartjunk (moiré vibration, VDQI ch. 5). Provide a text alternative for every chart (`aria-label` with key finding, or companion data table). Interactive charts must be keyboard-navigable.

### 17. Responsive, not just resized

*Source: extension.*

Charts must have a responsive strategy — fluid (percentage width + viewBox), adaptive (breakpoint-based layout changes), or hybrid. At narrow viewports, change chart type or layout (horizontal bars for categories, fewer ticks, wrapped labels), don't just shrink. Keep words spelled out (VDQI ch. 9).

### 18. Animate to explain, not to decorate

*Source: extension.*

Transitions for data changes (sorting, filtering, time progression) are good — they help the viewer track transformations. Gratuitous entrance animations, bouncing, and decorative motion are chartjunk. Duration: 200–500ms, ease-out. Always respect `prefers-reduced-motion`.

### 19. Dark mode as first-class citizen

*Source: extension.*

Design both light and dark palettes intentionally. Never invert colors. Reduce saturation in dark mode (bright colors "vibrate" on dark backgrounds). Respect `prefers-color-scheme`. Use semantic color tokens (`--tufte-bg`, `--tufte-text`, `--tufte-series-default`) so charts adapt automatically.

### 20. Titles assert findings

*Source: extension.*

The chart title states the key insight, not the axis description. "Revenue Surged 23% in Q3" not "Revenue by Quarter, 2024". The subtitle can provide context ("vs. prior year, USD millions"). If the data has no clear finding, the chart may not be needed (see rule 22).

### 21. Format numbers for humans

*Source: extension.*

Abbreviate large numbers: $1.2M not $1,200,000. Use thousand separators for mid-range numbers (12,450 not 12450). Match decimal precision to significance (don't show $4.2391M when $4.2M suffices). Right-align numbers in tables. Use consistent units and state them once (in the axis label or title), not on every data point.

### 22. Don't chart what a sentence or table can say

*Source: Tufte — the choice among sentences, tables and graphics, VDQI ch. 9.*

A sentence is a poor way to show more than two numbers, because it prevents comparisons within the data. For one or two numbers, write a sentence with inline context ("Revenue was $4.2M, up 23% from Q2"). Tables are preferable to graphics for many small data sets, and are the best way to show exact values. Graphics earn their space for larger data sets, where they reveal patterns, trends and distributions.

---

## Library quick reference

The universal rules above are sufficient for most charts. For complete code examples and library-specific helpers, read the appropriate rule file from the `rules/` directory in this skill's folder. Only read ONE rule file per task; each covers the accessibility and motion basics for its library (`rules/interactive-and-accessible.md` goes deeper).

| Library | Rule file to read | Essential config (apply even without reading the file) |
|---------|-------------------|--------------------------------------------------------|
| Recharts | `rules/recharts.md` | `<CartesianGrid stroke="none" />`, remove `<Legend />`, `<YAxis axisLine={false} tickLine={false} />`, `<Line dot={false} strokeWidth={1.5} isAnimationActive={false} />`, wrapper `<figure aria-label="…">` (not `role="img"`, which hides Recharts 3's keyboard layer) |
| ECharts | `rules/echarts.md` | `splitLine: { show: false }`, `legend: { show: false }`, `grid: { show: false }`, use `endLabel` on series, `animation: false`, `aria: { enabled: true }` |
| Chart.js | `rules/chartjs.md` | `grid: { display: false }`, `border: { display: false }`, `plugins.legend.display: false`, use `chartjs-plugin-datalabels`, `options.animation: false`, `<canvas role="img" aria-label="…">` |
| matplotlib | `rules/matplotlib.md` | `spines['top'].set_visible(False)`, `spines['right'].set_visible(False)`, `spines['bottom'].set_bounds(min, max)`, `font.family: serif` |
| Plotly | `rules/plotly.md` | `showgrid=False`, `showlegend=False`, `plot_bgcolor='#fffff8'`, `zeroline=False` |
| ggplot2 / plotnine | `rules/ggplot2-plotnine.md` | `theme_minimal()` + `panel.grid = element_blank()`, `legend.position = "none"`, `annotate("text", …)` at the last point, `labs(alt = "…")` |
| Vega-Lite / Altair | `rules/vega-lite-altair.md` | config `view.stroke: null`, `axis.grid: false`, `legend.disable: true`, `background: "#fffff8"`; `scale.zero: false` for time series; top-level `description` |
| Observable Plot | `rules/observable-plot.md` | `style: { background: "#fffff8", fontFamily: serif }`, `Plot.text(…, Plot.selectLast(…))` for direct labels, `Plot.frame({ anchor })` for range frames, `ariaLabel` |
| D3/SVG/HTML | `rules/svg-html.md` | `.domain { display: none }`, no `<rect>` backgrounds, `stroke-opacity: 0.1` for any gridlines, `<svg role="img">` with `<title>` + `<desc>` |

---

## Chart type guidance

These settings are this skill's defaults (convention), except where a cell names Tufte.

| Type | Key settings |
|---|---|
| **Line** | 1.5–2px stroke, `dot={false}` unless <7 points (then r=2), direct label at rightmost point |
| **Bar** | Zero baseline (this skill's application of integrity principle 1), prefer horizontal for categories, sort by value, not alphabetically (Tufte, VDQI ch. 9, p. 178), direct value labels, `#7a7a7a` default fill |
| **Scatter** | Gray dots `#8c8c8c` r=3, highlight key cluster/outlier with accent, regression line if meaningful (dashed, thin) |
| **Time series** | Label events on chart ("Recession", "Launch"), range-frame x-axis, YoY via opacity (current solid, prior 30%) |
| **Small multiples** | Same scale ALL panels, shared axis labels (x on bottom row, y on left column), no panel borders |
| **Sparklines** | Word-sized, no axes or gridlines, embedded in text or table cells. Tufte (BE ch. 2): the beginning and ending values as numbers beside the line; red marks for first and last values, blue for low and high (BE pp. 50–51); a gray band for the normal range where one exists; aspect ratio chosen so slopes average about 45° (after Cleveland). Dots r=1.5 (convention) |
| **Data tables** | No zebra striping, whitespace + thin rules every 3–5 rows, right-align numbers, `font-feature-settings: 'onum' 1` |
| **Slopegraph** | Tufte's design (VDQI pp. 158–159, where he calls it a table-graphic). Before/after categories, label both endpoints (value + name), gray default + highlight key slopes |
| **Box plot** | Tufte's quartile plot (VDQI ch. 6): drop the box; a dot for the median, a gap or offset for the middle half, lines out to the extremes |
| **Area** | Prefer lines. If area: fillOpacity 0.03–0.08, no gradient, direct labels at endpoints |
| **Stacked bar** | Avoid — use small multiples instead. If forced: sort by total, direct labels per segment, max 4 segments |
| **Heatmap** | Sequential or diverging palette only, value labels in cells, companion data table for accessibility |

For small multiples, sparklines, and slopegraph implementation patterns, see `rules/small-multiples-sparklines.md`.

---

## Color quick reference

| Token | Light | Dark |
|---|---|---|
| Background | `#fffff8` | `#151515` |
| Text | `#111` | `#ddd` |
| Text secondary | `#666` | `#999` |
| Text tertiary (ticks, source) | `#767676` | `#808080` |
| Axis/rule | `#ccc` | `#444` |
| Grid (if used) | `#eee` (8-12% opacity) | `#333` |
| Default series | `#666` | `#999` |
| Highlight | `#e41a1c` | `#fc8d62` |

**Categorical (max 4):** `#4e79a7` steel blue · `#db730d` tangerine · `#e15759` coral · `#539e73` sage

**Categorical, dark mode:** `#6a9fd8` · `#f2a860` · `#e87a7c` · `#8accc7`

Font stacks in rule 10. For full palettes (sequential, diverging), font loading, and old-style figures, see `rules/typography-and-color.md`.

---

## Anti-pattern detection

When reviewing existing chart code, check for: legends (→ direct labels), pie charts (→ horizontal bars), 3D effects (→ flat 2D), dual y-axes (→ small multiples), heavy gridlines (→ remove or 0.1 opacity), rainbow palettes (→ gray + accent), gauge widgets (→ number + sparkline), gradient fills (→ solid color), rotated labels (→ horizontal text; flip axes), pure white/black backgrounds (→ `#fffff8`/`#151515`), hover-only information (→ tap/focus fallback), missing text alternatives (→ `aria-label`), color-only encoding (→ add shape, dash or direct label), hatching or pattern fills (→ direct labels), all-caps labels (→ upper-and-lower case), missing source line (→ add one).

For the full table with per-library detection patterns and one-liner fixes, see `rules/anti-patterns.md`.

---

## Validation checklist

Before presenting any chart, verify:

- [ ] Lengths and areas are proportional to the values (lie factor ≈ 1); bars and areas start at zero
- [ ] Money over time is shown in deflated, standardized units, or the nominal units are stated
- [ ] Information-carrying dimensions do not exceed the data's dimensions
- [ ] The data is shown in context, not quoted out of it
- [ ] Every remaining element shows data or is needed to read it (data-ink); no hatching, heavy grid or decoration (chartjunk)
- [ ] Source and units are stated on or under the chart (documentation)
- [ ] No top or right borders/spines
- [ ] No Legend component — series labeled directly on the chart
- [ ] Gridlines removed, or muted (opacity <= 0.12)
- [ ] Aspect ratio approximately 1.5:1
- [ ] Background is `#fffff8` (light) or `#151515` (dark), not pure white/black
- [ ] Serif type, upper-and-lower case, words spelled out and horizontal
- [ ] Default series color is gray (`#666`); color used only for emphasis
- [ ] No 3D effects, no pie chart (unless explicitly requested)
- [ ] Axis lines span only the data range (range-frame)
- [ ] Notable data features annotated directly on chart
- [ ] Comparison context present (reference line, band, or second series)
- [ ] Tooltips are plain text with no decorative styling
- [ ] Interactive elements have tap/click/focus alternatives (no hover-only)
- [ ] Contrast ratios meet 3:1 (elements) / 4.5:1 (text) minimums
- [ ] Chart has a text alternative (aria-label, description, or data table)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Charts render usably at 320px and 1440px+ widths
- [ ] Title states the finding, not the axis description
- [ ] Numbers are formatted for readability (abbreviations, separators, consistent precision)
- [ ] A chart is warranted — the data couldn't be communicated as a sentence or table (more than two numbers; too many for a table)

---

## Additional resources

**Library rules** (read ONE per task): `rules/recharts.md`, `rules/echarts.md`, `rules/chartjs.md`, `rules/matplotlib.md`, `rules/plotly.md`, `rules/ggplot2-plotnine.md`, `rules/vega-lite-altair.md`, `rules/observable-plot.md`, `rules/svg-html.md` — complete code examples, helpers, and theme registrations. Each states the library version it was written for.

**Cross-cutting** (read when specifically needed):
- `rules/interactive-and-accessible.md` — progressive disclosure, WCAG, responsive, animation, dark mode
- `rules/typography-and-color.md` — font loading, full palette tables, old-style figures
- `rules/anti-patterns.md` — per-library detection heuristics and fixes
- `rules/small-multiples-sparklines.md` — layout patterns for small multiples, sparklines, slopegraphs
- `rules/diagrams-flowcharts.md` — flowcharts, process maps, org charts and networks, from Tufte's writing on connectors and layering

**Working examples** in `examples/` — for Recharts, ECharts, Chart.js, matplotlib and Plotly, plus an inline SVG sparkline. The other libraries' rule files contain complete examples.
