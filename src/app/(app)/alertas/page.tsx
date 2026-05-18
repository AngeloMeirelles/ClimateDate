"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
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
  todos: "bg-teal-600 text-white",
  baixo: "bg-emerald-600 text-white",
  medio: "bg-amber-600 text-white",
  alto: "bg-orange-600 text-white",
  critico: "bg-red-600 text-white",
};

export default function AlertasPage() {
  const [severity, setSeverity] = useState<AlertSeverity | "todos">("todos");
  const [onlyActive, setOnlyActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeCount = alerts.filter((a) => a.active).length;

  const filtered = alerts.filter((alert) => {
    if (severity !== "todos" && alert.severity !== severity) return false;
    if (onlyActive && !alert.active) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alertas Climáticos"
        description="Acompanhe os alertas climáticos ativos na sua região."
        action={
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-xl text-sm font-medium">
            <Bell size={16} />
            <span>{activeCount} {activeCount === 1 ? "alerta ativo" : "alertas ativos"}</span>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {severityFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSeverity(filter.value)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                severity === filter.value
                  ? severityButtonColors[filter.value]
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOnlyActive(!onlyActive)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
            onlyActive
              ? "bg-teal-600 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              onlyActive ? "bg-white animate-pulse" : "bg-red-500 animate-pulse"
            }`}
          />
          Apenas ativos
        </button>
      </div>

      {/* Alert List - single column to prevent adjacent expansion issues */}
      {filtered.length > 0 ? (
        <div className="space-y-3 max-w-3xl">
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
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Bell size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Nenhum alerta encontrado
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Nenhum alerta corresponde aos filtros selecionados. Tente ajustar os
            filtros para ver mais resultados.
          </p>
        </div>
      )}
    </div>
  );
}
