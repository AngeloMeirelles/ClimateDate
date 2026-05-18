"use client";

import { useState } from "react";
import { FileText, Download, Lock, ChevronDown, ChevronUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import {
  reports,
  reportTypes,
  reportRegions,
  type Report,
} from "@/data/mockReports";

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

export default function RelatoriosPage() {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState("todos");
  const [regionFilter, setRegionFilter] = useState("todas");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isComum = user?.accountType === "comum";

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
      />

      {isComum ? (
        /* Upgrade Banner */
        <div className="flex flex-col items-center justify-center py-16 text-center bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
            <Lock size={36} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Recurso exclusivo do plano Avançado
          </h2>
          <p className="text-sm text-white/50 max-w-md mb-6">
            Os relatórios climáticos detalhados estão disponíveis apenas para
            contas do tipo <strong className="text-white/70">Avançada</strong>. Faça o upgrade da sua conta
            para ter acesso a relatórios completos, exportação de dados e muito
            mais.
          </p>
          <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow">
            Fazer upgrade para Avançada
          </button>
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors [&>option]:bg-gray-900 [&>option]:text-white"
            >
              {reportTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors [&>option]:bg-gray-900 [&>option]:text-white"
            >
              {reportRegions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reports Grid */}
          {filtered.length > 0 ? (
            <div className="space-y-4 max-w-3xl">
              {filtered.map((report) => {
                const isExpanded = expandedId === report.id;
                return (
                  <div
                    key={report.id}
                    className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : report.id)
                      }
                      className="w-full text-left p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span
                              className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${
                                typeBadgeColors[report.type] ??
                                "bg-white/[0.06] text-white/70 border-white/10"
                              }`}
                            >
                              {getTypeLabel(report.type)}
                            </span>
                            <span className="text-xs text-white/40">
                              {report.period}
                            </span>
                          </div>
                          <h3 className="font-semibold text-white text-sm mb-1">
                            {report.title}
                          </h3>
                          <p className="text-xs text-white/50">
                            {report.region} &middot; {report.date}
                          </p>
                          <p className="text-sm text-white/70 mt-2 line-clamp-2">
                            {report.summary}
                          </p>
                        </div>
                        <div className="pt-1">
                          {isExpanded ? (
                            <ChevronUp size={18} className="text-white/40" />
                          ) : (
                            <ChevronDown size={18} className="text-white/40" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 space-y-4 border-t border-white/5">
                        {/* Data Table */}
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/5">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white/[0.03]">
                                <th className="text-left px-4 py-2 font-medium text-white/50">
                                  Campo
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-white/50">
                                  Valor
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {report.data.map((d, i) => (
                                <tr
                                  key={i}
                                  className="border-t border-white/5"
                                >
                                  <td className="px-4 py-2 text-white/70">
                                    {d.label}
                                  </td>
                                  <td className="px-4 py-2 font-medium text-white">
                                    {d.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Export Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportCSV(report);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
                        >
                          <Download size={16} />
                          Exportar CSV
                        </button>
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
              <h3 className="text-lg font-semibold text-white mb-1">
                Nenhum relatório encontrado
              </h3>
              <p className="text-sm text-white/40 max-w-sm">
                Nenhum relatório corresponde aos filtros selecionados. Tente
                ajustar os filtros para ver mais resultados.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
