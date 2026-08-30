"""Generate placeholder images for frontend_user/public/assets.

Creates simple vertical-gradient PNGs using only the Python standard library
(zlib + struct), so no Pillow is required. Files are named exactly as in the
project structure (browsers sniff PNG content regardless of the extension).

Usage:  python scripts_gen_placeholders.py
"""
import struct
import zlib
from pathlib import Path

BASE = Path(__file__).resolve().parent / "public" / "assets"


def hex_to_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def make_png(path, width, height, top, bottom):
    """Write a vertical-gradient PNG from top color to bottom color."""
    top_rgb = hex_to_rgb(top)
    bottom_rgb = hex_to_rgb(bottom)

    def lerp(a, b, t):
        return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

    rows = []
    for y in range(height):
        t = y / max(height - 1, 1)
        r, g, b = lerp(top_rgb, bottom_rgb, t)
        rows.append(b"\x00" + bytes((r, g, b)) * width)

    raw = b"".join(rows)

    def chunk(tag, data):
        payload = tag + data
        return (
            struct.pack(">I", len(data))
            + payload
            + struct.pack(">I", zlib.crc32(payload) & 0xFFFFFFFF)
        )

    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(png)
    print(f"  {path.relative_to(BASE.parent.parent)}  ({width}x{height})")


def main():
    teal_dark, teal_light = "#0f766e", "#14b8a6"
    blue_dark, blue_light = "#1d4ed8", "#3b82f6"
    slate_dark, slate_light = "#0f172a", "#334155"
    amber = ("#f59e0b", "#fcd34d")
    rose = ("#be123c", "#fb7185")

    jobs = [
        ("logo/logo.png", 200, 200, teal_dark, teal_light),
        ("banners/hero-1.jpg", 1920, 640, teal_dark, blue_dark),
        ("banners/hero-2.jpg", 1920, 640, blue_dark, slate_dark),
        ("banners/hero-3.jpg", 1920, 640, slate_dark, teal_dark),
        ("hotels/hotel-1.jpg", 900, 560, teal_dark, blue_dark),
        ("hotels/hotel-2.jpg", 900, 560, blue_dark, slate_dark),
        ("hotels/hotel-3.jpg", 900, 560, slate_dark, teal_dark),
        ("rooms/standard.jpg", 900, 560, slate_light, blue_dark),
        ("rooms/deluxe.jpg", 900, 560, teal_light, teal_dark),
        ("rooms/suite.jpg", 900, 560, amber[0], amber[1]),
        ("rooms/family.jpg", 900, 560, rose[0], rose[1]),
        ("backgrounds/about.jpg", 1600, 700, slate_dark, teal_dark),
        ("backgrounds/contact.jpg", 1600, 700, blue_dark, slate_dark),
    ]
    for rel, w, h, top, bottom in jobs:
        make_png(BASE / rel, w, h, top, bottom)

    print("Placeholder images generated.")


if __name__ == "__main__":
    main()
