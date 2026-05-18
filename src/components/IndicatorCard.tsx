"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  unit: string;
  trend?: "up" | "down" | "stable";
  icon: ReactNode;
  color?: string;
}

const trendIcons = {
  up: <TrendingUp size={14} className="text-rose-400" />,
  down: <TrendingDown size={14} className="text-cyan-400" />,
  stable: <Minus size={14} className="text-white/40" />,
};

export default function IndicatorCard({ title, value, unit, trend, icon, color = "from-violet-500 to-purple-600" }: Props) {
  return (
    <div className="glass rounded-2xl p-5 hover:bg-white/[0.09] transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        {trend && trendIcons[trend]}
      </div>
      <p className="text-2xl font-bold text-white">
        {value}
        <span className="text-sm font-normal text-white/40 ml-1">{unit}</span>
      </p>
      <p className="text-xs text-white/50 mt-1">{title}</p>
    </div>
  );
}
