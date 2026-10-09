"""Draws pixel stickers for the "Off the clock" list, in the house sticker style:
art on a coarse grid, a dark outline, then a white and a grey sticker border,
each art pixel scaled to 8x8. Run: python3 scripts/make-stickers.py
"""
from PIL import Image

OUT = "public/stickers"
SCALE = 8
INK = (32, 29, 26)
WHITE = (255, 255, 255)
EDGE = (196, 191, 181)
C = {
    "R": (205, 46, 58),    # seal red
    "r": (150, 28, 40),    # curtain fold
    "Y": (232, 195, 60),   # gold
    "O": (217, 123, 22),
    "G": (64, 150, 88),    # green
    "g": (42, 112, 64),
    "B": (66, 110, 205),   # blue
    "b": (44, 78, 160),
    "V": (128, 82, 176),   # violet
    "v": (98, 58, 146),
    "P": (230, 120, 160),  # pink
    "W": (255, 255, 255),
    "c": (246, 241, 230),  # cream
    "L": (205, 205, 200),  # light metal
    "M": (140, 140, 136),  # metal
    "D": (72, 68, 64),     # dark grey
    "T": (176, 106, 42),   # bear brown
    "t": (222, 176, 120),  # tan
    "K": INK,
    "N": (46, 40, 58),    # backstage dark
    "S": (250, 232, 170), # spotlight
}


def grid(rows):
    w = max(len(r) for r in rows)
    return [r.ljust(w, ".") for r in rows]


def save(name, rows):
    rows = grid(rows)
    h, w = len(rows), len(rows[0])
    pad = 4  # outline, white, grey, margin
    W, H = w + 2 * pad, h + 2 * pad
    px = [[None] * W for _ in range(H)]
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch != ".":
                px[y + pad][x + pad] = C[ch]

    def grow(color, diag):
        add = []
        for y in range(H):
            for x in range(W):
                if px[y][x] is not None:
                    continue
                n = [(0, 1), (1, 0), (0, -1), (-1, 0)]
                if diag:
                    n += [(1, 1), (1, -1), (-1, 1), (-1, -1)]
                if any(0 <= y + dy < H and 0 <= x + dx < W and px[y + dy][x + dx] is not None for dy, dx in n):
                    add.append((y, x))
        for y, x in add:
            px[y][x] = color

    grow(INK, False)
    grow(WHITE, True)
    grow(EDGE, False)
    img = Image.new("RGBA", (W * SCALE, H * SCALE), (0, 0, 0, 0))
    for y in range(H):
        for x in range(W):
            if px[y][x] is not None:
                for dy in range(SCALE):
                    for dx in range(SCALE):
                        img.putpixel((x * SCALE + dx, y * SCALE + dy), px[y][x] + (255,))
    img.save(f"{OUT}/{name}.png", optimize=True)
    print(name, img.size)


# A microphone on a stand, in a spotlight between stage curtains.
save("stage-mic", [
    "RRRRRRRRRRRRRRRRRRRRRR",
    "YYYYYYYYYYYYYYYYYYYYYY",
    "RrRRrNNNNNNNNNNNNrRRrR",
    "RrRRNNNNNNLMLNNNNNRRrR",
    "RrRRNNNNNLMLMLNNNNRRrR",
    "RrRRNNNNNMLMLMNNNNRRrR",
    "RrRRNNNNNNMLMNNNNNRRrR",
    "RrRNNNNNNNNDNNNNNNNRrR",
    "RrRNNNNNNNNDNNNNNNNRrR",
    "RrRNNNNNNNNMNNNNNNNRrR",
    "RrRNNNNNNNNMNNNNNNNRrR",
    "RrRNNNNNSSSMSSSNNNNRrR",
    "RrRRNNNSSSSMSSSSNNRRrR",
    "RrRRNNSSSMMMMMSSSNRRrR",
    "TTTTTTTTTTTTTTTTTTTTTT",
])


def flower():
    """Six round petals in rainbow order around a centre, on a leafy stem."""
    import math
    w, h = 19, 24
    g = [["."] * w for _ in range(h)]
    cx, cy = 9, 8
    for i, col in enumerate("ROYGBV"):
        a = math.radians(-60 + i * 60)
        px, py = cx + 5.2 * math.cos(a), cy + 5.2 * math.sin(a)
        for y in range(h):
            for x in range(w):
                if (x - px) ** 2 + (y - py) ** 2 <= 4.6:
                    g[y][x] = col
    for y in range(h):
        for x in range(w):
            d = (x - cx) ** 2 + (y - cy) ** 2
            if d <= 4.6:
                g[y][x] = "Y" if d <= 1 else "T"
    for y in range(14, h):
        g[y][cx] = "g"
    for x, y in [(10, 18), (11, 18), (12, 17), (11, 17), (12, 18), (13, 17),
                 (8, 20), (7, 20), (6, 19), (7, 19), (6, 20), (5, 19)]:
        g[y][x] = "G"
    return ["".join(r) for r in g]


# A flower with rainbow petals, for the arts.
save("rainbow-flower", flower())

# A running shoe: high back, laces, a stripe, a cushioned sole.
save("running-shoe", [
    "..BBB...............",
    ".BBBBB..............",
    ".BbBBBW.............",
    ".BbBBBBW............",
    ".BbBBBBBWW..........",
    ".BBBBBBBBBWWBB......",
    ".BBBYYYYBBBBBBBBB...",
    ".BBBBBBYYYYYBBBBBBB.",
    ".WWWWWWWWWWWWWWWWWWW",
    ".WWWWWWWWWWWWWWWWWW.",
    "..DDD.DDD.DDD.DDD...",
])

# A teddy bear holding a heart: children, and giving.
save("bear-heart", [
    ".TT.........TT.",
    "TttT.TTTTT.TttT",
    "TTTTTTTTTTTTTTT",
    ".TTTTTTTTTTTTT.",
    ".TTKTTTTTTTKTT.",
    ".TTTTTtttTTTTT.",
    "..TTTtKKKtTTT..",
    "...TTTtttTTT...",
    "..TTTTTTTTTTT..",
    ".TTTTRRTRRTTTT.",
    "TTTTRRRRRRRTTTT",
    "TTT.RRRRRRR.TTT",
    "..T.TRRRRRT.T..",
    "...TTTRRRTTT...",
    "...TTTTRTTTT...",
    "..tttTTTTTttt..",
    "..ttt.....ttt..",
])

# A pixel invader, for the daily streak.
INVADER = [
    "..V.....V..",
    "...V...V...",
    "..VVVVVVV..",
    ".VV.VVV.VV.",
    "VVVVVVVVVVV",
    "V.VVVVVVV.V",
    "V.V.....V.V",
    "...VV.VV...",
]
save("invader", ["".join(ch * 2 for ch in row) for row in INVADER for _ in (0, 1)])
