"""Generates the right-rail scene panels, one per homepage section.

Run from the repo root:  python3 scripts/prepare_scenes.py

Every crop box below stays clear of the bottom-right corner, where the
generator's sparkle watermark sits, so the watermark is removed by framing
rather than by patching pixels.

mult3d.png is a 2x2 sheet of four separate scenes; three of its quadrants are
used here. The fourth is skipped because the watermark falls inside it.
"""
from PIL import Image
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "img"

W, H = 620, 800  # 2x the ~310px rail width, portrait

# section id -> (source file, crop box, vertical bias)
#
# Bias controls where the cover-fit crop takes its slice: 0.0 keeps the top of
# the frame, 0.5 centres, 1.0 keeps the bottom. Heads sit near the top of these
# renders, so centring clipped the hair. Low values leave headroom.
SCENES = {
    "home":           ("landing page.png", (40, 180, 740, 1085), 0.30),
    "experience":     ("herome.png",       (30,  30, 740, 985),  0.05),
    "work":           ("projectsme.png",   (20, 120, 750, 1060), 0.20),
    "skills":         ("mult3d.png",       (0,  600, 421, 1176), 0.05),   # open office
    "about":          ("3Dmebetter.png",   (35,  40, 800, 1050), 0.05),
    "certifications": ("mult3d.png",       (0,    0, 421,  620), 0.00),   # boardroom
    "contact":        ("contactme.png",    (620,  20, 1180, 740), 0.20),
}


def main():
    for section, (src, box, bias) in SCENES.items():
        im = Image.open(IMG / src).convert("RGB").crop(box)
        # cover-fit into the target box without distorting
        ratio = max(W / im.width, H / im.height)
        im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
        left = (im.width - W) // 2
        top = int((im.height - H) * bias)
        im = im.crop((left, top, left + W, top + H))

        out = IMG / f"scene-{section}.jpg"
        im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
        print(f"scene-{section}.jpg{'':<6} {out.stat().st_size // 1024:>4} KB  {im.size}")


if __name__ == "__main__":
    main()
