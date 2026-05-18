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
  up: <TrendingUp size={14} className="text-red-500" />,
  down: <TrendingDown size={14} className="text-blue-500" />,
  stable: <Minus size={14} className="text-gray-400" />,
};

export default function IndicatorCard({ title, value, unit, trend, icon, color = "from-teal-500 to-cyan-500" }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
          {icon}
        </div>
        {trend && trendIcons[trend]}
      </div>
      <p className="text-2xl font-bold text-gray-800">
        {value}
        <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
      </p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </div>
  );
}
