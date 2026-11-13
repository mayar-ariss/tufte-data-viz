# tufte-data-viz

An agent skill that applies [Edward Tufte's](https://www.edwardtufte.com/) data visualization principles when generating charts, plots, and graphs. Produces clean, honest, high-data-ink-ratio visualizations across multiple charting libraries — extended with modern screen-first standards for accessibility, responsiveness, and interactivity.

> **About this fork.** This is an enhanced fork of [caylent/tufte-data-viz](https://github.com/caylent/tufte-data-viz), maintained by [@mayar-ariss](https://github.com/mayar-ariss). All credit for the original skill goes to its authors. The improvements are being offered back upstream ([PR #1](https://github.com/caylent/tufte-data-viz/pull/1), [issue #2](https://github.com/caylent/tufte-data-viz/issues/2)). What's different here:
>
> - **Bug fixes:** Chart.js elements no longer render invisible, sparkline examples are no longer upside down, deprecated ECharts options are replaced, and broken seaborn and Recharts snippets are fixed.
> - **Accessible palette:** every text and data color now meets the skill's own contrast rule (4.5:1 text, 3:1 data), with a dark-mode categorical palette and a checker script (`scripts/check_contrast.py`).
> - **Accessibility and motion in every library guide:** text alternatives and no load-in animation by default, so charts follow rules 16 and 18 out of the box.
> - **Titles that state the finding** in every example (rule 20), plus a few accuracy corrections.
>
> The before/after images and the live demo below still show the original palette.

## Fair warning

This skill is **opinionated by design**. It will remove your gridlines, delete your legends, reject your pie charts, and insist on serif fonts. It enforces a specific visual philosophy — Tufte's — not a neutral one. If you want total creative freedom over your chart styling, this is not the skill for you. If you want every chart to come out clean, honest, and readable without thinking about it, read on.

## Install

```bash
npx skills add mayar-ariss/tufte-data-viz
```

This installs the enhanced version from this fork. The original is still available with `npx skills add caylent/tufte-data-viz`.

## Before & After

The same data, default styling vs. Tufte principles applied:

![Before and after comparison — default chart style vs. Tufte style](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/before-after.png)

See it happen live — gridlines fade, legends become direct labels, chartjunk dissolves:

![Animated transition from default chart styling to Tufte principles](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/before-after-animated.gif)

## Interactive Demo

**[Try the live demo](https://caylent.github.io/tufte-data-viz/)** — toggle between default and Tufte styling across ECharts, Chart.js, Plotly, and D3.js. Includes dark mode.

## Examples

### Line chart — direct labels, range-frame axes, annotation

![Tufte-styled line chart showing revenue vs. target with direct labels and peak annotation](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-line-chart.png)

### Horizontal bar chart — sorted by value, highlighted leader

![Tufte-styled horizontal bar chart with direct value labels and highlighted top product](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-bar-chart.png)

### Slopegraph — before/after comparison

![Slopegraph showing team size changes from 2024 to 2025, highlighting Engineering growth](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-slopegraph.png)

### Small multiples — shared scale, minimal chrome

![Small multiples showing revenue trend by region with shared y-axis](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/small-multiples.png)

### Sparklines — word-sized charts with min/max markers

![Five sparklines showing key metrics over 24 months with min and max markers](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-sparklines.png)

### Data table — whitespace, thin rules, highlighted outlier

![Tufte-styled data table with thin rules, right-aligned numbers, and highlighted growth leader](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-data-table.png)

### Dark mode — intentional palette, not inverted

![Dark mode line chart with desaturated highlight color on dark background](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-dark-mode.png)

### Accessible scatter — dual-encoded with shape + color

![Scatter plot using different shapes per segment so data is distinguishable without color](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-accessible-scatter.png)

### Light & dark — same chart, both themes

![Side-by-side bar chart in light and dark mode showing intentional palette design](https://raw.githubusercontent.com/caylent/tufte-data-viz/main/_docs/tufte-light-dark.png)

## What it does

22 universal rules applied to every chart, organized in three tiers:

**Static principles (rules 1–14)** — the Tufte foundation:
- Maximize data-ink ratio — remove gridlines, borders, legends, and decoration that don't convey data
- Direct labeling, range-frame axes, no 3D, no pie charts (unless forced), no dual y-axes
- Serif typography, off-white backgrounds, gray as primary color with selective highlighting
- Annotate notable features, show comparison context, minimal tooltips

**Screen-first principles (rules 15–19)** — modern interactive contexts:
- Progressive disclosure (overview first, details on hover/tap/click)
- WCAG accessibility (contrast ratios, dual encoding, keyboard nav, screen reader text alternatives)
- Responsive design (fluid/adaptive strategies, touch targets, mobile-adapted chart types)
- Purposeful animation (data transitions only, respect `prefers-reduced-motion`)
- Intentional dark mode (semantic color tokens, never invert, reduce saturation)

**Content & formatting (rules 20–22)** — what Tufte assumed but never codified:
- Titles assert findings ("Revenue Surged 23%"), not axis descriptions
- Numbers formatted for humans ($1.2M, thousand separators, matched precision)
- Don't chart what a sentence or table can say better

## Supported libraries

| Library | Rule file | Language |
|---------|-----------|----------|
| [Recharts](https://recharts.org/) | `rules/recharts.md` | React/JSX |
| [ECharts](https://echarts.apache.org/) | `rules/echarts.md` | JavaScript |
| [Chart.js](https://www.chartjs.org/) | `rules/chartjs.md` | JavaScript |
| [matplotlib](https://matplotlib.org/) | `rules/matplotlib.md` | Python |
| [Plotly](https://plotly.com/) | `rules/plotly.md` | Python/JS |
| D3.js / SVG / HTML | `rules/svg-html.md` | Web |

## Additional references

- `rules/interactive-and-accessible.md` — progressive disclosure, accessibility, responsive, animation, dark mode
- `rules/typography-and-color.md` — font stacks, palettes, hex values
- `rules/anti-patterns.md` — common violations and one-liner fixes
- `rules/small-multiples-sparklines.md` — small multiples, sparklines, slopegraphs
- `scripts/check_contrast.py` — checks the documented palette against the contrast minimums (run `python3 scripts/check_contrast.py`)

## Based on

- *The Visual Display of Quantitative Information* (1983)
- *Envisioning Information* (1990)
- *Visual Explanations* (1997)
- *Beautiful Evidence* (2006)

## License

MIT. Original work © 2026 Caylent; see [LICENSE](LICENSE). Fork changes are released under the same license.
