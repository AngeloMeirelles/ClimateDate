"use client";

import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  MapPin,
  Activity,
  Clock,
  Filter,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AlertCard from "@/components/AlertCard";
import { alerts, type AlertSeverity } from "@/data/mockAlerts";

const severityFilters: { value: AlertSeverity | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "baixo", label: "Baixo" },
  { value: "medio", label: "Médio" },
  { value: "alto", label: "Alto" },
  { value: "critico", label: "Crítico" },
];

const severityButtonColors: Record<string, string> = {
  todos: "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20",
  baixo: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  medio: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  alto: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  critico: "bg-red-500/20 text-red-300 border border-red-500/30",
};

export default function AlertasPage() {
  const [severity, setSeverity] = useState<AlertSeverity | "todos">("todos");
  const [onlyActive, setOnlyActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeAlerts = alerts.filter((a) => a.active);
  const criticalCount = alerts.filter((a) => a.severity === "critico" && a.active).length;
  const affectedRegions = [...new Set(activeAlerts.map((a) => a.region))];
  const resolvedCount = alerts.filter((a) => !a.active).length;

  const filtered = alerts.filter((alert) => {
    if (severity !== "todos" && alert.severity !== severity) return false;
    if (onlyActive && !alert.active) return false;
    return true;
  });

  // Region summary
  const regionSummary = affectedRegions.map((region) => {
    const regionAlerts = activeAlerts.filter((a) => a.region === region);
    const maxSeverity = regionAlerts.reduce((max, a) => {
      const order: Record<AlertSeverity, number> = { baixo: 0, medio: 1, alto: 2, critico: 3 };
      return order[a.severity] > order[max] ? a.severity : max;
    }, "baixo" as AlertSeverity);
    return { region, count: regionAlerts.length, maxSeverity };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alertas Climáticos"
        description="Monitoramento em tempo real de eventos climáticos e riscos ambientais."
        action={
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-1.5 rounded-xl text-sm font-medium">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>{activeAlerts.length} {activeAlerts.length === 1 ? "alerta ativo" : "alertas ativos"}</span>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{activeAlerts.length}</p>
              <p className="text-[11px] text-white/40">Alertas Ativos</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <ShieldAlert size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{criticalCount}</p>
              <p className="text-[11px] text-white/40">Nível Crítico</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <MapPin size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{affectedRegions.length}</p>
              <p className="text-[11px] text-white/40">Regiões Afetadas</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Activity size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{resolvedCount}</p>
              <p className="text-[11px] text-white/40">Resolvidos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Region Quick View */}
      {regionSummary.length > 0 && (
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-violet-400" />
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Regiões com Alertas Ativos</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {regionSummary.map((r) => {
              const severityColor: Record<AlertSeverity, string> = {
                baixo: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
                medio: "bg-amber-500/15 text-amber-300 border-amber-500/25",
                alto: "bg-orange-500/15 text-orange-300 border-orange-500/25",
                critico: "bg-red-500/15 text-red-300 border-red-500/25",
              };
              return (
                <div key={r.region} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm ${severityColor[r.maxSeverity]}`}>
                  <MapPin size={13} />
                  <span className="font-medium">{r.region}</span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-bold">{r.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-violet-400" />
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Filtros</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {severityFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSeverity(filter.value)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  severity === filter.value
                    ? severityButtonColors[filter.value]
                    : "bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <button
            onClick={() => setOnlyActive(!onlyActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              onlyActive
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                : "bg-white/[0.06] border border-white/10 text-white/60 hover:bg-white/[0.1]"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyActive ? "bg-white animate-pulse" : "bg-red-500 animate-pulse"}`} />
            Apenas ativos
          </button>

          <span className="text-xs text-white/30 ml-auto hidden sm:block">
            <Clock size={11} className="inline mr-1" />
            Última atualização: agora
          </span>
        </div>
      </div>

      {/* Alert List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              expanded={expandedId === alert.id}
              onToggle={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center glass rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
            <Bell size={28} className="text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Nenhum alerta encontrado</h3>
          <p className="text-sm text-white/40 max-w-sm">
            Nenhum alerta corresponde aos filtros selecionados. Tente ajustar os filtros para ver mais resultados.
          </p>
        </div>
      )}
    </div>
  );
}
