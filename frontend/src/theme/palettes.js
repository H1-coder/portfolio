// Each palette sets the --c1/--c2/--c3 RGB channels consumed by the brand-* colours
// in tailwind.config.js. Class strings are written out in full so Tailwind can find them.
export const PALETTES = {
  ocean: {
    label: 'Ocean',
    vars: '[--c1:14_165_233] [--c2:99_102_241] [--c3:217_70_239]',
    swatch: 'from-[#0ea5e9] via-[#6366f1] to-[#d946ef]',
  },
  sunset: {
    label: 'Sunset',
    vars: '[--c1:249_115_22] [--c2:236_72_153] [--c3:139_92_246]',
    swatch: 'from-[#f97316] via-[#ec4899] to-[#8b5cf6]',
  },
  aurora: {
    label: 'Aurora',
    vars: '[--c1:34_211_238] [--c2:52_211_153] [--c3:167_139_250]',
    swatch: 'from-[#22d3ee] via-[#34d399] to-[#a78bfa]',
  },
};

export const DEFAULT_PALETTE = 'ocean';
