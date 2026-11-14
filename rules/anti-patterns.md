# Anti-Patterns: Detection and Fixes

## Quick reference

| Anti-pattern | Why it fails | Fix | Source |
|---|---|---|---|
| **Pie chart** | Low data density, and the numbers are not ordered along a visual dimension (Tufte, VDQI ch. 9). | Horizontal bar chart sorted by value descending, or a table. | Tufte, VDQI ch. 9 |
| **3D effects** | Perspective distorts relative sizes. Back bars appear smaller than front bars of equal value. | Remove all 3D. Flat 2D only. | Tufte, integrity principle 5, VDQI ch. 2 |
| **Dual y-axes** | Implies correlation between two series that may not exist. Scale manipulation can make any two lines appear correlated. | Two stacked charts sharing the same x-axis (small multiples). | Convention |
| **Legend box** | "Obscure codings require going back and forth between legend and graphic" (Tufte's unfriendly graphic). | Direct labels at the endpoint or on the data element itself. Keep a key only for an encoding that cannot be labeled in place (a color scale for quantity), beside the data and without a frame. | Tufte, VDQI ch. 9 (p. 183); his own keyed cancer maps, VDQI pp. 16–20 |
| **Heavy gridlines** | Compete with data for visual attention. Create a "cage" that imprisons the data. | Remove entirely, or horizontal-only at opacity 0.08–0.12. | Tufte, VDQI ch. 5 |
| **Rainbow palette** | No natural ordering. Creates false category boundaries. Inaccessible to 8% of males (colorblind). | Gray default + single accent, or 4-color muted palette. | Convention |
| **Gauge/speedometer** | Uses enormous screen area for a single number. No trend, no context, no comparison. | Single large number + sparkline + comparison text. | Convention |
| **Zebra-striped table** | Alternating row fills are non-data ink. | Whitespace + thin horizontal rules every 3–5 rows. | Convention |
| **Gradient fills** | Add no information. Distract from data values. Make it harder to read precise heights. | Solid flat color (muted gray or accent). | Convention |
| **Rotated axis labels** | 45° or 90° text is hard to read. Forces head-tilting. | Horizontal bar chart (flip axes) so words run left to right and stay spelled out. | Tufte, VDQI ch. 9 (p. 183) |
| **Truncated bar or area** | A bar's length or an area's size is proportional to its value only from zero; cutting it off raises the lie factor (Tufte, VDQI ch. 2). | Start bars and areas at zero. For lines in a time series, Tufte advises a baseline that shows the data rather than forcing zero. | Convention, from integrity principle 1 |
| **Decorative borders** | A box around the chart is non-data-ink. Adds zero information. | Remove entirely. Let whitespace define the chart boundary. | Tufte, non-data-ink, VDQI ch. 4 |
| **Area chart with high opacity** | Filled areas at 50%+ opacity obscure overlapping series and add visual weight that distorts perception. | Use lines only, or area with opacity 0.03–0.08. | Convention |
| **Exploded pie slices** | Pulling slices apart makes comparison even harder than standard pie. | Don't. Use a bar chart. | Tufte, VDQI ch. 9 |
| **Data point markers on every point** | Large circles on 50+ data points create a confetti effect that obscures the trend. | `dot={false}` or markers only at notable points (min, max, endpoint). | Convention |
| **Thick axis lines** | Heavy 2-3px axis lines draw attention away from the data. The 1+1=3 effect creates phantom visual weight. | 0.5–1px axis lines, or remove entirely if ticks provide orientation. | Tufte, 1+1=3, EI ch. 3 |
| **Hover-only information** | Touch and keyboard users can never access it. Violates WCAG. | Tap/click/focus fallback for all hover content. | Extension |
| **Missing text alternative** | Screen readers announce nothing. The chart is invisible to blind users. | Add `aria-label` with key finding + data summary, or companion data table. | Extension |
| **Color as sole differentiator** | 8% of males have color vision deficiency. Series become indistinguishable. | Add shape, dash pattern, or direct label as second channel. | Extension; Tufte on color-deficient readers, VDQI p. 183 |
| **Gratuitous entrance animation** | Chart "building" on load delays comprehension and is chartjunk in motion. | Remove, or gate behind `prefers-reduced-motion` check. | Extension |
| **Fixed pixel width** | Chart overflows or becomes unreadable on mobile. | Use percentage/viewBox width or breakpoint-based layout. | Extension |
| **Hatching or pattern fills** | Dense patterns vibrate (moiré) and force readers back and forth to a legend. | Direct labels or value labels; gray steps if a fill must vary. | Tufte, chartjunk, VDQI ch. 5 |
| **All-caps labels** | Tufte lists all-capitals type among the marks of an unfriendly graphic. | Upper-and-lower case type, serif by default (rule 10). | Tufte, VDQI ch. 9 (p. 183) |
| **Alphabetical order** | Hides the ranking the reader came for. | Order by data value or by content. | Tufte, VDQI ch. 9 (p. 178) |
| **No source line** | Readers can't check the evidence. | State source, units and author under the chart. | Tufte, documentation, BE ch. 5 |

## Per-library detection patterns

### Recharts

```
PATTERN                              FIX
<Legend />                          → Remove entirely; add direct labels
<CartesianGrid />                   → <CartesianGrid stroke="none" /> or remove
<Pie> or <PieChart>                 → <BarChart layout="vertical">
fill="url(#gradient...)"           → fill="#666" (solid gray)
<YAxis yAxisId="right"...>          → Two separate <LineChart> in a flex column
stroke="#..." (bright/loud color)   → stroke="#666" (gray) unless it's the highlight series
<Area fillOpacity={0.3+}            → <Line> or <Area fillOpacity={0.05}>
<div role="img"> around a chart      → <figure aria-label="…"> (keeps Recharts 3's keyboard layer)
```

### ECharts

```
PATTERN                              FIX
type: 'pie'                         → type: 'bar' with horizontal orientation
splitLine: { show: true }           → splitLine: { show: false }
legend: { show: true }              → legend: { show: false } + label on series
grid: { borderWidth: N }            → grid: { show: false }
series.areaStyle: { opacity: 0.3+ } → Remove or opacity: 0.05
visualMap with rainbow colors        → Muted single-hue sequential palette
```

### Chart.js

```
PATTERN                              FIX
type: 'pie' / 'doughnut'           → type: 'bar' with indexAxis: 'y'
grid: { display: true }            → grid: { display: false }
border: { display: true } on scale  → border: { display: false }
plugins.legend.display: true        → display: false + chartjs-plugin-datalabels
backgroundColor: 'rgba(R,G,B,0.5)' → 'rgba(102,102,102,0.8)' (gray)
```

### matplotlib

```
PATTERN                              FIX
plt.pie(...)                        → plt.barh(...) sorted by value
ax.legend()                         → ax.annotate() at each line endpoint
ax.grid(True)                       → ax.grid(False) or ax.grid(axis='y', alpha=0.1)
fig.patch.set_facecolor('white')    → fig.patch.set_facecolor('#fffff8')
plt.xticks(rotation=45)            → Use plt.barh() so labels stay horizontal and spelled out
ax.set_frame_on(True)              → Remove top/right spines + range-frame
```

### Plotly

```
PATTERN                              FIX
go.Pie(...)                         → go.Bar(orientation='h', ...)
fig.update_layout(showlegend=True)  → showlegend=False + add annotations at endpoints
xaxis=dict(showgrid=True)          → showgrid=False
plot_bgcolor='white'               → plot_bgcolor='#fffff8'
template='plotly'                   → Use custom Tufte template
```

### ggplot2 / plotnine

```
PATTERN                              FIX
coord_polar() on a bar               → Horizontal geom_col(), sorted with reorder()
theme_gray() / default theme         → theme_tufte_skill() (rules/ggplot2-plotnine.md)
legend shown for colour/linetype     → legend.position = "none" + annotate("text") at line ends
facet_wrap(..., scales = "free_y")   → Default fixed scales when panels are compared
geom_col() with expand on the left   → expansion(mult = c(0, 0.1)) so bars start at zero
```

### Vega-Lite / Altair

```
PATTERN                              FIX
mark: "arc" / mark_arc()             → Horizontal bar, sort: "-x"
config.axis.grid unset (defaults on) → axis.grid: false
legend shown for color               → legend.disable: true + text layer at the last point
view stroke unset (box drawn)        → view.stroke: null
line chart with default zero: true   → scale.zero: false for time series
resolve_scale(y="independent")       → Shared scales across compared facets
```

### Observable Plot

```
PATTERN                              FIX
color: { legend: true }              → Plot.text(…, Plot.selectLast(…)) direct labels
grid: true                           → Remove
Plot.frame() (all four sides)        → Plot.frame({ anchor: 'left' }) / ({ anchor: 'bottom' }) range frame
y: { zero: true } on a line chart    → Leave zero off for time series
one Plot.plot() per compared panel   → One plot with fx/fy so scales are shared
```

## The "Can I remove it?" test

For each non-data element, ask: "If I delete this, does the chart lose information?"

- **Gridlines**: Usually no. The data points themselves show position.
- **Legend**: No, if you label directly. A scale for a color or shading that stands for a quantity stays, unframed, beside the data (rule 2).
- **Axis title**: Sometimes no — if the chart title already specifies the axis ("Monthly Revenue in USD").
- **Top/right borders**: Always no.
- **Background color other than off-white**: Always no (decoration).
- **Tick marks**: Maybe — keep if needed for reading precision, remove if axis line is sufficient.
- **Tooltip border/background**: Always no.

If the answer is "no," remove it. If the answer is "maybe," try removing it and see if the chart still communicates.
