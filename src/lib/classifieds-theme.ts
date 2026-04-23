/** Shared Tailwind class bundles for the classifieds marketing UI (no config coupling). */

export const classifieds = {
  accent: '#12B5D4',
  accentHover: '#0fa3bf',
  footer: '#0A191E',
  heroBlob: 'from-[#12B5D4]/25 via-[#a78bfa]/15 to-transparent',
  shell: 'bg-white text-slate-950',
  muted: 'text-slate-600',
  panel: 'rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
  soft: 'rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80',
  pill: 'rounded-full bg-[#12B5D4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0fa3bf]',
  pillOutline: 'rounded-full border border-[#12B5D4]/40 bg-white px-6 py-3 text-sm font-semibold text-[#0a6f82] hover:bg-[#12B5D4]/10',
  badge: 'inline-flex items-center gap-2 rounded-full bg-[#12B5D4]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a6f82]',
} as const

export function isClassifiedsShell(recipe: { primaryTask?: string; homeLayout?: string }) {
  return recipe.primaryTask === 'classified' || recipe.homeLayout === 'classified-home'
}
