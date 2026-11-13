#!/usr/bin/env python3
"""Check the documented palette against rule 16's contrast minimums.

Reads the color tables in rules/typography-and-color.md and verifies:
  - text colors reach 4.5:1 against their background
  - data colors (series, highlight, categorical) reach 3:1
Axis lines, gridlines and backgrounds are skipped: they carry no data.

Usage: python3 scripts/check_contrast.py    (exit code 1 on any failure)
No dependencies beyond the Python standard library.
"""

import re
import sys
from pathlib import Path

DOC = Path(__file__).resolve().parent.parent / "rules" / "typography-and-color.md"
LIGHT_BG, DARK_BG = "#fffff8", "#151515"
TEXT_MIN, DATA_MIN = 4.5, 3.0
HEX = re.compile(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b")


def luminance(hex_color):
    h = hex_color.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    channels = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255
        channels.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    r, g, b = channels
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    hi, lo = sorted((luminance(a), luminance(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


def sections(text):
    """Map each '## ' / '### ' heading to the table rows beneath it."""
    out, current = {}, None
    for line in text.splitlines():
        if line.startswith("#"):
            current = line.lstrip("#").strip()
            out[current] = []
        elif current and line.startswith("|") and not re.match(r"^\|[\s\-|]+\|$", line):
            cells = [c.strip().strip("`") for c in line.strip("|").split("|")]
            out[current].append(cells)
    return out


def main():
    tables = sections(DOC.read_text())
    checks = []  # (label, color, background, minimum)

    for row in tables.get("Font hierarchy", [])[1:]:  # element, family, size, weight, light, dark
        checks.append((f"{row[0]} (light)", row[4], LIGHT_BG, TEXT_MIN))
        checks.append((f"{row[0]} (dark)", row[5], DARK_BG, TEXT_MIN))

    for heading, bg in (("Light mode", LIGHT_BG), ("Dark mode", DARK_BG)):
        for role, color, *_ in tables.get(heading, [])[1:]:
            name = role.lower()
            if "text" in name:
                checks.append((f"{role} ({heading.lower()})", color, bg, TEXT_MIN))
            elif "series" in name or "highlight" in name:
                checks.append((f"{role} ({heading.lower()})", color, bg, DATA_MIN))

    for heading, bg in (("Categorical palette (maximum 4 colors)", LIGHT_BG),
                        ("Categorical palette, dark mode", DARK_BG)):
        rows = tables.get(heading, [])[1:]
        if not rows:
            print(f"warning: no table found under '{heading}'")
        for row in rows:
            checks.append((f"categorical {row[0]} ({'dark' if bg == DARK_BG else 'light'})", row[1], bg, DATA_MIN))

    failures = 0
    for label, color, bg, minimum in checks:
        if not HEX.fullmatch(color):
            print(f"skip  {label}: '{color}' is not a hex color")
            continue
        ratio = contrast(color, bg)
        ok = ratio >= minimum
        failures += not ok
        print(f"{'ok  ' if ok else 'FAIL'}  {ratio:5.2f}:1 (needs {minimum}:1)  {color} on {bg}  {label}")

    print(f"\n{len(checks)} checks, {failures} failed")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
