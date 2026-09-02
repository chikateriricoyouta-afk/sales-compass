"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { ABILITY_KEYS, ABILITY_LABELS, type AbilityScores } from "@/lib/types";

export function AbilityRadarChart({ scores }: { scores: AbilityScores }) {
  const data = ABILITY_KEYS.map((key) => ({
    ability: ABILITY_LABELS[key],
    score: scores[key],
  }));

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.25} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="ability" tick={{ fill: "#1e293b", fontSize: 13, fontWeight: 600 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
          <Radar
            dataKey="score"
            stroke="#4f46e5"
            fill="url(#radarFill)"
            fillOpacity={1}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
