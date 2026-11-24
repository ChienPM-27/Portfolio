/** Shared intensity mapping for 42-config ablation heatmaps. */
export function getHeatmapCellClass(
  value: number,
  isHighlighted: boolean
): string {
  if (isHighlighted) {
    return "bg-[#e61e1e] text-white font-bold ring-1 ring-white shadow-[0_0_12px_rgba(230,30,30,0.6)]";
  }
  if (value >= 75) {
    return "bg-[#e61e1e]/80 text-white border-[#ff4444]/60 font-semibold";
  }
  if (value >= 72) {
    return "bg-red-800/75 text-red-50 border-red-600/45";
  }
  if (value >= 65) {
    return "bg-red-950/75 text-red-200 border-red-900/40";
  }
  if (value >= 15) {
    return "bg-slate-800/85 text-slate-200 border-white/10";
  }
  return "bg-slate-900/90 text-slate-400 border-white/10";
}
