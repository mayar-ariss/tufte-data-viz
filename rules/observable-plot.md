# Observable Plot: Tufte Configuration

Load this file when generating any Observable Plot (`@observablehq/plot`) chart code.

**Written for Observable Plot 0.6.x.** The rules come from Tufte (see the citations in `SKILL.md`); the code below is implementation, not principle. Rule numbers refer to `SKILL.md`.

Plot's defaults are already close to the rules: no gridlines, no axis lines, no chart border and no animation. Its legends are off unless you ask for them. What remains is the palette, the type, direct labels and the range frame.

## Constants and style

```javascript
import * as Plot from '@observablehq/plot';

const TUFTE = {
  bg: '#fffff8',
  text: '#111111',
  textSecondary: '#666666',
  textTertiary: '#767676',
  axis: '#cccccc',
  seriesDefault: '#666666',
  bar: '#7a7a7a',
  highlight: '#e41a1c',
  categorical: ['#4e79a7', '#db730d', '#e15759', '#539e73'],
  font: '"Palatino Linotype", Palatino, Georgia, serif',
};

const tufteStyle = {
  background: TUFTE.bg,          // rule 9
  color: TUFTE.text,
  fontFamily: TUFTE.font,        // rule 10
  fontSize: '12px',
};

// Gray axes: ticks in the axis color, labels in the tertiary text color
const axisX = (options = {}) => Plot.axisX({ tickSize: 3, stroke: TUFTE.axis, fill: TUFTE.textTertiary, ...options });
const axisY = (options = {}) => Plot.axisY({ tickSize: 3, stroke: TUFTE.axis, fill: TUFTE.textTertiary, ...options });
```

Pass `style: tufteStyle` to every `Plot.plot()` call. A width:height of about 1.5:1 follows rule 7 (`width: 720, height: 480`).

## Range-frame axes (rule 4)

`Plot.frame({anchor})` draws one side of the plot area. Set each scale's domain to the data's minimum and maximum and the side spans only the data:

```javascript
Plot.plot({
  x: { domain: [xMin, xMax] },
  y: { domain: [yMin, yMax] },
  marks: [
    Plot.frame({ anchor: 'bottom', stroke: TUFTE.axis }),
    Plot.frame({ anchor: 'left', stroke: TUFTE.axis }),
    // ...data marks
  ],
});
```

Don't add `inset` to these scales: the frame would then extend past the data.

## Baselines

- **Bars and areas:** `Plot.barX`, `Plot.barY` and `Plot.areaY` stack from zero, so bars start at zero (graphical integrity 1).
- **Time series:** lines take the data's extent unless you set `zero: true`; leave it off so the baseline shows the data (graphical integrity, `SKILL.md`).

## Accessibility (rule 16)

- **Text alternative that states the finding.** The top-level `ariaLabel` option sets the `aria-label` of the chart; `ariaDescription` adds a longer description.
- **Visible caption.** `caption` renders a `<figcaption>` under the chart; use it for the source or for a sentence that restates the finding.
- Set `ariaHidden: true` on decorative marks, such as range-frame lines.
- **Don't rely on color alone.** Pair color with `strokeDasharray` or a direct label.

Plot draws without animation, so there is no motion to manage.

## Tooltips (rule 14)

`tip: true` on a mark adds a tooltip that shows the mark's channels. Pass `tip: { format: { x: false } }` to drop channels the axis already shows.

## Complete example: annotated time series

```javascript
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenue = [42, 48, 51, 49, 56, 62, 58, 65, 71, 68, 75, 82].map((value, i) => ({ month: i + 1, value }));
const target = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62].map((value, i) => ({ month: i + 1, value }));
const all = [...revenue, ...target];
const yMin = Math.min(...all.map((d) => d.value));
const yMax = Math.max(...all.map((d) => d.value));

const chart = Plot.plot({
  title: 'Revenue Exceeded Target Every Month, Accelerating in H2',   // rule 20
  subtitle: 'Monthly revenue vs. target, 2025',
  ariaLabel: 'Revenue beat target every month, rising from $42k in January to $82k in December',
  width: 720,
  height: 480,
  marginRight: 80,                                                   // room for direct labels
  style: tufteStyle,
  x: { domain: [1, 12], label: null },
  y: { domain: [yMin, yMax], label: 'Revenue ($k)' },
  marks: [
    Plot.frame({ anchor: 'bottom', stroke: TUFTE.axis, ariaHidden: true }),
    Plot.frame({ anchor: 'left', stroke: TUFTE.axis, ariaHidden: true }),
    axisX({ ticks: 12, tickFormat: (m) => MONTHS[m - 1] }),
    axisY({ labelAnchor: 'top', labelArrow: 'none' }),
    Plot.lineY(target, { x: 'month', y: 'value', stroke: '#8c8c8c', strokeWidth: 1, strokeDasharray: '4,3' }),
    Plot.lineY(revenue, { x: 'month', y: 'value', stroke: TUFTE.highlight, strokeWidth: 2 }),
    // Direct labels at the last point (rule 2)
    Plot.text(revenue, Plot.selectLast({
      x: 'month', y: 'value', text: () => 'Revenue',
      textAnchor: 'start', dx: 6, fill: TUFTE.highlight, fontSize: 12,
    })),
    Plot.text(target, Plot.selectLast({
      x: 'month', y: 'value', text: () => 'Target',
      textAnchor: 'start', dx: 6, fill: TUFTE.textTertiary, fontSize: 12,
    })),
  ],
});

document.querySelector('#chart').append(chart);
```

Because the plot has a title, Plot returns a `<figure>` with the title as `<h2>` and the subtitle as `<h3>`; style those headings with CSS (normal weight, 18px and 13px, `TUFTE.textSecondary` for the subtitle).

## Complete example: horizontal bar chart

```javascript
const products = [
  { product: 'Product A', revenue: 42 },
  { product: 'Product B', revenue: 38 },
  { product: 'Product C', revenue: 27 },
  { product: 'Product D', revenue: 19 },
  { product: 'Product E', revenue: 12 },
];

Plot.plot({
  title: 'Products A and B Bring In 58% of Revenue',
  subtitle: 'Revenue by product, $k',
  ariaLabel: 'Product A leads revenue at $42k, followed by B at $38k, C at $27k, D at $19k and E at $12k',
  width: 640,
  marginLeft: 80,
  marginRight: 50,
  style: tufteStyle,
  x: { axis: null },                                  // values sit on the bars
  y: { label: null, tickSize: 0 },
  marks: [
    Plot.barX(products, { x: 'revenue', y: 'product', fill: TUFTE.bar, sort: { y: '-x' } }),
    Plot.text(products, {
      x: 'revenue', y: 'product', text: (d) => `$${d.revenue}k`,
      textAnchor: 'start', dx: 4, fill: TUFTE.textSecondary, fontSize: 12,
    }),
  ],
});
```

## Small multiples

The `fx` and `fy` facet channels share every scale across panels by default, as the small-multiples row in `SKILL.md` requires.

```javascript
Plot.plot({
  style: tufteStyle,
  height: 160,
  fx: { label: null },
  x: { label: null },
  y: { label: null },
  marks: [
    axisX({ ticks: 3 }),
    axisY({ ticks: 3 }),
    Plot.lineY(longData, { x: 'month', y: 'value', fx: 'region', stroke: TUFTE.seriesDefault, strokeWidth: 1.5 }),
  ],
});
```

## Sparklines

Tufte's marks: first and last values in red, low and high in blue (BE pp. 50–51).

```javascript
const spark = (values) =>
  Plot.plot({
    width: 80,
    height: 20,
    margin: 2,
    axis: null,
    style: { background: 'transparent', overflow: 'visible' },
    marks: [
      Plot.lineY(values, { stroke: TUFTE.seriesDefault, strokeWidth: 1 }),
      Plot.dot(values, Plot.selectMinY({ x: (d, i) => i, y: (d) => d, r: 1.5, fill: '#4e79a7', stroke: null })),
      Plot.dot(values, Plot.selectMaxY({ x: (d, i) => i, y: (d) => d, r: 1.5, fill: '#4e79a7', stroke: null })),
      Plot.dot(values, Plot.selectFirst({ x: (d, i) => i, y: (d) => d, r: 1.5, fill: '#e41a1c', stroke: null })),
      Plot.dot(values, Plot.selectLast({ x: (d, i) => i, y: (d) => d, r: 1.5, fill: '#e41a1c', stroke: null })),
    ],
  });
```

## Dark mode (rule 19)

Plot draws axes and text in `currentColor`, so the style's `color` and the palette carry the theme. Render again when the preference changes:

```javascript
const dark = window.matchMedia('(prefers-color-scheme: dark)');
const palette = () => (dark.matches
  ? { bg: '#151515', text: '#dddddd', textTertiary: '#808080', axis: '#444444', series: '#999999', highlight: '#fc8d62' }
  : { bg: TUFTE.bg, text: TUFTE.text, textTertiary: TUFTE.textTertiary, axis: TUFTE.axis, series: TUFTE.seriesDefault, highlight: TUFTE.highlight });

function render() {
  const p = palette();
  const chart = Plot.plot({ style: { ...tufteStyle, background: p.bg, color: p.text }, /* marks using p */ });
  document.querySelector('#chart').replaceChildren(chart);
}
render();
dark.addEventListener('change', render);
```
