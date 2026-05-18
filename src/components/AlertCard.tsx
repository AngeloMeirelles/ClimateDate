"use client";

import { CloudLightning, Waves, Thermometer, Wind, ChevronDown, ChevronUp } from "lucide-react";
import type { ClimateAlert } from "@/data/mockAlerts";
import { severityConfig } from "@/data/mockAlerts";
import RiskBadge from "./RiskBadge";

const iconMap: Record<string, React.ElementType> = {
  tempestade: CloudLightning,
  enchente: Waves,
  calor: Thermometer,
  ar: Wind,
};

interface Props {
  alert: ClimateAlert;
  expanded: boolean;
  onToggle: () => void;
}

export default function AlertCard({ alert, expanded, onToggle }: Props) {
  const config = severityConfig[alert.severity];
  const Icon = iconMap[alert.type] || Wind;

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${config.border} ${config.bg}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg} border ${config.border}`}>
          <Icon size={20} className={config.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-800 text-sm">{alert.title}</h3>
            <RiskBadge level={alert.severity} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {alert.region} &middot; {alert.date} &middot; {alert.time}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {alert.active && (
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
          {expanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/50">
          <div className="pt-3">
            <p className="text-sm text-gray-700">{alert.description}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-xs font-semibold text-teal-700 mb-1">Recomendação:</p>
            <p className="text-sm text-gray-600">{alert.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
