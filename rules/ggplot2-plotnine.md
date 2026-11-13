# ggplot2 and plotnine: Tufte Configuration

Load this file when generating any ggplot2 (R) or plotnine (Python) chart code. plotnine follows ggplot2's grammar, so the two halves of this file mirror each other.

**Written for ggplot2 4.x and plotnine 0.15.** The rules come from Tufte (see the citations in `SKILL.md`); the code below is implementation, not principle. Rule numbers refer to `SKILL.md`.

## ggplot2 (R)

### Theme

Start from `theme_minimal()`, which already drops the panel border and axis lines, then remove the grid and the legend. ggplot2 4.0 added the `paper` (background) and `ink` (foreground) arguments to the built-in themes; they set the off-white background (rule 9) in one place.

```r
library(ggplot2)

TUFTE <- list(
  bg = "#fffff8", text = "#111111", text_secondary = "#666666",
  text_tertiary = "#767676", axis = "#cccccc",
  series_default = "#666666", bar = "#7a7a7a", highlight = "#e41a1c",
  categorical = c("#4e79a7", "#db730d", "#e15759", "#539e73")
)
TUFTE_DARK <- list(
  bg = "#151515", text = "#dddddd", text_secondary = "#999999",
  text_tertiary = "#808080", axis = "#444444",
  series_default = "#999999", highlight = "#fc8d62",
  categorical = c("#6a9fd8", "#f2a860", "#e87a7c", "#8accc7")
)

theme_tufte_skill <- function(base_size = 12, pal = TUFTE) {
  theme_minimal(base_size = base_size, base_family = "serif",
                paper = pal$bg, ink = pal$text) +
    theme(
      panel.grid = element_blank(),                       # rule 3
      axis.ticks = element_line(colour = pal$axis, linewidth = 0.25),
      axis.ticks.length = unit(3, "pt"),
      axis.text = element_text(colour = pal$text_tertiary, size = rel(0.9)),
      axis.title = element_text(colour = pal$text_secondary),
      plot.title = element_text(size = rel(1.5), colour = pal$text),
      plot.title.position = "plot",
      plot.subtitle = element_text(colour = pal$text_secondary, margin = margin(b = 12)),
      plot.caption = element_text(colour = pal$text_tertiary, hjust = 0),
      plot.caption.position = "plot",
      legend.position = "none"                            # rule 2: label lines directly
    )
}

theme_set(theme_tufte_skill())
```

On ggplot2 3.x, drop `paper` and `ink` and add `plot.background = element_rect(fill = TUFTE$bg, colour = NA)`.

Save at about 1.5:1 (rule 7): `ggsave("chart.png", width = 9, height = 6, dpi = 150)`.

### Range-frame axes (rule 4)

Draw each axis line only across the data's range. `-Inf` places the segment on the panel edge, where the axis would sit.

```r
range_frame <- function(x, y, colour = TUFTE$axis) {
  list(
    annotate("segment", x = min(x), xend = max(x), y = -Inf, yend = -Inf,
             colour = colour, linewidth = 0.25),
    annotate("segment", x = -Inf, xend = -Inf, y = min(y), yend = max(y),
             colour = colour, linewidth = 0.25)
  )
}
```

The `ggthemes` package also provides `geom_rangeframe()` and `theme_tufte()`; either works with the rest of this file.

### Accessibility (rule 16)

ggplot2 output is a static image, so there is no animation to manage.

- **Alt text that states the finding.** Pass it as `labs(alt = "...")`; R Markdown and Quarto (through knitr) use it as the image's alt text when no `fig-alt` is set. Elsewhere, put the same sentence in the `alt` attribute where the image is embedded.
- **Don't rely on color alone.** Pair color with `linetype` or `shape`.

### Complete example: annotated time series

```r
df <- data.frame(
  month   = 1:12,
  revenue = c(42, 48, 51, 49, 56, 62, 58, 65, 71, 68, 75, 82),
  target  = c(40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62)
)
last <- df[nrow(df), ]

ggplot(df, aes(month)) +
  geom_line(aes(y = target), colour = "#8c8c8c", linewidth = 0.4, linetype = "dashed") +
  geom_line(aes(y = revenue), colour = TUFTE$highlight, linewidth = 0.7) +
  # Direct labels at the last point (rule 2)
  annotate("text", x = last$month + 0.25, y = last$revenue, label = "Revenue",
           hjust = 0, colour = TUFTE$highlight, family = "serif", size = 12 / .pt) +
  annotate("text", x = last$month + 0.25, y = last$target, label = "Target",
           hjust = 0, colour = TUFTE$text_tertiary, family = "serif", size = 12 / .pt) +
  range_frame(df$month, c(df$revenue, df$target)) +
  scale_x_continuous(breaks = 1:12, labels = month.abb) +
  coord_cartesian(clip = "off") +
  labs(
    title = "Revenue Exceeded Target Every Month, Accelerating in H2",   # rule 20
    subtitle = "Monthly revenue vs. target, 2025",
    x = NULL, y = "Revenue ($k)",
    alt = "Revenue beat target every month, rising from $42k in January to $82k in December"
  ) +
  theme(plot.margin = margin(12, 70, 12, 12))   # room for the direct labels
```

The y-axis starts near the data, not at zero: a time series takes a baseline that shows the data (graphical integrity, `SKILL.md`).

### Complete example: horizontal bar chart

```r
products <- data.frame(
  product = c("Product A", "Product B", "Product C", "Product D", "Product E"),
  revenue = c(42, 38, 27, 19, 12)
)

ggplot(products, aes(revenue, reorder(product, revenue))) +
  geom_col(fill = TUFTE$bar, width = 0.6) +
  geom_text(aes(label = paste0("$", revenue, "k")), hjust = 0, nudge_x = 0.8,
            colour = TUFTE$text_secondary, family = "serif", size = 12 / .pt) +
  # Bars start at zero (graphical integrity 1); no left padding
  scale_x_continuous(expand = expansion(mult = c(0, 0.1))) +
  labs(
    title = "Products A and B Bring In 58% of Revenue",
    subtitle = "Revenue by product, $k",
    x = NULL, y = NULL,
    alt = "Product A leads revenue at $42k, followed by B at $38k, C at $27k, D at $19k and E at $12k"
  ) +
  theme(axis.text.x = element_blank(), axis.ticks = element_blank())   # values sit on the bars
```

### Small multiples

`facet_wrap()` keeps one scale for every panel by default (`scales = "fixed"`), as the small-multiples row in `SKILL.md` requires. Don't switch to `scales = "free_y"` when the panels are meant to be compared.

```r
ggplot(long_df, aes(month, value)) +
  geom_line(colour = TUFTE$series_default, linewidth = 0.5) +
  facet_wrap(~ region, nrow = 1) +
  theme(strip.text = element_text(hjust = 0, colour = TUFTE$text))
```

### Sparklines

Tufte's marks: first and last values in red, low and high in blue (BE pp. 50–51).

```r
spark <- data.frame(i = seq_along(values), v = values)
ends  <- spark[c(1, nrow(spark)), ]
lohi  <- spark[c(which.min(spark$v), which.max(spark$v)), ]

ggplot(spark, aes(i, v)) +
  geom_line(colour = TUFTE$series_default, linewidth = 0.3) +
  geom_point(data = lohi, colour = "#4e79a7", size = 0.6) +
  geom_point(data = ends, colour = "#e41a1c", size = 0.6) +
  theme_void()
# ggsave("spark.png", width = 0.8, height = 0.2, dpi = 300)
```

### Dark mode (rule 19)

```r
theme_set(theme_tufte_skill(pal = TUFTE_DARK))
```

Swap series colors to `TUFTE_DARK$series_default` and `TUFTE_DARK$highlight` as well.

## plotnine (Python)

### Theme

```python
from plotnine import (
    ggplot, aes, geom_line, geom_col, geom_text, geom_point, annotate,
    labs, theme, theme_minimal, theme_void, element_blank, element_line,
    element_rect, element_text, scale_x_continuous, scale_y_continuous,
    coord_flip, facet_wrap,
)

TUFTE = {
    "bg": "#fffff8", "text": "#111111", "text_secondary": "#666666",
    "text_tertiary": "#767676", "axis": "#cccccc",
    "series_default": "#666666", "bar": "#7a7a7a", "highlight": "#e41a1c",
    "categorical": ["#4e79a7", "#db730d", "#e15759", "#539e73"],
}


def theme_tufte_skill(base_size=12, pal=TUFTE):
    return theme_minimal(base_size=base_size, base_family="serif") + theme(
        plot_background=element_rect(fill=pal["bg"], color=pal["bg"]),
        panel_grid=element_blank(),                                   # rule 3
        axis_ticks=element_line(color=pal["axis"], size=0.5),
        axis_text=element_text(color=pal["text_tertiary"]),
        axis_title=element_text(color=pal["text_secondary"]),
        plot_title=element_text(size=18, color=pal["text"], ha="left"),
        plot_subtitle=element_text(color=pal["text_secondary"], ha="left"),
        legend_position="none",                                       # rule 2
        figure_size=(9, 6),                                           # rule 7
    )
```

plotnine also ships `theme_tufte()`, which removes the grid and the frame. The theme above does the same and adds the skill's palette and type sizes.

### Range-frame axes (rule 4)

```python
import numpy as np


def range_frame(x, y, color=TUFTE["axis"]):
    return [
        annotate("segment", x=min(x), xend=max(x), y=-np.inf, yend=-np.inf, color=color, size=0.5),
        annotate("segment", x=-np.inf, xend=-np.inf, y=min(y), yend=max(y), color=color, size=0.5),
    ]
```

Add the returned list to a plot with `+`, as with any list of layers.

### Accessibility (rule 16)

plotnine writes static images. Put alt text that states the finding wherever the image is embedded, and pair color with `linetype` or `shape`.

### Complete example: annotated time series

```python
import pandas as pd

df = pd.DataFrame({
    "month": range(1, 13),
    "revenue": [42, 48, 51, 49, 56, 62, 58, 65, 71, 68, 75, 82],
    "target": [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62],
})
last = df.iloc[-1]
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

p = (
    ggplot(df, aes("month"))
    + geom_line(aes(y="target"), color="#8c8c8c", size=0.5, linetype="dashed")
    + geom_line(aes(y="revenue"), color=TUFTE["highlight"], size=1)
    + annotate("text", x=last.month + 0.25, y=last.revenue, label="Revenue",
               ha="left", color=TUFTE["highlight"], family="serif", size=12)
    + annotate("text", x=last.month + 0.25, y=last.target, label="Target",
               ha="left", color=TUFTE["text_tertiary"], family="serif", size=12)
    + range_frame(df["month"], pd.concat([df["revenue"], df["target"]]))
    + scale_x_continuous(breaks=list(range(1, 13)), labels=months)
    + labs(
        title="Revenue Exceeded Target Every Month, Accelerating in H2",
        subtitle="Monthly revenue vs. target, 2025",
        x="", y="Revenue ($k)",
    )
    + theme_tufte_skill()
)
p.save("revenue.png", dpi=150)
```

### Complete example: horizontal bar chart

```python
products = pd.DataFrame({
    "product": ["Product A", "Product B", "Product C", "Product D", "Product E"],
    "revenue": [42, 38, 27, 19, 12],
})
products["label"] = "$" + products["revenue"].astype(str) + "k"

p = (
    ggplot(products, aes("reorder(product, revenue)", "revenue"))
    + geom_col(fill=TUFTE["bar"], width=0.6)
    + geom_text(aes(label="label"), ha="left", nudge_y=0.8,
                color=TUFTE["text_secondary"], family="serif", size=12)
    + scale_y_continuous(expand=(0, 0, 0.1, 0))   # bars start at zero (graphical integrity 1)
    + coord_flip()
    + labs(title="Products A and B Bring In 58% of Revenue",
           subtitle="Revenue by product, $k", x="", y="")
    + theme_tufte_skill()
    + theme(axis_text_x=element_blank(), axis_ticks=element_blank())
)
```

With `coord_flip()`, the value axis is still `y`, so the nudge and the expansion apply to `y`.

### Small multiples

As in ggplot2, `facet_wrap("region", nrow=1)` keeps one scale for every panel unless you pass `scales="free_y"`; keep it fixed when the panels are compared.
