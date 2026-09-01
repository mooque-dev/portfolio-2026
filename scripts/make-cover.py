#!/usr/bin/env python3
"""Compose a case-study cover at the card's exact canvas, so CSS never crops.

The cover system (see docs/CONTRACTS.md): every cover is a designed 3:2 canvas.
The source artifact is placed WHOLE on a ground color (the study's coverColor),
with consistent padding, rounded corners, and a soft shadow. Compositions that
earn something custom (like ARND's two phones) can bypass this script, but they
still author to the same 1800x1200 canvas.

Usage:
  python3 scripts/make-cover.py <source-image> <ground-hex> <out.jpg>

Requires Pillow (pip install Pillow).
"""

import sys
from PIL import Image, ImageDraw, ImageFilter

CANVAS = (1800, 1200)  # 3:2
PAD_FRAC = 0.08        # padding as a fraction of the short edge
RADIUS = 24
SHADOW_BLUR = 26
SHADOW_ALPHA = 80


def hex_to_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def rounded(img: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", img.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, *img.size], radius=radius, fill=255)
    out = Image.new("RGBA", img.size)
    out.paste(img, (0, 0), mask)
    return out


def main() -> None:
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    src_path, ground_hex, out_path = sys.argv[1:4]

    canvas = Image.new("RGB", CANVAS, hex_to_rgb(ground_hex))
    src = Image.open(src_path).convert("RGB")

    pad = int(CANVAS[1] * PAD_FRAC)
    box_w, box_h = CANVAS[0] - 2 * pad, CANVAS[1] - 2 * pad
    scale = min(box_w / src.width, box_h / src.height)
    size = (round(src.width * scale), round(src.height * scale))
    art = rounded(src.resize(size, Image.LANCZOS), RADIUS)

    x = (CANVAS[0] - size[0]) // 2
    y = (CANVAS[1] - size[1]) // 2

    shadow = Image.new("RGBA", (size[0] + SHADOW_BLUR * 4, size[1] + SHADOW_BLUR * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow)
    d.rounded_rectangle(
        [SHADOW_BLUR * 2, SHADOW_BLUR * 2, SHADOW_BLUR * 2 + size[0], SHADOW_BLUR * 2 + size[1]],
        radius=RADIUS,
        fill=(12, 12, 24, SHADOW_ALPHA),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW_BLUR))
    canvas.paste(shadow, (x - SHADOW_BLUR * 2, y - SHADOW_BLUR * 2 + 10), shadow)
    canvas.paste(art, (x, y), art)

    canvas.save(out_path, quality=88)
    print(f"cover: {out_path} ({CANVAS[0]}x{CANVAS[1]}, ground {ground_hex})")


if __name__ == "__main__":
    main()
