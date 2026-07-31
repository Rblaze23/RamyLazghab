"""Regenerates derived image assets.

Run from the repo root:  python3 scripts/prepare_assets.py

Sources live in src/assets/img/ and are committed. Everything this script
writes is derived, so it can always be rebuilt from those sources.
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "img"
PUB = ROOT / "public"

# Candidate system fonts, tried in order. The OG card renders text when one
# is found and falls back to a portrait-only card when none is, so this
# script works on Windows, macOS and Linux without extra dependencies.
FONT_CANDIDATES = {
    "bold": [
        "/mnt/c/Windows/Fonts/segoeuib.ttf",
        "/mnt/c/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ],
    "regular": [
        "/mnt/c/Windows/Fonts/segoeui.ttf",
        "/mnt/c/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ],
}


def load_font(weight, size):
    for path in FONT_CANDIDATES[weight]:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return None


# Head-and-shoulders box inside real.png. The bottom edge sits well above the
# generator's sparkle watermark at roughly (722, 1138), so the watermark is
# removed by framing rather than by patching pixels.
HERO_CROP = (100, 180, 730, 810)


def hero():
    """Real photograph, cropped square for the circular hero.

    Rendered at 210px on desktop and 240px on mobile, so 640px covers 2x
    displays. The frame keeps the Eiffel Tower visible on the left, which
    quietly supports the "Based in Paris" line beneath it.
    """
    im = Image.open(IMG / "real.png").convert("RGB").crop(HERO_CROP)
    im = im.resize((640, 640), Image.LANCZOS)
    out = IMG / "hero.jpg"
    im.save(out, "JPEG", quality=84, optimize=True, progressive=True)
    print(f"hero.jpg          {out.stat().st_size // 1024:>4} KB  {im.size}")


def square_face(src, size, zoom=1.0, top_bias=0.06):
    """Crop a square from the upper portion, where a portrait's face sits.

    `zoom` > 1 tightens the crop toward the head. The source artwork includes
    a firearm in the lower torso, so anything showing the body must be cropped
    tightly enough to exclude it — this is a hiring page.
    """
    im = Image.open(src).convert("RGB")
    w, h = im.size
    side = int(min(w, h) / zoom)
    left = (w - side) // 2
    top = int(h * top_bias)
    top = min(top, max(0, h - side))
    return im.crop((left, top, left + side, top + side)).resize((size, size), Image.LANCZOS)


def favicons():
    src = IMG / "cyberpunkme.png"
    square_face(src, 32).save(PUB / "favicon-32.png", "PNG", optimize=True)
    square_face(src, 180).save(PUB / "apple-touch-icon.png", "PNG", optimize=True)
    square_face(src, 64).save(
        PUB / "favicon.ico", "ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    for name in ("favicon-32.png", "apple-touch-icon.png", "favicon.ico"):
        print(f"{name:<18}{(PUB / name).stat().st_size // 1024:>4} KB")


def og_image():
    """1200x630 social card: name and role on the left, portrait on the right.

    Written as JPEG — it is a photograph, so PNG costs ~7x the bytes for no
    visible gain. Falls back to a full-bleed portrait if no system font loads.
    """
    ACCENT = (255, 180, 84)
    INK = (232, 234, 237)
    DIM = (148, 160, 158)

    f_name = load_font("bold", 76)
    f_role = load_font("regular", 34)
    f_kw = load_font("regular", 26)

    card = Image.new("RGB", (1200, 630), (11, 13, 14))
    # zoom=1.55 keeps head and shoulders only, excluding the firearm.
    portrait = square_face(IMG / "cyberpunkme.png", 630, zoom=1.55, top_bias=0.04)

    if f_name is None:
        # No usable font: full-bleed portrait, cover-cropped, still on brand.
        wide = portrait.resize((1200, 1200), Image.LANCZOS).crop((0, 220, 1200, 850))
        card.paste(wide, (0, 0))
        print("og-image.jpg      (no system font found — portrait-only card)")
    else:
        card.paste(portrait, (620, 0))
        # Soft fade so the portrait edge does not read as a hard seam.
        fade = Image.new("L", (160, 630))
        for x in range(160):
            fade.putpixel((x, 0), int(255 * (1 - x / 160)))
        fade = fade.resize((160, 630))
        card.paste(Image.new("RGB", (160, 630), (11, 13, 14)), (620, 0), fade)

        d = ImageDraw.Draw(card)
        d.text((72, 210), "Ramy Lazghab", font=f_name, fill=INK)
        d.text((72, 306), "AI & Machine Learning Engineer", font=f_role, fill=ACCENT)
        d.text((72, 366), "LLMs · Agentic AI · RAG · Production AI Systems", font=f_kw, fill=DIM)
        d.line([(72, 420), (172, 420)], fill=ACCENT, width=3)

    out = PUB / "og-image.jpg"
    card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"og-image.jpg      {out.stat().st_size // 1024:>4} KB  (1200, 630)")


if __name__ == "__main__":
    hero()
    favicons()
    og_image()
