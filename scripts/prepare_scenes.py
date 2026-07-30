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

# section id -> (source file, crop box)
SCENES = {
    "home":           ("landing page.png", (40, 180, 740, 1085)),
    "experience":     ("herome.png",       (30,  70, 740, 985)),
    "work":           ("projectsme.png",   (20, 120, 750, 1060)),
    "skills":         ("mult3d.png",       (0,  632, 421, 1176)),   # open office
    "about":          ("3Dmebetter.png",   (35,  60, 800, 1050)),
    "certifications": ("mult3d.png",       (0,    0, 421,  600)),   # boardroom
    "contact":        ("contactme.png",    (620,  20, 1180, 740)),
}


def main():
    for section, (src, box) in SCENES.items():
        im = Image.open(IMG / src).convert("RGB").crop(box)
        # cover-fit into the target box without distorting
        ratio = max(W / im.width, H / im.height)
        im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
        left = (im.width - W) // 2
        top = (im.height - H) // 2
        im = im.crop((left, top, left + W, top + H))

        out = IMG / f"scene-{section}.jpg"
        im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
        print(f"scene-{section}.jpg{'':<6} {out.stat().st_size // 1024:>4} KB  {im.size}")


if __name__ == "__main__":
    main()
