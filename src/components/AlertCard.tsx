"use client";

import { CloudLightning, Waves, Thermometer, Wind, ChevronDown, ChevronUp, Clock, MapPin, Users, AlertTriangle, Radio, Shield } from "lucide-react";
import type { ClimateAlert } from "@/data/mockAlerts";
import RiskBadge from "./RiskBadge";

const iconMap: Record<string, React.ElementType> = {
  tempestade: CloudLightning,
  enchente: Waves,
  calor: Thermometer,
  ar: Wind,
};

const severityAccent: Record<string, { iconBg: string; leftBar: string; glowHover: string }> = {
  baixo: { iconBg: "bg-emerald-500/20 text-emerald-400", leftBar: "bg-emerald-500", glowHover: "hover:border-emerald-500/30" },
  medio: { iconBg: "bg-amber-500/20 text-amber-400", leftBar: "bg-amber-500", glowHover: "hover:border-amber-500/30" },
  alto: { iconBg: "bg-orange-500/20 text-orange-400", leftBar: "bg-orange-500", glowHover: "hover:border-orange-500/30" },
  critico: { iconBg: "bg-red-500/20 text-red-400", leftBar: "bg-red-500", glowHover: "hover:border-red-500/30" },
};

interface Props {
  alert: ClimateAlert;
  expanded: boolean;
  onToggle: () => void;
}

export default function AlertCard({ alert, expanded, onToggle }: Props) {
  const Icon = iconMap[alert.type] || Wind;
  const accent = severityAccent[alert.severity];

  return (
    <div className={`glass rounded-2xl overflow-hidden transition-all ${accent.glowHover} ${expanded ? "ring-1 ring-white/10" : ""}`}>
      {/* Colored severity bar at top */}
      <div className={`h-1 ${accent.leftBar} ${alert.active ? "opacity-100" : "opacity-30"}`} />

      <button onClick={onToggle} className="w-full flex items-center gap-4 p-4 pb-3 text-left">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent.iconBg}`}>
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-sm">{alert.title}</h3>
            <RiskBadge level={alert.severity} />
            {alert.active && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Ativo
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
            <span className="flex items-center gap-1"><MapPin size={11} /> {alert.region}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {alert.date} {alert.time}</span>
            {alert.updatedAt && <span className="text-violet-400/70">{alert.updatedAt}</span>}
          </div>
        </div>
        <div className="shrink-0">
          {expanded
            ? <ChevronUp size={18} className="text-white/40" />
            : <ChevronDown size={18} className="text-white/40" />
          }
        </div>
      </button>

      {/* Quick info row */}
      <div className="px-4 pb-3 flex items-center gap-4 text-[11px] text-white/30">
        <span className="flex items-center gap-1"><Radio size={10} /> {alert.source}</span>
        <span className="flex items-center gap-1"><Users size={10} /> {alert.affectedPop}</span>
      </div>

      {expanded && (
        <div className="border-t border-white/5">
          {/* Description */}
          <div className="px-5 pt-4 pb-3">
            <p className="text-sm text-white/70 leading-relaxed">{alert.description}</p>
          </div>

          {/* Info grid */}
          <div className="px-5 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/[0.04] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
                <AlertTriangle size={11} />
                Impacto Previsto
              </div>
              <p className="text-xs text-white/60 leading-relaxed">{alert.impact}</p>
            </div>
            <div className="bg-white/[0.04] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
                <Users size={11} />
                População Afetada
              </div>
              <p className="text-sm text-white font-bold">{alert.affectedPop}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{alert.region}</p>
            </div>
            <div className="bg-white/[0.04] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
                <Radio size={11} />
                Fonte
              </div>
              <p className="text-xs text-white/60">{alert.source}</p>
              <p className="text-[10px] text-white/30 mt-0.5">Atualizado {alert.updatedAt}</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="px-5 pb-5">
            <div className="bg-violet-500/10 border border-violet-500/15 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-violet-400" />
                <p className="text-xs font-bold text-violet-300 uppercase tracking-wider">Recomendações de Segurança</p>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{alert.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
