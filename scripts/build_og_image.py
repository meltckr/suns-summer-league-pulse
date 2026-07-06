#!/usr/bin/env python3

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json
import sys
import textwrap

ROOT = Path(__file__).resolve().parents[1]
ISSUE_PATH = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "data" / "issues" / "issue-01-owner-preview.json"
SUNS_LOGO = ROOT / "assets" / "teams" / "suns" / "phoenix-suns-logo.png"


def font(size, weight="regular", family="sans"):
    if family == "display":
        candidates = [
            "/System/Library/Fonts/Supplemental/Didot.ttc",
            "/System/Library/Fonts/Supplemental/Bodoni 72.ttc",
            "/System/Library/Fonts/Supplemental/Georgia.ttf",
            "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        ]
    else:
        candidates = [
            "/System/Library/Fonts/Avenir Next.ttc",
            f"/System/Library/Fonts/Supplemental/Arial {'Bold' if weight == 'bold' else ''}.ttf",
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/Library/Fonts/Arial.ttf",
            "/System/Library/Fonts/Supplemental/Helvetica.ttc",
            "/System/Library/Fonts/SFNS.ttf",
        ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            try:
                return ImageFont.truetype(str(path), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def wrap(draw, text, face, width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        bbox = draw.textbbox((0, 0), test, font=face)
        if bbox[2] <= width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


issue = json.loads(ISSUE_PATH.read_text())
cover = issue.get("cover", {})
out_dir = ROOT / "dist" / issue["slug"]
out = out_dir / cover.get("image", f"og-{issue['slug']}.png")
subjects = cover.get("subjects", [])
cover_line = cover.get("coverLine", issue["dek"])
cover_kicker = cover.get("kicker", issue["type"])
visual_label = cover.get("visualLabel", "Issue Focus")
updated_through = cover.get("updatedThrough", issue["date"])
out_dir.mkdir(parents=True, exist_ok=True)

W, H = 1200, 630
img = Image.new("RGB", (W, H), (13, 16, 23))
draw = ImageDraw.Draw(img)

for y in range(H):
    mix = y / H
    r = int(13 + 40 * mix)
    g = int(16 + 20 * mix)
    b = int(23 + 55 * mix)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

for x in range(W):
    mix = x / W
    r = int(20 + 62 * mix)
    g = int(18 + 12 * mix)
    b = int(28 + 82 * mix)
    draw.line([(x, 0), (x, H)], fill=(r, g, b), width=1)

draw.rectangle((0, 0, W, H), outline=(216, 169, 74), width=0)
draw.rectangle((0, H - 18, W, H), fill=(201, 33, 39))
draw.rectangle((0, H - 10, W, H), fill=(229, 96, 32))

panel = Image.new("RGBA", (W, H), (0, 0, 0, 0))
pdraw = ImageDraw.Draw(panel)
rounded_rect(pdraw, (58, 54, 1142, 576), 24, (255, 255, 255, 22), (255, 255, 255, 50), 1)
for i in range(7):
    x = 774 + i * 34
    pdraw.line((x, 78, x - 220, 576), fill=(255, 255, 255, 16), width=10)
img = Image.alpha_composite(img.convert("RGBA"), panel)
draw = ImageDraw.Draw(img)

kicker = font(28, "bold")
body = font(32)
small = font(21, "bold")
tiny = font(17)
micro = font(14, "bold")

draw.text((92, 92), issue["product"].upper(), font=small, fill=(255, 255, 255, 230))
draw.text((92, 124), f"{issue['subtitle'].upper()} | {issue['issue'].upper()}", font=tiny, fill=(216, 169, 74, 230))
draw.text((92, 178), cover_kicker.upper(), font=kicker, fill=(216, 169, 74, 235))

title_size = 90
title = font(title_size, "bold", "display")
title_lines = wrap(draw, issue["title"], title, 760)
while len(title_lines) > 3 and title_size > 70:
    title_size -= 4
    title = font(title_size, "bold", "display")
    title_lines = wrap(draw, issue["title"], title, 760)

y = 218
line_height = int(title_size * 0.9)
for line in title_lines:
    draw.text((92, y), line, font=title, fill=(255, 255, 255, 246))
    y += line_height

cover_y = y + 16
for line in wrap(draw, cover_line, body, 710)[:2]:
    draw.text((94, cover_y), line, font=body, fill=(235, 239, 245, 214))
    cover_y += 39

logo = Image.open(SUNS_LOGO).convert("RGBA")
logo.thumbnail((132, 132), Image.Resampling.LANCZOS)
logo_box = Image.new("RGBA", (214, 268), (255, 255, 255, 20))
ldraw = ImageDraw.Draw(logo_box)
rounded_rect(ldraw, (0, 0, 214, 268), 20, (255, 255, 255, 24), (255, 255, 255, 72), 1)
logo_box.alpha_composite(logo, ((214 - logo.width) // 2, 28))
ldraw.text((24, 174), visual_label.upper(), font=micro, fill=(216, 169, 74, 235))
subject_y = 198
for subject in subjects[:4]:
    ldraw.text((24, subject_y), subject.upper(), font=tiny, fill=(255, 255, 255, 224))
    subject_y += 24
img.alpha_composite(logo_box, (890, 134))

draw.text((890, 430), issue["date"].upper(), font=small, fill=(255, 255, 255, 228))
updated_y = 464
for line in wrap(draw, updated_through, tiny, 230)[:2]:
    draw.text((890, updated_y), line.upper(), font=tiny, fill=(235, 239, 245, 170))
    updated_y += 24

draw.text((92, 536), "Prepared by AVC", font=tiny, fill=(235, 239, 245, 150))
draw.text((846, 536), "Discreet public-intelligence brief", font=tiny, fill=(235, 239, 245, 150))

img.convert("RGB").save(out, quality=95)
print(f"Wrote {out.relative_to(ROOT)}")
