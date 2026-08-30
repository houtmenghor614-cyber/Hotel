/** Theme helpers: generate a Tailwind-style brand palette and apply it live. */

function hexToRgb(hex) {
  const clean = String(hex || '#0d9488').replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 13, g: 148, b: 136 };
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function mix(hex, targetHex, weight) {
  const a = hexToRgb(hex);
  const b = hexToRgb(targetHex);
  const t = Math.min(Math.max(weight, 0), 1);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/** Build a 50..900 palette from a base color. */
export function shadePalette(hex) {
  const base = /^#[0-9a-f]{6}$/i.test(hex) ? hex : '#0d9488';
  return {
    50: mix(base, '#ffffff', 0.92),
    100: mix(base, '#ffffff', 0.82),
    200: mix(base, '#ffffff', 0.62),
    300: mix(base, '#ffffff', 0.42),
    400: mix(base, '#ffffff', 0.22),
    500: base,
    600: mix(base, '#0f172a', 0.12),
    700: mix(base, '#0f172a', 0.25),
    800: mix(base, '#0f172a', 0.4),
    900: mix(base, '#0f172a', 0.55),
  };
}

/**
 * Apply a brand color to the whole app.
 * The Tailwind Play CDN exposes `window.tailwind` as a Proxy whose `set` trap
 * recompiles all CSS on every assignment — so we replace the ENTIRE config in
 * one set (one recompile) and skip re-applying the same color.
 */
let lastAppliedColor = null;

export function applyThemeColor(hex) {
  if (!hex) return;
  const palette = shadePalette(hex);

  if (hex.toLowerCase() !== lastAppliedColor) {
    lastAppliedColor = hex.toLowerCase();
    try {
      const tw = window.tailwind;
      if (tw && tw.config && typeof tw.config === 'object') {
        const current = { ...tw.config };
        const currentTheme = current.theme && typeof current.theme === 'object' ? current.theme : {};
        const extend = currentTheme.extend && typeof currentTheme.extend === 'object' ? currentTheme.extend : {};
        const colors = extend.colors && typeof extend.colors === 'object' ? extend.colors : {};
        tw.config = {
          ...current,
          theme: {
            ...currentTheme,
            extend: {
              ...extend,
              colors: {
                ...colors,
                brand: palette,
              },
            },
          },
        };
      }
    } catch (err) {
      // ignore — CSS variable fallback below still applies
    }
  }

  const root = document.documentElement;
  Object.entries(palette).forEach(([shade, value]) => {
    root.style.setProperty(`--brand-${shade}`, value);
  });
}

export default { shadePalette, applyThemeColor };
