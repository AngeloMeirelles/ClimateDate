"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Lock,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  MapPin,
  Activity,
  FileJson,
  Eye,
  X,
  Shield,
  TrendingUp,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatSummaryCard from "@/components/StatSummaryCard";
import AccessBlocked from "@/components/AccessBlocked";
import { useAuth } from "@/contexts/AuthContext";
import {
  reports,
  reportTypes,
  reportRegions,
  type Report,
} from "@/data/mockReports";

const EXPORT_COUNT_KEY = "climatedate_export_count";

const typeBadgeColors: Record<string, string> = {
  eventos_extremos: "bg-red-500/20 text-red-300/80 border-red-500/30",
  qualidade_ar: "bg-teal-500/20 text-teal-300/80 border-teal-500/30",
  riscos_ambientais: "bg-amber-500/20 text-amber-300/80 border-amber-500/30",
  indice_uv: "bg-purple-500/20 text-purple-300/80 border-purple-500/30",
};

function getTypeLabel(type: string): string {
  const found = reportTypes.find((t) => t.value === type);
  return found ? found.label : type;
}

function exportCSV(report: Report) {
  const header = "Campo,Valor\n";
  const rows = report.data.map((d) => `"${d.label}","${d.value}"`).join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.title.replace(/\s+/g, "_")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportJSON(report: Report) {
  const json = JSON.stringify({ title: report.title, type: report.type, region: report.region, period: report.period, date: report.date, summary: report.summary, data: report.data }, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.title.replace(/\s+/g, "_")}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function RelatoriosPage() {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState("todos");
  const [regionFilter, setRegionFilter] = useState("todas");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [summaryReport, setSummaryReport] = useState<Report | null>(null);
  const [exportCount, setExportCount] = useState(0);

  const isComum = user?.accountType === "comum";

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXPORT_COUNT_KEY);
      if (stored) setExportCount(parseInt(stored, 10) || 0);
    } catch {
      console.warn("Failed to load export count from localStorage");
    }
  }, []);

  const incrementExportCount = () => {
    const newCount = exportCount + 1;
    setExportCount(newCount);
    localStorage.setItem(EXPORT_COUNT_KEY, String(newCount));
  };

  const handleExportCSV = (report: Report) => {
    exportCSV(report);
    incrementExportCount();
  };

  const handleExportJSON = (report: Report) => {
    exportJSON(report);
    incrementExportCount();
  };

  const filtered = reports.filter((report) => {
    if (typeFilter !== "todos" && report.type !== typeFilter) return false;
    if (regionFilter !== "todas" && report.region !== regionFilter && report.region !== "Todas") return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios Climáticos"
        description="Visualize e exporte relatórios detalhados sobre o clima da sua região."
        action={
          !isComum ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Zap size={13} />
              Acesso Completo
            </span>
          ) : null
        }
      />

      {isComum ? (
        <AccessBlocked
          title="Recurso exclusivo do plano Avançado"
          description="Os relatórios climáticos detalhados estão disponíveis apenas para contas do tipo Avançada. Faça o upgrade da sua conta para ter acesso a relatórios completos, exportação de dados e muito mais."
        />
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatSummaryCard title="Total de Eventos" value={12} icon={<Activity size={20} />} color="text-violet-400" />
            <StatSummaryCard title="Região + Afetada" value="Z. Norte" icon={<MapPin size={20} />} color="text-red-400" />
            <StatSummaryCard title="Risco Médio" value="Alto" icon={<AlertTriangle size={20} />} color="text-orange-400" />
            <StatSummaryCard title="Exportações" value={exportCount} icon={<Download size={20} />} color="text-cyan-400" />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors [&>option]:bg-gray-900 [&>option]:text-white"
            >
              {reportTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors [&>option]:bg-gray-900 [&>option]:text-white"
            >
              {reportRegions.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Reports Grid */}
          {filtered.length > 0 ? (
            <div className="space-y-4 max-w-3xl">
              {filtered.map((report) => {
                const isExpanded = expandedId === report.id;
                return (
                  <div key={report.id} className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all">
                    <button onClick={() => setExpandedId(isExpanded ? null : report.id)} className="w-full text-left p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${typeBadgeColors[report.type] ?? "bg-white/[0.06] text-white/70 border-white/10"}`}>
                              {getTypeLabel(report.type)}
                            </span>
                            <span className="text-xs text-white/40">{report.period}</span>
                          </div>
                          <h3 className="font-semibold text-white text-sm mb-1">{report.title}</h3>
                          <p className="text-xs text-white/50">{report.region} &middot; {report.date}</p>
                          <p className="text-sm text-white/70 mt-2 line-clamp-2">{report.summary}</p>
                        </div>
                        <div className="pt-1">
                          {isExpanded ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 space-y-4 border-t border-white/5">
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/5">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white/[0.03]">
                                <th className="text-left px-4 py-2 font-medium text-white/50">Campo</th>
                                <th className="text-left px-4 py-2 font-medium text-white/50">Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {report.data.map((d, i) => (
                                <tr key={i} className="border-t border-white/5">
                                  <td className="px-4 py-2 text-white/70">{d.label}</td>
                                  <td className="px-4 py-2 font-medium text-white">{d.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleExportCSV(report); }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
                          >
                            <Download size={16} />
                            Exportar CSV
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleExportJSON(report); }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] border border-white/10 text-white/70 rounded-xl text-sm font-medium hover:bg-white/[0.1] transition-colors"
                          >
                            <FileJson size={16} />
                            Exportar JSON
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSummaryReport(report); }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] border border-white/10 text-white/70 rounded-xl text-sm font-medium hover:bg-white/[0.1] transition-colors"
                          >
                            <Eye size={16} />
                            Resumo Executivo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
                <FileText size={28} className="text-white/40" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Nenhum relatório encontrado</h3>
              <p className="text-sm text-white/40 max-w-sm">Nenhum relatório corresponde aos filtros selecionados.</p>
            </div>
          )}
        </>
      )}

      {/* Executive Summary Modal */}
      {summaryReport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Resumo executivo">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSummaryReport(null)} />
          <div className="relative w-full max-w-lg bg-[#1a1035] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Resumo Executivo</h3>
              <button onClick={() => setSummaryReport(null)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X size={18} className="text-white/40" />
              </button>
            </div>
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">Relatório</p>
                <p className="text-sm text-white font-semibold">{summaryReport.title}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-1">Resumo</p>
                <p className="text-sm text-white/70">{summaryReport.summary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <AlertTriangle size={12} /> Principais Riscos
                </p>
                <div className="space-y-1.5">
                  {summaryReport.data.slice(0, 3).map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-white/[0.04] rounded-lg">
                      <span className="text-xs text-white/60">{d.label}</span>
                      <span className="text-xs font-bold text-white">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Shield size={12} /> Recomendações
                </p>
                <div className="bg-violet-500/10 border border-violet-500/15 rounded-xl p-3">
                  <ul className="space-y-1.5 text-xs text-white/60">
                    <li className="flex items-start gap-2"><TrendingUp size={11} className="text-violet-400 mt-0.5 shrink-0" /> Intensificar monitoramento nas regiões mais afetadas.</li>
                    <li className="flex items-start gap-2"><TrendingUp size={11} className="text-violet-400 mt-0.5 shrink-0" /> Comunicar população sobre riscos identificados.</li>
                    <li className="flex items-start gap-2"><TrendingUp size={11} className="text-violet-400 mt-0.5 shrink-0" /> Preparar equipes de resposta para eventos futuros.</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/30 pt-2 border-t border-white/5">
                <span>{summaryReport.region}</span>
                <span>{summaryReport.period}</span>
                <span>{summaryReport.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
