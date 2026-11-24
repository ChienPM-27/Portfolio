import React from "react";
import { HeatmapMatrix } from "@/lib/types";
import { getHeatmapCellClass } from "./heatmap-utils";

export function formatInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-obsidian-surface font-mono text-xs border border-hud-dim/30 text-cyber-red/90"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function AblationHeatmap({ matrix }: { matrix: HeatmapMatrix }) {
  const [hlRow, hlCol] = matrix.highlight ?? [-1, -1];

  return (
    <div className="rounded-xl bg-[#090d18] border border-hud-dim/30 p-3.5 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="font-mono text-[11px] text-hud-muted">
          {matrix.caption}
        </span>
        <div className="flex items-center gap-2 font-mono text-[10px] text-hud-dim">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-white/10" />
            &lt;15%
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-950/80 border border-red-900/40" />
            67–71%
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-800/80" />
            72–75%
          </span>
          <span className="inline-flex items-center gap-1 text-hud-white">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#e61e1e] ring-1 ring-white" />
            Winner (76.52%)
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 font-mono text-[11px] tabular-nums">
          <thead>
            <tr>
              <th className="text-left text-[10px] uppercase tracking-wider text-hud-dim py-1 px-2">
                Model
              </th>
              {matrix.columns.map((col) => (
                <th
                  key={col}
                  className="text-center text-[10px] uppercase tracking-wider text-hud-muted py-1 px-1.5"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row, rIdx) => (
              <tr key={row.key}>
                <td className="text-left py-1 px-2 whitespace-nowrap text-hud-white font-medium text-[11px]">
                  <span className="text-cyber-red mr-1.5">{row.key}</span>
                  <span className="hidden sm:inline text-hud-dim text-[10px]">
                    {row.label}
                  </span>
                </td>
                {row.values.map((val, cIdx) => {
                  const isHighlighted = rIdx === hlRow && cIdx === hlCol;
                  return (
                    <td
                      key={cIdx}
                      title={`${row.key}__${matrix.columns[cIdx]}: ${val.toFixed(2)}${matrix.unit}`}
                      className={`text-center py-1.5 px-1.5 rounded border transition-colors ${getHeatmapCellClass(
                        val,
                        isHighlighted
                      )}`}
                    >
                      {val.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
