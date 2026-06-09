"use client";

import { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Clock,
  CloudLightning,
  Waves,
  Thermometer,
  Wind,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { alerts, type AlertSeverity, type ClimateAlert } from "@/data/mockAlerts";

const severityFilters: { value: AlertSeverity | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "critico", label: "Crítico" },
  { value: "alto", label: "Alto" },
  { value: "medio", label: "Médio" },
  { value: "baixo", label: "Baixo" },
];

const typeIcons: Record<string, React.ReactNode> = {
  tempestade: <CloudLightning size={22} className="text-purple-400" />,
  enchente: <Waves size={22} className="text-blue-400" />,
  calor: <Thermometer size={22} className="text-orange-400" />,
  ar: <Wind size={22} className="text-emerald-400" />,
};

const severityStyles: Record<AlertSeverity, { border: string; badge: string; badgeText: string; accent: string }> = {
  critico: { border: "border-red-500/30", badge: "bg-red-500/20", badgeText: "text-red-300", accent: "text-red-400" },
  alto: { border: "border-orange-500/30", badge: "bg-orange-500/20", badgeText: "text-orange-300", accent: "text-orange-400" },
  medio: { border: "border-amber-500/30", badge: "bg-amber-500/20", badgeText: "text-amber-300", accent: "text-amber-400" },
  baixo: { border: "border-emerald-500/30", badge: "bg-emerald-500/20", badgeText: "text-emerald-300", accent: "text-emerald-400" },
};

function HumanAlertCard({ alert, expanded, onToggle }: { alert: ClimateAlert; expanded: boolean; onToggle: () => void }) {
  const style = severityStyles[alert.severity];
  const icon = typeIcons[alert.type] || <AlertTriangle size={22} className="text-white/50" />;

  return (
    <div className={`rounded-2xl border bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all ${style.border} ${!alert.active ? "opacity-60" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        {/* Icon */}
        <div className="mt-0.5 shrink-0">{icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title + Severity */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-white">{alert.title}</h3>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${style.badge} ${style.badgeText}`}>
              {alert.severity}
            </span>
            {!alert.active && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/10 text-white/40">
                Resolvido
              </span>
            )}
          </div>

          {/* Human-friendly summary */}
          <p className="text-sm text-white/60 mt-2 leading-relaxed">{alert.description.split(".")[0]}.</p>

          {/* Quick info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-white/40">
            <span className="flex items-center gap-1"><Clock size={11} />{alert.time}h • {alert.updatedAt}</span>
            <span className="flex items-center gap-1"><MapPin size={11} />{alert.region}</span>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="shrink-0 mt-1">
          {expanded ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 pt-0 ml-[52px] space-y-4 border-t border-white/[0.05] mt-0 pt-4">
          {/* Impact */}
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">Impacto</p>
            <p className="text-sm text-white/60">{alert.impact}</p>
          </div>

          {/* Recommendation - highlighted */}
          <div className="rounded-xl bg-violet-500/[0.08] border border-violet-500/20 p-4">
            <p className="text-[10px] font-bold text-violet-300/80 uppercase tracking-wider mb-1.5">O que fazer</p>
            <p className="text-sm text-white/70 leading-relaxed">{alert.recommendation}</p>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/30">
            <span>Fonte: {alert.source}</span>
            <span>Afetados: {alert.affectedPop}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AlertasPage() {
  const [severity, setSeverity] = useState<AlertSeverity | "todos">("todos");
  const [onlyActive, setOnlyActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeAlerts = alerts.filter((a) => a.active);

  const filtered = alerts.filter((alert) => {
    if (severity !== "todos" && alert.severity !== severity) return false;
    if (onlyActive && !alert.active) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Alertas</h1>
        <p className="text-sm text-white/40 mt-1">
          {activeAlerts.length} {activeAlerts.length === 1 ? "alerta ativo" : "alertas ativos"} na sua região
        </p>
      </div>

      {/* Active alerts summary - human language */}
      {activeAlerts.length > 0 && (
        <div className="rounded-2xl border border-amber-500/20 p-5" style={{ background: "rgba(245,158,11,0.04)" }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Resumo dos alertas ativos</h2>
              <p className="text-sm text-white/50 mt-1.5 leading-relaxed">
                {activeAlerts.filter((a) => a.severity === "critico").length > 0 &&
                  "Atenção: há alerta crítico ativo. "}
                Regiões afetadas: {[...new Set(activeAlerts.map((a) => a.region))].join(", ")}.
                {" "}Recomendamos atenção especial aos deslocamentos hoje.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters - simplified */}
      <div className="flex flex-wrap items-center gap-2">
        {severityFilters.map((filter) => {
          const isActive = severity === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setSeverity(filter.value)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/[0.06] border border-white/10 text-white/50 hover:bg-white/[0.1] hover:text-white/70"
              }`}
            >
              {filter.label}
            </button>
          );
        })}

        <div className="h-5 w-px bg-white/10 hidden sm:block" />

        <button
          onClick={() => setOnlyActive(!onlyActive)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
            onlyActive
              ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
              : "bg-white/[0.06] border border-white/10 text-white/50 hover:bg-white/[0.1]"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${onlyActive ? "bg-white" : "bg-red-500"} animate-pulse`} />
          Apenas ativos
        </button>
      </div>

      {/* Alert List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <HumanAlertCard
              key={alert.id}
              alert={alert}
              expanded={expandedId === alert.id}
              onToggle={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
            <Shield size={24} className="text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Tudo tranquilo</h3>
          <p className="text-sm text-white/40 max-w-sm">
            Nenhum alerta encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}
