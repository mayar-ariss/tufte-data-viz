# Vega-Lite and Altair: Tufte Configuration

Load this file when generating any Vega-Lite spec (JSON, vega-embed) or Vega-Altair (Python) chart code. Altair writes Vega-Lite specs, so one config serves both.

**Written for Vega-Lite 6.x and Altair 6.x.** The rules come from Tufte (see the citations in `SKILL.md`); the code below is implementation, not principle. Rule numbers refer to `SKILL.md`.

## Config

Vega-Lite separates style from data in a `config` object. This one removes the view border, gridlines and legends, sets the off-white background and serif type, and grays the default mark.

```json
{
  "background": "#fffff8",
  "font": "Palatino, 'Palatino Linotype', Georgia, serif",
  "view": { "stroke": null, "continuousWidth": 540, "continuousHeight": 360 },
  "axis": {
    "grid": false,
    "domainColor": "#cccccc", "domainWidth": 0.5,
    "tickColor": "#cccccc", "tickWidth": 0.5, "tickSize": 3,
    "labelColor": "#767676", "labelFontSize": 11,
    "titleColor": "#666666", "titleFontSize": 12, "titleFontWeight": "normal"
  },
  "title": {
    "anchor": "start", "fontSize": 18, "fontWeight": "normal", "color": "#111111",
    "subtitleColor": "#666666", "subtitleFontSize": 13
  },
  "legend": { "disable": true },
  "mark": { "color": "#666666" },
  "line": { "strokeWidth": 1.5 },
  "bar": { "color": "#7a7a7a" },
  "range": { "category": ["#4e79a7", "#db730d", "#e15759", "#539e73"] }
}
```

- `view.stroke: null` removes the box around the plot (rule 1); `axis.grid: false` removes gridlines (rule 3); `legend.disable` turns legends off so series are labelled directly (rule 2).
- 540 × 360 is 1.5:1 (rule 7).
- Vega-Lite has no entrance animation, so there is no motion to manage.

**vega-embed (JavaScript):** pass it as the `config` option.

```javascript
import embed from 'vega-embed';
embed('#chart', spec, { config: tufteConfig, actions: false });
```

**Altair (Python):** register it as a theme.

```python
import altair as alt


@alt.theme.register("tufte", enable=True)
def tufte() -> alt.theme.ThemeConfig:
    return {
        "config": {
            "background": "#fffff8",
            "font": "Palatino, 'Palatino Linotype', Georgia, serif",
            "view": {"stroke": None, "continuousWidth": 540, "continuousHeight": 360},
            "axis": {
                "grid": False,
                "domainColor": "#cccccc", "domainWidth": 0.5,
                "tickColor": "#cccccc", "tickWidth": 0.5, "tickSize": 3,
                "labelColor": "#767676", "labelFontSize": 11,
                "titleColor": "#666666", "titleFontSize": 12, "titleFontWeight": "normal",
            },
            "title": {
                "anchor": "start", "fontSize": 18, "fontWeight": "normal", "color": "#111111",
                "subtitleColor": "#666666", "subtitleFontSize": 13,
            },
            "legend": {"disable": True},
            "mark": {"color": "#666666"},
            "line": {"strokeWidth": 1.5},
            "bar": {"color": "#7a7a7a"},
            "range": {"category": ["#4e79a7", "#db730d", "#e15759", "#539e73"]},
        }
    }
```

Before Altair 5.5, themes were registered with `alt.themes.register("tufte", tufte)` followed by `alt.themes.enable("tufte")`.

## Scales and baselines

Vega-Lite includes zero in quantitative x and y scales by default.

- **Bars and areas:** keep the default. Bars start at zero (graphical integrity 1).
- **Time series:** set `"scale": {"zero": false}` so the baseline shows the data (graphical integrity, `SKILL.md`).

## Range-frame axes (rule 4)

The axis line (`domain`) spans the whole scale. Set the scale's domain to the data's minimum and maximum, without rounding, and the line covers only the data:

```python
y=alt.Y("value:Q", scale=alt.Scale(domain=[y_min, y_max], nice=False, zero=False))
```

To also print the minimum and maximum as tick labels, add `axis=alt.Axis(values=[y_min, ..., y_max])`.

## Accessibility (rule 16)

- **Text alternative that states the finding.** Set the top-level `description`; Vega uses it as the `aria-label` of the chart's container. In Altair: `chart.properties(description="Revenue beat target every month, rising from $42k to $82k")`.
- Vega-Lite also writes ARIA attributes for marks and axes by default (`aria: true`). Set `"aria": false` on decorative layers, such as direct-label text that repeats an axis value.
- **Static export** (`chart.save("chart.png")`, which needs the `vl-convert-python` package): use alt text where the image is embedded.
- **Don't rely on color alone.** Pair color with `strokeDash` or `shape`.

## Tooltips (rule 14)

Keep them to the values the chart can't show: `tooltip=[alt.Tooltip("month:O"), alt.Tooltip("value:Q", format="$,.0f")]`.

## Complete example: annotated time series (Altair)

```python
import altair as alt
import pandas as pd

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
df = pd.DataFrame({
    "month": list(range(1, 13)) * 2,
    "series": ["Revenue"] * 12 + ["Target"] * 12,
    "value": [42, 48, 51, 49, 56, 62, 58, 65, 71, 68, 75, 82,
              40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62],
})
y_min, y_max = int(df.value.min()), int(df.value.max())

color = alt.Color(
    "series:N",
    scale=alt.Scale(domain=["Revenue", "Target"], range=["#e41a1c", "#8c8c8c"]),
    legend=None,
)

base = alt.Chart(df).encode(
    x=alt.X(
        "month:Q", title=None,
        scale=alt.Scale(domain=[1, 12], nice=False),
        axis=alt.Axis(values=list(range(1, 13)),
                      labelExpr="['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][datum.value - 1]"),
    ),
    y=alt.Y("value:Q", title="Revenue ($k)",
            scale=alt.Scale(domain=[y_min, y_max], nice=False, zero=False)),
    color=color,
)

lines = base.mark_line().encode(
    strokeDash=alt.when(alt.datum.series == "Target").then(alt.value([4, 3])).otherwise(alt.value([1, 0])),
    strokeWidth=alt.when(alt.datum.series == "Revenue").then(alt.value(2)).otherwise(alt.value(1)),
)

# Direct labels at the last point (rule 2)
labels = base.mark_text(align="left", dx=6, fontSize=12).encode(
    text="series:N",
).transform_filter(alt.datum.month == 12)

chart = (lines + labels).properties(
    title=alt.Title(
        "Revenue Exceeded Target Every Month, Accelerating in H2",   # rule 20
        subtitle="Monthly revenue vs. target, 2025",
    ),
    description="Revenue beat target every month, rising from $42k in January to $82k in December",
)
chart
```

## Complete example: horizontal bar chart (Altair)

```python
products = pd.DataFrame({
    "product": ["Product A", "Product B", "Product C", "Product D", "Product E"],
    "revenue": [42, 38, 27, 19, 12],
})
products["label"] = "$" + products["revenue"].astype(str) + "k"

bars = alt.Chart(products).mark_bar(size=24).encode(
    x=alt.X("revenue:Q", axis=None),               # zero baseline is the default for bars
    y=alt.Y("product:N", sort="-x", title=None,
            axis=alt.Axis(ticks=False, domain=False, labelColor="#111111", labelFontSize=12)),
)
values = bars.mark_text(align="left", dx=4, color="#666666", fontSize=12).encode(text="label:N")

(bars + values).properties(
    height=alt.Step(40),
    title=alt.Title("Products A and B Bring In 58% of Revenue", subtitle="Revenue by product, $k"),
    description="Product A leads revenue at $42k, followed by B at $38k, C at $27k, D at $19k and E at $12k",
)
```

## Complete example: line chart (Vega-Lite JSON)

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "description": "Revenue beat target every month, rising from $42k in January to $82k in December",
  "title": { "text": "Revenue Exceeded Target Every Month, Accelerating in H2", "subtitle": "Monthly revenue vs. target, 2025" },
  "data": { "url": "revenue.csv" },
  "encoding": {
    "x": { "field": "month", "type": "quantitative", "title": null, "scale": { "domain": [1, 12], "nice": false } },
    "y": { "field": "value", "type": "quantitative", "title": "Revenue ($k)", "scale": { "domain": [40, 82], "nice": false, "zero": false } },
    "color": { "field": "series", "type": "nominal", "scale": { "domain": ["Revenue", "Target"], "range": ["#e41a1c", "#8c8c8c"] } }
  },
  "layer": [
    { "mark": "line" },
    {
      "mark": { "type": "text", "align": "left", "dx": 6 },
      "transform": [{ "filter": "datum.month == 12" }],
      "encoding": { "text": { "field": "series" } }
    }
  ]
}
```

## Small multiples

Faceting shares scales across panels by default, as the small-multiples row in `SKILL.md` requires. Don't add `resolve_scale(y="independent")` when the panels are compared.

```python
alt.Chart(long_df).mark_line(color="#666666").encode(
    x=alt.X("month:Q", title=None),
    y=alt.Y("value:Q", title=None, scale=alt.Scale(zero=False)),
).properties(width=160, height=110).facet(
    facet=alt.Facet("region:N", title=None, header=alt.Header(labelAnchor="start", labelFontSize=13)),
    columns=4,
)
```

## Sparklines

Tufte's marks: first and last values in red, low and high in blue (BE pp. 50–51).

```python
spark = pd.DataFrame({"i": range(len(values)), "v": values})
ends = spark.iloc[[0, -1]]
lohi = spark.iloc[[spark.v.idxmin(), spark.v.idxmax()]]

enc = dict(x=alt.X("i:Q", axis=None), y=alt.Y("v:Q", axis=None, scale=alt.Scale(zero=False)))
(
    alt.Chart(spark).mark_line(strokeWidth=1, color="#666666").encode(**enc)
    + alt.Chart(lohi).mark_circle(size=6, color="#4e79a7", opacity=1).encode(**enc)
    + alt.Chart(ends).mark_circle(size=6, color="#e41a1c", opacity=1).encode(**enc)
).properties(width=80, height=20)
```

## Dark mode (rule 19)

Register a second theme with the dark palette from `rules/typography-and-color.md` and enable the one that matches the page:

```python
DARK = {"bg": "#151515", "text": "#dddddd", "text_secondary": "#999999",
        "text_tertiary": "#808080", "axis": "#444444", "series": "#999999"}
# copy tufte() as tufte_dark(), substituting background, color, labelColor,
# titleColor, domainColor, tickColor and mark color with the values above
alt.theme.enable("tufte_dark")
```

With vega-embed, keep two config objects and re-embed with the other one on a `prefers-color-scheme` change.
