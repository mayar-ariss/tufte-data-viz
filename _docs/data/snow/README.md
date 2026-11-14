# John Snow's cholera map data

Used by `_docs/generate_showcase.py` to draw `tufte-cholera-map.png`.

- `Snow.deaths.csv`: location of each of the 578 cholera deaths
- `Snow.pumps.csv`: the 13 public water pumps
- `Snow.streets.csv`: street segments

Source: John Snow, *On the Mode of Communication of Cholera*, 2nd ed. (London, 1855). Digitized by Rusty Dodson and Waldo Tobler (National Center for Geographic Information and Analysis); distributed in the R package HistData (Michael Friendly) as `Snow.deaths`, `Snow.pumps` and `Snow.streets`. CSV copies from the Rdatasets collection (Vincent Arel-Bundock).

The coordinates are the digitizer's map units: they carry no ground scale. North is up.
