"use client";

import { useState } from "react";
import {
  Calendar,
  Filter,
  MapPin,
  Users,
  AlertTriangle,
  Shield,
  ChevronDown,
  ChevronUp,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import PageHeader from "@/components/PageHeader";
import StatSummaryCard from "@/components/StatSummaryCard";
import EmptyState from "@/components/EmptyState";
import {
  climateHistory,
  eventTypeConfig,
  eventsByMonth,
  type EventType,
} from "@/data/mockClimateHistory";

const tooltipStyle = {
  background: "rgba(15,10,30,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

const severityColors: Record<string, string> = {
  baixo: "text-emerald-400 bg-emerald-500/15",
  medio: "text-amber-400 bg-amber-500/15",
  alto: "text-orange-400 bg-orange-500/15",
  critico: "text-red-400 bg-red-500/15",
};

const regionOptions = ["Todas", "São Paulo", "Rio de Janeiro", "Brasília", "Manaus", "Porto Alegre"];

export default function HistoricoPage() {
  const [regionFilter, setRegionFilter] = useState("Todas");
  const [typeFilter, setTypeFilter] = useState<EventType | "todos">("todos");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = climateHistory.filter((e) => {
    if (regionFilter !== "Todas" && e.region !== regionFilter) return false;
    if (typeFilter !== "todos" && e.type !== typeFilter) return false;
    return true;
  });

  const totalPeople = filtered.reduce((sum, e) => sum + e.affectedPeople, 0);
  const criticalEvents = filtered.filter((e) => e.severity === "critico").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Histórico Climático"
        description="Linha do tempo de eventos climáticos registrados na região."
        action={
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
            <Calendar size={13} />
            {climateHistory.length} eventos
          </span>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatSummaryCard title="Total de Eventos" value={filtered.length} icon={<Activity size={20} />} color="text-violet-400" />
        <StatSummaryCard title="Eventos Críticos" value={criticalEvents} icon={<AlertTriangle size={20} />} color="text-red-400" />
        <StatSummaryCard title="Pessoas Afetadas" value={`${(totalPeople / 1000).toFixed(0)}k`} icon={<Users size={20} />} color="text-cyan-400" />
        <StatSummaryCard title="Regiões" value={new Set(filtered.map((e) => e.region)).size} icon={<MapPin size={20} />} color="text-emerald-400" />
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-4">Eventos por Mês</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={eventsByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} />
            <YAxis stroke="#ffffff40" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffffcc" }} />
            <Bar dataKey="critico" name="Crítico" fill="#f87171" radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="alto" name="Alto" fill="#fb923c" radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="medio" name="Médio" fill="#fbbf24" radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="baixo" name="Baixo" fill="#34d399" radius={[2, 2, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-white/40" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wide">Filtros</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition [&>option]:bg-gray-900 [&>option]:text-white"
          >
            {regionOptions.map((r) => (
              <option key={r} value={r}>{r === "Todas" ? "Todas as regiões" : r}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTypeFilter("todos")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === "todos" ? "bg-violet-600 text-white" : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"}`}
            >
              Todos
            </button>
            {(Object.keys(eventTypeConfig) as EventType[]).map((type) => {
              const cfg = eventTypeConfig[type];
              return (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === type ? `${cfg.bg} ${cfg.color}` : "bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.1]"}`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Calendar size={28} className="text-white/40" />} title="Nenhum evento encontrado" description="Ajuste os filtros para ver eventos do histórico climático." />
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10 hidden sm:block" />
          <div className="space-y-4">
            {filtered.map((event) => {
              const typeCfg = eventTypeConfig[event.type];
              const sevCfg = severityColors[event.severity] || severityColors.baixo;
              const isExpanded = expandedId === event.id;

              return (
                <div key={event.id} className="relative sm:pl-14">
                  <div className={`absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-[#0f0a1e] z-10 hidden sm:block ${typeCfg.bg.replace("/15", "")}`} />
                  <div className="glass rounded-2xl overflow-hidden">
                    <button onClick={() => setExpandedId(isExpanded ? null : event.id)} className="w-full text-left p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${typeCfg.bg} ${typeCfg.color}`}>{typeCfg.label}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${sevCfg}`}>{event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}</span>
                          </div>
                          <h3 className="text-sm font-semibold text-white mb-1">{event.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap">
                            <span className="flex items-center gap-1"><Calendar size={11} /> {event.date}</span>
                            <span className="flex items-center gap-1"><MapPin size={11} /> {event.region}</span>
                            <span className="flex items-center gap-1"><Users size={11} /> {event.affectedPeople.toLocaleString("pt-BR")}</span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white/[0.04] rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
                              <AlertTriangle size={11} /> Impacto
                            </div>
                            <p className="text-xs text-white/60">{event.impact}</p>
                          </div>
                          <div className="bg-violet-500/10 border border-violet-500/15 rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-[10px] text-violet-300 uppercase tracking-wider font-semibold mb-1.5">
                              <Shield size={11} /> Recomendação
                            </div>
                            <p className="text-xs text-white/60">{event.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
