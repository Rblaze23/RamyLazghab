"""Generates section avatars from the 3D character renders.

Run from the repo root:  python3 scripts/prepare_avatars.py

Two things this handles deliberately:

1. The Gemini sparkle watermark sits bottom-right in every source render.
   Every crop below targets the head and shoulders, which is nowhere near it,
   so the watermark is removed by construction rather than by patching pixels.

2. The renders contain AI-garbled text on whiteboards and monitors. At avatar
   size that text is illegible, which is the point — the scene reads as
   "engineer at work" without inviting anyone to read the gibberish.
"""
from PIL import Image
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "img"

AVATAR_PX = 200  # 2x for a ~100px display size

# (source, output, crop box as left, top, right, bottom)
AVATARS = [
    ("herome.png",       "avatar-experience.jpg", (232,  78, 540, 386)),
    ("projectsme.png",   "avatar-work.jpg",       (430, 425, 720, 715)),
    ("aboutmepage.png",  "avatar-about.jpg",      (258, 236, 522, 500)),
    ("contactme.png",    "avatar-contact.jpg",    (752,  96, 1028, 372)),
    ("landing page.png", "avatar-skills.jpg",     (262, 492, 518, 748)),
]

# The About portrait is shown larger, so its crop is a 3:4 portrait rather
# than a square — bottom cut well above the watermark.
ABOUT_PORTRAIT = ("3Dmebetter.png", "about-3d.jpg", (60, 120, 800, 1107))


def build_avatars():
    for src, out, box in AVATARS:
        im = Image.open(IMG / src).convert("RGB").crop(box)
        im = im.resize((AVATAR_PX, AVATAR_PX), Image.LANCZOS)
        p = IMG / out
        im.save(p, "JPEG", quality=84, optimize=True, progressive=True)
        print(f"{out:<24} {p.stat().st_size // 1024:>4} KB  {im.size}")


def build_about():
    src, out, box = ABOUT_PORTRAIT
    im = Image.open(IMG / src).convert("RGB").crop(box)
    im.thumbnail((560, 760), Image.LANCZOS)
    p = IMG / out
    im.save(p, "JPEG", quality=80, optimize=True, progressive=True)
    print(f"{out:<24} {p.stat().st_size // 1024:>4} KB  {im.size}")


def contact_sheet():
    """Writes a single sheet so every crop can be eyeballed in one look."""
    names = [o for _, o, _ in AVATARS]
    sheet = Image.new("RGB", (AVATAR_PX * len(names), AVATAR_PX), (11, 13, 14))
    for i, n in enumerate(names):
        sheet.paste(Image.open(IMG / n), (i * AVATAR_PX, 0))
    out = ROOT / "avatar-contact-sheet.png"
    sheet.save(out)
    print(f"contact sheet -> {out}")


if __name__ == "__main__":
    build_avatars()
    build_about()
    contact_sheet()
